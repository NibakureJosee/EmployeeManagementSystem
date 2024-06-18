const { validateBook } = require("../models/book.model");
const Book = require("../models/book.model");
const { validateObjectId } = require("../utils/imports");


/**
 * create
 * @param req
 * @param res
 */
exports.createBook= async (req, res) => {
    try {

        let book = new Book( 
            _.pick(req.body, [
                "name",
                "author",
                "publisher",
                "publicationYear",
                "subject"
            ])
        );
        try {
            await book.save();
            return createSuccessResponse("Book registered successfully", {}, res);
        } catch (ex) {
            return errorResponse(ex.message, res);
        }
        
    } catch (ex) {
        console.log(ex)
        return serverErrorResponse(ex, res);
    }
}

/**
 * Get all books
 * @param req
 * @param res
 */
exports.getAllBooks = async (req, res) => {
  try {
    let { limit, page } = req.query;

    if (!page || page < 1) page = 1;
    if (!limit) limit = 10;

    const options = {
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    };

    const books = await Book.findAndCountAll(options);

    res.send({ data: books });
  } catch (e) {
    return res.status(500).send(e.toString().split('\"').join(''));
  }
};

/**
 * Get book by ID
 * @param req
 * @param res
 */
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).send("Invalid ID");
    }

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.send({ data: book });
  } catch (e) {
    return res.status(500).send(e.toString().split('\"').join(''));
  }
};

/**
 * Get books by name
 * @param {*} req 
 * @param {*} res 
 */
exports.getBooksByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).send("Name parameter is required");
    }

    // Using Sequelize's 'like' operator to search for books by name
    const books = await Book.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%` // Case-insensitive search
        }
      }
    });

    return res.send({ data: books });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

