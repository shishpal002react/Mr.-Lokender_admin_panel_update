/** @format */

import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  FloatingLabel,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import HOC from "../../layout/HOC";
import { Dropdown, Menu } from "antd";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Coupon = () => {
  const [modalShow, setModalShow] = React.useState(false);
  // const [edit, setEdit] = useState("");
  const [id, setId] = useState("");
  //
  const [editModel, setModelEdit] = React.useState(false);
  // const data = [
  //   {
  //     code: "June200",
  //     discount: "1500",
  //     startingDate: "12 Jul 2024",
  //     validTill: "10 Jul 2023",
  //     message:
  //       "Get extra ₹1500 off on 5 items (price inclusive of cashback/coupon)",
  //     status: "Active",
  //   },
  //   {
  //     code: "JUly400",
  //     discount: "4500",
  //     startingDate: "12 Jul 2024",
  //     validTill: "10 Jul 2023",
  //     message:
  //       "Get extra ₹1500 off on 5 items (price inclusive of cashback/coupon)",
  //     status: "Expired",
  //   },
  //   {
  //     code: "Aug300",
  //     discount: "1500",
  //     startingDate: "12 Jul 2024",
  //     validTill: "10 Jul 2023",
  //     message:
  //       "Get extra ₹1500 off on 5 items (price inclusive of cashback/coupon)",
  //     status: "Upcoming",
  //   },
  // ];

  const [data, setData] = useState([]);
  const getProducts = async () => {
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/coupon/all`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("product from category section", res.data);
      setData(res.data.coupons);
      console.log("category", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //delete api api/v1/coupon
  const handleDelete = async (id) => {
    console.log(id);
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/coupon/${id}`;
    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast("Data is Delete successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [couponCode, setCouponCode] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [activationDate, setActivationDate] = useState("");
    const [discount, setDiscount] = useState("");
    const [minOrder, setMinOrder] = useState("");

    const postData = async (e) => {
      e.preventDefault();
      console.log("ls", localStorage.getItem("token"));
      let url = `${BaseUrl()}api/v1/coupon`;
      try {
        const res = await axios.post(
          url,
          { couponCode, expirationDate, activationDate, discount, minOrder },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Data is create successfully", res.data);
        toast("Data is create successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        getProducts();
        setModalShow(false);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Add Coupon Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                value={couponCode}
                required
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Starting Date</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setActivationDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Valid Till</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Min Discount</Form.Label>
              <Form.Control
                type="number"
                required
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
              />
            </Form.Group>
            {/* <FloatingLabel
              controlId="floatingTextarea2"
              label="Message"
              className="mb-3"
            >
              <Form.Control
                as="number"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </FloatingLabel> */}

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const handlePutRequest = (i) => {
    setId(i);
    setModelEdit(true);
  };

  // console.log("data is print ", id);

  function MyVerticallyCenteredModalEdit(props) {
    const [couponCode, setCouponCode] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const [activationDate, setActivationDate] = useState();
    const [discount, setDiscount] = useState();
    const [minOrder, setMinOrder] = useState();
    const [idput, setIdPut] = useState("");

    console.log("data is print golu bhai", id);

    useEffect(() => {
      if (props.show === true) {
        setCouponCode(id.couponCode);
        setExpirationDate(id.validTill);
        setActivationDate(id.activationDate);
        setDiscount(id.discount);
        setMinOrder(id.minOrder);
        setIdPut(id._id);
      }
    }, [props]);

    const putRequest = async (e) => {
      e.preventDefault();
      //put coupon api
      console.log("ls", localStorage.getItem("token"));
      let url = `${BaseUrl()}api/v1/coupon/update/${idput}`;
      try {
        const res = await axios.put(url, {
          couponCode,
          expirationDate,
          activationDate,
          discount,
          minOrder,
        });
        console.log("Data is create successfully", res.data);
        toast("Data is Edit successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        getProducts();
        setModalShow(false);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Edit Coupon Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={putRequest}>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Starting Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setActivationDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Valid Till</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Min Order</Form.Label>
              <Form.Control
                type="number"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
              />
            </Form.Group>
            {/* <FloatingLabel
              controlId="floatingTextarea2"
              label="Message"
              className="mb-3"
            >
              <Form.Control
                as="number"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </FloatingLabel> */}

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <MyVerticallyCenteredModalEdit
        show={editModel}
        onHide={() => setModelEdit(false)}
      />

      <p className="headP">Dashboard / Coupon</p>

      <div
        className="pb-4  top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Coupon (Total : {data?.length} )
        </span>
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm  bg-[#19376d] text-white tracking-wider"
        >
          Add Coupon
        </button>
      </div>
      <section className="sectionCont">
        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input type="search" placeholder="Start typing to Search" />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Coupon Code</th>
                <th>Discount</th>
                <th>Starting Date</th>
                <th>Valid Till</th>
                <th>Min Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td> {i.couponCode} </td>
                  <td>
                    {" "}
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    {i.discount} Off{" "}
                  </td>
                  <td> {new Date(i.activationDate).toLocaleDateString()} </td>
                  <td> {new Date(i.validTill).toLocaleDateString()} </td>
                  <td>
                    {" "}
                    <p style={{ maxWidth: "180px" }}> {i.minOrder} </p>{" "}
                  </td>
                  <td>
                    {i.status === "Active" ? (
                      <Badge bg="success">Active</Badge>
                    ) : (
                      ""
                    )}
                    {i.status === "Expired" ? (
                      <Badge bg="secondary">Expired</Badge>
                    ) : (
                      ""
                    )}
                    {i.status === "Upcoming" ? (
                      <Badge bg="info">Upcoming</Badge>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item key="2">
                            <div
                              className="two_Sec_Div"
                              onClick={() => {
                                // setModalShow(true);
                                handlePutRequest(i);
                              }}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>

                              <p>Edit </p>
                            </div>
                          </Menu.Item>
                          <Menu.Item key="3">
                            <div className="two_Sec_Div">
                              <i className="fa-sharp fa-solid fa-trash"></i>
                              <p onClick={() => handleDelete(i._id)}>Delete </p>
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
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default HOC(Coupon);
