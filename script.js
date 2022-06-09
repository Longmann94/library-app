
let myLibrary = [];
const displayArea = document.querySelector(".book-display-container");
const addBookButton = document.querySelector(".add"+"Book");


function Book(title, author, pages, doneReading) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.doneReading = doneReading;
}

function addBookToLibrary() {
  let title = prompt("Title of Book:");
  let author = prompt("Author of Book:");
  let pages = prompt("number of pages:");
  let doneReading = prompt("reading status(done/not done):");

  const book = new Book(title, author, pages, doneReading);
  myLibrary.push(book);

  updateLibrary();
}

function updateLibrary() {
  while(displayArea.firstChild){
    displayArea.removeChild(displayArea.firstChild);
  }

  for(let i = 0; i < myLibrary.length; i++) {
     if(myLibrary[i] !== undefined){
       displayBook(i);
     }
  }
}

function displayBook(n) {
  const createDiv = document.createElement("div");
  const createBtn = document.createElement("button");
  createBtn.setAttribute("class", "delete-book");
  createBtn.setAttribute("id", "book"+n);
  createBtn.textContent = "Delete Book";
  createDiv.setAttribute("id", "div"+n);
  displayArea.appendChild(createDiv);

  const bookCard = document.querySelector("#div" + n);
  bookCard.textContent = myLibrary[n].title;
  createBtn.addEventListener("click", deleteBook);
  bookCard.appendChild(createBtn);
}

let addBook = new Book("seven ancient wonders", "mathew reilly", 356, true);
myLibrary.push(addBook);
displayBook(0);

function updateAndDisplayLibrary(){
  myLibrary.forEach(book => displayBook(book));
}

function deleteBook(e){
  let bookId = e.target.id;
  let num = bookId.match(/\d/g);
  num = num.join("");

  myLibrary[num] = undefined;
  updateLibrary();
}

addBookButton.addEventListener("click", addBookToLibrary);
