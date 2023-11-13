/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import { Dropdown, Menu } from "antd";
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ESubCategory = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowEdit, setModalShowEdit] = React.useState(false);

  //edit product
  const [id, setId] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [catId, setCateId] = useState("");
  const [catName, setCatName] = useState("");

  //api calling
  const [subCategory, setSubCategory] = useState([]);
  const getProducts = async () => {
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/admin/allSubCategory`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("product from category section", res.data.categories);
      setSubCategory(res.data.categories.reverse());
      console.log("category", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //delete subCategory
  const handleDelete = async (id) => {
    console.log(id);
    console.log("ls", localStorage.getItem("token"));
    let url = `${BaseUrl()}api/v1/admin/delete/sub/Category/${id}`;
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
    ? subCategory?.filter((i) =>
        i?.name?.toLowerCase().includes(query?.toLowerCase())
      )
    : subCategory;

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

  // post request
  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [subCategoryId, setSubcategory] = useState("");
    const [data, setDate] = useState([]);

    const postData = async (e) => {
      e.preventDefault();

      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("categoryId", subCategoryId);

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

    //category data
    const subCategoryData = async () => {
      let url = `${BaseUrl()}api/v1/admin/allCategory`;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        //please check again
        setDate(res.data.categories);
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
            {" Add Sub Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option>-- Select Category --</option>
              {data &&
                data?.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
            </Form.Select>

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

  //put request

  const handleEditCategory = (i) => {
    setId(i._id);
    setModalShowEdit(true);
    setNameEdit(i.name);
    setCateId(i.categoryId._id);
    setCatName(i.categoryId.name);
  };

  function MyVerticallyCenteredModalEdit(props) {
    const [name, setName] = useState(nameEdit);
    const [subCategoryId, setSubcategory] = useState(modalShowEdit);
    const [data, setDate] = useState([]);
    const [image, setImage] = useState();

    const putRequest = async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("image", image);
      formdata.append("categoryId", subCategoryId);
      let url = `${BaseUrl()}api/v1/admin/updatesubcategory/${id}`;
      try {
        const res = await axios.put(url, formdata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast("Data is Edit successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        getProducts();
        setModalShowEdit(false);
      } catch (error) {
        console.log(error);
      }
    };

    const subCategoryData = async () => {
      let url = `${BaseUrl()}api/v1/admin/allCategory`;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        //please check again
        setDate(res.data.categories);
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
            {"Edit Sub Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={putRequest}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option>-- Select Category --</option>
              {data &&
                data?.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
            </Form.Select>
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
        show={modalShowEdit}
        onHide={() => setModalShowEdit(false)}
      />

      <section>
        <p className="headP">Dashboard / Sub-Category</p>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Sub-Category's ( Total : {subCategory?.length} )
          </span>
          <button
            onClick={() => {
              // setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Sub-Category
          </button>
        </div>

        <section className="sectionCont">
          {subCategory?.length === 0 || !subCategory ? (
            <Alert>Sub-Categories Not Found</Alert>
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
                      <th>Name</th>
                      <th>Category</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedData?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>{i.name} </td>
                        <td> {i?.categoryId?.name} </td>
                        <td>
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item key="2">
                                  <div
                                    className="two_Sec_Div"
                                    onClick={() => {
                                      // setEdit(true);
                                      // setModalShowEdit(true);
                                      handleEditCategory(i);
                                    }}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>

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

export default HOC(ESubCategory);
