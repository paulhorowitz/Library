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
    while (cardEl.firstChild) {
        cardEl.removeChild(cardEl.firstChild)
    }
    
    const titleHead = document.createElement("th");
    const authorHead = document.createElement("th");
    const pagesHead = document.createElement("th");
    const completedHead = document.createElement("th");
    const removeHead = document.createElement("th");
    const rowEl2 = document.createElement("tr")

    //create header row for table
    cardEl.appendChild(rowEl2)
    rowEl2.appendChild(titleHead);
    rowEl2.appendChild(authorHead)
    rowEl2.appendChild(pagesHead);
    rowEl2.appendChild(completedHead);
    rowEl2.appendChild(removeHead);

    myLibrary.forEach(book => {

        const rowEl = document.createElement("tr");

        
        const title = document.createElement("td");
        const author = document.createElement("td");
        const noOfPagesEl = document.createElement("td");
        const completedRowEl = document.createElement("td")
        const completedEl = document.createElement("button");
        const buttonRowEl = document.createElement("td");
        const buttonEl = document.createElement("button");
        


        titleHead.innerHTML = 'Title';
        authorHead.innerHTML = 'Author';
        pagesHead.innerHTML = 'Pages';
        completedHead.innerHTML = 'Completed?';


        console.log(book)
        cardEl.appendChild(rowEl);
        rowEl.appendChild(title);
        title.innerHTML = book.title;
        rowEl.appendChild(author);
        author.innerHTML = book.author;
        rowEl.appendChild(noOfPagesEl);
        noOfPagesEl.innerHTML = book.noOfPages;
        rowEl.appendChild(completedRowEl);
        completedRowEl.appendChild(completedEl);
        completedEl.innerHTML = book.completed
        completedEl.setAttribute("class", "comp")
        rowEl.appendChild(buttonRowEl)
        buttonRowEl.appendChild(buttonEl)
        buttonEl.innerHTML = 'remove';
        buttonEl.setAttribute("id", book.id);
        buttonEl.setAttribute("class", "rmv")
    })

    completedButton();
    removeButton();

}

function removeButton() {
    const removeButton = document.querySelectorAll("button.rmv");
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
            if (element.innerHTML == 'yes') {
                element.innerHTML = 'no ';
            } 
            else {
                element.innerHTML = 'yes';
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
addBookToLibrary('Harry Potter', 'J.K Rowling', 200, 'yes');
addBookToLibrary('1984', 'George Orwell', 333, 'no');

const cardEl = document.getElementById('card');
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
        this.value = 'yes';
    }
    else {
        this.value = 'no';
    }
    
})