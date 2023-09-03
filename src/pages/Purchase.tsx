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

  type flatPurchase = {
    id: number;
    productId: number;
    productName: string;
    productPrice: number;
  };

  const columns: ColumnsType<flatPurchase> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ProductName",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "ProductPrice",
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
            onClick={() => deletePurchase(record.id)}
            type="primary"
            danger
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const flattenedPurchase: flatPurchase[] | undefined = purchases?.flatMap(
    (item) =>
      item.products.map((product) => ({
        id: item.id,
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
      }))
  );

  const productsWithKey = flattenedPurchase
    ? flattenedPurchase.map((purchase) => ({
        ...purchase,
        key: purchase.id.toString(),
      }))
    : null;

  const addPurchase = (purchase: Purchase) => {
    POST<Purchase>({ url: "purchase.php", data: purchase });
  };

  const deletePurchase = (id: number) => {
    DELETE<number>({ url: "purchase.php", data: id });
  };

  return (
    <div>
      {productsWithKey && (
        <div className="w-full p-5">
          <div className="flex flex-row justify-between mx-5">
            <h2 className="text-2xl">Orders</h2>
            <Button onClick={() => setIsModalOpen(true)} className="w-40">
              Add Order
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
              <Button type="primary" key="create">
                create
              </Button>,
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
