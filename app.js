// Error handling
const errorDiv = document.getElementById('error-result');
const searchAreaText = document.getElementById('search-area');
// search field text additon

const searchButton = () => {
    const searchArea = searchAreaText.value;
    searchAreaText.value = '';
    //Error Handling
    if (searchArea === '') {
        errorDiv.innerText = "Search field can't be empty";
    }
    // else if ()
    else {
        const url = `http://openlibrary.org/search.json?q=${searchArea}`;

        fetch(url)
            .then(res => res.json())
            .then(data => resultShow(data))
        errorDiv.innerText = "";
    }
}


const resultShow = books => {
    //Error handling for not found book name
    if (books.numFound === 0) {
        errorDiv.innerText = "Search not found";
    }
    // Result of search
    for (const book of books.docs) {
        const showResultText = document.getElementById('result-show-card');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="book-title">${book.title}</h3>
                <h5 class="book-author">${book.author_name[0]}</h5>
                <p class="book-publisher text-green">${book.publisher}</p>
                <p class="book-publish-year">${book.first_publish_year}</p>
            </div>
        </div>
    `;
        showResultText.appendChild(div);
    }
}

