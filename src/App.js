import logo from "./logo.svg";
import "./App.css";
import {
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import Moment from "react-moment";

import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

//material UI
import React, { useRef, useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ReactDOM from "react-dom";
import hotelimgasset from "./assets/hotelimgasset.jpg";
import hotelroomasset from "./assets/hotelroom.jpg";
import { ContactSupportOutlined } from "@material-ui/icons";

//Made axios global
const axios = require("axios"); //use axios for http requests
const instance = axios.create({ baseURL: "http://localhost:8080" }); //use this instance of axios for http requests
const isMongo = 1;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: 40,
    background: theme.background,
    textAlign: "center",
  },
  title: {
    paddingRight: "50px",
    color: (props) => props.color,
  },
  link: {
    // color: theme.color,
    "&:hover": {
      opacity: 0.5,
    },
  },
  icon: {
    borderRight: "3px solid black",
    fontSize: "50px",
    color: "black",
    paddingRight: "20px",
  },
  paperModal: {
    boxShadow: "none",
    paddingLeft: "5vw",

    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
}));

const Login = (props) => {
  const classes = useStyles({});
  let history = useHistory(); //Navigation

  //States
  const [open, setOpen] = useState(false); //Open or close modal;
  const [modalType, setModalType] = useState("empty"); //State for modalType to let modal appear as the specific type. (e.g. invalid, error)
  //Modal Functions
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { register, handleSubmit, errors } = useForm();

  const validateUser = (data) => {
    if (data.email == "" || data.password == "") {
      setOpen(true);
      setModalType("empty");
    } else {
      //Not empty, proceed with calling API
      console.log("ID", data.email);
      console.log("pw", data.password);

      instance
        .post("/customer/login", {
          username: data.email,
          password: data.password,
        })
        .then(function (response) {
          var responseData = response.data;
          console.log(typeof responseData);
          console.log(response);
          if (isMongo == 1) {
            console.log(responseData);
            if (responseData === null) {
              setModalType("invalid");
              setOpen(true);
            } else {
              console.log("customerID is ", responseData._id);
              history.push({
                pathname: "/Dashboard",
                state: { currentUserId: responseData._id },
              });
            }
          } else {
            if (response.data == false) {
              console.log("false");
              setModalType("invalid");
              setOpen(true);
            } else {
              // console.log(responseData[0].address);
              console.log("customerID is ", responseData[0].customerid);

              history.push({
                pathname: "/Dashboard",
                state: { currentUserId: responseData[0].customerid },
              });
            }
          }
        })
        .catch(function (error) {
          setModalType("error");
          setOpen(true);
          console.log(error);
        });
    }
  };
  return (
    <div>
      {/* Personalized toolbar for each specific page */}
      <AppBar position="static">
        <Toolbar>
          <HotelOutlinedIcon className={classes.icon}></HotelOutlinedIcon>
          {/* <Typography
            href="/"
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to={{
                pathname: "/Booking",
                // state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              // href="/"
              color="inherit"
            >
              Book
            </Link>{" "}
          </Typography> */}
          <Typography
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              <div style={{ color: " grey" }}>Login</div>
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
              // href="/login"
              color="inherit"
            >
              Sign Up
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/checkbooking"
              style={{ textDecoration: "none", color: "white" }}
              // href="/checkbooking"
              color="inherit"
            >
              Check Bookings
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>

      {/* Page section */}
      <Container component="main" maxWidth="xs" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <div className={useStyles.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            className={useStyles.form}
            noValidate
            onSubmit={handleSubmit((data) => validateUser(data))}
          >
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={useStyles.submit}
            >
              Login
            </Button>
            <Grid container style={{ paddingTop: "10px" }}>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Modal center open={open} onClose={onCloseModal}>
            {modalType === "invalid" ? (
              <div>
                <h2> Invalid Login Details </h2>
                <p>Invalid username or password.</p>
              </div>
            ) : modalType === "empty" ? (
              <div>
                <h2> Empty fields</h2>
                <p>Please fill in all fields before logging in.</p>
              </div>
            ) : (
              <div>
                <h2> Error fetching</h2>
                <p>Please contact the administrator.</p>
              </div>
            )}
          </Modal>
        </div>
      </Container>
    </div>
  );
};

const Register = (props) => {
  const classes = useStyles({});
  //States
  const [open, setOpen] = useState(false); //Open or close modal;
  const [modalType, setModalType] = useState("empty"); //State for modalType to let modal appear as the specific type. (e.g. invalid, error)

  let history = useHistory(); //Navigation

  //Modal Functions
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    history.push("/");
    setOpen(false);
  };

  const { register, handleSubmit, control } = useForm();

  const validateRegister = (data) => {
    console.log(data);

    if (
      data.name == "" ||
      data.address == "" ||
      data.contactno == "" ||
      data.email == "" ||
      data.password == ""
    ) {
      setModalType("empty");

      setOpen(true);
    } else {
      //Not empty, proceed with calling API
      console.log("ID", data.email);
      console.log("pw", data.password);

      instance
        .post("/user/create", {
          name: data.name,
          address: data.address,
          contactno: data.contactno,
          username: data.email,
          password: data.password,
        })
        .then(function (response) {
          var responseData = response.data;
          console.log(typeof responseData);
          console.log(response);
          // name, username, password, address, contactno;
          if (isMongo == 1) {
            console.log("is Mongo!!");
            if (typeof responseData === "object") {
              console.log("added");
              setModalType("added");
              setOpen(true);
            } else {
              console.log(response);
            }
          } else {
            if (response.data == "Success") {
              console.log("added");
              setModalType("added");
              setOpen(true);
            } else if (response.data == "isExist") {
              setModalType("exist");
              setOpen(true);
              console.log("account already exists");
            } else {
              console.log(response);
            }
          }
        })
        .catch(function (error) {
          setModalType("error");
          setOpen(true);
          console.log(error);
        });
    }
  };
  return (
    <div>
      {/* Personalized toolbar for each specific page */}
      <AppBar position="static">
        <Toolbar>
          <HotelOutlinedIcon className={classes.icon}></HotelOutlinedIcon>
          <Typography
            href="/"
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Login
            </Link>
          </Typography>
          <Typography href="/register" variant="h6" className={classes.title}>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "white",
              }}
              // href="/login"
              color="inherit"
            >
              <div style={{ color: " grey" }}>Sign Up</div>
            </Link>
          </Typography>
          <Typography
            href="/checkbooking"
            variant="h6"
            className={classes.title}
          >
            <Link
              to="/checkbooking"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Check Bookings
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            onSubmit={handleSubmit((data) => validateRegister(data))}
            className={classes.form}
            noValidate
            style={{ paddingTop: "10px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  inputRef={register}
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  inputRef={register}
                  required
                  fullWidth
                  id="address"
                  label="Home Address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  inputRef={register}
                  required
                  type="number"
                  fullWidth
                  id="contactno"
                  label="Contact Number"
                  name="contactno"
                  autoComplete="contactno"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  inputRef={register}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  inputRef={register}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={useStyles.submit}
            >
              Sign Up
            </Button>
            <Grid container style={{ paddingTop: "10px" }}>
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
          <Modal center open={open} onClose={onCloseModal}>
            {modalType === "empty" ? (
              <div>
                <h2> Empty fields</h2>
                <p>Please fill in all fields before signing up.</p>
              </div>
            ) : modalType === "added" ? (
              <div>
                <h2> User Created</h2>
                <p>You can proceed to login now.</p>
              </div>
            ) : modalType === "exist" ? (
              <div>
                <h2> Account Exists </h2>
                <p>Account already exists.</p>
              </div>
            ) : (
              <div>
                <h2> Error Fetching </h2>
                <p>Please contact the administrator.</p>
              </div>
            )}
          </Modal>
        </div>
      </Container>
    </div>
  );
};

