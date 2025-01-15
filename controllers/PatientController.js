const Patient = require("../models/Patient");

class PatientController {
  async index(req, res) {
    try {
      const patients = await Patient.getAll();
      if (patients.length > 0) {
        res.status(200).json({ message: "Get all resource", data: patients });
      } else {
        res.status(200).json({ message: "Patient data is empty" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async store(req, res) {
    try {
      const { name, phone, address, status, in_date_at, out_date_at } = req.body;

      if (!name || !phone || !address || !status || !in_date_at) {
        return res.status(422).json({
          message: "All fields must be filled correctly",
        });
      }

      const newPatient = await Patient.create({
        name,
        phone,
        address,
        status,
        in_date_at,
        out_date_at,
      });

      return res.status(201).json({
        message: "Resource is added successfully",
        data: newPatient,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }

  // Edit resource
  async update(req, res) {
    const { id } = req.params;
    // cari id patient yang akan diupdate
    const patient = await Patient.find(id);

    if (patient) {
      // melakukan update data patient
      const patients = await Patient.update(req.body, id);
      const data = {
        message: `Resource patient id ${id} is updated successfully`,
        data: patients,
      };

      // The reqeust succeeded
      return res.status(200).json(data);
    } else {
      // jika id patient tidak ditemukan
      const data = {
        message: `Resource patient id ${id} not found`,
      };

      // Resource not found
      return res.status(404).json(data);
    }
  }
  

}



module.exports = new PatientController();
