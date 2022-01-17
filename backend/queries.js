var crypto = require("crypto");
var mysql = require("mysql");
const { performance } = require("perf_hooks");

function initializeConnection(config) {
  function addDisconnectHandler(connection) {
    connection.on("error", function (error) {
      if (error instanceof Error) {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
          console.error(error.stack);
          console.log("Lost connection. Reconnecting...");

          initializeConnection(connection.config);
        } else if (error.fatal) {
          throw error;
        }
      }
    });
  }

  var connection = mysql.createConnection(config);
  addDisconnectHandler(connection);

  connection.connect();
  return connection;
}
var connection = initializeConnection({
  user: "root",
  host: "127.0.0.1",
  database: "seeddb",
  password: "root",
});
const loginUser = (request, response) => {
  var start = performance.now();
  var hashpass = crypto
    .createHash("md5")
    .update(request.body.password)
    .digest("hex");

  const sql = "Select * from customer where username = ? and password = ?";
  connection.query(
    sql,
    [request.body.username, hashpass],
    (error, results, fields) => {
      var end = performance.now();
      console.log("Time elapsed for login via SQL: " + (end - start));

      if (results.length > 0) {
        if (results) {
          response.status(200).json(results);
        }
      } else {
        response.status(200).send("false");
      }
    }
  );
};
const getCustomers = (request, response) => {
  var start = performance.now();
  connection.query("SELECT * FROM customer", (error, results) => {
    var end = performance.now();
    console.log("Time elapsed to retrieve All Customer Data via SQL: " + (end - start));
    if (error) {
      throw error;
    }

    response.status(200).json(results);
  });
};

