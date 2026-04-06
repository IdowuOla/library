// ============================================
// STATE
// ============================================
let myLibrary = [];

// ============================================
// BOOK CONSTRUCTOR
// ============================================
function Book(title, author, pages, hasBeenRead) {
  this.title       = title;
  this.author      = author;
  this.pages       = pages;
  this.hasBeenRead = hasBeenRead;
}

Book.prototype.info = function() {
  const readStatus = this.hasBeenRead ? "has been read" : "not read yet";
  console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + readStatus);
};

// ============================================
// DOM REFS
// ============================================
const addBookBtn  = document.getElementById('addBookBtn');
const bookForm    = document.getElementById('bookForm');
const submitBook  = document.getElementById('submitBook');
const titleInput  = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput  = document.getElementById('pages');
const readInput   = document.getElementById('hasBeenRead');
const library     = document.getElementById('library');

// ============================================
// ADD BOOK
// ============================================
function addBook() {
  if (titleInput.value === '' || authorInput.value === '') return;

  const book = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked
  );

  myLibrary.push(book);

  titleInput.value  = '';
  authorInput.value = '';
  pagesInput.value  = '';
  readInput.checked = false;

  bookForm.style.display = 'none';
  renderLibrary();
}

// ============================================
// RENDER LIBRARY
// ============================================
function renderLibrary() {
  library.innerHTML = '';

  if (myLibrary.length === 0) {
    library.innerHTML = '<p class="empty-message">No books yet — add one!</p>';
    return;
  }

  for (let book of myLibrary) {
    const card = document.createElement('div');
    card.classList.add('book-card');

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <p class="read-status ${book.hasBeenRead ? 'read' : 'not-read'}">
        ${book.hasBeenRead ? 'Has been read' : 'Not read yet'}
      </p>
      <button class="toggle-btn">Toggle Read</button>
      <button class="delete-btn">Delete</button>
    `;

    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
      deleteBook(book);
    });

    const toggleBtn = card.querySelector('.toggle-btn');
    toggleBtn.addEventListener('click', function() {
      toggleRead(book);
    });

    library.appendChild(card);
  }
}

// ============================================
// DELETE BOOK
// ============================================
function deleteBook(book) {
  myLibrary = myLibrary.filter(function(b) {
    return b !== book;
  });
  renderLibrary();
}

// ============================================
// TOGGLE READ
// ============================================
function toggleRead(book) {
  book.hasBeenRead = !book.hasBeenRead;
  renderLibrary();
}

// ============================================
// EVENT LISTENERS
// ============================================
addBookBtn.addEventListener('click', function() {
  bookForm.style.display = 'block';
});

submitBook.addEventListener('click', addBook);