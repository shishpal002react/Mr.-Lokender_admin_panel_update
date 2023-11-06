/** @format */

import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { Dropdown, Menu } from "antd";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";

const EAdminDelivery = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [id, setId] = useState("");

  // const data = [
  //   {
  //     email: "Help@gmail.com",
  //     mobile: "4512785412",
  //     whatsapp: "7845965412",
  //   },
  // ];

  //api calling
  const [data, setData] = useState([]);
  const getProducts = async () => {
    console.log("ls data ", localStorage.getItem("boon"));
    let url = `${BaseUrl()}api/v1/support/all`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("boon")}`,
        },
      });

      setData(res.data.supports);
      console.log("admin support data", res.data.supports);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const [query, setQuery] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? data?.filter(
        (i) =>
          i?.order?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.seller?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.issueType.toLowerCase().includes(query?.toLowerCase())
      )
    : data;

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

  const handleReplySupport = (id) => {
    setId(id);
    setModalShow(true);
  };

  function MyVerticallyCenteredModal(props) {
    const [reply, setReply] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formdata = new FormData();
      formdata.append("reply", reply);

      console.log("ls", localStorage.getItem("boon"));
      console.log("token", localStorage.getItem("boon"));

      let url = `${BaseUrl()}api/v1/support/reply/${id}`;
      try {
        const res = await axios.post(url, formdata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        window.alert("post request is successful");
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
            Reply Help & Support
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Admin Reply</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required
              />
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

      <section>
        <p className="headP">Dashboard / Help & Support </p>

        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Help & Support (Total : {data?.length})
          </span>
        </div>
        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search for Customers"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Image</th>
                  <th>CallbackNumber</th>
                  <th>IssueType</th>
                  <th>IssueDescription</th>
                  <th>OrderId</th>
                  <th>SellerId</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td>
                      <img
                        src={i?.images?.[0]}
                        alt=""
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td> {i.callbackNumber} </td>
                    <td> {i.issueType} </td>
                    <td> {i.issueDescription} </td>
                    <td> {i.order} </td>
                    <td> {i.seller} </td>
                    <td>
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item key="2">
                              <div
                                className="two_Sec_Div"
                                onClick={() => {
                                  // setModalShow(true);
                                  handleReplySupport(i._id);
                                }}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>

                                <p>Reply Help & Support </p>
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

          <div className="pagination">
            <button onClick={() => Prev()} className="prevBtn">
              <i className="fa-solid fa-backward"></i>
            </button>
            {currentPage2 === 1 ? (
              ""
            ) : (
              <button onClick={() => setCurrentPage2(1)}>1</button>
            )}

            {pages2?.slice(currentPage2 - 1, currentPage2 + 3).map((i, index) =>
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
              className={currentPage2 === pages2?.length ? "activePage" : ""}
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
        </section>
      </section>
    </>
  );
};

export default HOC(EAdminDelivery);
