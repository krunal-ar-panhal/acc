import React from 'react';
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import { EmployeeChartData, EmployeeChartOptions } from "@/Data/Dashboard";
import { Line } from "react-chartjs-2";
import { Card, CardBody, Col } from "reactstrap";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

// Registering required components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const SalesStatus: React.FC = () => {
  // Define options with tooltip customization and x-axis configuration
  const options = {
    ...EmployeeChartOptions,
    scales: {
      x: {
        type: 'category',
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Example labels for months
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Sales'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems: any) {
            const dateLabel = tooltipItems[0].label; // e.g., "Jan"
            return `Sales Data for ${dateLabel}`;
          },
          label: function (tooltipItem: any) {
            // Customize label callback to show sales data
            return `Sales: ₹${tooltipItem.raw}`;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Col sm="12">
      <Card>
        <CommonCardHeader title="Order Count by Month" />
        <CardBody>
          {/* Only displaying Line chart */}
          <div className="order-graph xl-space">
            <div className="ct-4 flot-chart-container">
              <Line data={EmployeeChartData} options={options} />
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SalesStatus;
