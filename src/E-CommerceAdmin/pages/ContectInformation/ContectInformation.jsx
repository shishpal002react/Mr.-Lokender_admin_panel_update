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
import BaseUrl from "../../../BaseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContectInformation = () => {
  const [modalShow, setModalShow] = React.useState(false);

  //api calling
  const [data, setData] = useState("");
  const getProducts = async () => {
    let url = `${BaseUrl()}api/v1/admin/ContactDetails/viewContactDetails`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(res.data.data);
      console.log("contect information", res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //post
  function MyVerticallyCenteredModal(props) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [text, setText] = useState("");
    const [faceBook, setFaceBook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [youtube, setYoutube] = useState("");
    const [instagram, setInstagram] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [headerColor, setHeaderColor] = useState("");
    const [footerColor, setFooterColor] = useState("");
    const [logo,setLogo]=useState("");

    useEffect(()=>{
        if(props.show===true){
            setEmail(data?.email);
            setPhone(data?.phone);
            setText(data?.text);
            setFaceBook(data?.fb);
            setTwitter(data?.twitter);
            setLinkedIn(data?.linkedIn);
            setYoutube(data?.email);
            setInstagram(data?.instagram);
            setAddress(data?.address);
            setCity(data?.city);
            setState(data?.state);
            setPinCode(data?.pincode);
            setHeaderColor(data?.headerColor);
            setFooterColor(data?.footerColor);
        }
    },[props])

    const handlePut = async (e) => {
      e.preventDefault();
      console.log("ls", localStorage.getItem("token"));
      let url = `${BaseUrl()}api/v1/admin/ContactDetails/addContactDetails`;
      const formData = new FormData();
      formData.append("image",logo);
      formData.append("phone",phone);
      formData.append("email",email)
      formData.append("text",text)
      formData.append("fb",faceBook)
      formData.append("twitter",twitter)
      formData.append("instagram",instagram)
      formData.append("linkedIn",linkedIn)
      formData.append("youtube",youtube)
      formData.append("address",address)
      formData.append("city",city)
      formData.append("state",state)
      formData.append("pincode",pinCode)
      formData.append("footerColor",headerColor)
      formData.append("headerColor",footerColor)

      try {
        const res = await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      
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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Add Contect Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePut}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Website Logo</Form.Label>
              <Form.Control
                type="file" 
                onChange={(e) => setLogo(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone" 
              value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Text</Form.Label>
              <Form.Control type="text" placeholder="Enter text" 
              value={text} onChange={(e)=>setText(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>FaceBook Link</Form.Label>
              <Form.Control type="text" placeholder="Enter faceBook link" 
              value={faceBook} onChange={(e)=>setFaceBook(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Twitter Link</Form.Label>
              <Form.Control type="text" placeholder="Enter Twitter" 
              value={twitter} onChange={(e)=>setTwitter(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control type="text" placeholder="Enter linkedIn" 
              value={linkedIn} onChange={(e)=>setLinkedIn(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Youtube</Form.Label>
              <Form.Control type="text" placeholder="Enter youtube" 
              value={youtube} onChange={(e)=>setYoutube(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Instagram</Form.Label>
              <Form.Control type="text" placeholder="Enter instagram" 
              value={instagram} onChange={(e)=>setInstagram(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" 
              value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" 
              value={city} onChange={(e)=>setCity(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Enter state" 
              value={state} onChange={(e)=>setState(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>PinCode</Form.Label>
              <Form.Control type="text" placeholder="Enter pinCode" 
              value={pinCode} onChange={(e)=>setPinCode(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>HeaderColor</Form.Label>
              <Form.Control type="color" placeholder="headerColor headerColor" 
              value={headerColor} onChange={(e)=>setHeaderColor(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>FooterColor</Form.Label>
              <Form.Control type="color" placeholder="Enter footer color" 
              value={footerColor} onChange={(e)=>setFooterColor(e.target.value)}/>
            </Form.Group>
           

            <Button variant="primary" type="submit">
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
        <p className="headP">Dashboard / Privacy Policy</p>
        <div
          className="pb-4  top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Contect Information
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Update Information
          </button>
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Contect Information Not Found</Alert>
          ) : (
            <>
              {/* Filter */}
              <div className="filterBox">
                <img
                  src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                  alt=""
                />
              </div>

              <div style={{display:'flex',justifyContent:"space-between",width:"90%",marginTop:"1.5rem",marginBottom:"1.5rem",padding:"1rem"}}>
                <div>
                    <h1>Website Logo</h1>
                </div>
                <div>
                    <img src={data?.image} alt="image not found" style={{maxHeight:"200px",maxWidth:"300px"}}/>
                </div>
              </div>

              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Contect Information</th>
                      <th>Contect Information Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Email</td>
                      <td>{data?.email}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Phone Number</td>
                      <td>{data?.phone}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Text</td>
                      <td>{data?.text}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>FaceBook Link</td>
                      <td>{data?.fb}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Twitter Link</td>
                      <td>{data?.twitter}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>LinkedIn Link</td>
                      <td>{data?.linkedIn}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Youtube Link</td>
                      <td>{data?.youtube}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Instagram Link</td>
                      <td>{data?.instagram}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Address</td>
                      <td>{data?.address}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>City</td>
                      <td>{data?.city}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>State</td>
                      <td>{data?.state}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Pincode</td>
                      <td>{data?.pincode}</td>
                    </tr>{" "}
                    <tr>
                      <td style={{ fontWeight: "bold" }}>HeaderColor</td>
                      <td
                        style={{
                          backgroundColor: `${data?.headerColor}`,
                          width: "auto",
                        }}
                      ></td>
                    </tr>{" "}
                    <tr>
                      <td style={{ fontWeight: "bold" }}>FooterColor</td>
                      <td
                        style={{
                          backgroundColor: `${data?.footerColor}`,
                          width: "auto",
                        }}
                      ></td>
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

export default HOC(ContectInformation);
