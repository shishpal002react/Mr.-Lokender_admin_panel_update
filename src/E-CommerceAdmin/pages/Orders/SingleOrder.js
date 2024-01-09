/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import { Badge } from "react-bootstrap";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "react-bootstrap/Carousel";
import { ImCross } from "react-icons/im";

const SingleOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState("");

  const OrderData = async () => {
    let url = `${BaseUrl()}api/v1/order/6545fd32655d067c24399337`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      //please check again
      setOrder(res?.data?.order);
      console.log(res?.data?.order, "single order data");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    OrderData();
  }, []);

  return (
    <>
      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <p className="headP">
          {" "}
          <Link to="/dashboard">Dashboard</Link> /{" "}
          <Link to="/Orders">Order</Link>/Single Product
        </p>
      </div>
      <div
        style={{
          width: "70%",
        }}
      >
        {order?.products?.map((item, i) => (
          <div style={{ display: "flex", marginTop: "1rem" }} key={i}>
            <div style={{ backgroundColor: "red", width: "50%" }}>
              <img src="imgae" alt="image is not present" />
            </div>
            <div style={{ backgroundColor: "green", marginLeft: "2rem" }}>
              fhfgh
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HOC(SingleOrder);
