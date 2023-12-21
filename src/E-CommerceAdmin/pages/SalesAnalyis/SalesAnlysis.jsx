import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
// import BaseUrl from "./../../../BaseUrl";
import { toast } from "react-toastify";

function SalesAnlysis() {
  const [salesByYearData, setSalesByYearData] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);

  //  api calling
  const BaseUrl = "https://lokender-backend-api.vercel.app/";
  const salesByYear = async () => {
    try {
      const res = await axios.get(`${BaseUrl}api/v1/sales`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res?.data?.salesByYear;
      setSalesByYearData(res?.data?.salesByYear);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    }
  };

  useEffect(() => {
    if (salesByYearData && salesByYearData.length > 0) {
      salesByYearData.forEach((item) => {
        const isAlreadyPresent = years.some((year) => year === item._id);
        if (!isAlreadyPresent) {
          setYears((prev) => [...prev, item._id]);
        }

        const isMonth = months.some((year) => year === item.totalSales);
        if (!isMonth) {
          setMonths((prev) => [...prev, item.totalSales]);
        }
      });
    }
  }, [salesByYearData, years, months]);

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: years,
      },
    },
    series: [
      {
        name: "series-1",
        data: months,
      },
    ],
  };

  const [sales, setsales] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "dec",
        ],
      },
    },
  });

  useEffect(() => {
    salesByYear();
  }, []);

  return (
    <>
      <h4>Sales Details</h4>
      <div
        style={{
          display: "flex",
          width: "90%",
          margin: "auto",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          margin: "10px 0 10px",
        }}
      >
        <div>
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="500"
          />
        </div>
        <div>
          {" "}
          <ReactApexChart
            options={sales.options}
            series={sales.series}
            type="line"
            height={350}
            width={350}
          />
        </div>
      </div>
    </>
  );
}

export default HOC(SalesAnlysis);
