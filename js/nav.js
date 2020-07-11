document.addEventListener('DOMContentLoaded', () => {
  const MAIN_PAGE = 'matches';
  let navContent = document.querySelector('.nav-content');
  let page = window.location.hash.substr(1) || MAIN_PAGE;

  loadPage(page);

  navContent.addEventListener('click', event => {
    let page = event.target.getAttribute('href').substr(1);
    loadPage(page);
  });

  // Load page
  function loadPage(page = MAIN_PAGE) {
    fetch(`pages/${page}.html`)
      .then(response => response.text())
      .then(result => {
        let main = document.querySelector('.main');
        main.innerHTML = result;
      })
      .then(() => {
        activeTab()
        runScript(page);
      });
  }
  
  function activeTab() {
    let current = window.location.hash.substr(1) || MAIN_PAGE;
    let tabs = document.querySelectorAll('.tabs .tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.tabs .tab a[href="#${current}"]`).parentNode.classList.add('active');
  }

  function runScript(page) {
    switch(page) {
      case 'matches':
        getCompetitionSchedules();
        break;
      case 'standings':
        getStandings();
        break;
      case 'teams':
        updateUITeams();
        document.querySelector('.teams').addEventListener('click', addToFavorite);
        break;
      case 'favorites':
        getAllFavorites();
        document.querySelector('.teams').addEventListener('click', addToFavorite);
        break;
    }
  }

  function addToFavorite(event) {
    if (event.target.classList.contains('add-to-favorite')) {
      event.preventDefault();
      let id = event.target.dataset.id;
      
      let iconFavorite = event.target.firstElementChild;
      if (iconFavorite.innerText === 'favorite') {
        // Delete from favorite
        console.log('delete from favorite!');
        iconFavorite.innerText = 'favorite_border';
        removeFromFavorite(id);
      } else {
        // Save to favorite
        console.log('save to favorite!');
        iconFavorite.innerText = 'favorite';
        let team = getTeamById(id);
        team.then(data => {
          saveToFavorite(data);
        })
      }
    }
  }

});