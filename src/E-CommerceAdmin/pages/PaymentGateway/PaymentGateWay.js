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
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentGateWay = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modelShowEdit, setModelShowEdit] = useState(false);
  const [id, setId] = useState("");

  //api calling
  const [data, setData] = useState([]);
  const getProducts = async () => {
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/detail`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(res.data.detail.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //
  const hamdleDelete = async (id) => {
    console.log("customer id", id);

    console.log("ls data ", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/detail/${id}`;
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




  return (
    <>
      <section>
        <p className="headP">Dashboard / Payment gateway</p>
        <div
          className="pb-4  top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Payment gateway
          </span>
          {/* <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add New
          </button> */}
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Privacy Policy Not Found</Alert>
          ) : (
            <>
              {/* Filter */}
            

              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Gateway</th>
                      {/* <th>Privacy Policy</th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  
                      <tr >
                        {/* <td> #{index + 1}</td> */}
                        <td>
                          <strong># RazerPay</strong>
                         
                        </td>
                        <td>
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item key="2">
                                  <div
                                    className="two_Sec_Div"
                                    onClick={() => {
                                      
                                    }}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>

                                    <p>Edit</p>
                                  </div>
                                </Menu.Item>
                                <Menu.Item key="3">
                                  <div className="two_Sec_Div">
                                    <i className="fa-sharp fa-solid fa-trash"></i>
                                    <p onClick={() => hamdleDelete()}>
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
                      <tr >
                        {/* <td> #{index + 1}</td> */}
                        <td>
                          <strong># Strip payment Gateway</strong>
                         
                        </td>
                        <td>
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item key="2">
                                  <div
                                    className="two_Sec_Div"
                                    onClick={() => {
                                      
                                    }}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>

                                    <p>Edit</p>
                                  </div>
                                </Menu.Item>
                                <Menu.Item key="3">
                                  <div className="two_Sec_Div">
                                    <i className="fa-sharp fa-solid fa-trash"></i>
                                    <p onClick={() => hamdleDelete()}>
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
                  </tbody>
                </Table>
              
               
              </div>
            </>
          )}
        </section>
      </section>
      <ToastContainer />
    </>
  );
};

export default HOC(PaymentGateWay);
