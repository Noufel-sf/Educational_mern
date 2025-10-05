const express = require("express");
const { getUsers ,getUser} = require("../controllers/UsersController");

const router = express.Router();

router.get("/getusers", getUsers);

export default router;