const getCustomerById = (request, response) => {
  var start = performance.now();
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM customer WHERE customerid = " + [id],
    (error, results) => {
      var end = performance.now();
      console.log("Time elapsed to retrieve specific customer Data via SQL: " + (end - start));
   
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const getHotelListing = (request, response) => {
  var start = performance.now();
  connection.query("SELECT * FROM Listing", (error, results) => {
    var end = performance.now();
    console.log("Time elapsed to retrieve All Listing Data via SQL: " + (end - start));
 
    if (error) {
      throw error;
    }

    response.status(200).json(results);
  });
};
const getHotelListingById = (request, response) => {

  var start = performance.now();
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM Listing WHERE listingid = " + [id],

    (error, results) => {
      var end = performance.now();
    console.log("Time elapsed to retrieve specific Listing Data via SQL: " + (end - start));
 
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const getHotelListingDetails = (request, response) => {
  var start = performance.now();
  connection.query("SELECT * FROM HotelListingDetails", (error, results) => {
    var end = performance.now();
    console.log("Time elapsed to retrieve All Listing Details Data via SQL: " + (end - start));

    if (error) {
      throw error;
    }

    response.status(200).json(results);
  });
};
const getHotelListingDetailsById = (request, response) => {
  var start = performance.now();
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM HotelListingDetails WHERE listingdetailid = " + [id],
    (error, results) => {
      var end = performance.now();
      console.log("Time elapsed to retrieve specific Listing Details Data via SQL: " + (end - start));
  
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const getHotelListingWithDetails = (request, response) => {
  var start = performance.now();
  connection.query(
    "SELECT * FROM Listing inner join HotelListingDetails on Listing.listingid = HotelListingDetails.listingid",
    (error, results) => {
      var end = performance.now();
      console.log("Time elapsed to retrieve All Listing with its Details Data via SQL: " + (end - start));
  
      if (error) {
        throw error;
      }

      response.status(200).json(results);
    }
  );
};
const getHotelListingWithDetailsById = (request, response) => {
  var start = performance.now();
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM Listing inner join HotelListingDetails on Listing.listingid = HotelListingDetails.listingid Where Listing.listingid = " +
      [id],
    (error, results) => {
      var end = performance.now();
      console.log("Time elapsed to retrieve specific Listing with its Details Data via SQL: " + (end - start));
  
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const getHotelReview = (request, response) => {
  var start = performance.now();
  connection.query("SELECT * FROM hotelreview", (error, results) => {
    var end = performance.now();
    console.log("Time elapsed to retrieve All hotelreview Data via SQL: " + (end - start));

    if (error) {
      throw error;
    }

    response.status(200).json(results);
  });
};
const getHotelReviewById = (request, response) => {
  var start = performance.now();
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM hotelreview WHERE hotelreviewid = " + [id],
    (error, results) => {
      var end = performance.now();
      console.log("Time elapsed to retrieve specific hotelreview Data via SQL: " + (end - start));
  
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const getBooking = (request, response) => {
  var start = performance.now();
  connection.query("SELECT * FROM booking", (error, results) => {
    var end = performance.now();
    console.log("Time elapsed to retrieve All Booking Data via SQL: " + (end - start));

    if (error) {
      throw error;
    }

    response.status(200).json(results);
  });
};
//SELECT student.name FROM student INNER JOIN copy ON student.email = copy.owner WHERE
//"SELECT * FROM Listing inner join HotelListingDetails on Listing.listingid = HotelListingDetails.listingid",

const getBookingById = (request, response) => {
  var start = performance.now();
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM booking INNER JOIN listing ON booking.listingid = listing.listingid WHERE booking.bookingid = " +
      [id],
    (error, results) => {
      var end = performance.now();
      console.log("Time elapsed to retrieve specific Booking Data via SQL: " + (end - start));
  
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const getBookingByCustomerId = (request, response) => {
  var start = performance.now();
  const id = parseInt(request.params.id);
  connection.query(
    "SELECT * FROM booking INNER JOIN listing on booking.listingid = listing.listingid WHERE booking.customerid = " +
      [id],
    (error, results) => {
      var end = performance.now();
      console.log("Time elapsed to retrieve specific Booking Data of a specific customer via SQL: " + (end - start));
  
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const createListing = (request, response) => {
  var start = performance.now();
  const sql =
    "Insert into listing(hotelname,address,city ,amenities) values (?,?,?,?)";
  connection.query(
    sql,
    [
      request.body.hotelname,
      request.body.address,
      request.body.city,
      request.body.amenities,
    ],
    (error, results, fields) => {
      var end = performance.now();
      console.log("Time elapsed to create a Listing via SQL: " + (end - start));
  
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const createHotelReview = (request, response) => {
  var start = performance.now();
  const sql =
    "Insert into hotelreview(listingid,ratings,reviews) values (?,?,?)";
  connection.query(
    sql,
    [request.body.listingid, request.body.ratings, request.body.reviews],
    (error, results, fields) => {
      var end = performance.now();
      console.log("Time elapsed to create a hotelreview via SQL: " + (end - start));
  
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const createListingDetails = (request, response) => {
  var start = performance.now();
  const sql =
    "Insert into hotellistingdetails( roomType, numOfRooms , listingid) values (?,?,?)";
  connection.query(
    sql,
    [request.body.roomType, request.body.numOfRooms, request.body.listingid],
    (error, results, fields) => {
      var end = performance.now();
      console.log("Time elapsed to create a Listing Detail via SQL: " + (end - start));
  
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const createBooking = (request, response) => {
  var start = performance.now();
  const sql =
    "Insert into booking(checkindate, checkoutdate,numofguest,isCanceled,customerid,roomType, listingid) values (?,?,?,?,?,?,?)";
  connection.query(
    sql,
    [
      request.body.checkindate,
      request.body.checkoutdate,
      request.body.numofguest,
      request.body.isCanceled,
      request.body.customerid,
      request.body.roomType,
      request.body.listingid,
    ],
    (error, results, fields) => {
      var end = performance.now();
      console.log("Time elapsed to create booking Detail via SQL: " + (end - start));
  
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const createUser = (request, response) => {
  var start = performance.now();
  var hashpass = crypto
    .createHash("md5")
    .update(request.body.password)
    .digest("hex");
  const sql = "Select * from customer where username = ?";
  connection.query(sql, [request.body.username], (error, results, fields) => {
    if (results.length == 0) {
      const sql =
        "Insert into customer(name, username,password,address,contactno) values (?,?,?,?,?)";
      connection.query(
        sql,
        [
          request.body.name,
          request.body.username,
          hashpass,
          request.body.address,
          request.body.contactno,
        ],
        (error, results, fields) => {
          var end = performance.now();
          console.log("Time elapsed to create a user via SQL: " + (end - start));
      
          response.status(200).send("Success");
        }
      );
    } else {
      response.status(200).send("isExist");
    }
  });
};

const updateUser = (request, response) => {
  var start = performance.now();
  const sql =
    "update customer set name = ?, username = ?,password =?,address=?,contactno=? where customerid = ?";
  connection.query(
    sql,
    [
      request.body.name,
      request.body.username,
      request.body.password,
      request.body.address,
      request.body.contactno,
      request.body.customerid,
    ],
    (error, results, fields) => {
      var end = performance.now();
      console.log("Time elapsed to update a user info via SQL: " + (end - start));
 
      response.status(200).json(results);
    }
  );
};
const updateBooking = (request, response) => {
  var start = performance.now();
  const sql =
    "update booking set checkindate = ?, checkoutdate =?,numofguest = ?,isCanceled =?,customerid= ?,roomType= ? where bookingid = ?";
  connection.query(
    sql,
    [
      request.body.checkindate,
      request.body.checkoutdate,
      request.body.numofguest,
      request.body.isCanceled,
      request.body.customerid,
      request.body.roomType,
      request.body.bookingid,
    ],
    (error, results, fields) => {
      var end = performance.now();
      console.log("Time elapsed to update a booking info via SQL: " + (end - start));
 
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};
const updateListing = (request, response) => {
  var start = performance.now();
  const sql =
    "update listing set hotelname = ?,address = ?,city =? ,amenities=? where listingid = ?";
  connection.query(
    sql,
    [
      request.body.hotelname,
      request.body.address,
      request.body.city,
      request.body.amenities,
      request.body.listingid,
    ],
    (error, results, fields) => {
      var end = performance.now();
      console.log("Time elapsed to update a Listing info via SQL: " + (end - start));
 
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const updateHotelReview = (request, response) => {
  var start = performance.now();
  const sql =
    "update hotelreview set listingid = ?,ratings =?,reviews =? where hotelreviewid = ?";
  connection.query(
    sql,
    [
      request.body.listingid,
      request.body.ratings,
      request.body.reviews,
      request.body.hotelreviewid,
    ],
    (error, results, fields) => {
      var end = performance.now();
      console.log("Time elapsed to update a hotelreview info via SQL: " + (end - start));
 
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const updateListingDetails = (request, response) => {
  var start = performance.now();
  const sql =
    "update hotellistingdetails set roomType =?, numOfRooms =? , listingid =? where listingdetailid = ?";
  connection.query(
    sql,
    [
      request.body.roomType,
      request.body.numOfRooms,
      request.body.listingid,
      request.body.listingdetailid,
    ],
    (error, results, fields) => {
      var end = performance.now();
      console.log("Time elapsed to update a Listing Detail info via SQL: " + (end - start));
 
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
};

const deleteUser = (request, response) => {
  var start = performance.now();
  const id = parseInt(request.params.id);
  const sql = "delete from customer where customerid= ?";
  connection.query(sql, [id], (error, results, fields) => {
    var end = performance.now();
    console.log("Time elapsed to delete a user via SQL: " + (end - start));

    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};
const deleteBooking = (request, response) => {
  var start = performance.now();
  const id = parseInt(request.params.id);
  const sql = "delete from booking where customerid= ?";
  connection.query(sql, [id], (error, results, fields) => {
    var end = performance.now();
    console.log("Time elapsed to delete a booking via SQL: " + (end - start));

    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};
const deleteListing = (request, response) => {
  var start = performance.now();
  const id = parseInt(request.params.id);
  const sql = "delete from listing where listingid= ?";
  connection.query(sql, [id], (error, results, fields) => {
    var end = performance.now();
    console.log("Time elapsed to delete a Listing via SQL: " + (end - start));

    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};

const deleteListingDetails = (request, response) => {
  var start = performance.now();
  const id = parseInt(request.params.id);
  const sql = "delete from hotellistingdetails where listingdetailid= ?";
  connection.query(sql, [id], (error, results, fields) => {
    var end = performance.now();
    console.log("Time elapsed to delete a Listing detail via SQL: " + (end - start));

    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};
const deleteHotelReview = (request, response) => {
  var start = performance.now();
  const id = parseInt(request.params.id);
  const sql = "delete from hotelreview where hotelreviewid= ?";
  connection.query(sql, [id], (error, results, fields) => {
    var end = performance.now();
    console.log("Time elapsed to delete hotelreview via SQL: " + (end - start));

    if (error) {
      throw error;
    }
    response.status(200).json(results);
  });
};
module.exports = {
  getCustomers,
  getCustomerById,
  getHotelListing,
  getHotelListingById,
  getHotelListingDetails,
  getHotelListingDetailsById,
  getHotelReview,
  getHotelReviewById,
  getHotelListingWithDetails,
  getHotelListingWithDetailsById,
  getBooking,
  getBookingById,
  createUser,
  createBooking,
  createHotelReview,
  createListingDetails,
  createListing,
  updateUser,
  updateBooking,
  updateHotelReview,
  updateListing,
  updateListingDetails,
  deleteBooking,
  deleteHotelReview,
  deleteListing,
  deleteListingDetails,
  deleteUser,
  loginUser,
  getBookingByCustomerId,
};
