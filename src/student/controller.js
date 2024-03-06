const pool = require('../db');
const queries = require('./queries');

const getStudents = async (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getStudentById = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const addStudent = async (req, res) => {
  const { name, email, age, dob } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const emailExists = await pool.query(queries.checkEmail, [email]);
    if (emailExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const result = await pool.query(queries.addStudent, [
      name,
      email,
      age,
      dob,
    ]);
    const newStudent = result.rows[0];

    return res.status(201).json({
      message: 'Student added successfully',
      student: {
        id: newStudent.id,
        name: newStudent.name,
        email: newStudent.email,
        age: newStudent.age,
        dob: newStudent.dob,
      },
    });
  } catch (error) {
    console.error('Error adding student', error);
    res
      .status(500)
      .json({ error: 'An error occurred while adding the student' });
  }
};

const removeStudent = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    const student = results.rows[0];
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    pool.query(queries.removeStudent, [id], (error) => {
      if (error) {
        throw error;
      }
      res.status(200).json({ message: 'Student deleted successfully' });
    });
  });
};

const updateStudent = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    const student = results.rows[0];
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    pool.query(queries.updateStudent, [name, id], (error) => {
      if (error) {
        throw error;
      }
      res.status(200).json({ message: 'Student updated successfully' });
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
