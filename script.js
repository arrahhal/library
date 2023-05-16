class Book {
  constructor(title, author, pages, status, color) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.color = color;
    this.status = status === true ? 'read' : 'not read';
  }
  changeStatus() {
    this.status =
      this.status === 'read'
        ? (this.status = 'not read')
        : (this.status = 'read');
  }
}

const appController = (() => {
  const booksArr = localStorage.getItem('books')
    ? JSON.parse(localStorage.getItem('books'))
    : [];
  const addBook = (book) => {
    booksArr.push(book);
    _commit();
  };
  const deleteBook = (index) => {
    booksArr.splice(index, 1);
    _commit();
  };
  const changeStatus = (index) => {
    booksArr[index].changeStatus();
    _commit();
  };
  const getBooksArr = () => booksArr;
  const _commit = () => localStorage.setItem('books', JSON.stringify(booksArr));

  return {
    addBook,
    deleteBook,
    changeStatus,
    getBooksArr,
  };
})();

const displayController = (() => {
  const bookShelf = document.getElementById('book-shelf');
  const titleInput = document.getElementById('input-title');
  const authorInput = document.getElementById('input-author');
  const pagesInput = document.getElementById('input-pages');
  const readCheckbox = document.getElementById('read-checkbox');
  const submitBtn = document.getElementById('btn-submit');
  const colorsArr = [
    '#DF2E38',
    '#E14D2A',
    '#00235B',
    '#898121',
    '#3D8361',
    '#A84448',
    '#146C94',
    '#66347F',
    '#9D3C72',
  ];

  const clearForm = () => {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readCheckbox.checked = false;
  };

  const getRandomColor = () =>
    colorsArr[Math.floor(Math.random() * colorsArr.length)];

  const _renderDisplay = () => {
    bookShelf.textContent = '';
    const books = appController.getBooksArr();
    for (let i = 0; i < books.length; i++) {
      bookShelf.innerHTML += `<div class="book-shelf__book" data-index="${i}" style="--clr-book: ${books[i].color}">
      <div class="book__options">
        <span class="book__icon delete-icon"
          ><img src="./x.svg" alt="delete icon"
        /></span>
        <span class="book__icon swap-icon"
          ><img src="./swap.svg" alt="swap icon"
        /></span>
      </div>
      <div class="book__cover">
        <p class="cover__title">${books[i].title}</p>
        <p class="cover__author">By ${books[i].author}</p>
        <p class="cover__pages">${books[i].pages}</p>
        <p class="cover__status">Status: ${books[i].status}</p>
      </div>
      <div class="book__side"></div>
      <div class="book__back-cover"></div>
    </div>`;
    }
  };
  document.addEventListener('DOMContentLoaded', _renderDisplay);
  bookShelf.addEventListener('click', (e) => {
    const targetParent = e.target.parentElement;
    if (targetParent.classList.contains('delete-icon')) {
      const index = parseInt(
        targetParent.parentElement.parentElement.dataset.index
      );
      appController.deleteBook(index);
      _renderDisplay();
      staticsBoard.updateStaticsOnDisplay();
    } else if (targetParent.classList.contains('swap-icon')) {
      const index = parseInt(
        targetParent.parentElement.parentElement.dataset.index
      );
      appController.changeStatus(index);
      staticsBoard.updateStaticsOnDisplay();
      _renderDisplay();
    } else return;
  });

  submitBtn.addEventListener('click', (e) => {
    const book = new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readCheckbox.checked,
      getRandomColor()
    );
    appController.addBook(book);
    _renderDisplay();
    clearForm();
    staticsBoard.updateStaticsOnDisplay();
    e.preventDefault();
  });
})();

const staticsBoard = (() => {
  const totalSpan = document.querySelector('.statics__total-books-num');
  const readSpan = document.querySelector('.statics__read-books-num');
  const notReadSpan = document.querySelector('.statics__notread-books-num');
  const bookShelf = document.getElementById('book-shelf');
  let booksArr;
  let totalBooks;
  let readBooks;
  let notReadBooks;

  const updateStaticsOnDisplay = () => {
    _renderStatics();
    totalSpan.textContent = totalBooks;
    readSpan.textContent = readBooks;
    notReadSpan.textContent = notReadBooks;
  };
  const _renderStatics = () => {
    readBooks = 0;
    notReadBooks = 0;
    booksArr = appController.getBooksArr();
    totalBooks = booksArr.length;
    booksArr.forEach((book) => {
      if (book.status === 'read') readBooks++;
      else notReadBooks++;
    });
  };
  updateStaticsOnDisplay();
  bookShelf.addEventListener('change', _renderStatics);
  return {
    updateStaticsOnDisplay,
  };
})();
