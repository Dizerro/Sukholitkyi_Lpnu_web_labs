const express = require("express");
const router = express.Router();
const tours = require("../controllers/tour.controller.js");

router.post("/", tours.create);
router.get("/", tours.findAll);
router.get("/:id", tours.findOne);
router.put("/:id", tours.update);
router.delete("/:id", tours.delete);

module.exports = router;