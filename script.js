const tableBody = document.getElementById('table-body');
const submitBtn = document.getElementById('btn-submit');
const form = document.getElementById('form');
const titleInput = document.getElementById('input-title');
const authorInput = document.getElementById('input-author');
const statusInput = document.getElementById('input-status');
let deleteIcons = document.getElementsByName('delete-icon');
let myLibrary = [];

submitBtn.addEventListener('click', (e) => {
  if(!form.checkValidity()){
    form.reportValidity();
    return;
  } 
  const book = new Book(titleInput.value, authorInput.value, statusInput.value);
  addBookToLibrary(book);
  e.preventDefault();
});

tableBody.addEventListener('click', handleTableClick);

function handleTableClick(e) {
  if(e.target.name === 'delete-icon') {
    tableBody.removeChild(e.target.parentNode.parentNode);
  }
  else if (e.target.name === 'status-btn'){
    changeStatus(e.target);
  }
}

class Book {
  constructor(name, author, status) {
    this.name = name;
    this.author = author;
    this.status = status;
  }
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  tableBody.innerHTML += `
  <tr>
    <th span="row">${newBook.name}</th>
    <td>${newBook.author}</td>
    <td><button name="status-btn" value="${newBook.status}" class="btn">${newBook.status}</button></td>
    <td><img class="svg" name="delete-icon" src="./delete-left-svgrepo-com.svg"></td>
  </tr>`;
  clearInputs();
}

function clearInputs() {
  titleInput.value = '';
  authorInput.value = '';
  statusInput.value = 'read';
}

function changeStatus(btn) {
  if(btn.value === 'read'){
    btn.textContent = 'not read'
    btn.value = 'not read'
  }
  else if(btn.value === 'not read'){
    btn.textContent = 'read';
    btn.value = 'read';
  }
}