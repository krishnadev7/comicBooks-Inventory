import express from 'express';
import { addComicBookDetails, updateComicBookDetails } from '../controllers/index.js';

const router = express.Router();

// POST API function to add comic books
router.post('/addComics',addComicBookDetails);

// PUT API function update comic book
router.put('/updateComics/:id',updateComicBookDetails)

export default router;