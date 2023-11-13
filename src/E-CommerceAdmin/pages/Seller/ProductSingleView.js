/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
const ProductSingleView = () => {
  const { id } = useParams();

  //api calling
  const [product, setProduct] = useState("");
  const getProducts = async () => {
    console.log("ls", localStorage.getItem("boon"));
    let url = `${BaseUrl()}api/v1/product/single/${id}`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("boon")}`,
        },
      });
      setProduct(res.data.product);
      console.log(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <p className="headP">
        {" "}
        <Link to="/dashboard">Dashboard</Link> /{" "}
        <Link to="/Product">Products</Link> / {product.name}{" "}
      </p>

      <section className="sectionCont">
        <div className="Detail_Section">
          <div className="Left_Cont">
            <img src={product?.images?.[0]} alt="" />
          </div>
          <div className="right_Cont">
            <p className="Head">{product.name}</p>
            <p className="Rating">
              <Badge bg="success"> {product.ratings}</Badge>{" "}
              <span className="rat">{product.ratings}</span>{" "}
            </p>
            <p>
              {" "}
              <Badge bg="success">{product.discountPercent}% off</Badge>{" "}
            </p>
            <p>
              {" "}
              <Badge>{product.stock}</Badge>{" "}
            </p>

            <div className="two_Sec">
              <p className="first">
                {" "}
                <i className="fa-solid fa-indian-rupee-sign"></i>
                {product.price}{" "}
              </p>
              <p className="second">
                {" "}
                <i className="fa-solid fa-indian-rupee-sign"></i>
                {product.price + product.discountAmount}{" "}
              </p>
            </div>

            <ul>
              {product?.features?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="two_Sec" style={{ alignItems: "flex-start" }}>
              <p>
                {" "}
                <strong>Description</strong>{" "}
              </p>{" "}
              : <p>{product.description}</p>
            </div>
            <div className="two_Sec" style={{ alignItems: "flex-start" }}>
              <p>
                {" "}
                <strong>Color</strong> :
              </p>{" "}
              {product?.color?.map((item, i) => (
                <span>{item.color} </span>
              ))}
            </div>
            {/* <div className="two_Sec" style={{ alignItems: "flex-start" }}>
              <p>
                {" "}
                <strong>Seller Name</strong> :
              </p>{" "}
              <p>Seller Name</p>
            </div> */}
            <div className="two_Sec" style={{ alignItems: "flex-start" }}>
              <p>
                <strong>Brand Name</strong> :
              </p>{" "}
              <p>{product.brand}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(ProductSingleView);
