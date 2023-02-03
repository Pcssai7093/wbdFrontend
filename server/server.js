const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userConstructor = module.require("./Schemas/users");
const adminConstructor = module.require("./Schemas/admins");
const serviceConstructor = module.require("./Schemas/services");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
dotenv.config();

app.listen("5000", () => {
  console.log("mongoose server running at port 5000");
  mongoose
    .connect(process.env.dbid)
    .then(() => {
      console.log("mongodb connection successful");
      // * adding data

      //     //* code 11000 for duplication key error
      //     //* get error attribute from err.keyValue
      //     // console.log(err.keyValue);
      //   });
    })
    .catch((err) => {
      console.log(err);
      console.log("mongodb connection error");
    });
});

app.get("/", (req, res) => {
  res.send("server running");
});
app.post("/user/signin", (req, res) => {
  let data = req.body;
  let signin = false;
  // console.log(data);
  userConstructor
    .find({ email: data.email })
    .then((result) => {
      console.log(data.password);
      console.log(result[0].password);
      let hashnew = bcrypt.hashSync(data.password, 2);
      console.log(bcrypt.compareSync(data.password, hashnew));
      if (bcrypt.compareSync(data.password, result[0].password)) {
        res.send(result[0].fullname);
      } else {
        res.send("err");
      }
    })
    .catch((err) => {
      res.send(err);
    });
  // * if signin successful send data (id + name)
  // res.send(req.body);
});

app.post("/user/signup", (req, res) => {
  let data = req.body;
  userConstructor(data)
    .save()
    .then((response) => {
      // console.log(response);
      res.send(response._id);
      // res.send(response);
    })
    .catch((err) => {
      // console.log(err);
      // * handle errors by parsing this err object
      res.send(err);
    });
});

app.get("/services", (req, res) => {
  // console.log(serviceConstructor.populate("seller"));
  serviceConstructor
    .find()
    .populate("seller")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/service/add", (req, res) => {
  let data = req.body;
  let sellerId = req.body.seller;
  console.log(sellerId);
  serviceConstructor(data)
    .save()
    .then((result) => {
      // * syntax to update
      const update = { $push: { services: [result._id] } };
      userConstructor
        .update({ _id: sellerId }, update)
        .then((result2) => {
          res.send(result._id);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get("/services/:sid", (req, res) => {
  let serviceId = req.params.sid;
  serviceConstructor
    .findOne({ _id: serviceId })
    .populate("seller")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/wishlist/add", (req, res) => {
  // contains data of the service and user

  let data = req.body;
  // * handle if service is not added by parsing ack
  const update = { $addToSet: { wishlist: [data.sid] } };
  userConstructor
    .updateOne({ _id: data.uid }, update)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/wishlist/:uid", (req, res) => {
  let uid = req.params.uid;
  // * important nested population query
  userConstructor
    .findOne({ _id: uid })
    .populate({
      path: "wishlist",
      populate: {
        path: "seller",
      },
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.post("/wishlist/delete", (req, res) => {
  // contains data of the service and user
  let data = req.body;
  const update = { $pull: { wishlist: data.sid } };
  userConstructor
    .updateOne({ _id: data.uid }, update)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/user/:uid", (req, res) => {
  userConstructor
    .findOne({ _id: req.params.uid })
    .populate("services")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/user/update", (req, res) => {
  // * user data update
  const data = req.body;
  const uid = data.uid;

  delete data.uid;

  userConstructor
    .updateOne({ _id: uid }, data)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/admin/signin", (req, res) => {
  let data = req.body;
  let signin = false;
  // console.log(data);
  adminConstructor
    .find({ email: data.email })
    .then((result) => {
      console.log(data.password);
      console.log(result[0].password);
      let hashnew = bcrypt.hashSync(data.password, 2);
      console.log(bcrypt.compareSync(data.password, hashnew));
      if (bcrypt.compareSync(data.password, result[0].password)) {
        res.send(result[0].fullname);
      } else {
        res.send("err");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/users", (req, res) => {
  userConstructor
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
