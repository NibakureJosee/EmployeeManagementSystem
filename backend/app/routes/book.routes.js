const {
    getAllBooks,
    getBookById
  } = require("../controllers/book.controller");
  const {
    auth
  } = require("../middlewares/auth.middleware");
  
  module.exports = (app) => {
  
    var router = require("express").Router();
  
    router.route("/")
      /**
       * @swagger
       * /books:
       *   get:
       *     tags:
       *       - Book
       *     description: Returns all books
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - name: page
       *         description: Page number
       *         in: query
       *         type: string
       *       - name: limit
       *         description: Elements per page
       *         in: query
       *         type: string
       *     responses:
       *       200:
       *         description: OK
       *       400:
       *         description: Bad Request
       *       404:
       *         description: Not Found
       *       401:
       *         description: Unauthorized
       *       500:
       *         description: Internal Server Error
       */
      .get([auth, getAllBooks]);
  
    router.route("/:id")
      /**
       * @swagger
       * /books/{id}:
       *   get:
       *     tags:
       *       - Book
       *     description: Get book by ID
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - name: id
       *         description: Book ID
       *         in: path
       *         type: string
       *         required: true
       *     responses:
       *       200:
       *         description: OK
       *       400:
       *         description: Bad Request
       *       404:
       *         description: Not Found
       *       401:
       *         description: Unauthorized
       *       500:
       *         description: Internal Server Error
       */
      .get([auth, getBookById]);
  
    app.use("/api/books", router);
  };
  