const bookContainer = document.querySelector('#book-container');
const addBookBtn = document.querySelector('#addbook');
const bookForm = document.querySelector('#addbookform');
const submitFormBtn = document.querySelector('#submitbtn');
const modal = document.querySelector('#addBookModal');
const overlay = document.querySelector('#overlay');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

submitFormBtn.addEventListener("click", function (event) {
    event.preventDefault();
    addBookToLibrary();
})

addBookBtn.addEventListener('click', () => {
    openModal();
});

overlay.addEventListener('click', () => {
    closeModal();
})

function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#isread').checked;

    if (!title || !author || !pages) {
        alert("Please fill all fields!");
        return;
    }

    let newBook = new Book(title, author, pages, read);


    myLibrary.push(newBook);
    setData();
    closeModal();
    displayBooks();
    bookForm.reset()
}

function displayBooks() {
    let bookCard = document.createElement("div");
    bookCard.classList.add('book-card')
    bookContainer.innerHTML = ''
    for (let i = 0; i < myLibrary.length; i++) {

        let book = myLibrary[i];
        let bookCard = document.createElement("div");
        bookCard.classList.add('book-card');

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = "Remove";
        removeBtn.addEventListener('click', () => removeBook(i));

        bookCard.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages} pages</p>
        `

        const readBtn = document.createElement('button');
        readBtn.addEventListener('click', () => readStatus(book, readBtn))
        if (book.read) {
            readBtn.textContent = 'Read';
            readBtn.classList.add('markedRead')
        } else {
            readBtn.textContent = 'Not Read';
            readBtn.classList.add('markedUnread')
        }

        bookCard.appendChild(readBtn);
        bookCard.appendChild(removeBtn);

        bookContainer.appendChild(bookCard);
    }
}

function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    setData();
    displayBooks();
}

function readStatus(book) {
    book.read = !book.read;
    setData();
    displayBooks();
}

function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function restore() {
    if (!localStorage.myLibrary) {
        displayBooks();
    } else {
        let objects = localStorage.getItem('myLibrary')
        objects = JSON.parse(objects);
        myLibrary = objects;
        displayBooks();
    }
}

restore();