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
    console.error(error);
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

    // Validate the MongoDB ObjectID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comic book ID format.",
      });
    }

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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update the comic book",
      error: error.message,
    });
  }
};

// Delete function to delete a comic book
export const deleteComicBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the MongoDB ObjectID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comic book ID format.",
      });
    }

    // Find and delete the comic book by ID
    const response = await comicBook.findByIdAndDelete(id);

    // If comic book not found, return 404
    if (!response) {
      res.status(404).json({
        success: false,
        message: `comic book with id:${id} not found!`,
      });
    }

    // Successful deletion response
    res.status(200).json({
      success: true,
      message: "Deleted comic book successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete comic book",
      error: error.message,
    });
  }
};

// Get function to get all comic books
export const getAllComicBook = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "price",
      order = "asc",
      ...filters
    } = req.query;

    // converting query params for appropriate types
    const sortOrder = order === "asc" ? 1 : -1;

    // for the pagination
    const skip = (page - 1) * limit;

    // Filter based on attributes (author, year, price, condition, etc...)
    const filterQuery = {};

    if (filters.author) filterQuery.author = new RegExp(filters.author, "i"); // RegExp for Case-insensitive
    if (filters.yearOfPublication)
      filterQuery.yearOfPublication = filters.yearOfPublication;
    if (filters.price) filterQuery.price = { $lte: filters.price }; // Books cheaper than or equal to price
    if (filters.condition) filterQuery.condition = filters.condition;

    // Fetching filtered, sorted and paginated results
    const comicBooks = await comicBook
      .find(filterQuery)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit));

    // Getting total count for paginated purpose
    const total = await comicBook.countDocuments(filterQuery);

    res.status(200).json({
      success: true,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      data: comicBooks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve comic books",
      error: error.message,
    });
  }
};

// Get function to get comic book by it's Id
export const getComicBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the MongoDB ObjectID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comic book ID format.",
      });
    }

    // fetching comic book details by it's id
    const comicBookDetails = await comicBook.findById(id);

    // returning 404 error if comic book details not found!
    if (!comicBookDetails) {
      return res.status(404).json({
        success: false,
        message: `Unable to find comic book by Id:${id}`,
      });
    }

    // returning response with data
    res.status(200).json({
      success: true,
      data: comicBookDetails,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get Comic book details",
      message: error.message,
    });
  }
};
