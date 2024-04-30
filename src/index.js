
const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=fa3f544c347818713812ca988196d68d&language=en-US&page=1`;

fetch(url)
  .then((response) => response.json())
  .then((response) => {
    let movie = response['results'].filter(
      (a) => a['original_language'] === 'en'
    ); // en 영화만 가져오기

    let card_list = movie
      .map((a) => {
        const movieTitle = a['original_name'].toLowerCase();
        const movieOverview = a['overview'];
        const movieVote = a['vote_average'].toFixed(2);
        const movieImg = `https://image.tmdb.org/t/p/original${a['poster_path']}`;
        const movieId = a['id'];

        return `<div class="movie-card"> 
      <img src="${movieImg}" alt="poster" onclick="alert(${movieId})"/>
      <h2 class="movie-title">${movieTitle}</h2>
      <p class="movie-overview">${movieOverview}</p>
      <p class="movie-vote">⭐️${movieVote}</p>
    </div>`;
      })
      .join(''); //각 영화 카드 담은 html 생성
    document.querySelector('.movie-list').innerHTML = card_list;

    document //버튼 클릭시 검색 기능
      .querySelector('#search-btn')
      .addEventListener('click', function (event) {
        event.preventDefault();
        let inputValue = document
          .querySelector('#input-text')
          .value.toLowerCase();
        inputValue.trim() === '' ? alert('검색어를 입력해주세요') : showResult(inputValue);
      });

    function showResult(inputValue) {
      let cards = document.querySelectorAll('.movie-card'); // 모든 영화 카드 선택

      cards.forEach((a) => {
        let movieName = a.querySelector('.movie-title').textContent.toLowerCase(); // 각 카드에서 제목 선택
        if (movieName.includes(inputValue)) { a.style.display = 'block'; } else { a.style.display = 'none'; }
      });
    }
  })
  .catch((err) => console.log(err));
