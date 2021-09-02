const errorDiv = document.getElementById('error-result');
const searchAreaText = document.getElementById('search-area');
const showResultText = document.getElementById('result-show-card');
const resultFound = document.getElementById('result-found');
// search field text additon

const searchButton = () => {
    const searchArea = searchAreaText.value;
    searchAreaText.value = '';
    //clear previous result
    showResultText.innerHTML = '';
    //Error Handling for empty search
    if (searchArea === '') {
        errorDiv.innerText = "Search field can't be empty!!!!!";
        showResultText.innerHTML = '';
        resultFound.textContent = '';

    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchArea}`;
        fetch(url)
            .then(res => res.json())
            .then(data => resultShow(data))
        errorDiv.innerText = "";
    }
}


const resultShow = books => {
    //clear result count
    resultFound.textContent = '';
    // Showing total search result count
    const p = document.createElement('p');
    p.innerHTML = `
        <p>Total ${books.numFound} Results</p>        
        `;
    resultFound.appendChild(p);

    //Error handling for not found book name
    if (books.numFound === 0) {
        errorDiv.innerText = "Search not found!!!!!";
        resultFound.textContent = '';
    }
    // Result of search
    books.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        // Nullable operator for author & Publisher name to manage the no applicable author array
        const authorName = !book.author_name ? "Author Name Is Not Given" : book.author_name[0];
        const publisherName = !book.publisher ? "Publisher Name Is Not Given" : book.publisher[0];
        let imgSrc = ''
        if (book.cover_i === undefined) {
            imgSrc = '/no-preview.jpg'
        }
        else {
            imgSrc = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }
        div.innerHTML = `
        <div class="card h-100">
            <img src="${imgSrc}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="book-title">${book.title}</h3>
                <h5 class="book-author">${authorName}</h5>
                <p class="book-publisher text-green">${publisherName}</p>
                <p class="book-publish-year">${book.first_publish_year}</p>
            </div>
        </div>
    `;
        showResultText.appendChild(div);
    }
    )
}


