const express = require("express");
// const auth = require('../src/middleware/auth');
const router = new express.Router();

const createUser = require("../components/user/create");
const updateUser = require("../components/user/update");
const getUser = require("../components/user/get");
const deleteUser = require("../components/user/delete");

router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

module.exports = router;
