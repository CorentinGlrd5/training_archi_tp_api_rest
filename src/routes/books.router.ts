import { UnknownBookError } from '../errors/unknown-book.error'
import { Router } from 'express';
import { BooksService } from '../services/books.service';

const booksRouter = Router();
const booksService = new BooksService();


/**
 * @openapi
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *     description: Retrieve a list of books
 */
 booksRouter.get('/', (req, res) => {
    const books = booksService.getAllBooks();
    res.status(200).send(books);
});

/**
 * @openapi
 * /books?JavaScript:
 *   get:
 *     summary: Retrieve a list of books include queryParams
 *     description: Retrieve a list of books include queryParams
 */
 booksRouter.get('/', (req, res) => {
    const books = booksService.getAllBooks();
    res.status(200).send(books);
});

/**
 * @openapi
 * /books/:bookID:
 *   get:
 *     summary: Retrieve a book of books
 *     description: Retrieve a book of books
 */
 booksRouter.get('/:bookID', (req, res) => {
    try {
        const book = booksService.getById(req.params.bookID);
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: creates a new book
 */
 booksRouter.post('/', (req, res) => {
    try {
        const createBook = booksService.createBook(req.body);
        res.status(200).send(createBook);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @openapi
 * /books/:bookID:
 *   put:
 *     summary: Update a book
 *     description: Update a book
 */
 booksRouter.put('/:bookID', (req, res) => {
    try {
        const updateBook = booksService.updateBook(req.params.bookID, req.body);
        res.status(200).send(updateBook);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @openapi
 * /books/:bookId:
 *   delete:
 *     summary: Delete a book
 *     description: Delete a book
 */
booksRouter.delete('/:bookID', (req, res) => {
    try {
        const deleteBook = booksService.deleteBook(req.params.bookID);
        res.status(200).send(deleteBook);
    } catch (error) {
        if (error instanceof UnknownBookError) {
            res.status(404);
        } else {
            res.status(400);
        }
        res.send(error.message)
    }
})

export default booksRouter;