function Book(id, title, author, noOfPages, completed) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.completed = completed;
}

function addBookToLibrary(title, author, noOfPages, completed) {
    id = Date.now();
    const book = new Book(id, title, author, noOfPages, completed);
    myLibrary.push(book);
}


function renderPage() {
    //remove current render
    while (containerEl.firstChild) {
        containerEl.removeChild(containerEl.firstChild)
    }

    //create header row for table

    myLibrary.forEach(book => {
        const containerEl = document.getElementById("container")
        const cardEl = document.createElement("div");

        const title = document.createElement("h4");
        const author = document.createElement("h6");
        const noOfPagesEl = document.createElement("h7");
        const completedRowEl = document.createElement("h7")
        const completedEl = document.createElement("button");
        const buttonEl = document.createElement("i");

        containerEl.classList.add("container")
        cardEl.classList.add("card")
        containerEl.appendChild(cardEl);
        cardEl.appendChild(title);
        title.innerHTML = book.title;
        cardEl.appendChild(author);
        author.innerHTML = 'by ' + book.author;
        cardEl.appendChild(noOfPagesEl);
        noOfPagesEl.innerHTML = book.noOfPages + " pages";
        cardEl.appendChild(completedRowEl);
        completedRowEl.appendChild(completedEl);
        completedEl.innerHTML = book.completed;
        completedEl.setAttribute("class", "comp");
        cardEl.appendChild(buttonEl);
        buttonEl.setAttribute("id", book.id);
        buttonEl.setAttribute("class", "far fa-trash-alt rmv")
    })

    completedButton();
    removeButton();

}

function removeButton() {
    const removeButton = document.querySelectorAll("i.rmv");
    var removeButtonArray = Array.from(removeButton)
    removeButtonArray.forEach(element => {
        element.addEventListener("click", function(e) {
            var buttonId = e.toElement.id;
            removeRecord(buttonId);
        })
    });
}

function completedButton() {
    const completedBut = document.querySelectorAll("button.comp");
    var changeCompletedBut = Array.from(completedBut)
    changeCompletedBut.forEach(element => {
        element.addEventListener("click", function(e) {
            if (element.innerHTML == 'completed') {
                element.innerHTML = 'incomplete ';
            } 
            else {
                element.innerHTML = 'completed';
            }
        }
        )
    })
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

function removeRecord(id) {
    console.log(myLibrary)
    for (var i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == id) {
            myLibrary.splice(i, 1);
        }
    }
    renderPage()
  }

// initialise library array
let myLibrary = [];

//sample book
addBookToLibrary('Harry Potter', 'J.K Rowling', 200, 'completed');
addBookToLibrary('1984', 'George Orwell', 333, 'incomplete');

const containerEl = document.getElementById('container');
const formBtnEl = document.getElementById("form-button");
var titleEl = document.getElementById("add-title");
var authorEl = document.getElementById("add-author");
var noOfPages = document.getElementById("add-no-pages")
var completedEl = document.getElementById("add-completed")
var checkbox = document.querySelector('input[type="checkbox"]');

renderPage()
removeButton()

formBtnEl.addEventListener("click", function(e) {

    addBookToLibrary(titleEl.value, authorEl.value, noOfPages.value, completedEl.value);
    titleEl.value = '';
    authorEl.value = '';
    noOfPages.value = '';
    renderPage();
    removeButton()
    e.preventDefault();

})

checkbox.addEventListener('change', function(e) {
    if (checkbox.checked) {
        this.value = 'completed';
    }
    else {
        this.value = 'incomplete';
    }
    
})