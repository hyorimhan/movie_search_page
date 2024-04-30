
const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=fa3f544c347818713812ca988196d68d&language=en-US&page=1`;

fetch(url)
  .then((response) => response.json())
  .then((response) => {
    let movie = response['results'].filter(
      (a) => a['original_language'] === 'en'
    ); // en 영화만 가져오기

    let card_list = movie
      .map(({ original_name, overview, vote_average, poster_path, id }) => { // movie에 있던 목록 가져와서 html card_list에 넣기
        return `<div class="movie-card"> 
      <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="poster" onclick="alert(${id})"/>
      <h2 class="movie-title">${original_name.toLowerCase()}</h2>  
      <p class="movie-overview">${overview}</p>
      <p class="movie-vote">⭐️${vote_average.toFixed(2)}</p>
    </div>`; // original name은 소문자로 변환, 별점은 소수점 자르기
      }).join('');
    document.querySelector('.movie-list').innerHTML = card_list;



    document.querySelector('#search-btn').addEventListener('click', e => {
      e.preventDefault();
      const inputValue = document.querySelector('#input-text').value.toLowerCase(); // 검색 버튼 클릭시 검색어 소문자로 변환해 가져오기
      inputValue.trim() === '' || 'undefined' ? 
        alert('검색어가 입력되지 않았거나 결과값이 없습니다') : showResult(inputValue); // 검색어가 없으면 alert, 있으면 showResult 함수 실행
    });

    function showResult(inputValue) {
      let cards = document.querySelectorAll('.movie-card'); // 모든 영화 카드 선택해 card 변수 만듦

      cards.forEach(a => {
        let movieName = a.querySelector('.movie-title').textContent.toLowerCase(); // card 변수에서 각 카드에서 제목 선택
        if (movieName.includes(inputValue)) { // 제목에 검색어가 있는지 확인
          a.style.display = 'block'; // 있으면 보이기
        } else { a.style.display = 'none'; } // 없으면 가리기
      });
    }
  })
  .catch((err) => console.log(err));
