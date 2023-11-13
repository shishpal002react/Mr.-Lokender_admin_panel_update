/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import { Dropdown, Menu } from "antd";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ECategory = () => {
  const [modalShow, setModalShow] = React.useState(false);
  // const [edit, setEdit] = useState("");
  const [id, setId] = useState("");
  //
  const [editModel, setModelEdit] = React.useState(false);
  const [EditName, setEditName] = useState("");
  // const [editValue,setEditValue]=React.useState("");

  //api calling
  const [category, setCategory] = useState([]);
  const getProducts = async () => {
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/admin/allCategory`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("product from category section", res.data.categories);
      setCategory(res.data.categories.reverse());
      console.log("category", res.data);
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
    let url = `${BaseUrl()}api/v1/admin/removeCategory/${id}`;
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

  // Pagination and Filter
  const [query, setQuery] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? category?.filter((i) =>
        i?.name?.toLowerCase().includes(query?.toLowerCase())
      )
    : category;

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

  // Post model
  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [file, setFile] = useState();
    const formdata = new FormData();
    formdata.append("image", file);

    const postData = async (e) => {
      e.preventDefault();
      console.log("ls", localStorage.getItem("token"));
      let url = `${BaseUrl()}api/v1/admin/createCategory/${name}`;
      try {
        const res = await axios.post(url, formdata, {
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
            {"Add Category"}
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

  const handlePutRequest = (i) => {
    setEditName(i.name);
    setId(i._id);
    setModelEdit(true);
  };

  //put request
  function MyVerticallyCenteredModalEdit(props) {
    //api calling please do it today
    const [name, setName] = useState(EditName);
    const [file, setFile] = useState();

    console.log(id, "id is apply find");
    const putRequest = async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("image", file);
      formdata.append("name", name);
      console.log("ls", localStorage.getItem("token"));
      let url = `${BaseUrl()}api/v1/admin/updateCategory/${id}`;
      try {
        const res = await axios.put(url, formdata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("put category data", res.data);
        toast("Data is Edit successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        setModelEdit(false);
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
            {" "}
            {"Edit Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={putRequest}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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

      <section>
        <p className="headP">Dashboard / Category</p>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Category's ( Total : {category?.length} )
          </span>
          <button
            onClick={() => {
              // setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Category
          </button>
        </div>

        <section className="sectionCont">
          {category?.length === 0 || !category ? (
            <Alert>Categories Not Found</Alert>
          ) : (
            <>
              <div className="filterBox">
                <img
                  src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                  alt=""
                />
                <input
                  type="search"
                  placeholder="Search By Category Name"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>SNo.</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedData?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>
                          <img src={i.image} alt="" style={{ width: "60px" }} />
                        </td>
                        <td>{i.name} </td>

                        <td>
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item key="2">
                                  <div
                                    className="two_Sec_Div"
                                    onClick={() => {
                                      // setEdit(true);
                                      handlePutRequest(i);
                                      // setModelEdit(true);
                                    }}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    {/* onClick={() => setId(i._id)} */}
                                    <p>Edit </p>
                                  </div>
                                </Menu.Item>
                                <Menu.Item key="3">
                                  <div className="two_Sec_Div">
                                    <i className="fa-sharp fa-solid fa-trash"></i>
                                    <p onClick={() => handleDelete(i._id)}>
                                      Delete{" "}
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
              </div>
            </>
          )}
        </section>
      </section>
      <ToastContainer />
    </>
  );
};

export default HOC(ECategory);
