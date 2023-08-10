import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Tooltip } from "@mui/material";
import { useFormik } from "formik";
function Contacts() {
  const [isData, setData] = useState([
    {
      id: 1,
      name: "Aaron",
      mobile: "5785664545",
      email: "aaron@gmail.com",
      address: "chennai",
    },
    {
      id: 2,
      name: "Buincy Hanson",
      mobile: "5785664545",
      email: "hanson@gmail.com",
      address: "kerala",
    },
  ]);

  const [isView, setView] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const [isViewData, setViewData] = useState({});
  const [isEditData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const ViewClicked = (info) => {
    setViewData(info);
    setView(true);
  };

  const DeleteClicked = (info) => {
    const filteredData = isData.filter((item) => item.id !== info.id);
    setData(filteredData);
    setView(false);
    setEdit(false);
  };

  const EditClicked = (info) => {
    console.log(info);
    window.localStorage.setItem("editcontactid", info.id);
    setView(false);
    setAdd(false);
    setEdit(true);
    setEditData(info);
  };
  const [count, setcount] = useState(0);
  const [AllData, setAllData] = useState([]);

  const handleSearchChange = (event) => {
    setcount(count + 1);
    if (count === 0) {
      setAllData(isData);
    } else {
      if (event.target.value === "") {
        setData(AllData);
        setSearchTerm("");
      } else {
        setSearchTerm(event.target.value);
        console.log(event.target.value);
        const searchTerm = event.target.value;
        const filteredData = isData.filter((item) => {
          const lowerCasedName = item.name.toLowerCase();
          const lowerCasedSearchTerm = searchTerm.toLowerCase();
          return lowerCasedName.startsWith(lowerCasedSearchTerm);
        });

        console.log(filteredData);
        setData(filteredData);
      }
    }
  };

  const handleFormReset = () => {
    formik.setValues({
      name: "",
      email: "",
      mobile: "",
      address: "",
    });
  };

  const AddContactClicked = () => {
    window.localStorage.setItem("editcontactid", 0);
    setAdd(false);
    setEdit(false);
    setAdd(true);
    setEdit(true);
    handleFormReset();
  };

  const formik = useFormik({
    initialValues: {
      name: isEditData.name || "",
      email: isEditData.email || "",
      mobile: isEditData.mobile || "",
      address: isEditData.address || "",
    },
    validate: (values) => {
      let error = {};
      //   if (!values.name) {
      //     error.name = "Please enter the name";
      //   }
      //   if (!values.email) {
      //     error.email = "Please enter the email";
      //   }
      //   if (!values.mobile) {
      //     error.mobile = "Please enter the mobile number";
      //   }
      //   if (!values.address) {
      //     error.address = "Please enter the address";
      //   }

      return error;
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const id = parseInt(window.localStorage.getItem("editcontactid"));
      if (id != 0) {
        console.log("edit");
        console.log(localStorage.getItem("editcontactid"));
        const id = parseInt(localStorage.getItem("editcontactid"));
        console.log(values);
        const newData = isData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              name: values.name,
              mobile: values.mobile,
              email: values.email,
              address: values.address,
            };
          }
          return item;
        });

        setData(newData);
      } else if (id === 0) {
        console.log("add");
        console.log(isData.length);
        console.log(values);
        const newcontact = {
          id: isData.length + 1,
          name: values.name,
          mobile: values.mobile,
          email: values.email,
          address: values.address,
        };
        setData((previous) => {
          return [...previous, newcontact];
        });
      } else {
        console.log("nothing is there to do");
      }
    },
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div
              class="card mt-3 text-center"
              style={{ backgroundColor: "black", height: "600px" }}
            >
              <div class="card-body text-center">
                <button
                  className="btn btn-info w-100 mb-1 text-white fs-5 text"
                  onClick={AddContactClicked}
                >
                  Add Contacts &nbsp;{" "}
                  <ControlPointOutlinedIcon onClick={AddContactClicked} />
                </button>
                <input
                  type="text"
                  placeholder="Search Contact"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div class="card-text ">
                  {isData.map((info) => {
                    return (
                      <div class="card mt-1">
                        <div
                          className="row d-flex justify-content-center align-items-center"
                          style={{ height: "50px" }}
                        >
                          <div className="col-2">{info.id}</div>
                          <div className="col-6 text-start d-flex align-items-center">
                            <div>
                              <AccountCircleOutlinedIcon
                                style={{ fontSize: "30px" }}
                              />
                              &nbsp;
                            </div>
                            <div>
                              <div>
                                <span style={{ fontSize: "13px" }}>
                                  {info.name}
                                </span>
                              </div>
                              <div>
                                <span style={{ fontSize: "13px" }}>
                                  {info.mobile}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <Tooltip title="View">
                              <VisibilityIcon
                                style={{ fontSize: "21px", cursor: "pointer" }}
                                onClick={() => ViewClicked(info)}
                              />
                            </Tooltip>

                            <Tooltip title="Delete">
                              &nbsp;
                              <DeleteIcon
                                style={{ fontSize: "21px", cursor: "pointer" }}
                                onClick={() => DeleteClicked(info)}
                              />
                            </Tooltip>

                            <Tooltip title="Edit">
                              &nbsp;
                              <EditIcon
                                style={{ fontSize: "21px", cursor: "pointer" }}
                                onClick={() => EditClicked(info)}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mt-5">
            {isView ? (
              <div class="card " style={{ backgroundColor: "#EFF8FF" }}>
                <div class="card-header" style={{ backgroundColor: "white" }}>
                  Contact Details
                  <Tooltip title="Close">
                    <span style={{ float: "right" }}>
                      <CloseOutlinedIcon
                        onClick={() => {
                          setEdit(false);
                          setView(false);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </Tooltip>
                </div>
                <div className="card m-3">
                  <div className="card-body w-100 d-flex justify-content-center align-items-center">
                    Name : {isViewData.name} <br></br>
                    Email : {isViewData.email} <br></br>
                    Number : {isViewData.mobile} <br></br>
                    Address : {isViewData.address} <br></br>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {isEdit ? (
                  <div class="card ">
                    <div class="card-header">
                      {isAdd ? "Add Contact" : "Edit Contact"}
                      <Tooltip title="Close">
                        <span style={{ float: "right" }}>
                          <CloseOutlinedIcon
                            onClick={() => {
                              setView(false);
                              setEdit(false);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </span>
                      </Tooltip>
                    </div>
                    <div class="card-body d-flex justify-content-center align-items-center">
                      <form onSubmit={formik.handleSubmit}>
                        <div>
                          <div>
                            <label>Name:</label>
                            <input
                              name={"name"}
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              type={"text"}
                              className="form-control"
                              placeholder="Enter your name"
                            />
                            <span
                              style={{ fontSize: "13px", color: "crimson" }}
                            >
                              {formik.errors.name}
                            </span>
                          </div>
                          <div>
                            <label>Email:</label>
                            <input
                              name={"email"}
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              //   type={"email"}
                              className="form-control"
                              placeholder="Enter your email"
                            />
                            <span
                              style={{ fontSize: "13px", color: "crimson" }}
                            >
                              {formik.errors.email}
                            </span>
                          </div>
                          <div>
                            <label>Phone Number:</label>
                            <input
                              name={"mobile"}
                              value={formik.values.mobile}
                              onChange={formik.handleChange}
                              type={"number"}
                              className="form-control"
                              placeholder="Enter your phone number"
                            />
                            <span
                              style={{ fontSize: "13px", color: "crimson" }}
                            >
                              {formik.errors.mobile}
                            </span>
                          </div>
                          <div>
                            <label>Address:</label>
                            <input
                              name={"address"}
                              value={formik.values.address}
                              onChange={formik.handleChange}
                              type={"text"}
                              className="form-control"
                              placeholder="Enter your address"
                            />
                            <span
                              style={{ fontSize: "13px", color: "crimson" }}
                            >
                              {formik.errors.address}
                            </span>
                          </div>
                          <div className="mt-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                            >
                              {isAdd ? "Submit" : "Update"}
                            </button>
                            <button
                              type="button"
                              className="btn btn-dark btn-sm mx-2"
                              onClick={handleFormReset}
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </>
  );
}

export default Contacts;
