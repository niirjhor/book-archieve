
// search field text additon

const searchButton = () => {
    const searchAreaText = document.getElementById('search-area');
    const searchArea = searchAreaText.value;
    searchAreaText.value = '';

    const url = `http://openlibrary.org/search.json?q=${searchArea}`
    fetch(url)
        .then(res => res.json())
        .then(data => resultShow(data.docs))
}

const resultShow = books => {
    for (const book of books) {
        const showResultText = document.getElementById('result-show-card');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top width=50px height=50px" alt="...">
            <div class="card-body">
                <h3 class="book-title">${book.title}</h3>
                <h5 class="book-author">${book.author_name[0]}</h5>
                <p class="book-author">${book.first_publish_year}</p>
            </div>
        </div>
    `;
        showResultText.appendChild(div);
    }

}

