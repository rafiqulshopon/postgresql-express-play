const getStudents = 'SELECT * FROM students';
const getStudentById = 'SELECT * FROM students WHERE id = $1';
const checkEmail = 'SELECT s FROM students s WHERE s.email = $1';
const addStudent =
  'INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4) RETURNING id, name, email, age, dob';

const removeStudent = 'DELETE FROM students WHERE id = $1';
const updateStudent = 'UPDATE students SET name = $1 WHERE id = $2';

export default {
  getStudents,
  getStudentById,
  addStudent,
  checkEmail,
  removeStudent,
  updateStudent,
};
