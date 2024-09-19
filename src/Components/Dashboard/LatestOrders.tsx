import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import { Button, Card, CardBody, Col, Table, Row } from "reactstrap";

const mockOrders = [
  { id: 1, total: 120, paymentMethod: "Bank Transfers", status: "On Way" },
  { id: 2, total: 90, paymentMethod: "Ewallets", status: "Delivered" },
  { id: 3, total: 240, paymentMethod: "Cash", status: "Delivered" },
  { id: 4, total: 6523, paymentMethod: "Direct Deposit", status: "Delivered" },
  { id: 5, total: 50, paymentMethod: "Bank Transfers", status: "Delivered" },
  { id: 6, total: 180, paymentMethod: "Credit Card", status: "On Way" },
  { id: 7, total: 300, paymentMethod: "Ewallets", status: "Delivered" },
  { id: 8, total: 450, paymentMethod: "Cash", status: "On Way" },
  { id: 9, total: 200, paymentMethod: "Bank Transfers", status: "Delivered" },
  { id: 10, total: 95, paymentMethod: "Direct Deposit", status: "Delivered" },
];

const topSellingProducts = [
  { name: "Product A", sales: 200 },
  { name: "Product B", sales: 180 },
  { name: "Product C", sales: 150 },
];

const lowStockProducts = [
  { name: "Product A", stock: 5 },
  { name: "Product B", stock: 3 },
  { name: "Product C", stock: 2 },
];

// Top 3 discount codes with usage
const discountCodeUsage = [
  { code: "SAVE10", usage: 25 },
  { code: "NEWUSER", usage: 15 },
  { code: "SUMMER50", usage: 10 },
];

const returnRateByProduct = [
  { product: "Product A", returnRate: "5%" },
  { product: "Product B", returnRate: "2%" },
  { product: "Product C", returnRate: "8%" },
];

const LatestOrders = () => {
  return (
    <Row>
      {/* Table for Top 10 Orders */}
      <Col xl="6">
        <Card>
          <CommonCardHeader title="Top 10 Orders" />
          <CardBody>
            <div className="user-status table-responsive latest-order-table">
              <Table bordered>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Order Total</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders
                    .sort((a, b) => b.total - a.total)
                    .slice(0, 10)
                    .map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td className="digits">${order.total.toFixed(2)}</td>
                        <td>{order.paymentMethod}</td>
                        <td>{order.status}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* Table for Top-Selling Products */}
      <Col xl="6">
        <Card>
          <CommonCardHeader title="Top-Selling Products" />
          <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Sales</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.sales}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>

      {/* Table for Low Stock Products */}
      <Col xl="6">
        <Card>
          <CommonCardHeader title="Low Stock Alert" />
          <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Stock Remaining</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>

      {/* Discount Code Usage */}
      <Col xl="6">
        <Card>
          <CommonCardHeader title="Top 3 Discount Codes Used" />
          <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>Discount Code</th>
                  <th>Times Used</th>
                </tr>
              </thead>
              <tbody>
                {discountCodeUsage.map((codeData, index) => (
                  <tr key={index}>
                    <td>{codeData.code}</td>
                    <td>{codeData.usage}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>

      {/* Table for Return Rate by Product */}
      <Col xl="6">
        <Card>
          <CommonCardHeader title="Return Rate by Product" />
          <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Return Rate</th>
                </tr>
              </thead>
              <tbody>
                {returnRateByProduct.map((product, index) => (
                  <tr key={index}>
                    <td>{product.product}</td>
                    <td>{product.returnRate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>

      {/* <Col xl="12">
        <Button color="primary" className="mt-3">View All Orders</Button>
      </Col> */}
    </Row>
  );
};

export default LatestOrders;
