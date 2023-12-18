/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import SpinnerComp from "../Component/SpinnerComp";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EProduct = () => {
  const [query, setQuery] = useState("");

  //model
  const [modalShow, setModalShow] = React.useState(false);
  // const [reverseArray, setReverseArray] = useState([]);

  //api calling

  const [product, setProduct] = useState([]);
  const getProducts = async () => {
    console.log("ls", localStorage.getItem("token"));
    console.log("login id", localStorage.getItem("ID"));
    let url = `${BaseUrl()}api/v1/products`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("product from shoes section", res.data);
      setProduct(res.data.products.reverse());

      console.log("admin product data", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //delete api api/v1/product/
  const handleDelete = async (id) => {
    console.log(id);
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/product/${id}`;
    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast("Product Delete successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // post request
  function MyVerticallyCenteredModal(props) {
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

    const [mrp, setMrp] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

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

      console.log("ls", localStorage.getItem("token"));
      let url = `${BaseUrl()}api/v1/product/new/admin`;
      try {
        const res = await axios.post(url, formdata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Product is create successfully", res.data);
        toast("Product is create successfully", {
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
            {"Add Product Category"}
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
            {/* <Form.Group className="mb-3">
              <Form.Label>Product sim Type</Form.Label>
              <Form.Control
                type="text"
                value={simType}
                onChange={(e) => setSimType(e.target.value)}
              />
            </Form.Group> */}
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

  // Pagination
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? product?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.sellerName
            ?.toString()
            ?.toLowerCase()
            .includes(query?.toLowerCase())
      )
    : product;

  useEffect(() => {
    if (query) {
      setCurrentPage2(1);
    }
  }, [query]);

  const slicedData = TotolData?.slice(firstPostIndex2, lastPostIndex2);

  for (let i = 1; i <= Math.ceil(TotolData?.length / postPerPage2); i++) {
    pages2.push(i);
  }

  function Next() {
    setCurrentPage2(currentPage2 + 1);
  }

  function Prev() {
    if (currentPage2 !== 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  }

  return (
    <>
      <p className="headP">Dashboard / Products</p>

      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          s All Product's ( Total : {product?.length} )
        </span>
        <button
          onClick={() => {
            // setEdit(false);
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          Add Product
        </button>
        <button
          onClick={() => {
            // setEdit(false);
            // setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          Add Bulk Product
        </button>
      </div>

      <section className="sectionCont">
        {product?.length === 0 || !product ? (
          <SpinnerComp />
        ) : (
          <>
            <div className="filterBox">
              <img
                src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                alt=""
              />
              <input
                type="search"
                placeholder="Start typing to search for products"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Reviews</th>
                    <th>Discount</th>
                    <th>Total Stock</th>
                    <th>MRP</th>
                    <th>Price</th>
                    <th>Selling Price</th>
                    <th>Discounted Price</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {slicedData?.map((i, index) => (
                    <tr key={index}>
                      <td> {index + 1} </td>
                      <td>
                        <img src={i.images} alt="" style={{ width: "60px" }} />
                      </td>
                      <td>{i.name}</td>
                      <td>{i.numOfReviews}</td>
                      <td>{i.discountPercentage}</td>
                      <td>{i.stock}</td>
                      <td>{i.mrp}</td>
                      <td>{i.price}</td>
                      <td>{i.offerPrice}</td>
                      <td>{i.discountedPrice}</td>

                      <td style={{ textAlign: "center" }}>
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item key="2">
                                <div className="two_Sec_Div">
                                  <i className="fa-solid fa-eye"></i>
                                  <Link to={`/single_product/${i._id}`}>
                                    <p>View Product</p>
                                  </Link>
                                </div>
                              </Menu.Item>
                              <Menu.Item key="3">
                                <div className="two_Sec_Div">
                                  <i className="fa-sharp fa-solid fa-trash"></i>
                                  <p onClick={() => handleDelete(i._id)}>
                                    Delete
                                  </p>
                                </div>
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="pagination">
                <button onClick={() => Prev()} className="prevBtn">
                  <i className="fa-solid fa-backward"></i>
                </button>
                {currentPage2 === 1 ? (
                  ""
                ) : (
                  <button onClick={() => setCurrentPage2(1)}>1</button>
                )}

                {pages2
                  ?.slice(currentPage2 - 1, currentPage2 + 3)
                  .map((i, index) =>
                    i === pages2?.length ? (
                      ""
                    ) : (
                      <button
                        key={index}
                        onClick={() => setCurrentPage2(i)}
                        className={currentPage2 === i ? "activePage" : ""}
                      >
                        {" "}
                        {i}{" "}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setCurrentPage2(pages2?.length)}
                  className={
                    currentPage2 === pages2?.length ? "activePage/error" : ""
                  }
                >
                  {" "}
                  {pages2?.length}{" "}
                </button>

                {currentPage2 === pages2?.length ? (
                  ""
                ) : (
                  <button onClick={() => Next()} className="nextBtn">
                    {" "}
                    <i className="fa-sharp fa-solid fa-forward"></i>
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </section>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ToastContainer />
    </>
  );
};

export default HOC(EProduct);
