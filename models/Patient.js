// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients";

      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

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

          // Kembalikan data pasien baru yang disimpan
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
  
  // mencari data patient berdasarkan id
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        // destructure object results
        const patient = results;
        resolve(patient);
      });
    });
  }

  // mengupdate data patient
  static async update(data, id) {
    data.out_date_at = new Date();
    await new Promise((resolve, reject) => {
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    const patient = await Patient.find(id);
    return patient;
  }

  // menghapus data patient
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

 
   // Mendapatkan resource detail berdasarkan ID
   static findById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Hanya mengembalikan satu hasil
      });
    });
  }

  // Mencari resource berdasarkan nama
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



// export class Patient
module.exports = Patient;
