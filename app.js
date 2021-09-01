
// search field text additon

const searchButton = () => {
    const searchAreaText = document.getElementById('search-area');
    const searchArea = searchAreaText.value;
    searchAreaText.value = '';

    const url = `http://openlibrary.org/search.json?q=${searchArea}`
    fetch(url)
        .then(res => res.json())
        .then(data => resultShow(data.docs[0]))
}

const resultShow = book => {
    // for (const book of books)
    console.log(book);
    const showResultText = document.getElementById('result-show-card');


}

