const Patient = require("../models/Patient");

class PatientController {
  // Mendapatkan semua data pasien
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

  // Menambahkan data pasien baru
  async store(req, res) {
    try {
      const { name, phone, address, status, in_date_at, out_date_at } = req.body;

      // Validasi input
      if (!name || !phone || !address || !status || !in_date_at) {
        return res.status(422).json({
          message: "All fields must be filled correctly",
        });
      }

      // Membuat pasien baru
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

  // Mengupdate data pasien berdasarkan ID
  async update(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id); // Mencari pasien berdasarkan ID

    if (patient) {
      const updatedPatient = await Patient.update(req.body, id); // Mengupdate data pasien
      return res.status(200).json({
        message: `Resource patient id ${id} is updated successfully`,
        data: updatedPatient,
      });
    } else {
      return res.status(404).json({
        message: `Resource patient id ${id} not found`,
      });
    }
  }

  // Menghapus data pasien berdasarkan ID
  async destroy(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      await Patient.delete(id); // Menghapus pasien
      return res.status(200).json({
        message: `Deleted patient with id ${id}`,
        data: patient,
      });
    } else {
      return res.status(404).json({
        message: `Patient with id ${id} not found`,
      });
    }
  }

  // Mendapatkan detail data pasien berdasarkan ID
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

  // Mencari data pasien berdasarkan nama
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

  // Mendapatkan data pasien dengan status positif
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

  // Mendapatkan data pasien yang sembuh
  async getRecovered(req, res) {
    try {
      const patients = await Patient.getRecovered();
      res.status(200).json({
        message: "Get recovered resource",
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

  // Mendapatkan data pasien yang meninggal
  async getDead(req, res) {
    try {
      const patients = await Patient.getDead();
      res.status(200).json({
        message: "Get dead resource",
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
