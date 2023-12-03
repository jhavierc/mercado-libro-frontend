import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";
import StackedAreaChart from "../Charts/StackedAreaChart";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DoughnutSegmentedChart from "../Charts/DoughnutSegmentedChart";
import StatCard from "../Charts/StatCard";
import { Navigate } from "react-router-dom";
import useDashboardData from "./DataDashboard/useDashboardData";
import { useAppSelector } from "../../context/hooks";
import {
  inventoryData,
  mockDataDonut,
  months,
  paymentTypeData,
  salesDataLine,
} from "./DataDashboard/mockData";
import useSalesData from "./DataDashboard/useSalesData";
import { useEffect, useState } from "react";
import { DoughnutData } from "../../types/salesData";

const dataBar = {
  labels: ["Tipo de pago"],
  datasets: [
    {
      label: "Tarjeta de crédito",
      data: [
        paymentTypeData.content.find(
          (item) => item.payment_type === "Tarjeta de crédito"
        )?.sales || 0,
      ],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Transferencia bancaria",
      data: [
        paymentTypeData.content.find(
          (item) => item.payment_type === "Transferencia bancaria"
        )?.sales || 0,
      ],
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    },
  ],
};

const dataLine = {
  labels: salesDataLine.content.map(
    (item) => `${months[item.month - 1]} ${item.year}`
  ),
  datasets: [
    {
      label: "Ventas",
      data: salesDataLine.content.map((item) => item.sales),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 5,
      pointHoverRadius: 8,
      fill: false,
    },
    {
      label: "Inventario",
      data: inventoryData.content.map((item) => item.inventory),
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      pointRadius: 5,
      pointHoverRadius: 8,
      fill: false,
    },
  ],
};
const dataAreas = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Ventas",
      data: [65, 59, 80, 81, 56],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "Inventario",
      data: [28, 48, 40, 19, 86],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

// const dataForDoughnut = {
//   labels: salesDataDonut.map((item) => item.category_name),
//   datasets: [
//     {
//       data: salesDataDonut.map((item) => item.sales),
//       backgroundColor: [
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(255, 99, 132, 0.5)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(75, 192, 192, 0.5)",
//       ],
//       borderColor: [
//         "rgba(75, 192, 192, 1)",
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//         "rgba(255, 99, 132, 1)",
//         "rgba(75, 192, 192, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

const chartSize = "500px";

const ChartDashboard = () => {
  const { totalUsers, totalBooks, totalCategories, totalSales } =
    useDashboardData();
  const { name, lastName } = useAppSelector((state) => state.user);

  const salesDataDonut = useSalesData();
  const [dataForDoughnut, setDataForDoughnut] = useState<DoughnutData>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (salesDataDonut) {
      const filteredSalesData = salesDataDonut.filter(
        (item) => item.sales !== undefined && item.category_name !== undefined
      );

      setDataForDoughnut({
        labels: filteredSalesData.map((item) => item.category_name!),
        datasets: [
          {
            data: filteredSalesData.map((item) => item.sales!),
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(75, 192, 192, 0.5)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [salesDataDonut]);
  const date = new Date();
  const isAdmin = localStorage.getItem("isLoggedAdmin") === "true";

  if (!isAdmin) {
    return <Navigate to="*" />;
  }

  const exportToPDF = async () => {
    const dashboardElement = document.getElementById(
      "dashboard"
    ) as HTMLElement;

    if (dashboardElement) {
      const charts = Array.from(
        dashboardElement.querySelectorAll(".chart") as NodeListOf<HTMLElement>
      );
      const originalSizes = charts.map((chart) => {
        const originalSize = {
          width: chart.style.width,
          height: chart.style.height,
        };
        chart.style.width = "400px";
        chart.style.height = "300px";
        return originalSize;
      });

      dashboardElement.style.width = "1920px";
      dashboardElement.style.height = "auto";
      dashboardElement.style.overflow = "visible";

      const canvas = await html2canvas(dashboardElement, {
        scale: 1,
        useCORS: true,
      });

      charts.forEach((chart, index) => {
        chart.style.width = originalSizes[index].width;
        chart.style.height = originalSizes[index].height;
      });

      dashboardElement.style.width = "";
      dashboardElement.style.height = "";
      dashboardElement.style.overflow = "";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "letter",
      });

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );

      charts.forEach((chart, index) => {
        chart.style.width = originalSizes[index].width;
        chart.style.height = originalSizes[index].height;
      });

      const date = new Date();
      const dateString = date.toISOString().replace(/[:.]/g, "-");

      pdf.save(`Dashboard-${dateString}.pdf`);
    }
  };

  return (
    <>
      <div id="dashboard">
        <Flex direction="column">
          <Box p={{ base: 3, md: 5 }} pt={{ base: 20, md: 40 }}>
            <Text
              fontSize={{ base: "xl", md: "3xl" }}
              fontWeight="bold"
              textAlign="center"
            >
              Información general Mercado Libro
            </Text>
            <SimpleGrid
              pt={5}
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={5}
              mb={5}
            >
              <StatCard
                title="Usuarios"
                value={totalUsers}
                max={totalUsers + 100}
              />
              <StatCard
                title="Libros"
                value={totalBooks}
                max={totalBooks + 100}
              />
              <StatCard
                title="Categorias"
                value={totalCategories}
                max={totalCategories + 100}
              />
              <StatCard
                title="Ventas"
                value={totalSales}
                max={totalSales + 100}
              />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={5} mb={5}>
              <Box
                p={5}
                boxShadow="xl"
                borderRadius="lg"
                h={chartSize}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <DoughnutSegmentedChart data={dataForDoughnut} />
              </Box>
              <Box
                p={5}
                boxShadow="xl"
                borderRadius="lg"
                h={chartSize}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <LineChart data={dataLine} />
              </Box>
              <Box
                p={5}
                boxShadow="xl"
                borderRadius="lg"
                h={chartSize}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <BarChart data={dataBar} />
              </Box>
              <Box
                p={5}
                boxShadow="xl"
                borderRadius="lg"
                h={chartSize}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StackedAreaChart data={dataAreas} />
              </Box>
            </SimpleGrid>
            <Box width="100%" p="2">
              <Text fontSize="sm">Usuario actual: {name + " " + lastName}</Text>
              <Text fontSize="sm">
                Fecha y hora actual: {date.toLocaleDateString()}{" "}
                {date.toLocaleTimeString()}
              </Text>
            </Box>
          </Box>
        </Flex>
      </div>
      <Button
        onClick={exportToPDF}
        colorScheme="blue"
        size={{ base: "sm", md: "md", lg: "lg" }}
        m={5}
      >
        Exportar a PDF
      </Button>
    </>
  );
};

export default ChartDashboard;
