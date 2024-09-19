"use client";
import OrderDetails from "@/Components/Sales/SaleOrders/orderDetails";
interface SaleOrdersDetailContainerProps {
  params: {
      id: string;
      lng: string;
  };
}

const SaleOrdersDetailContainer :React.FC<SaleOrdersDetailContainerProps> = ({ params }) => {

  return <OrderDetails params={params}/>;
};

export default SaleOrdersDetailContainer;
