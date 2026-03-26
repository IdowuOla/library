//State Variable
const myLibrary = [];

//Book Constructor 
function Book (title, author, pages, hasBeenRead) {
    this.title = title;
    this.aithor = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}

Book.prototype.info = function() {
    const readStatus = this.hasBeenRead ? "has been read" : "not read yet";
    console.log(this.title + ' by ' + this.author + ', ' + this.pages + 'pages, ' + readStatus);
}

//Dom reference
const addBookBtn = document.getElementById("addBookBtn");
const bookForm = document.getElementById("bookForm");
const submitBook = document.getElementById("submitBook");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("hasBeenRead");
const library = document.getElementById("library")

// Add Book function
function addBook() {
    // stop if input is empty
    if (titleInput.value === '' || authorInput.value === '') return;


    // create a new book object
    const book = new Book(
        titleInput.value, 
        authorInput.value, 
        pagesInput.value, 
        readInput.value
    );

    //add to the library
    myLibrary.push(book)

    //clears all inputs
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readInput.checked = false;

    //hide the form 
    bookForm.style.display = 'none';

    //update the screen

    renderLibrary();
}
