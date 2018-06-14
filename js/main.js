// BOOK CONSTRUCTOR
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI CONSTRUCTOR
class UI {
    constructor() {}

    displayBooks() {
        const books = lStorage.getBooks();
        books.forEach( ( book ) => {
            this.addBookToList(book);
        });
    }

    addBookToList( book ) {
        const bookList  = document.querySelector('#book-list');
        const newRow    = document.createElement('tr');
    
        newRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <span class='delete text-danger'>&times;</span>
            </td>
        `;
        bookList.appendChild(newRow);
    }

    clearFields() {
        document.querySelector('#title').value  = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value   = '';
    }

    removeBook(row) {
        row.remove();
    }

    showAlert(type, message) {
        const container = document.querySelector('.col');
        const form      = document.querySelector('form');
        const alertMSG  = document.createElement('div');
    
        alertMSG.className = 'alert';
        if ( !type ) {
            alertMSG.classList.add('alert-danger');
        } else {
            alertMSG.classList.add('alert-success');
        }
        alertMSG.innerText = message;
        
        container.insertBefore(alertMSG, form);
        return;
    }

    removeAlert() {
        document.querySelector('.alert').remove();
        return;
    }

    scrollToTop() {
        window.scrollTo(0, 0);
        return;
    }

}

// LOCAL STORAGE CLASS
class lStorage {
    constructor() {}

    static getBooks() {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        return books;
    }

    static addBook(book) {
        const books = lStorage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        return;
    }

    static removeBook(title) {
        let books = lStorage.getBooks();
        books = books.filter( ( book ) => {
            return book.title != title;
        });
        localStorage.setItem('books', JSON.stringify(books));
        return;
    }
}

const ui = new UI();
ui.displayBooks();