import { type Purchase } from "../types/purchase";
import { Button, Table, Modal } from "antd";
import { useFetcher } from "../services/api";
import React from "react";
import { ColumnsType } from "antd/es/table";
import useCustomerStore from "../store/customer.store";
import { Product } from "../types/product";
import { Customer } from "../types/customer";

const Order = () => {
  const { GET, DELETE, POST } = useFetcher();
  const customer = useCustomerStore((state) => state.customer);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const {
    data: purchases,
    isLoading,
    error,
    revalidate,
  } = customer?.roleId === 1
    ? GET<Purchase[]>({
        url: "purchase.php",
      })
    : GET<Purchase[]>({
        url: `purchase.php/${customer?.id}`,
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

  const deletePurchase = (id: number, role: string) => {
    DELETE({
      url: `purchase.php/${id}`,
      params: { role: "1" },
    });
    revalidate();
  };

  const addPurchase = (purchase: {
    customerID: number | undefined;
    productIds: number[];
  }) => {
    console.log("jeg er inde i add purchase");
    if (purchase.customerID !== undefined) {
      console.log("jeg er inde i add if statement");
      //number array of product ids
      POST<{ customerID: number | undefined; productIds: number[] }>({
        url: "purchase.php",
        data: purchase,
      });
      revalidate();
      setIsModalOpen(false);
    }
  };

  return (
    <div className="w-full p-5">
      {productsWithKey && (
        <div className="w-full p-5">
          <div className="flex flex-row justify-between mx-5">
            <h2 className="text-2xl">Purchases</h2>
            <Button onClick={() => setIsModalOpen(true)} className="w-40">
              Add Purchase
            </Button>
          </div>
          <Table dataSource={productsWithKey} columns={columns} />
          <PurchaseModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            addPurchase={addPurchase}
            customer={customer}
          />
        </div>
      )}
      {isLoading && <>page is loading</>}
      {error && <>page got error</>}
    </div>
  );
};

type Imodal = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addPurchase: (purchase: {
    customerID: number | undefined;
    productIds: number[];
  }) => void;
  customer: Customer | null;
};

const PurchaseModal = (props: Imodal) => {
  const { GET } = useFetcher();
  const { data: products } = GET<Product[]>({ url: "product.php" });
  const [productArray, setProductArray] = React.useState<number[]>([]);

  const removeId = (id: number) => {
    const array = [...productArray];
    const index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      setProductArray(array);
    }
  };

  return (
    <>
      <Modal
        title={"Create new order"}
        open={props.isOpen}
        footer={[
          <Button
            danger
            type="primary"
            key="cancel"
            onClick={() => props.setIsOpen(false)}
          >
            cancel
          </Button>,
          <Button
            onClick={() =>
              props.addPurchase({
                customerID: props.customer?.id,
                productIds: productArray,
              })
            }
            key="create"
          >
            create
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-2">
          {products?.map((product) => (
            <div key={product.id} className="flex justify-between w-1/2">
              <input type="text" readOnly value={product.name} />
              <div className="flex flex-row gap-2">
                <Button
                  onClick={() =>
                    setProductArray((productArray) => [
                      ...productArray,
                      product.id,
                    ])
                  }
                  size="small"
                >
                  Add
                </Button>
                <Button
                  onClick={() => removeId(product.id)}
                  danger
                  ghost
                  size="small"
                >
                  Remove
                </Button>
                <div>{productArray.filter((x) => x === product.id).length}</div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default Order;
