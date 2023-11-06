/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import BreadCamp from "../Component/BreadCamp";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Banners = () => {
  const [modalShow, setModalShow] = React.useState(false);
  // const data = [
  //   {
  //     img: "https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",
  //   },
  //   {
  //     img: "https://e0.pxfuel.com/wallpapers/606/84/desktop-wallpaper-ecommerce-website-design-company-noida-e-commerce-banner-design-e-commerce.jpg",
  //   },
  //   {
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGgM8RlZ0uehCZUxvIxTnjQY_DU_rYNAVTyA_eCrsZzUZiF9HzPni8ptGY4pTtXcf-EB0&usqp=CAU",
  //   },
  //   {
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKac3r1g5y_0iC8LssfWLn1VZXA6CMfXn1A&usqp=CAU ",
  //   },
  // ];

  //api calling

  const [data, setData] = useState([]);
  const getProducts = async () => {
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/banner`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("product from shoes section", res.data.banners);
      setData(res.data.banners);
      console.log("admin product data", res.data.banners);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //add banner
  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [file, setFile] = useState();

    const postData = async (e) => {
      e.preventDefault();

      const formdata = new FormData();
      formdata.append("image", file);
      formdata.append("name", name);

      let url = `${BaseUrl()}/api/v1/banner/offers456`;
      try {
        const res = await axios.post(url, formdata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Banner is create successfully", res.data);
        toast("Data is create successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        setModalShow(false);
      } catch (error) {
        console.log(error);
      }
    };

    // useEffect(() => {
    //   getProducts();
    // }, []);
    // };

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
            {"Add Banner"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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

  //delete banner api
  //delete api api/v1/product/
  const handleDelete = async (id) => {
    console.log(id);
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/banner/${id}`;
    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getProducts();
      toast("Data is Delete successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BreadCamp name="Banners" />

      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Banners ( Total : {data.length} )
        </span>
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          Add Banner
        </button>
      </div>

      <div className="gridCont">
        {data.map((i, index) => (
          <div key={index}>
            <img src={i.image} alt="" />
            <button className="delete-Btn" onClick={() => handleDelete(i._id)}>
              Delete Button
            </button>
          </div>
        ))}
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ToastContainer />
    </>
  );
};

export default HOC(Banners);
