/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import { Dropdown, Menu } from "antd";
import BaseUrl from "./../../../BaseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Terms = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modelEdit, setModelEdit] = React.useState(false);
  const [id, setId] = React.useState("");

  //api calling
  const [data, setData] = useState([]);
  const getProducts = async () => {
    console.log("ls data ", localStorage.getItem("boon"));
    let url = `${BaseUrl()}api/v1/terms`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("boon")}`,
        },
      });

      setData(res.data);
      console.log("admin support data", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [terms, setTerms] = useState("");

    const postData = async (e) => {
      e.preventDefault();
      console.log("ls", localStorage.getItem("token"));
      let url = `${BaseUrl()}api/v1/terms`;
      try {
        const res = await axios.post(url, terms, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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
            Add Terms & Condition
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Terms and Condition"
              >
                <Form.Control
                  as="textarea"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
            </Form.Group>
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

  function MyVerticallyCenteredModalEdit(props) {
    const [terms, setTerms] = useState(data?.terms?.terms);

    const postData = async (e) => {
      e.preventDefault();
      console.log("ls", localStorage.getItem("token"));
      let url = `${BaseUrl()}api/v1/terms/${data.terms._id}`;
      try {
        const res = await axios.post(url, terms, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
            Edit & Condition
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Terms and Condition"
              >
                <Form.Control
                  as="textarea"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
            </Form.Group>
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
        show={modelEdit}
        onHide={() => setModelEdit(false)}
      />

      <section>
        <p className="headP">Dashboard / Terms&Condition</p>
        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add New
          </button>
          <button
            onClick={() => {
              // setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Edit Terms
          </button>
        </div>

        <section className="sectionCont">
          <>
            <div className="overFlowCont">{data?.terms?.terms}</div>
          </>
        </section>
      </section>
      <ToastContainer />
    </>
  );
};

export default HOC(Terms);
