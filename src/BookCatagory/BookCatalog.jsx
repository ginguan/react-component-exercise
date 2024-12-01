import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import booksData from './bookData.json';
import YearFilter from './YearFilter';
import AddNewBook from './AddNewBook';

const BookCatalog = () => {
    const [books, setBooks] = useState(booksData); // All books
    const [displayedBooks, setDisplayedBooks] = useState(booksData); // Books to display, can be filtered

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [filterYear, setFilterYear] = useState(null); // Currently applied filter year

    const handleAddBook = (newBook) => {
        const id = uuidv4();
        const letter = newBook.author?.lastName[0].toUpperCase();
        if (!books[letter]) {
            const updatedBooks = {
                ...books,
                [letter]: [{ ...newBook, id: id }],
            };
            setBooks(updatedBooks);
            setDisplayedBooks(updatedBooks);
        } else {
            const updatedBooks = {
                ...books,
                [letter]: [...books[letter], { ...newBook, id: id }],
            };
            setBooks(updatedBooks);
            setDisplayedBooks(updatedBooks);
        }
    };

    const handleFilterApply = () => {
        if (filterYear === selectedYear) {
            setDisplayedBooks(books);
            setFilterYear(null);
        } else {
            const filteredBooks = {};
            for (const key in books) {
                if (books.hasOwnProperty(key)) {
                    filteredBooks[key] = books[key].filter(book => book.year === selectedYear);
                }
            }
            setDisplayedBooks(filteredBooks);
            setFilterYear(selectedYear);
        }
    };

    const availableYears = Array.from(new Set(Object.values(books).flatMap(letterGroup => {
        return letterGroup?.map(item => item.year);
    })));

    return (
        <div className="book-catalog">
            <AddNewBook onAddBook={handleAddBook} />
            <YearFilter
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                onFilterApply={handleFilterApply}
                availableYears={availableYears}
            />

            {Object.keys(displayedBooks).sort().map(letter => (
                <div key={letter}>
                    <h2>{letter}</h2>
                    {displayedBooks[letter].sort((a, b) => a.author.lastName.localeCompare(b.author.lastName)).map(book => (
                        <div key={book.id} className="book-card">
                            <h3>{book.title}</h3>
                            <p>Author: {book.author.firstName} {book.author.lastName}</p>
                            <p>Year: {book.year}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default BookCatalog;
