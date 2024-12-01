export interface Author {
    firstName: string
    lastName: string
}

export interface Book {
    id: string
    title: string
    author: Author
    year: number
}

export interface BooksData {
    [key: string]: Book[]
}
