import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import Datatable from "@/CommonComponents/DataTable";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchRequest } from "@/Redux/main/actions/actions";
import { order } from "@/Constants";
import { isPlainObject } from "@reduxjs/toolkit";
import { mapStatusToClass } from "@/Helper";
import Link from "next/link";

interface Order {
  id: string;
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  orderStatus: string;
  totalAmount: number;
}

const SalesOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const dispatch = useAppDispatch();
  const { entities } = useAppSelector((store) => store.rootReducer);
  const { data } = entities.order;
  

  useEffect(() => {
    dispatch(fetchRequest(order));
  }, [dispatch]);

  useEffect(() => {
    if (data != null && 'responseCode' in data && (data as { responseCode: number }).responseCode === 200) {
      const dataT = 'responseData' in data ? (data as { responseData: any[] }).responseData : [];
      if (isPlainObject(dataT) && 'listOrder' in dataT) {
        const oList = (dataT as { listOrder: any[] }).listOrder;
        setOrders(oList);
        console.log('Fetched Orders:', oList);
      }
    }
  }, [data]);




  const transformedOrders = orders.map(order => ({
    id: order.id,
    orderId:  (
      <Link href={`/en/sales/orders/${order.id}`}>
        {order.orderId}
      </Link>
    ),
    fullName: `${order.firstName} ${order.lastName}`,
    email: order.email,
    phoneNumber: order.phone_number,
    orderStatus: (
      <span className={`badge rounded-pill bg-${mapStatusToClass(order.orderStatus)} custom-badge`}>
        {order.orderStatus}
      </span>
    ),
    totalAmount: order.totalAmount,
  }));

  return (
    <Fragment>
      <CommonBreadcrumb title="Orders" parent="Sales" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader title="Manage Order" />
              <CardBody className="order-datatable">
                <Datatable
                  myData={transformedOrders}
                  myClass="-striped -highlight"
                  multiSelectOption={false}
                  pagination={true}
                  perPage={10}
                  edit={false}
                  deleteBtn={false}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SalesOrders;
