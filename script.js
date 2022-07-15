class Book {
  constructor(title, author, pages, doneReading) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.doneReading = doneReading;
  }
}

class Library {
  constructor(libraryArr) {
    this.libraryArr = libraryArr;
  }

  updateLibrary() {
    //wipe all displayed books
    while (displayArea.firstChild) {
      displayArea.removeChild(displayArea.firstChild);
    }
    //re-filter array for only non-undefined elements to be displayed
    for (let i = 0; i < libraryArr.length; i++) {
      if (libraryArr[i] !== undefined) {
        this.displayBook(i);
      }
    }
  }

  addBookToLibrary() {
    const inputTitle = document.querySelector("#title");
    const inputAuthor = document.querySelector('#author');
    const inputPageNum = document.querySelector('#pageNum');

    if(inputTitle.value === '') {
      inputTitle.setCustomValidity('Enter a book Title!');
      inputTitle.reportValidity();
    }else if(inputAuthor.value === ''){
      inputAuthor.setCustomValidity('Enter the proper authors name!');
      inputAuthor.reportValidity();
    } else if(inputPageNum.value === ''){
      inputPageNum.setCustomValidity('Enter a number please!');
      inputPageNum.reportValidity();
    } else{
      let title = document.getElementById("title").value;
      let author = document.getElementById("author").value;
      let pages = document.getElementById("pageNum").value;
      let doneReading = document.getElementById("readStatus").checked;
      const book = new Book(title, author, pages, doneReading);
      libraryArr.push(book);

      this.updateLibrary();
      document.querySelector(".form-popup").style.display = "none";
      document.querySelector(".topbar-container").style.filter = "";
      document.querySelector(".topbar-container").style.opacity = "";
      document.querySelector(".book-display-container").style.filter = "";
      document.querySelector(".book-display-container").style.opacity = "";
      document.getElementById("title").value = '';
      document.getElementById("author").value = '';
      document.getElementById("pageNum").value = '';
    }
  }

  //displayBook function creates elements using information stored in myLibrary
  displayBook(n) {
    const createDiv = document.createElement("div");
    const createDeleteBtn = document.createElement("button");
    const createReadBtn = document.createElement("button");
    const createP1 = document.createElement("p");
    const createP2 = document.createElement("p");
    const createP3 = document.createElement("p");
    createDiv.setAttribute("id", "div" + n);
    displayArea.appendChild(createDiv);

    const bookCard = document.querySelector("#div" + n);
    bookCard.setAttribute("data-type", "title");
    bookCard.textContent = libraryArr[n].title;
    createP1.innerText = "Author: " + libraryArr[n].author;
    createP2.innerText = "Number of pages: " + libraryArr[n].pages;
    createP3.innerText = "Reading Status: " + libraryArr[n].doneReading;
    bookCard.appendChild(createP1);
    bookCard.appendChild(createP2);
    bookCard.appendChild(createP3);
    createReadBtn.setAttribute("class", "bookcard-btn");
    createReadBtn.setAttribute("id", "read" + n);

    if (libraryArr[n].doneReading) {
      createReadBtn.classList.add("bookcard-btn-green");
      createReadBtn.textContent = "Done Reading";
    } else {
      createReadBtn.classList.add("bookcard-btn-red");
      createReadBtn.textContent = "Not done Reading";
    }

    createReadBtn.addEventListener("click", (e) => this.updateReadStatus(e));
    bookCard.appendChild(createReadBtn);
    createDeleteBtn.setAttribute("class", "bookcard-btn");
    createDeleteBtn.setAttribute("id", "book" + n);
    createDeleteBtn.textContent = "Delete Book";
    createDeleteBtn.addEventListener("click", (e) => this.deleteBook(e));
    bookCard.appendChild(createDeleteBtn);
  }

  //remove element from myLibrary based on the id of the button created
  deleteBook(e) {
    let bookId = e.target.id;
    let num = bookId.match(/\d/g);
    num = num.join("");

    libraryArr[num] = undefined;
    this.updateLibrary();
  }

  updateReadStatus(e) {
    let bookId = e.target.id;
    let num = bookId.match(/\d/g);
    num = num.join("");

    libraryArr[num].doneReading = !libraryArr[num].doneReading;
    this.updateLibrary();
  }

  formPopup() {
    document.querySelector(".topbar-container").style.filter = "blur(3px) grayscale(100%)";
    document.querySelector(".topbar-container").style.opacity = "0.5";
    document.querySelector(".book-display-container").style.filter = "blur(3px) grayscale(100%)";
    document.querySelector(".book-display-container").style.opacity = "0.5";
    document.querySelector(".form-popup").style.display = "grid";
    document.querySelector(".form-popup").style.opacity = "1";
  }
}



const displayArea = document.querySelector(".book-display-container");
const addBookButton = document.querySelector(".addBook");
const addBookButton1 = document.querySelector(".submit-book");
let libraryArr = [];
let yourLibrary = new Library(libraryArr);

addBookButton.addEventListener("mouseup", () => yourLibrary.formPopup());
addBookButton1.addEventListener("mouseup", () => yourLibrary.addBookToLibrary());
