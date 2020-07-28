const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
let user = [
  {
    id: 1,
    username: "admin",
    password: 12345678,
    preName: "Thi",
    firstName: "Do",
    lastName: "Ngoc",
    role: "adminstration",
    createdAt: "Date",
    updateAt: "Date",
  },
  {
    id: 2,
    username: "admin2",
    password: 12345678,
    preName: "Thi",
    firstName: "Do",
    lastName: "N",
    role: "adminstration",
    createdAt: "Date",
    updateAt: "Date",
  },
  {
    id: 3,
    username: "admin3",
    password: 12345678,
    preName: "Thi",
    firstName: "Do",
    lastName: "Ng",
    role: "adminstration",
    createdAt: "Date",
    updateAt: "Date",
  },
  {
    id: 4,
    username: "admin4",
    password: 12345678,
    preName: "Thi",
    firstName: "Do",
    lastName: "Ngo",
    role: "adminstration",
    createdAt: "Date",
    updateAt: "Date",
  },
  {
    id: 5,
    username: "admin5",
    password: 12345678,
    preName: "Thi",
    firstName: "Do",
    lastName: "Ngoc5",
    role: "adminstration",
    createdAt: "Date",
    updateAt: "Date",
  },
];

function getAllUsers() {
  let userList = user.map((e) => {
    return {
      Fullname: e.firstName + " " + e.preName + " " + e.lastName,
      Role: e.role,
    };
  });
  return userList;
}

function getUserDetail(id) {
  let findUserById = user.find((e) => {
    return e.id == id;
  });
  let formatedUser = null;
  if (findUserById !== undefined) {
    formatedUser = {
      Fullname:
        findUserById.firstName +
        " " +
        findUserById.preName +
        " " +
        findUserById.lastName,
      Role: findUserById.role,
    };
  }
  return formatedUser;
}

function createUser(newUser) {
  user.push(newUser);
  return getAllUsers();
}

function updateUser(id, newData) {
  let updateUser = user.findIndex((i) => {
    return i.id === Number(id);
  });
  let updateKey = Object.keys(newData)
  console.log(updateKey)
  for(var key of updateKey){
      user[updateUser][key] = newData[key]
  }
  return getUserDetail(id);
}

function deleteUser(id) {
  let deleteUser = user.findIndex((i) => {
    return i.id === Number(id);
  });
  if (deleteUser !== -1) {
    user.splice(deleteUser, 1);
  }
  return deleteUser;
}
function verifyAccessToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== "undefined") {
    req.token = authHeader.split(" ")[1];
    next();
  } else {
    res.sendStatus(403);
  }
}

//log into database
router.post("/login", function (req, res, next) {
  let loggedUser = user.find((e) => {
    return e.username == req.body.username;
  });
  if (loggedUser == undefined) {
    res.sendStatus(404);
  } else if (req.body.password == loggedUser.password) {
    jwt.sign({ loggedUser }, "secretKey", (err, token) => {
      res.send({ token: token });
    });
  }
});

//get users/user from database
router.get("/users", verifyAccessToken, function (req, res, next) {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      res.json({
        message: "Token verified",
        authData,
        listUser: getAllUsers(),
      });
    }
  });
});

router.get("/user/:id", verifyAccessToken, function (req, res, next) {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      res.json({
        message: "Token verified",
        authData,
        userById: getUserDetail(req.params.id),
      });
    }
  });
});

//add new into database
router.post("/users", verifyAccessToken, function (req, res, next) {
  let newUser = req.body;
  if (Object.keys(newUser).length !== 0) {
    jwt.verify(req.token, "secretKey", (err, authData) => {
      if (err) res.sendStatus(403);
      else {
        res.json({
          message: "Token verified",
          authData,
          newUserList: createUser(newUser),
        });
      }
    });
  } else {
    res.sendStatus(417);
  }
});

//update one in database
router.put("/user/:id", verifyAccessToken, function (req, res, next) {
  let newUserData = req.body;
  if (Object.keys(newUserData).length !== 0) {
    jwt.verify(req.token, "secretKey", (err, authData) => {
      if (err) res.sendStatus(403);
      else {
        res.json({
          message: "Token verified",
          authData,
          updatedUser: updateUser(req.params.id,newUserData),
        });
      }
    });
  }
});

//delete one in database
router.delete("/user/:id", verifyAccessToken, function (req, res, next) {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      res.json({
        message: "Token verified",
        authData,
        deletedUser: deleteUser(req.params.id),
        newUserList: getAllUsers(),
      });
    }
  });
});
module.exports = router;
