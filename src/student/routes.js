import { Router } from 'express';
import controller from './controller.js';

const router = Router();

router.get('/', controller.getStudents);
router.post('/', controller.addStudent);
router.get('/:id', controller.getStudentById);
router.delete('/:id', controller.removeStudent);
router.put('/:id', controller.updateStudent);

export default router;
