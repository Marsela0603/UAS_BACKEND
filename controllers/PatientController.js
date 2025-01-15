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
  
  async destroy(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      // menghapus patient berdasarkan id
      await Patient.delete(id);
      const data = {
        message: `Menghapus patient id ${id}`,
        data: patient,
      };

      return res.status(200).json(data);
    } else {
      const data = {
        message: `Data patient id ${id} tidak ditemukan`,
      };

      return res.status(404).json(data);
    }
  }
 // Get Detail Resource
 async show(req, res) {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);
    if (patient) {
      res.status(200).json({
        message: "Get Detail Resource",
        data: patient,
      });
    } else {
      res.status(404).json({
        message: "Resource not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

// Search Resource by name
async search(req, res) {
  const { name } = req.query;

  try {
    const patients = await Patient.searchByName(name);
    if (patients.length > 0) {
      res.status(200).json({
        message: "Get searched resource",
        data: patients,
      });
    } else {
      res.status(404).json({
        message: "Resource not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

// Get Positive Resource
async getPositive(req, res) {
  try {
    const patients = await Patient.getPositive();
    res.status(200).json({
      message: "Get positive resource",
      total: patients.length,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
 
}



module.exports = new PatientController();
