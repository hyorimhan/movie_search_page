const movieAPI = config.apikey;
const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${movieAPI}&language=en-US&page=3`;

fetch(url)
  .then((response) => response.json())
  .then((response) => {
    let movie = response['results'].filter(
      (a) => a['original_language'] === 'en'
    ); // en 영화만 가져오기

    let card_list = movie
      .map((a) => {
        const movieTitle = a['original_title'].toLowerCase();
        const movieOverview = a['overview'];
        const movieVote = a['vote_average'].toFixed(2);
        const movieImg = `https://image.tmdb.org/t/p/original${a['poster_path']}`;
        const movieId = a['id'];

        return `<div class="movie-card" onclick="alert(${movieId})"> 
      <img src="${movieImg}" alt="poster" />
      <h2 class="movie-title">${movieTitle}</h2>
      <p class="movie-overview">${movieOverview}</p>
      <p class="movie-vote">⭐️${movieVote}</p>
    </div>`;
      })
      .join(''); //각 영화 카드 담은 html 생성
    document.querySelector('.movie-list').innerHTML = card_list;

    document
      .querySelector('#search-btn')
      .addEventListener('click', function (event) {
        event.preventDefault();
        showResult();
      });

    function showResult() {
      let inputValue = document
        .querySelector('#input-text')
        .value.toLowerCase(); //소문자로 변환
      let cards = document.querySelectorAll('.movie-card'); // 모든 영화 카드 선택

      cards.forEach((a) => {
        let movieName = a
          .querySelector('.movie-title')
          .textContent.toLowerCase(); // 각 카드에서 제목 선택
        if (movieName.includes(inputValue)) {
          //includes (요소가 배열 안에 존재하면 true)
          a.style.display = 'block'; // true일 경우 보이기
        } else {
          a.style.display = 'none'; // false일 경우 숨기기
        }
      });
    }
  })
  .catch((err) => console.log(err));
