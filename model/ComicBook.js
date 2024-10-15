import mongoose from "mongoose";

const comicBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String, 
        required: true
    },
    yearOfPublication: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    numOfPages: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        enum: ["new","used"],
        required: true
    },
    description: {
        type: String,
        maxlength: 1000
    },
    publisher: {
        type: String
    },
    genre: {
        type: String
    }
})

const comicBook = mongoose.model("ComicBook",comicBookSchema);

export default comicBook;