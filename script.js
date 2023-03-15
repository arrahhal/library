class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status === 'true' ? 'Read' : 'not Read';
  }
  changeStatus() {
    this.status = this.status === 'Read'
      ? (this.status = 'not Read')
      : (this.status = 'Read');
  }
  get bookInfo() {
    return {
      title: this.title,
      author: this.author,
      pages: this.pages,
      status: this.status,
    };
  }
}

const gameController = (() => {
  const booksArr = [];
  const addBook = (book) => booksArr.push(book);
  const deleteBook = (index) => booksArr.splice(index, 1);
  const changeStatus = (index) => booksArr[index].changeStatus();
  const getBooksArr = () => booksArr;

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
    readCheckbox.value = 'off';
  };

  const getRandomColor = () =>
    colorsArr[Math.floor(Math.random() * colorsArr.length)];

  const addBookToDisplay = (book) => {
    const bookHTML = `<div class="book-shelf__book" data-index="${
      gameController.getBooksArr().length - 1 // because the target book is pushed to books array before display it
    }" style="--clr-book: ${getRandomColor()}">
      <div class="book__options">
        <span class="book__icon delete-icon"
          ><img src="./x.svg" alt="delete icon"
        /></span>
        <span class="book__icon swap-icon"
          ><img src="./swap.svg" alt="swap icon"
        /></span>
      </div>
      <div class="book__cover">
        <p class="cover__title">${book.title}</p>
        <p class="cover__author">By ${book.author}</p>
        <p class="cover__pages">${book.pages}</p>
        <p class="cover__status">Status: ${book.status}</p>
      </div>
      <div class="book__side"></div>
      <div class="book__back-cover"></div>
    </div>`;
    bookShelf.innerHTML += bookHTML;
  };

  const removeBookFromDisplay = (index) => {
    const targetBook = document.querySelector(`[data-index="${index}"]`);
    targetBook.remove();
  };

  const changeBookStatusOnDisplay = (index) => {
    const statusSpan = document.querySelector(`[data-index="${index}"] .cover__status`);
    statusSpan.textContent = `Status: ${gameController.getBooksArr()[index].status}`;
  };

  bookShelf.addEventListener('click', (e) => {
    const targetParent = e.target.parentElement;
    if (targetParent.classList.contains('delete-icon')) {
      const index = parseInt(
        targetParent.parentElement.parentElement.dataset.index
      );
      gameController.deleteBook(index);
      removeBookFromDisplay(index);
    } else if (targetParent.classList.contains('swap-icon')) {
      const index = parseInt(
        targetParent.parentElement.parentElement.dataset.index
      );
      gameController.changeStatus(index);
      changeBookStatusOnDisplay(index);
    } else return;
  });

  submitBtn.addEventListener('click', (e) => {
    const book = new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readCheckbox.value
    );
    gameController.addBook(book);
    addBookToDisplay(book);
    clearForm();
    e.preventDefault();
  });
})();
