export interface Book {
    id: string;
    title: string;
    author: string;
    publicationDate: string;
    bookCover?: string | null; 
}

export interface BookDto {
    title: string;
    author: string;
    publicationDate: string;
    bookCover?: string | null; 
}
