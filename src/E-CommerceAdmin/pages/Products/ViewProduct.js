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

const ViewProduct = () => {
  const { id } = useParams();
  const [modalShow, setModalShow] = React.useState(false);
  const [index, setIndex] = useState(0);

  // post request
  function MyVerticallyCenteredModalEdit(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [image, setImages] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");

    const [brand, setBrand] = useState();
    const [mrp, setMrp] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    //multiple product details
    // const [sizePriceSize, setPriceSize] = useState("");
    // const [sizePriceStock, setPriceStock] = useState("");
    // const [sizePrice, setSizePrice] = useState([]);
    //color and image
    const [productImage, setProductImage] = useState("");
    const [productName, setProductName] = useState("");
    //features
    const [features, setFeatures] = useState("");
    const [featureArray, setFeatureArray] = useState([]);

    const featureArrayFunction = () => {
      setFeatureArray((prev) => [...prev, features]);
      setFeatures("");
    };

    const multiple_Product_color_name = async () => {
      let url = `${BaseUrl()}api/v1/color/${id}`;
      const formdata = new FormData();
      formdata.append("name", productName);
      // formdata.append("image", productImage);
      Array.from(productImage).forEach((img) => {
        formdata.append("images", img);
      });
      try {
        const res = await axios.post(url, formdata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProductName("");
        getProducts();
      } catch (error) {
        console.log(error);
      }
    };

    // const multiple_adder = () => {
    //   setSizePrice((prev) => [...prev, { sizePriceSize, sizePriceStock }]);
    //   setPriceSize("");
    //   setPriceStock("");
    // };

    const upload_image = async () => {
      let url = `${BaseUrl()}api/v1/add/image/${id}`;
      const formdata = new FormData();
      formdata.append("image", image);
      try {
        const res = await axios.post(url, formdata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        getProducts();
        setImages("");
      } catch (error) {
        console.log(error);
      }
    };

    const postData = async (e) => {
      e.preventDefault();

      const formdata = new FormData();

      formdata.append("name", name);
      formdata.append("description", description);

      formdata.append("price", price);
      formdata.append("category", categoryId);
      formdata.append("subCategory", subCategoryId);

      formdata.append("brand", brand);
      formdata.append("mrp", mrp);
      formdata.append("offerPrice", offerPrice);

      // Array.from(image).forEach((img) => {
      //   formdata.append("image", img);
      // });

      featureArray.forEach((item, i) => {
        formdata.append(`features[${i}]`, item);
      });

      // sizePrice.forEach((item, i) => {
      //   formdata.append(`sizePrice[${i}][size]`, item.sizePriceSize);
      //   formdata.append(`sizePrice[${i}][stock]`, item.sizePriceStock);
      // });

      // productArray.forEach((item, i) => {
      //   formdata.append(`colors[${i}][name]`, item.productName);
      //   formdata.append(`colors[${i}][image]`, item.productImageUrl);
      // });

      console.log("ls", localStorage.getItem("token"));
      let url = `${BaseUrl()}api/v1/product/${id}`;
      try {
        const res = await axios.put(url, formdata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

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

    //subcategory data
    const subCategoryData = async () => {
      let url = `${BaseUrl()}api/v1/admin/subcategories/${categoryId}`;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        //please check again
        setData2(res.data.subcategories);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      subCategoryData();
    }, [categoryId]);

    useEffect(() => {
      if (props.show === true) {
        setName(product.name);
        setDescription(product.description);
        setImages(product.images?.[0]);
        setPrice(product.price);
        setFeatures("");
        setBrand(product.brand);
        setMrp(product.mrp);
        setOfferPrice(product.offerPrice);
        setCategoryId(product?.category?._id);
        setSubCategoryId(product?.subCategory?._id);
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
            {"Edit Product "}
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
            {/*  */}
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
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Product Size and Stock </Form.Label>
              <Form.Control
                type="text"
                value={sizePriceSize}
                style={{ marginTop: "10px", marginBottom: "10px" }}
                placeholder="Product Size ..."
                onChange={(e) => setPriceSize(e.target.value)}
              />

              <Form.Control
                type="text"
                placeholder="Product Stock ..."
                value={sizePriceStock}
                onChange={(e) => setPriceStock(e.target.value)}
              />

              <Button
                variant="dark"
                style={{ marginTop: "10px" }}
                type="button"
                onClick={() => multiple_adder()}
              >
                Add
              </Button>
            </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label>Color Image and Name</Form.Label>
              <Form.Control
                type="file"
                placeholder="Product Image ..."
                onChange={(e) => setProductImage(e.target.files)}
                multiple
              />
              <Form.Control
                type="text"
                value={productName}
                style={{ marginTop: "10px" }}
                placeholder="Product Color Name ..."
                onChange={(e) => setProductName(e.target.value)}
              />

              <Button
                variant="dark"
                style={{ marginTop: "10px" }}
                type="button"
                onClick={() => multiple_Product_color_name()}
              >
                Add
              </Button>
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
              <Form.Label>Product Feature</Form.Label>
              <Form.Control
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
              />

              <Button
                variant="dark"
                style={{ marginTop: "10px" }}
                type="button"
                onClick={() => featureArrayFunction()}
              >
                Add
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImages(e.target.files[0])}
              />
              <Button
                variant="dark"
                style={{ marginTop: "10px" }}
                type="button"
                onClick={() => upload_image()}
              >
                Add
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
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

  //delete api images
  const handleDeleteImage = async (imageId) => {
    console.log(id);
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/delete/product/${id}/image/${imageId}`;
    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast("Image Delete successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  //delete api color and image
  const handleDeleteImageandColor = async (imageId) => {
    console.log(id);
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/delete/product/${id}/color/${imageId}`;
    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast("Color and Name Delete successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

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

      {/* <div style={{ width: "70%", margin: "auto", marginTop: "20px" }}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {product?.images?.map((item, i) => (
            <Carousel.Item>
              <img src={item} alt="no"></img>
            </Carousel.Item>
          ))}
        </Carousel>
      </div> */}
      <div
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "20px",
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {product?.images?.map((item, i) => (
          <div
            style={{
              height: "100%",
              width: "40%",
              margin: "20px",
            }}
          >
            <ImCross
              style={{
                paddingTop: "10px",
                paddingRights: "10px",
                cursor: "pointer",
                fontSize: "20px",
              }}
              onClick={() => handleDeleteImage(item._id)}
            />
            <img
              style={{
                backgroundImage: "cover",
                padding: "10px",
                height: "100%",
                width: "100%",
              }}
              src={item?.image}
              alt="no"
            ></img>
          </div>
        ))}
      </div>

      <section className="sectionCont">
        <div className="Detail_Section">
          {/* <div className="Left_Cont"></div> */}
          {/* <div className="right_Cont"> */}
          <div style={{ width: "70%", margin: "auto", marginTop: "20px" }}>
            <p className="Head">
              <strong> Product name </strong>:{product.name}
              {/* (Racing Silver, 128 GB) (6 GB RAM) */}
            </p>
            <p className="Rating">
              <strong>Rating</strong>
              <Badge bg="success"> {product.ratings}</Badge>{" "}
            </p>
            <p>
              <strong>Discount</strong>{" "}
              <Badge bg="success">{product.discountPercent} off</Badge>{" "}
            </p>
            {/* <p>
              <strong>Stock</strong> <Badge>{product.stock}</Badge>{" "}
            </p> */}

            <div>
              {product?.colors?.length > 0 && (
                <div className="product_image_size_parent">
                  <p>Color : </p>
                  {product?.colors?.map((item) => (
                    <div
                      style={{
                        width: "150px",

                        margin: "15px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        <ImCross
                          style={{
                            position: "relative",
                            paddingTop: "10px",
                            paddingRights: "10px",
                            cursor: "pointer",
                            fontSize: "20px",
                            left: "0",
                          }}
                          onClick={() => handleDeleteImageandColor(item._id)}
                        />
                        {item?.images?.map((pics, i) => (
                          <img
                            key={i}
                            src={pics}
                            alt=""
                            style={{
                              objectFit: "cover",
                              padding: "10px",
                              width: "400px",
                              marginLeft: "1rem",
                            }}
                          />
                        ))}
                      </div>
                      <p>{item?.name}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="product_image_size_parent">
                <p>Sizes : </p>
                {product?.sizePrice?.map((item) => (
                  <div
                    style={{
                      width: "100px",
                      height: "50px",
                      margin: "15px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <p>Size : {item?.size}</p>
                    <p>Stock :{item?.stock}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p>
                <strong>Product MRP</strong>
                {"    "}
                <i className="fa-solid fa-indian-rupee-sign"></i>
                {product?.mrp}
              </p>
            </div>

            <div className="two_Sec">
              <p className="first">
                {" "}
                <strong>product Offer Price </strong> :
                <i className="fa-solid fa-indian-rupee-sign"></i>
                {product.offerPrice}{" "}
              </p>
             
            </div>

            <strong>Product features :</strong>
            <ul>
              {product?.features?.map((i) => (
                <li>{i}</li>
              ))}
            </ul>

            <div className="two_Sec" style={{ alignItems: "flex-start" }}>
              {" "}
              <strong>Description</strong> :{" "}
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {product?.description}
              </span>
            </div>
            {/* <div className="two_Sec" style={{ alignItems: "flex-start" }}>
              {" "}
              <strong>Color :</strong>{" "}
              <span>
                {console.log("color value", product?.color)}
                {product?.color?.map((i) => (
                  <spam>{i}, </spam>
                ))}
              </span>
            </div> */}
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
