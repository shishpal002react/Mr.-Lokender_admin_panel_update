/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import { Badge } from "react-bootstrap";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
const ViewProduct = () => {
  const { id } = useParams();

     //api calling
     const [product, setProduct] = useState("");
     const getProducts = async() => {
       console.log("ls",(localStorage.getItem("boon")))
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
         console.log(error)
       }
     }
  
     useEffect(() => {  
       getProducts();    
     }, []);



  return (
    <>
      <p className="headP"> <Link to='/dashboard' >Dashboard</Link>  / <Link to='/Product' >Products</Link> / {product.name} </p>
 

      <section className="sectionCont">
        <div className="Detail_Section">
          <div className="Left_Cont">
            <img
              src={product?.images?.[0]}
              alt=""
            />
          </div>
          <div className="right_Cont">
            <p className="Head">
            {product.name} (Racing Silver, 128 GB) (6 GB RAM)
            </p>
            <p className="Rating">
              <Badge bg="success"> 4.3</Badge>{" "}
              <span className='rat'>77,509 Ratings & 6,081 Reviews</span>{" "}
            </p>
            <p> <Badge bg='success' >26% off</Badge> </p>
            <p> <Badge>10 in Stock</Badge> </p>

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
              <li> 6 GB RAM | 128 GB ROM | Expandable Upto 256 GB</li>
              <li>16.51 cm (6.5 inch) Full HD+ Display</li>
              <li>48MP + 2MP + 2MP | 16MP Front Camera</li>
              <li>5000 mAh Battery</li>
              <li>MediaTek Helio G95 Processor</li>
              <li>30W Charger</li>
            </ul>

            <div className="two_Sec" style={{alignItems : 'flex-start'}}>
              <p> <strong>Description</strong> </p> :{" "}
              <p>
                With the realme Narzo 30, make your mobile gaming experience
                smooth, lag-free, and immersive. This smartphone runs on the
                Helio G95 Gaming Processor for intense gaming, a 90 Hz
                Ultra-smooth Display for smooth scrolling, and a 5000 mAh
                Massive Battery for hours of gaming marathons
              </p>
            </div>
            <div className="two_Sec" style={{alignItems : 'flex-start'}}>
              <p> <strong>Color</strong> :</p> <p>Red , Black</p>
            </div>
     
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(ViewProduct);
