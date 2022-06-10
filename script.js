
let myLibrary = [];
const displayArea = document.querySelector(".book-display-container");
const addBookButton = document.querySelector(".addBook");
const addBookButton1 = document.querySelector(".submit-book")


function Book(title, author, pages, doneReading) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.doneReading = doneReading;
}

function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pageNum").value;
  let doneReading = document.getElementById("readStatus").checked;
  console.log(doneReading);
  const book = new Book(title, author, pages, doneReading);
  myLibrary.push(book);

  updateLibrary();
  document.querySelector(".form-popup").style.display = "none";
  document.querySelector(".topbar-container").style.filter= "";
  document.querySelector(".topbar-container").style.opacity= "";
  document.querySelector(".book-display-container").style.filter= "";
  document.querySelector(".book-display-container").style.opacity= "";
}

function updateLibrary() {
  //wipe all displayed books
  while(displayArea.firstChild){
    displayArea.removeChild(displayArea.firstChild);
  }
//re-filter array for only non-undefined elements to be displayed
  for(let i = 0; i < myLibrary.length; i++) {
     if(myLibrary[i] !== undefined){
       displayBook(i);
     }
  }
}

function updateReadStatus(e) {
  let bookId = e.target.id;
  let num = bookId.match(/\d/g);
  num = num.join("");

  myLibrary[num].doneReading = !myLibrary[num].doneReading;
  updateLibrary();
}

//displayBook function creates elements using information stored in myLibrary
function displayBook(n) {
  const createDiv = document.createElement("div");
  const createDeleteBtn = document.createElement("button");
  const createReadBtn = document.createElement("button");
  const createP1 = document.createElement("p");
  const createP2 = document.createElement("p");
  const createP3 = document.createElement("p");
  createDiv.setAttribute("id", "div"+n);
  displayArea.appendChild(createDiv);

  const bookCard = document.querySelector("#div" + n);
  bookCard.setAttribute("data-type", "title");
  bookCard.textContent = myLibrary[n].title;
  createP1.innerText = "Author: " + myLibrary[n].author;
  createP2.innerText = "Number of pages: " + myLibrary[n].pages;
  createP3.innerText = "Reading Status: " + myLibrary[n].doneReading;
  bookCard.appendChild(createP1);
  bookCard.appendChild(createP2);
  bookCard.appendChild(createP3);
  createReadBtn.setAttribute("class", "bookcard-btn");
  createReadBtn.setAttribute("id", "read"+n);

  if(myLibrary[n].doneReading){
    createReadBtn.classList.add("bookcard-btn-green");
    createReadBtn.textContent = "Done Reading";
  }else{
    createReadBtn.classList.add("bookcard-btn-red");
    createReadBtn.textContent = "Not done Reading";
  }

  createReadBtn.addEventListener("click", updateReadStatus);
  bookCard.appendChild(createReadBtn);
  createDeleteBtn.setAttribute("class", "bookcard-btn");
  createDeleteBtn.setAttribute("id", "book"+n);
  createDeleteBtn.textContent = "Delete Book";
  createDeleteBtn.addEventListener("click", deleteBook);
  bookCard.appendChild(createDeleteBtn);
}

let addBook = new Book("Seven Ancient Wonders", "Mathew Reilly", 365, true);
myLibrary.push(addBook);
displayBook(0);

function updateAndDisplayLibrary(){
  myLibrary.forEach(book => displayBook(book));
}

//remove element from myLibrary based on the id of the button created
function deleteBook(e){
  let bookId = e.target.id;
  let num = bookId.match(/\d/g);
  num = num.join("");

  myLibrary[num] = undefined;
  updateLibrary();
}

function addBooktoLibrary1(e){
  let inputVal =
  console.log(inputVal);
}

function formPopup(){

  document.querySelector(".topbar-container").style.filter= "blur(3px) grayscale(100%)";
  document.querySelector(".topbar-container").style.opacity= "0.5";
  document.querySelector(".book-display-container").style.filter= "blur(3px) grayscale(100%)";
  document.querySelector(".book-display-container").style.opacity= "0.5";
  document.querySelector(".form-popup").style.display = "grid";
  document.querySelector(".form-popup").style.opacity = "1";
}

addBookButton.addEventListener("mouseup", formPopup);
addBookButton1.addEventListener("mouseup", addBookToLibrary);
