const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
router.post("/register", controller.register);

export const userRoutes = router;

