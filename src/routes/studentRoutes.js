import { Router } from 'express';
import studentController from '../controllers/studentController.js';

const router = Router();

router.get('/', studentController.getStudents);
router.post('/', studentController.addStudent);
router.get('/:id', studentController.getStudentById);
router.delete('/:id', studentController.removeStudent);
router.put('/:id', studentController.updateStudent);

export default router;
