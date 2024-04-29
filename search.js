// search.js
export function setupSearch() {
  document
    .querySelector('#search-btn')
    .addEventListener('click', function (event) {
      event.preventDefault();
      showResult();
    });

  function showResult() {
    let inputValue = document
      .querySelector('#input-text')
      .value.toLowerCase();
    let cards = document.querySelectorAll('.movie-card');

    cards.forEach((a) => {
      let movieName = a.querySelector('.movie-title').textContent.toLowerCase();
      if (movieName.includes(inputValue)) {
        a.style.display = 'block';
      } else {
        a.style.display = 'none';
      }
    });
  }
}
