import { createContact , getContact } from '../controllers/contact.js'
import express from 'express'

const router = express.Router();

router.post('/send' , createContact);
router.get('/get' , getContact);

export default router;
