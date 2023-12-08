/** @format */

import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Form, Modal, Table } from "react-bootstrap";
import HOC from "../../layout/HOC";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EAdminOrders = () => {
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState("");

  // const data = [
  //   {
  //     user: "Varun",
  //     totalPrice: "500",
  //     isPaid: true,
  //     isDelivered: true,
  //     paymentMethod: "COD",
  //     taxPrice: "250",
  //     shippingPrice: "250",
  //     status: "Shipped",
  //     products: [
  //       {
  //         product: "REDMI 10 Power",
  //       },
  //       {
  //         product: "OPPO A17k",
  //       },
  //     ],
  //     shippingAddress:
  //       "S/o Arun chaudhary village shekhpuri bhola road meerut 250502",
  //   },
  // ];
  const [data, setData] = useState([]);
  const getProducts = async () => {
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/admin/orders`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("product from category section", res.data.orders);
      setData(res.data.orders.reverse());
      console.log("category", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Pagination and Filter
  const [query, setQuery] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? data?.filter((i) => i?.user?.toLowerCase().includes(query?.toLowerCase()))
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

  const handleEdit = (id) => {
    setModalShow(true);
    setId(id);
  };

  function EditStatus(props) {
    const [data, setData] = useState("");

    const putRequest = async (e) => {
      e.preventDefault();
      console.log("ls", localStorage.getItem("token"));
      let url = `${BaseUrl()}api/v1/admin/order/${id}`;
      try {
        const res = await axios.put(
          url,
          { status: data },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("put category data", res.data);
        toast("Data is Edit successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        setModalShow(false);
        getProducts();
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={putRequest}>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setData(e.target.value)}
            >
              <option>--Edit Status--</option>
              <option value="delivered">Delivered</option>
              <option value="shipped">Shipped</option>
              <option value="canceled">Canceled</option>
            </Form.Select>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <EditStatus show={modalShow} onHide={() => setModalShow(false)} />
      <section>
        <p className="headP">Dashboard / Order</p>

        <div
          className="pb-4  top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Order's (Total : {data?.length})
          </span>
        </div>
        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>No Data Found</Alert>
          ) : (
            <>
              <div className="filterBox">
                <img
                  src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                  alt=""
                />
                <input
                  type="search"
                  placeholder="Start typing to search"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>User</th>
                      <th>Total Price</th>
                      <th>Paid</th>
                      <th>Delivered Address</th>
                      <th>Payment Method</th>
                      <th>Tax Price</th>
                      <th>Shipping Price</th>
                      <th>Status</th>
                      {/* <th>Product</th> */}
                      {/* <th>Shipping Address</th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedData?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td> {i.user} </td>
                        <td>
                          {" "}
                          <i className="fa-solid fa-indian-rupee-sign mr-1"></i>
                          {i.totalAmount}{" "}
                        </td>
                        <td>
                          {" "}
                          {/* {i.paymentStatus === true ? (
                            <Badge bg="success">Paid</Badge>
                          ) : (
                            <Badge bg="danger">UnPaid</Badge>
                          )}{" "} */}
                          <Badge bg="success">{i.paymentStatus}</Badge>
                        </td>
                        {/* <td>
                          {" "}
                          {i.isDelivered === true ? (
                            <Badge bg="success">Delivered</Badge>
                          ) : (
                            <Badge bg="danger">Not Deliverd Yet</Badge>
                          )}{" "}
                        </td> */}
                        <td>{i.address}</td>
                        <td> {i.paymentMethod} </td>
                        <td>
                          {" "}
                          <i className="fa-solid fa-indian-rupee-sign mr-1"></i>
                          {i.taxPrice}{" "}
                        </td>
                        <td>
                          {" "}
                          <i className="fa-solid fa-indian-rupee-sign mr-1"></i>
                          {i.shippingPrice}{" "}
                        </td>
                        <td>
                          <Badge bg="success"> {i.orderStatus} </Badge>
                        </td>
                        {/* <td>
                          {" "}
                          {i.products?.map((item, index) => (
                            <ul key={index} style={{ listStyle: "disc" }}>
                              <li> {item.product} </li>
                            </ul>
                          ))}{" "}
                        </td> */}
                        {/* <td>{i.shippingAddress}</td> */}
                        <td>
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item key="2">
                                  <div
                                    className="two_Sec_Div"
                                    onClick={() => {
                                      // setModalShow(true);
                                      handleEdit(i._id);
                                    }}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>

                                    <p>Edit</p>
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

              {/* Pagination */}
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
                    currentPage2 === pages2?.length ? "activePage" : ""
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
            </>
          )}
        </section>
      </section>
      <ToastContainer />
    </>
  );
};

export default HOC(EAdminOrders);
