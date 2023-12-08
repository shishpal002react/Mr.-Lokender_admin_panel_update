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

const ViewProduct = () => {
  const { id } = useParams();
  // console.log("id is work", name);
  const [modalShow, setModalShow] = React.useState(false);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  // post request
  function MyVerticallyCenteredModalEdit(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [images, setImages] = useState();
    const [price, setPrice] = useState();
    const [features, setFeatures] = useState();
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [stock, setStock] = useState();
    const [brand, setBrand] = useState();
    const [simType, setSimType] = useState();
    const [mrp, setMrp] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
      if (props.show === true) {
        setName(product.name);
        setDescription(product.description);
        setColor(product.color);
        setImages(product.images);
        setPrice(product.price);
        setFeatures(product.features);
        setStock(product.stock);
        setBrand(product.brand);
        setSimType(product.simType);
        setMrp(product.mrp);
        setOfferPrice(product.offerPrice);
        setCategoryId(product?.category?._id);
        setSubCategoryId(product?.subCategory?._id);
      }
    }, [props]);

    const postData = async (e) => {
      e.preventDefault();

      const formdata = new FormData();
      formdata.append("image", images);
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("features", features);
      formdata.append("color", color);
      formdata.append("price", price);
      formdata.append("category", categoryId);
      formdata.append("subCategory", subCategoryId);
      formdata.append("stock", stock);
      formdata.append("brand", brand);
      formdata.append("mrp", mrp);
      formdata.append("offerPrice", offerPrice);
      formdata.append("simType", simType);

      console.log("ls", localStorage.getItem("token"));
      let url = `${BaseUrl()}api/v1/product/${id}`;
      try {
        const res = await axios.put(url, formdata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Product is create successfully", res.data);
        toast("Edit product is successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        setModalShow(false);
        getProducts();
      } catch (error) {
        console.log(error);
      }
    };

    //category data
    const categoryData = async () => {
      let url = `${BaseUrl()}api/v1/admin/allCategory`;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        //please check again
        setData1(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if (props.show === true) {
        categoryData();
        setName(product.name);
      }
    }, [props]);

    //category data
    const subCategoryData = async () => {
      let url = `${BaseUrl()}api/v1/admin/allSubCategory`;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        //please check again
        setData2(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if (props.show === true) {
        subCategoryData();
      }
    }, [props]);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {"Edit product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product MRP</Form.Label>
              <Form.Control
                type="text"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Selling Price</Form.Label>
              <Form.Control
                type="text"
                value={offerPrice}
                s
                onChange={(e) => setOfferPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Color</Form.Label>
              <Form.Control
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>
            {/* category id */}
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option>Select Category</option>
              {data1 &&
                data1?.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
            </Form.Select>
            {/* subcategory */}
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setSubCategoryId(e.target.value)}
            >
              <option>Select subCategory</option>
              {data2 &&
                data2?.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Feature</Form.Label>
              <Form.Control
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImages(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Stock</Form.Label>
              <Form.Control
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product sim Type</Form.Label>
              <Form.Control
                type="text"
                value={simType}
                onChange={(e) => setSimType(e.target.value)}
              />
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#19376d",
                borderRadius: "0",
                border: "1px solid #19376d",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  //api calling
  const [product, setProduct] = useState("");
  const getProducts = async () => {
    console.log("ls golu", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/product/single/${id}`;
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
      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <p className="headP">
          {" "}
          <Link to="/dashboard">Dashboard</Link> /{" "}
          <Link to="/Product">Products</Link> / {product.name}{" "}
        </p>
        <button
          onClick={() => {
            // setEdit(false);
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          Edit Product
        </button>
      </div>

      <div style={{ width: "70%", margin: "auto", marginTop: "20px" }}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {product?.images?.map((item, i) => (
            <Carousel.Item>
              <img src={item} alt="no"></img>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <section className="sectionCont">
        <div className="Detail_Section">
          {/* <div className="Left_Cont"></div> */}
          {/* <div className="right_Cont"> */}
          <div style={{ width: "70%", margin: "auto", marginTop: "20px" }}>
            <p className="Head">
              {product.name}
              {/* (Racing Silver, 128 GB) (6 GB RAM) */}
            </p>
            <p className="Rating">
              <strong>Rating</strong>
              <Badge bg="success"> {product.ratings}</Badge>{" "}
            </p>
            <p>
              <strong>Discount</strong>{" "}
              <Badge bg="success">{product.discountPercent}off</Badge>{" "}
            </p>
            <p>
              <strong>Stock</strong> <Badge>{product.stock}</Badge>{" "}
            </p>

            <p>
              <strong>Product MRP</strong>
              {"    "}
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {product?.mrp}
            </p>

            {/* <p>
              <strong>Offer MRP</strong>
              {"    "}
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {product.offerPrice}
            </p> */}

            <div className="two_Sec">
              <p className="first">
                {" "}
                <i className="fa-solid fa-indian-rupee-sign"></i>
                {product.offerPrice}{" "}
              </p>
              <p className="second">
                {" "}
                <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                {/* {product.price + product.discountAmount}{" "} */}
                {product.price}
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
              :{" "}
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                {product?.description}
              </p>
            </div>
            <div className="two_Sec" style={{ alignItems: "flex-start" }}>
              <p>
                {" "}
                <strong>Color :</strong>
              </p>{" "}
              <span>
                {console.log("color value", product?.color)}
                {product?.color?.map((i) => (
                  <spam>{i}, </spam>
                ))}
              </span>
            </div>
          </div>
        </div>
      </section>
      <MyVerticallyCenteredModalEdit
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ToastContainer />
    </>
  );
};

export default HOC(ViewProduct);
