// import PatientController
const PatientController = require("../controllers/PatientController");

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get("/patients", PatientController.index); // Get All Resource
router.post("/patients", PatientController.store); // Add resource
router.put("/patients/:id", PatientController.update); // Edit resource

// export router
module.exports = router;
