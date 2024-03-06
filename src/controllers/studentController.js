import pool from '../config/db.js';
import queries from '../models/studentModel.js';

const getStudents = async (req, res) => {
  try {
    const results = await pool.query(queries.getStudents);
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    res.status(200).json(results.rows);
  } catch (error) {
    console.error('Error fetching students', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the students' });
  }
};

const getStudentById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const results = await pool.query(queries.getStudentById, [id]);
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error('Error fetching student by ID', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the student' });
  }
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

  try {
    const getResults = await pool.query(queries.getStudentById, [id]);
    const student = getResults.rows[0];
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await pool.query(queries.removeStudent, [id]);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student', error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the student' });
  }
};

const updateStudent = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  try {
    const results = await pool.query(queries.getStudentById, [id]);
    const student = results.rows[0];
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await pool.query(queries.updateStudent, [name, id]);
    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student', error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the student' });
  }
};

export default {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
