import express from 'express';
import { addComicBookDetails, deleteComicBook, getAllComicBook, getComicBook, updateComicBookDetails } from '../controllers/index.js';

const router = express.Router();

// POST API function to add comic books
router.post('/addComics',addComicBookDetails);

// PUT API function update comic book
router.put('/updateComics/:id',updateComicBookDetails);

// DELETE API function to delete a comic book
router.delete('/delete/:id',deleteComicBook);

// GET API function to get all available comic books
router.get('/comics',getAllComicBook);

// GET API function to get comic book by it's ID
router.get('/comic/:id',getComicBook);

export default router;