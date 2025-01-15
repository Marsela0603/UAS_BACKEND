// Import database
const db = require("../config/database");

// Membuat class Patient
class Patient {
  // Mengambil semua data pasien
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients";

      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Menambahkan data pasien baru
  static create(data) {
    const { name, phone, address, status, in_date_at, out_date_at } = data;
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO patients (name, phone, address, status, in_date_at, out_date_at) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(
        query,
        [name, phone, address, status, in_date_at, out_date_at],
        (err, result) => {
          if (err) return reject(err);

          // Mengembalikan data pasien baru yang disimpan
          resolve({
            id: result.insertId,
            name,
            phone,
            address,
            status,
            in_date_at,
            out_date_at,
          });
        }
      );
    });
  }

  // Mencari data pasien berdasarkan ID
  static find(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE id = ?";
      db.query(query, id, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Mengupdate data pasien
  static async update(data, id) {
    data.out_date_at = new Date(); // Menambahkan tanggal keluar jika ada
    await new Promise((resolve, reject) => {
      const query = "UPDATE patients SET ? WHERE id = ?";
      db.query(query, [data, id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    // Mengambil data pasien yang sudah diperbarui
    const patient = await Patient.find(id);
    return patient;
  }

  // Menghapus data pasien berdasarkan ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM patients WHERE id = ?";
      db.query(query, id, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Mendapatkan detail pasien berdasarkan ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Mengembalikan satu hasil
      });
    });
  }

  // Mencari pasien berdasarkan nama
  static searchByName(name) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE name LIKE ?";
      db.query(query, [`%${name}%`], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Mendapatkan semua pasien dengan status positif
  static getPositive() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE status = 'positive'";
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Mendapatkan semua pasien dengan status sembuh
  static getRecovered() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE status = 'recovered'";
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Mendapatkan semua pasien dengan status meninggal
  static getDead() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE status = 'dead'";
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

// Mengekspor class Patient
module.exports = Patient;
