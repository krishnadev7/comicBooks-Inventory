import comicBook from "../model/ComicBook.js";

// Post function to Add new comic book details
export const addComicBookDetails = async (req, res) => {
  try {
    // Getting the comic book details from the json body
    const {
      name,
      author,
      yearOfPublication,
      price,
      discount = 0,
      numOfPages,
      condition,
      description,
      publisher,
      genre,
    } = req.body;

    // adding the comic book details to comicBook schema
    const newComicBook = new comicBook({
      name,
      author,
      yearOfPublication,
      price,
      discount,
      numOfPages,
      condition,
      description,
      publisher,
      genre,
    });

    // Saving the new comic book details in the database
    await newComicBook.save();

    res.status(201).json({
      success: true,
      message: "Comic book added successfully",
      data: newComicBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add comic book",
      error: error.message,
    });
  }
};

// Put function to update existing comic book details
export const updateComicBookDetails = async (req, res) => {
  try {
    const { id } = req.params; // getting the id from the route params
    const updatedData = req.body; // updatedData will contain new updated data

    //finding the comicBook by id and updating the data
    const updatedComicBook = await comicBook.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, // ensuring updated document is returned
        runValidators: true, // ensuring updated data is validated according to schema
      }
    );

    // returning status code of 404 if the ID is not found
    if (!updatedComicBook) {
      return res.status(404).json({
        success: false,
        message: `comic book with id:${id} not found!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Comic book updated successfully",
      data: updatedComicBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update the comic book",
      error: error.message,
    });
  }
};
