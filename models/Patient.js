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

  // static update(id, data) {
  //   const { name, phone, address, status, in_date_at, out_date_at } = data;
  //   return db.query(
  //     "UPDATE patients SET name = ?, phone = ?, address = ?, status = ?, in_date_at = ?, out_date_at = ? WHERE id = ?",
  //     [name, phone, address, status, in_date_at, out_date_at, id]
  //   );
  // }

  
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
}

// export class Patient
module.exports = Patient;
