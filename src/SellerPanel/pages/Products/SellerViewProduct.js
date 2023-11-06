/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import { Badge } from "react-bootstrap";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
const ViewProduct = () => {
  const { name } = useParams();
  console.log("id is work", name);

  //api calling
  const [product, setProduct] = useState("");
  const getProducts = async () => {
    console.log("ls golu", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/product/single/${name}`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            <p className="Head">
              {product.name} (Racing Silver, 128 GB) (6 GB RAM)
            </p>
            <p className="Rating">
              <Badge bg="success"> {product.rating} </Badge>{" "}
              <span className="rat">77,509 Ratings & 6,081 Reviews</span>{" "}
            </p>
            <p>
              {" "}
              <Badge bg="success">26% off</Badge>{" "}
            </p>
            <p>
              {" "}
              <Badge>10 in Stock</Badge>{" "}
            </p>

            <div className="two_Sec">
              <p className="first">
                {" "}
                <i className="fa-solid fa-indian-rupee-sign"></i>12,499{" "}
              </p>
              <p className="second">
                {" "}
                <i className="fa-solid fa-indian-rupee-sign"></i> 16,488{" "}
              </p>
            </div>

            <ul>
              {product?.features?.map((i) => (
                <li>{i}</li>
              ))}
            </ul>

            <div className="two_Sec" style={{ alignItems: "flex-start" }}>
              <p>
                {" "}
                <strong>Description</strong>
              </p>{" "}
              : <p>{product.description}</p>
            </div>
            <div className="two_Sec" style={{ alignItems: "flex-start" }}>
              <p>
                {" "}
                <strong>Color</strong> :
              </p>{" "}
              <p>
                {console.log("color value", product?.color)}
                {product?.color?.map((i) => (
                  <spam>{i}, </spam>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(ViewProduct);
