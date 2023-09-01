import { type Purchase } from "../types/purchase";
import { Button, Table } from "antd";
import PurchaseFethcer from "../services/order";
import React from "react";

const Order = () => {
  const { postPurchase, getPurchase, deletePurchase } = PurchaseFethcer();
  const [purchases, setpurchases] = React.useState<Purchase[]>([]);

  React.useEffect(() => {
    getPurchase<Purchase[]>({ url: "/purchase.php" }).then((purchases) =>
      setpurchases(purchases)
    );
  }, [getPurchase]);

  const columns = [
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
  ];

  type flatOrder = {
    id: number;
    productId: number;
    productName: string;
    productPrice: number;
  };

  const flattenedOrder: flatOrder[] | undefined = purchases?.flatMap((item) =>
    item.products.map((product) => ({
      id: item.id,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
    }))
  );

  const productsWithKey = flattenedOrder
    ? flattenedOrder.map((order) => ({
        ...order,
        key: order.id.toString(),
      }))
    : null;

  const addOrder = (purchase: Purchase) => {
    postPurchase<Purchase>({ url: "/purchase.php", data: purchase });
  };

  const deleteOrder = (id: number) => {
    deletePurchase<number>({ url: "/purchase.php", data: id });
  };

  return (
    <div>
      {productsWithKey && (
        <div className="w-full p-5">
          <div className="flex flex-row justify-between mx-5">
            <h2 className="text-2xl">Orders</h2>
            <Button className="w-40">Add Order</Button>
          </div>
          <Table dataSource={productsWithKey} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default Order;
