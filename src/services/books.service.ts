import { UnknownBookError } from '../errors/unknown-book.error';
import { BookDao } from '../dao/books.dao';
import { BookModel } from '../models/book.model';

const uuid = require('uuid')

export class BooksService {
    private bookDAO: BookDao = new BookDao();

    public getAllBooks(): BookModel[] {
        return this.bookDAO.list();
    }

    public getById(bookID: string): BookModel {
        const book = this.bookDAO.getByID(bookID);
        if (!book) {
            throw new UnknownBookError('unknown book');
        }
        return book;
    }

    public createBook(book: BookModel) {
        const isbnExist = this.bookDAO.list().map(x => x.isbn).includes(book.isbn);

        if (!this.checkBookToCreateIsValid(book)) {
            throw new Error('invalid book');
        }

        if (isbnExist) {
            throw new Error('Ce livre ayant comme référence ISBN : ' + book.isbn + ", existe déjà ! De ce fait, nous ne pouvons pas le créer.");
        }

        const bookToCreate = {
            ...book,
            id: uuid.v4()
        }
        return this.bookDAO.create(bookToCreate);
    }

    public updateBook(bookID: string, book: BookModel): BookModel {
        const existingBook = this.bookDAO.getByID(bookID);
        if (!existingBook) {
            throw new UnknownBookError('unknown book')
        }
        const bookToUpdate = {
            ...existingBook,
            ...book
        }

        return this.bookDAO.update(bookToUpdate)
    }

    public deleteBook(bookID: string) {
        const book = this.bookDAO.getByID(bookID);
        if (!book) {
            throw new UnknownBookError('unknown book')
        }
        this.bookDAO.delete(bookID);
        return "L'ouvrage, intitulé : " + book.title + ", ayant pour référence ISBN : "+ book.isbn + " a bien été supprimé !";
    }

    private checkBookToCreateIsValid(book: BookModel) {
        return book && book.isbn && book.title && book.subtitle && book.author && book.published && book.publisher && book.pages && book.description && book.website
    }
}