const CheckBooking = () => {
  const classes = useStyles();
  //States
  const [open, setOpen] = useState(false); //Open or close modal;
  const [modalType, setModalType] = useState("empty"); //State for modalType to let modal appear as the specific type. (e.g. invalid, error)
  const [bookingItem, setbookingItem] = useState("");

  //Modal Functions
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const inputBookingIdRef = useRef();

  const validateBookingId = () => {
    let input = inputBookingIdRef.current.value;
    console.log("clicked", input);
    if (input == "") {
      setModalType("empty");
      setOpen(true);
    } else {
      const url = `/booking/${input}`;

      // const url = `/hotel/hotellistingwithdetailsbyid`;
      instance
        .get(url)
        .then(function (response) {
          var responseData = response.data;
          console.log(response);
          console.log(typeof responseData);
          console.log(responseData);

          if (Array.isArray(responseData)) {
            if (responseData.length == 0) {
              setModalType("invalid");
              setOpen(true);
            } else {
              // responseData[0].checkindate = "";
              // responseData[0].checkoutdate = "";
              if (isMongo == 1) {
                var responseObj = {
                  _id: responseData[0]._id,
                  checkindate: responseData[0].checkindate,
                  checkoutdate: responseData[0].checkoutdate,
                  numofguest: responseData[0].numofguest,
                  roomType: responseData[0].roomType,
                  customerid: responseData[0].customerid,
                  listingid: responseData[0].listingid,
                  hotelname: responseData[0].listing.hotelname,
                  address: responseData[0].listing.address,
                  city: responseData[0].listing.city,
                  amenities: responseData[0].listing.amenities,
                };
                setbookingItem(responseObj);
              } else {
                setbookingItem(responseData[0]);
              }
              setModalType("found");
              setOpen(true);
            }
          } else {
            //Not array, was returned some other things.
            console.log("not an array");
          }
        })
        .catch(function (error) {});
    }
  };
  return (
    <div>
      {/* Personalized toolbar for each specific page */}
      <AppBar position="static">
        <Toolbar>
          <HotelOutlinedIcon className={classes.icon}></HotelOutlinedIcon>
          <Typography
            href="/"
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Login
            </Link>
          </Typography>
          <Typography href="/register" variant="h6" className={classes.title}>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "white",
              }}
              color="inherit"
            >
              Sign Up
            </Link>
          </Typography>
          <Typography
            href="/checkbooking"
            variant="h6"
            className={classes.title}
          >
            <Link
              to="/checkbooking"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              <div style={{ color: " grey" }}>Check Booking</div>
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Check Booking
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            inputRef={inputBookingIdRef}
            id="email"
            label="Enter your Booking Number"
            name="email"
            autoFocus
            style={{ paddingBottom: "20px" }}
          />
          <Button
            onClick={() => validateBookingId()}
            variant="contained"
            color="primary"
          >
            <text style={{ fontSize: "17px" }}>Enter</text>
          </Button>
          <Modal
            closeOnOverlayClick={false}
            center
            open={open}
            onClose={onCloseModal}
          >
            {modalType === "invalid" ? (
              <div>
                <h2> Invalid Booking ID </h2>
                <p>Your booking could not be found.</p>
              </div>
            ) : modalType === "empty" ? (
              <div>
                <h2> Empty fields</h2>
                <p>Please fill in all fields before logging in.</p>
              </div>
            ) : modalType === "found" ? (
              <div>
                <h2 style={{ textAlign: "center" }}> Booking details</h2>

                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>Hotel Name:</Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      {bookingItem.hotelname}
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>Address:</Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      {bookingItem.address}
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>Room Type:</Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      {bookingItem.roomType}
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>Guests:</Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      {bookingItem.numofguest}
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>Check In Date:</Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      <Moment format="D MMM YYYY">
                        {bookingItem.checkindate}
                      </Moment>
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>
                      Check Out Date:
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      <Moment format="D MMM YYYY">
                        {bookingItem.checkoutdate}
                      </Moment>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <div>
                <h2> Error fetching</h2>
                <p>Please contact the administrator.</p>
              </div>
            )}
          </Modal>
        </div>
      </Container>
    </div>
  );
};

