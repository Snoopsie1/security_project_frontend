import { type Purchase } from "../types/purchase";
import { Button, Table, Modal, Input } from "antd";
import { useFetcher } from "../services/api";
import React from "react";
import { ColumnsType } from "antd/es/table";

const Order = () => {
  const { POST, GET, DELETE } = useFetcher();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const {
    data: purchases,
    isLoading,
    error,
  } = GET<Purchase[]>({
    url: "purchase.php",
  });

  type Iorder = {
    id: number;
    products: string;
    productPrice: string;
  };

  const columns: ColumnsType<Iorder> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "Total product price",
      dataIndex: "productPrice",
      key: "productPrice",
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <>
          <Button
            onClick={() => deletePurchase(record.id, "1")}
            type="primary"
            danger
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const order: Iorder[] | undefined = purchases?.map((item) => ({
    id: item.id,
    products: item.products.map((e) => e.name).join(", "),
    productPrice:
      String(
        item.products.reduce((accumulator, product) => {
          return accumulator + product.price;
        }, 0)
      ) + "kr.",
  }));

  const productsWithKey = order
    ? order.map((purchase) => ({
        ...purchase,
        key: purchase.id.toString(),
      }))
    : null;

  const addPurchase = (productIds: number[]) => {
    //number array of product ids
    POST<number[]>({ url: "purchase.php", data: productIds });
  };

  const deletePurchase = (id: number, role: string) => {
    DELETE({
      url: `purchase.php/${id}`,
      params: { role: "1" },
    });
  };

  return (
    <div className="w-full p-5">
      {productsWithKey && (
        <div className="w-full p-5">
          <div className="flex flex-row justify-between mx-5">
            <h2 className="text-2xl">Purchases</h2>
            <Button onClick={() => addPurchase([10, 11, 14])} className="w-40">
              Add Purchase
            </Button>
          </div>
          <Table dataSource={productsWithKey} columns={columns} />
          <Modal
            title={"Create new order"}
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={[
              <Button
                danger
                type="primary"
                key="cancel"
                onClick={() => setIsModalOpen(false)}
              >
                cancel
              </Button>,
              <Button key="create">create</Button>,
            ]}
          >
            <Input placeholder="lort" />
          </Modal>
        </div>
      )}
      {isLoading && <>page is loading</>}
      {error && <>page got error</>}
    </div>
  );
};

export default Order;
