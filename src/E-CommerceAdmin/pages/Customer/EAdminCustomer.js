/** @format */

import React, { useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { Dropdown, Menu } from "antd";
import BreadCamp from "../Component/BreadCamp";
import BaseUrl from "./../../../BaseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const data = [
//   {
//     img: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
//     fName: "Arpan",
//     lName: "Malik",
//     Gender: "Identify as toast",
//     email: "arpanmalik@gmail.com",
//     mobile: "9874563214",
//   },
//   {
//     img: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
//     fName: "Arpan",
//     lName: "Malik",
//     Gender: "Identify as toast",
//     email: "arpanmalik@gmail.com",
//     mobile: "9874563214",
//   },

//   {
//     img: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
//     fName: "Arpan",
//     lName: "Malik",
//     Gender: "Identify as toast",
//     email: "arpanmalik@gmail.com",
//     mobile: "9874563214",
//   },
//   {
//     img: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
//     fName: "Arpan",
//     lName: "Malik",
//     Gender: "Identify as toast",
//     email: "arpanmalik@gmail.com",
//     mobile: "9874563214",
//   },
//   {
//     img: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
//     fName: "Arpan",
//     lName: "Malik",
//     Gender: "Identify as toast",
//     email: "arpanmalik@gmail.com",
//     mobile: "9874563214",
//   },
//   {
//     img: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
//     fName: "Arpan",
//     lName: "Malik",
//     Gender: "Identify as toast",
//     email: "arpanmalik@gmail.com",
//     mobile: "9874563214",
//   },
//   {
//     img: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
//     fName: "Arpan",
//     lName: "Malik",
//     Gender: "Identify as toast",
//     email: "arpanmalik@gmail.com",
//     mobile: "9874563214",
//   },
//   {
//     img: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
//     fName: "Arpan",
//     lName: "Malik",
//     Gender: "Identify as toast",
//     email: "arpanmalik@gmail.com",
//     mobile: "9874563214",
//   },
// ];

const EAdminCustomer = () => {
  //api calling
  const [data, setData] = useState([]);
  const getProducts = async () => {
    console.log("ls data ", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/all/user`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BaseUrl()}api/v1/delete/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast("Customer delete successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const [query, setQuery] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;
  let pages2 = [];

  const TotolData = query
    ? data?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.email?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.role?.toLowerCase().includes(query?.toLowerCase())
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

  return (
    <>
      <BreadCamp name="Customers" />
      <div
        className="pb-4 w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Customers ( Total : {data?.length} )
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
                value={query}
                placeholder="Start typing to search for Customers"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Image</th>
                    <th>First Name</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {slicedData?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>
                        <img
                          src={i.image}
                          alt=""
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "100%",
                          }}
                        />
                      </td>
                      <td> {i.name} </td>
                      <td>{i.role}</td>
                      <td>
                        <Dropdown
                          overlay={
                            <Menu>
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
              </Table>{" "}
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
            </div>
          </>
        )}
      </section>
      <ToastContainer />
    </>
  );
};

export default HOC(EAdminCustomer);