const BookingHotel = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  const [currentListingId, setcurrentListingId] = useState("");
  const [currentUserId, setcurrentUserId] = useState("");
  const [hotelDetails, setHotelDetails] = useState("");
  const [hotelRooms, setHotelRooms] = useState([]);
  const [inputRoomType, setInputRoomType] = useState("");
  const [open, setOpen] = useState(false); //Open or close modal;
  const [modalType, setModalType] = useState("empty"); //State for modalType to let modal appear as the specific type. (e.g. invalid, error)

  let receivedUserId = location.state.currentUserId;
  let receivedlistingId = location.state.currentListingId;

  //Modal Functions
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    history.push({
      pathname: "/dashboard",
      state: {
        currentUserId: currentUserId,
      },
    });
    setOpen(false);
  };

  useEffect(() => {
    console.log("booking hotel listing id", receivedlistingId);

    setcurrentListingId(receivedlistingId);
  }, [receivedlistingId]);
  useEffect(() => {
    console.log("booking hotel user id", receivedUserId);
    setcurrentUserId(receivedUserId);
  }, [receivedUserId]);

  useEffect(() => {
    console.log("setting", hotelRooms);
    setHotelRooms(hotelRooms);
  }, [hotelRooms]);

  useEffect(() => {
    console.log("setting hotel details", hotelDetails);
    setHotelDetails(hotelDetails);
  }, [hotelDetails]);

  useEffect(() => {
    console.log("setting room type", inputRoomType);
    setInputRoomType(inputRoomType);
  }, [inputRoomType]);

  //Use this to stop first render from triggering axios request which leads to error
  const isFirstRun = useRef(true);

  useEffect(() => {
    //if first render, don't do anything
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    console.log("current listing iddddd", currentListingId);
    const url = `/hotel/hotellistingWithDetail/${currentListingId}`;

    instance
      .get(url)
      .then(function (response) {
        var responseData = response.data;
        console.log(typeof responseData);
        console.log(responseData);
        if (Array.isArray(responseData)) {
          var hotelRoomArray = [];
          console.log("is an array", hotelRoomArray);
          if (isMongo == 1) {
            let hotelDetailsObj = {
              hotelname: responseData[0].hotelname,
              address: responseData[0].address,
              city: responseData[0].city,
              amenities: responseData[0].amenities,
            };
            setHotelDetails(hotelDetailsObj);
            responseData.map((item) => {
              console.log(item);
              var hotelRoomObj = {};
              hotelRoomObj.roomType = item.hotellistingwithdetails.roomType;
              hotelRoomObj.numOfRooms = item.hotellistingwithdetails.numOfRooms;
              console.log("hotel room obj", hotelRoomObj);
              hotelRoomArray.push(hotelRoomObj);
            });
            console.log("array after push", hotelRoomArray);

            setHotelRooms(hotelRoomArray);
          } else {
            responseData.map((item) => {
              let hotelRoomObj = {
                roomType: "",
                numOfRooms: "",
              };
              console.log("array before", hotelRoomArray);

              console.log("my item is", item);
              if (item.listingid == 1) {
                let hotelDetailsObj = {
                  hotelname: "",
                  address: "",
                  city: "",
                  amenities: "",
                };

                hotelDetailsObj.hotelname = item.hotelname;
                hotelDetailsObj.address = item.address;
                hotelDetailsObj.city = item.city;
                hotelDetailsObj.amenities = item.amenities;
                setHotelDetails(hotelDetailsObj);
              }
              hotelRoomObj.roomType = item.roomType;
              hotelRoomObj.numOfRooms = item.numOfRooms;
              console.log("hotel room obj", hotelRoomObj);
              hotelRoomArray.push(hotelRoomObj);
              console.log("array after push", hotelRoomArray);
            });
          }
          setHotelRooms(hotelRoomArray);
          // console.log("hotel Rooms are ", hotelRoomArray);
        } else {
          //Not array, was returned some other things.
          console.log("not an array");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentListingId]);

  const { register, handleSubmit, errors } = useForm();

  const selectRoom = (roomType) => {
    console.log("selected roomtype ", roomType);
    setInputRoomType(roomType);
  };
  const confirmBook = (data) => {
    console.log(data);
    console.log("confirm book data ", data.hotelname);
    console.log("confirm book data ", data.hoteladdress);
    console.log("confirm book data ", data.hotelroomtype);
    console.log("confirm book data ", data.checkindate);
    console.log("confirm book data ", data.checkoutdate);
    console.log("confirm book data ", data.numOfGuest);
    console.log("user id ", currentUserId);
    console.log("listing id ", currentListingId);

    if (
      data.hotelname === "" ||
      data.hoteladdress === "" ||
      data.hotelroomtype === "" ||
      data.checkindate === "" ||
      data.checkoutdate === "" ||
      data.numOfGuest === ""
    ) {
      setOpen(true);
      setModalType("empty");
    } else {
      console.log("fields not empty");
      instance
        .post("/booking/create", {
          checkindate: data.checkindate,
          checkoutdate: data.checkoutdate,
          numofguest: data.numOfGuest,
          isCanceled: 0,
          customerid: currentUserId,
          roomType: data.hotelroomtype,
          listingid: currentListingId,
        })
        .then(function (response) {
          var responseData = response.data;
          console.log(typeof responseData);
          console.log(responseData);
          console.log(response);
          if (isMongo == 1) {
            if (responseData.insertedCount == 1) {
              console.log("created");
              setModalType("created");
              setOpen(true);
            } else {
              console.log(response);
            }
          } else {
            if (responseData.affectedRows == 1 && responseData.insertId != "") {
              console.log("created");
              setModalType("created");
              setOpen(true);
            } else {
              console.log(response);
            }
          }
        })
        .catch(function (error) {
          setModalType("error");
          setOpen(true);
          console.log(error);
        });
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <HotelOutlinedIcon className={classes.icon}></HotelOutlinedIcon>
          <Typography
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to={{
                pathname: "/dashboard",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Home
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={{
                pathname: "/profile",
                state: { currentUserId: currentUserId },
              }}
              style={{
                textDecoration: "none",
                color: "white",
              }}
              color="inherit"
            >
              Profile
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={{
                pathname: "/mybookings",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              My Bookings
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Logout
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xm" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <Typography component="h1" variant="h5">
          Booking Page
        </Typography>{" "}
        <Card>
          <CardMedia
            className={classes.media}
            image={hotelimgasset}
            title="Hotel Image"
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Typography variant="h5" component="p">
                  Choose Your Rooms
                </Typography>
                <div direction="row">
                  {hotelRooms.map((item) => (
                    <Card
                      style={{
                        display: "inline-block",
                        width: "20rem",
                        height: "20rem",
                        margin: "1rem",
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={hotelroomasset}
                          title="Hotel Image"
                        />
                        <CardContent>
                          <div style={{ overflow: "hidden", height: "2rem" }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h3"
                            >
                              {item.roomType}
                            </Typography>
                          </div>
                          {/* <div style={{ overflow: "hidden", height: "4rem" }}>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {item.numOfRooms}
                            </Typography>
                          </div> */}
                          <div
                            style={{
                              height: "4rem",
                              alignSelf: "flex-end",
                              paddingTop: "10px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="textPrimary"
                              component="p"
                            >
                              Amenities
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Air Conditioning, Room Service, Television ,
                              Coffee/Tea Maker
                            </Typography>
                          </div>
                        </CardContent>
                      </CardActionArea>
                      <CardActions style={{}}>
                        <div style={{ alignItems: "" }}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={() => selectRoom(item.roomType)}
                            // style={{ alignSelf: "center" }}
                          >
                            Choose This
                          </Button>
                        </div>
                      </CardActions>
                    </Card>
                  ))}
                </div>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h5" component="p">
                  Fill in your details
                </Typography>
                <form
                  className={useStyles.form}
                  noValidate
                  onSubmit={handleSubmit((data) => confirmBook(data))}
                >
                  <TextField
                    margin="normal"
                    fullWidth
                    inputRef={register}
                    id="hotelname"
                    name="hotelname"
                    label="Hotel Name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={hotelDetails.hotelname}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                    style={{ paddingBottom: "20px" }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    inputRef={register}
                    id="hoteladdress"
                    name="hoteladdress"
                    label="Hotel Address"
                    value={hotelDetails.address}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                    style={{ paddingBottom: "20px" }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    inputRef={register}
                    id="hotelroomtype"
                    name="hotelroomtype"
                    label="Room Type"
                    value={inputRoomType}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                    style={{ paddingBottom: "20px" }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    inputRef={register}
                    type="date"
                    id="checkindate"
                    name="checkindate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Check In Date"
                    style={{ paddingBottom: "20px" }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    inputRef={register}
                    type="date"
                    id="checkoutdate"
                    name="checkoutdate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Check Out Date"
                    style={{ paddingBottom: "20px" }}
                  />
                  <TextField
                    margin="normal"
                    type="number"
                    fullWidth
                    inputRef={register}
                    id="numOfGuest"
                    name="numOfGuest"
                    label="Number of Guests"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ paddingBottom: "20px" }}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Confirm
                  </Button>
                </form>
                {/* checkindate: request.body.checkindate, checkoutdate:
                request.body.checkoutdate, numofguest: request.body.numofguest,
                isCanceled: request.body.isCanceled, customerid:
                request.body.customerId, roomType: request.body.roomType */}
              </Grid>
            </Grid>
          </CardContent>{" "}
        </Card>
        <Modal center open={open} onClose={onCloseModal}>
          {modalType === "invalid" ? (
            <div>
              <h2> Invalid</h2>
              <p>Invalid input, try again or contact the administrator.</p>
            </div>
          ) : modalType === "empty" ? (
            <div>
              <h2> Empty fields</h2>
              <p>Please fill in all fields before creating a booking.</p>
            </div>
          ) : modalType === "created" ? (
            <div>
              <h2> Booking Created!</h2>
              <p>You will receive an email confirmation in 1-2 days.</p>
            </div>
          ) : (
            <div>
              <h2> Error fetching</h2>
              <p>Please contact the administrator.</p>
            </div>
          )}
        </Modal>
      </Container>
    </div>
  );
};

const Dashboard = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  let receivedUserId = location.state.currentUserId;

  const [hotelListing, sethotelListing] = useState([]);
  const [currentUserId, setcurrentUserId] = useState("");

  useEffect(() => {
    console.log("setting dashbaord user id", receivedUserId);
    setcurrentUserId(receivedUserId);
  }, [receivedUserId]);

  //Use this to stop first render from triggering axios request which leads to error
  const isFirstRun = useRef(true);

  useEffect(() => {
    //if first render, don't do anything
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const url = `/hotel/hotellisting`;

    instance
      .get(url)
      .then(function (response) {
        var responseData = response.data;
        console.log(typeof responseData);
        console.log(responseData);
        if (isMongo == 1) {
          if (Array.isArray(responseData)) {
            responseData.map((item) => {
              item.listingid = item._id;
            });
            console.log(responseData);
            sethotelListing(responseData);
          }
        } else {
          if (Array.isArray(responseData)) {
            console.log("is an array");
            sethotelListing(responseData);
          } else {
            //Not array, was returned some other things.
            console.log("not an array");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentUserId]);

  const bookHotel = (id) => {
    console.log("hotel listing id", id);
    history.push({
      pathname: "/bookingHotel",
      state: {
        currentListingId: id,
        currentUserId: currentUserId,
      },
    });
  };

  return (
    <div>
      {/* Personalized toolbar for each specific page */}
      <AppBar position="static">
        <Toolbar>
          <HotelOutlinedIcon className={classes.icon}></HotelOutlinedIcon>
          <Typography
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to={{
                pathname: "/dashboard",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              <div style={{ color: " grey" }}>Home</div>
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={{
                pathname: "/profile",
                state: { currentUserId: currentUserId },
              }}
              style={{
                textDecoration: "none",
                color: "white",
              }}
              color="inherit"
            >
              Profile
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={{
                pathname: "/mybookings",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              My Bookings
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Logout
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xm" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <Typography component="h1" variant="h5">
          Hotels
        </Typography>{" "}
        <div direction="row">
          {hotelListing.map((row) => (
            <Card
              style={{
                display: "inline-block",
                width: "20rem",
                height: "21rem",
                margin: "1rem",
              }}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={hotelimgasset}
                  title="Hotel Image"
                />
                <CardContent>
                  <div style={{ overflow: "hidden", height: "2rem" }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {row.hotelname}
                    </Typography>
                  </div>
                  <div style={{ overflow: "hidden", height: "4rem" }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {row.address}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {row.city}
                    </Typography>
                  </div>
                </CardContent>
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  component="p"
                  style={{ alignSelf: "flex-end" }}
                >
                  Amenities: {row.amenities}
                </Typography>
              </CardActionArea>
              <CardActions style={{ alignSelf: "flex-end" }}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => bookHotel(row.listingid)}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};
const Profile = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  let receivedUserId = location.state.currentUserId;
  const [myProfile, setmyProfile] = useState([]);
  const [currentUserId, setcurrentUserId] = useState("");

  useEffect(() => {
    setcurrentUserId(receivedUserId);
    console.log(receivedUserId);
  }, [receivedUserId]);

  //Use this to stop first render from triggering axios request which leads to error
  const isFirstRun = useRef(true);

  useEffect(() => {
    //if first render, don't do anything
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    console.log("do fetching here", currentUserId);
    const url = `/customer/${currentUserId}`;
    instance
      .get(url)
      .then(function (response) {
        var responseData = response.data;
        console.log(typeof responseData);
        console.log(responseData);
        if (isMongo == 1) {
          responseData.id = responseData._id;
          responseData.contactNo = responseData.contactno;
          setmyProfile(responseData);
        } else {
          if (Array.isArray(responseData)) {
            console.log("is an array");
            setmyProfile(responseData[0]);
          } else {
            //Not array, was returned some other things.
            console.log("not an array");
          }
        }
      })
      .catch(function (error) {});
  }, [currentUserId]);

  return (
    <div>
      {/* Personalized toolbar for each specific page */}
      <AppBar position="static">
        <Toolbar>
          <HotelOutlinedIcon className={classes.icon}></HotelOutlinedIcon>
          <Typography
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to={{
                pathname: "/dashboard",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Home
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={{
                pathname: "/profile",
                state: { currentUserId: currentUserId },
              }}
              style={{
                textDecoration: "none",
                color: "white",
              }}
              color="inherit"
            >
              <div style={{ color: " grey" }}>Profile</div>
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={{
                pathname: "/mybookings",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              My Bookings
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Logout
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <div>
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: "1rem" }}
          >
            Profile
          </Typography>
          <Card>
            {/* {myProfile.name}
            {myProfile.contactNo}
            {myProfile.address}
            {myProfile.username}
            {myProfile.password} */}
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Typography variant="body2" component="p">
                    Name:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body2" component="p">
                    {myProfile.name}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2" component="p">
                    Contact Number:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body2" component="p">
                    {myProfile.contactNo}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2" component="p">
                    Address:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body2" component="p">
                    {myProfile.address}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2" component="p">
                    Username:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body2" component="p">
                    {myProfile.username}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

const MyBookings = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  let receivedUserId = location.state.currentUserId;
  const [myBookingList, setmyBookingList] = useState([]);
  const [currentUserId, setcurrentUserId] = useState("");

  useEffect(() => {
    setcurrentUserId(receivedUserId);
    console.log(receivedUserId);
  }, [receivedUserId]);

  useEffect(() => {
    console.log("setting list", myBookingList);

    setmyBookingList(myBookingList);
  }, [myBookingList]);
  //Use this to stop first render from triggering axios request which leads to error
  const isFirstRun = useRef(true);

  useEffect(() => {
    //if first render, don't do anything
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    console.log("do fetching here", currentUserId);
    const url = `/booking/customer/${currentUserId}`;

    instance
      .get(url)
      .then(function (response) {
        var responseData = response.data;
        console.log(typeof responseData);
        console.log(responseData);

        if (isMongo == 1) {
          // _id: responseData[0]._id,
          // checkindate: responseData[0].checkindate,
          // checkoutdate: responseData[0].checkoutdate,
          // numofguest: responseData[0].numofguest,
          // roomType: responseData[0].roomType,
          // customerid: responseData[0].customerid,
          // listingid: responseData[0].listingid,
          // hotelname: responseData[0].listing.hotelname,
          // address: responseData[0].listing.address,
          // city: responseData[0].listing.city,
          // amenities: responseData[0].listing.amenities,
          var list = [];
          responseData.map((item) => {
            var myBookingObj = {
              bookingid: item._id,
              checkindate: item.checkindate,
              checkoutdate: item.checkoutdate,
              customerid: item.customerid,
              roomType: item.roomType,
              numofguest: item.numofguest,
              listingid: item.listingid,
              hotelname: item.listing.hotelname,
              address: item.listing.address,
              city: item.listing.city,
              amenities: item.listing.amenities,
            };
            console.log("object is", myBookingObj);
            list.push(myBookingObj);
          });
          console.log(list);
          setmyBookingList(list);
        } else {
          if (Array.isArray(responseData)) {
            console.log("is an array");
            setmyBookingList(responseData);
          } else {
            //Not array, was returned some other things.
            console.log("not an array");
          }
        }
      })
      .catch(function (error) {});
  }, [currentUserId]);

  return (
    <div>
      {/* Personalized toolbar for each specific page */}
      <AppBar position="static">
        <Toolbar>
          <HotelOutlinedIcon className={classes.icon}></HotelOutlinedIcon>
          <Typography
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to={{
                pathname: "/dashboard",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Home
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={{
                pathname: "/profile",
                state: { currentUserId: currentUserId },
              }}
              style={{
                textDecoration: "none",
                color: "white",
              }}
              color="inherit"
            >
              Profile
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={{
                pathname: "/mybookings",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              <div style={{ color: " grey" }}>My Bookings</div>
            </Link>
          </Typography>
          <Typography
            href="/checkbooking"
            variant="h6"
            className={classes.title}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Logout
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <div>
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: "1rem" }}
          >
            My Bookings
          </Typography>
          {myBookingList.map((row) => (
            <div>
              <Card className={classes.root} style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{ marginBottom: "10px" }}
                  >
                    Booking #{row.bookingid}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <Typography variant="body2" component="p">
                        Hotel Name
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" component="p">
                        {row.hotelname}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2" component="p">
                        Address
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" component="p">
                        {row.address}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2" component="p">
                        Room Type
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" component="p">
                        {row.roomType}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2" component="p">
                        Guests
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" component="p">
                        {row.numofguest}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2" component="p">
                        Check In Date
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" component="p">
                        <Moment format="D MMM YYYY">{row.checkindate}</Moment>
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2" component="p">
                        Check Out Date
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" component="p">
                        <Moment format="D MMM YYYY">{row.checkoutdate}</Moment>
                      </Typography>
                    </Grid>
                  </Grid>
                  {}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/checkbooking">
          <CheckBooking />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/bookinghotel">
          <BookingHotel />
        </Route>
        <Route path="/mybookings">
          <MyBookings />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
