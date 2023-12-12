import React, { useState } from "react";
import HOC from "../../layout/HOC";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

function SalesAnlysis() {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  const [category, setCategory] = useState({
    series: [42, 47, 52, 58, 65],
    options: {
      chart: {
        width: 380,
        type: "polarArea",
      },
      labels: ["Rose A", "Rose B", "Rose C", "Rose D", "Rose E"],
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: "bottom",
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: "light",
          shadeIntensity: 0.6,
        },
      },
    },
  });

  const [month, setMonth] = useState({
    series: [
      {
        name: "Website Blog",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      },
      {
        name: "Social Media",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: "Traffic Sources",
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: [
        "01 Jan 2001",
        "02 Jan 2001",
        "03 Jan 2001",
        "04 Jan 2001",
        "05 Jan 2001",
        "06 Jan 2001",
        "07 Jan 2001",
        "08 Jan 2001",
        "09 Jan 2001",
        "10 Jan 2001",
        "11 Jan 2001",
        "12 Jan 2001",
      ],
      xaxis: {
        type: "datetime",
      },
      yaxis: [
        {
          title: {
            text: "Website Blog",
          },
        },
        {
          opposite: true,
          title: {
            text: "Social Media",
          },
        },
      ],
    },
  });

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
          <ReactApexChart
            options={category.options}
            series={category.series}
            type="polarArea"
            width={380}
          />
        </div>
        <div style={{ margin: "20px" }}>
          <ReactApexChart
            options={month.options}
            series={month.series}
            type="line"
            height={350}
            width={500}
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
