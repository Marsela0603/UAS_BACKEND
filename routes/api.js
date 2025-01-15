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
router.get("/patients/:id", PatientController.show); // Get Detail Resource
router.get("/patients/search", PatientController.search); // Search Resource
router.get("/patients/positive", PatientController.getPositive); // Get Positive Resource
router.post("/patients", PatientController.store); // Add resource
router.put("/patients/:id", PatientController.update); // Edit resource
router.delete("/patients/:id", PatientController.destroy); // Delete resource
router.get("/patients/recovered", PatientController.getRecovered); // Get Recovered Resource
router.get("/patients/dead", PatientController.getDead); // Get Dead Resource

// export router
module.exports = router;
