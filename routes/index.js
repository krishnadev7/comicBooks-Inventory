import express from 'express';
import { addComicBookDetails, deleteComicBook, updateComicBookDetails } from '../controllers/index.js';

const router = express.Router();

// POST API function to add comic books
router.post('/addComics',addComicBookDetails);

// PUT API function update comic book
router.put('/updateComics/:id',updateComicBookDetails);

// DELETE API function to delete a comic book
router.delete('/delete/:id',deleteComicBook);

export default router;