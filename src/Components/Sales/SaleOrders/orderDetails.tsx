import React, { Fragment, useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row, Table, Button, Media, CardTitle, CardText } from 'reactstrap';
import CommonBreadcrumb from '@/CommonComponents/CommonBreadcrumb';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { editRequest, fetchRequest } from '@/Redux/main/actions/actions';
import { ImagePath, order, order as orderConstant } from '@/Constants';
import { useRouter } from 'next/navigation';
import { mapStatusToClass } from '@/Helper';

// Define the types for Order and OrderDetail
interface OrderDetail {
  id: number;
  userId: number;
  createdAt: string;
  orderStatus: string;
  totalAmount: string;
  paymentMethod: string;
  shippingAddressId: string;
  shippingCost: string;
  estimatedDelivery: string;
  couponCode: string | null;
  discountAmount: string;
  orderNotes: string;
  trackingumber: string;
  orderId: string;
  orderIteams: Array<{
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    discountPrice: number;
    subTotal: string;
    title: string;
    sku: string;
    categoryId: number;
    status: string;
    summary: string;
    metaTitle: string;
    metaDescription: string;
    description: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    options: Array<{
      id: number;
      name: string;
      values: Array<string>;
    } | string>;
    attributes: Array<{
      id: number;
      name: string;
      values: string;
    }>;
    isNew: boolean;
    isFeatured: boolean;
    isSpecial: boolean;
    totalPrice: number;
    images_array: Array<{
      image_url: string;
      display_seq: number;
    }>;
  }>;
}
interface OrderDetailsProps {
  params: {
      id: string;
      lng: string;
  };
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ params }) => {
  const { id, lng } = params;
  const router = useRouter();
  // const { id } = params;
  const [orderDetail, setOrder] = useState<OrderDetail | null>(null);
  const dispatch = useAppDispatch();
  const { entities } = useAppSelector((store) => store.rootReducer);
  const { editData } = entities.order;

  useEffect(() => {
    if (id) {
      dispatch(editRequest(order,id));
    }
    console.log(id)
  }, [dispatch,id]);

  useEffect(() => {
    if (editData != null && 'responseCode' in editData && (editData as { responseCode: number }).responseCode === 200) {
      const dataT = 'responseData' in editData ? (editData as { responseData: OrderDetail }).responseData : null;
      if (dataT) {
        setOrder(dataT);
      }
    }
  }, [editData]);

  if (!orderDetail) {
    return <div>Loading...</div>;
  }

  return (

    <Fragment>
      <style>{`
  .custom-primery {
       background-color: #ff8084 !important;
    border-color: #ff8084 !important;
  }

  .custom-primery:hover{
    background-color: #ff4d53 !important;
    border-color: #ff4d53 !important;
}
`}</style>

      <CommonBreadcrumb title="Order Details" parent="Sales" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>

              <CardBody>
                <h2>Order Details</h2>
                <Button className="btn custom-primery pull-right" onClick={() => router.back()} >Back to Orders</Button>
                <Table className="table table-responsive-xs">
                  <tbody>
                    <tr>
                      <th>Order ID</th>
                      <td>{orderDetail.orderId}</td>
                    </tr>
                    <tr>
                      <th>Order Date</th>
                      <td>{new Date(orderDetail.createdAt).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td><span className={`badge rounded-pill bg-${mapStatusToClass(orderDetail.orderStatus)} custom-badge`}>{orderDetail.orderStatus}</span>
</td>
                    </tr>
                    <tr>
                      <th>Total Amount</th>
                      <td>${orderDetail.totalAmount}</td>
                    </tr>
                    <tr>
                      <th>Discount Amount</th>
                      <td>${orderDetail.discountAmount}</td>
                    </tr>
                    <tr>
                      <th>Payment Method</th>
                      <td>{orderDetail.paymentMethod}</td>
                    </tr>
                    <tr>
                      <th>Estimated Delivery</th>
                      <td>{new Date(orderDetail.estimatedDelivery).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <th>Order Notes</th>
                      <td>{orderDetail.orderNotes}</td>
                    </tr>
                    <tr>
                      <th>Tracking Number</th>
                      <td>{orderDetail.trackingumber}</td>
                    </tr>
                  </tbody>
                </Table>

              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm="12">
            <h3>Order Items</h3>
            {orderDetail.orderIteams.map((item,i) => (
            <Row className='mb-2'>
               <Col sm="12">
               <Card key={item.id} className="">
              <CardBody>
              <Row className="product-order-detail" key={i}>
                    <Col xs="3" >
                      <Media style={{height:100}} src={(item.images_array&&item.images_array[0].display_seq!=null?item.images_array[0].image_url:ImagePath+'/image.png')} alt={item.title}
                        className="img-fluid blur-up lazyload" />
                    </Col>
                    <Col xs="3" className="order_detail">
                    <CardTitle tag="h5">{item.title}</CardTitle>

                      <div>
                        {/* <h4>product detail</h4> */}
                        <p>{item.description}</p>
                      </div>
                      <div>
                      <strong>SKU:</strong> {item.sku}

                      </div>
                    </Col>

                    <Col xs="3" className="order_detail">
                    <CardText>
                      <strong>Quantity:</strong> {item.quantity}<br />
                      <strong>Price:</strong> ${item.price}<br />
                      <strong>Discount Price:</strong> ${item.discountPrice}<br />
                      <strong>SubTotal:</strong> ${item.subTotal}<br />
                    </CardText>
                  </Col>
                  <Col xs="3" className="order_detail">
                  <strong>Category:</strong> {item.categoryId}<br />

                  <strong>Attributes:</strong>
                      <ul>
                        {item.attributes&&item.attributes.map(attr => (
                          <li key={attr.id}>{attr.name}: {attr.values}</li>
                        ))}
                      </ul>
                      <strong>Options:</strong>
                      <ul>
                        {item.options&&item.options.map((opt,k) => (
                          <li key={k}>{typeof opt === 'string' ? JSON.parse(opt).name : opt.name}: {typeof opt === 'string' ? JSON.parse(opt).values.join(', ') : opt.values.join(', ')}</li>
                        ))}
                      </ul>

                  </Col>
                </Row>
              </CardBody>
            </Card>
               </Col>
            </Row>
          ))}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default OrderDetails;
