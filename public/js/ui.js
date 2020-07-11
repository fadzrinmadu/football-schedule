async function updateUIMatches(matches) {
  let matchesContainer = document.querySelector('.matches');
  matchesContainer.innerHTML = preloader();

  let html = '';
  let teams = await getTeams();
  matches.forEach(match => {
    let homeTeamLogo = getTeamLogo(teams, match.homeTeam.id);
    let awayTeamLogo = getTeamLogo(teams, match.awayTeam.id);
    
    html += `
      <div class="card-panel center">
        <div class="date grey-text text-lighten-1">
          <time>${getMatchSchedule(match.utcDate)}</time>
        </div>
        <div class="match">
          <div class="team home">
            <img class="team-logo" src="${homeTeamLogo}" alt="${match.homeTeam.name} Logo">
            <p>${match.homeTeam.name}</p>
          </div>
          <div class="result">
            <div class="scores">VS</div>
          </div>
          <div class="team away">
            <img class="team-logo" src="${awayTeamLogo}" alt="${match.awayTeam.name} Logo">
            <p>${match.awayTeam.name}</p>
          </div>
        </div>
      </div>
    `;
  });
  matchesContainer.innerHTML = html;
}

function updateUIStandings(standings) {
  let standingsContainer = document.querySelector('.standings tbody');
  standingsContainer.innerHTML = preloader();

  let html = '';
  standings.forEach(standing => {
    html += `
      <tr>
        <td class="team">
          <span class="position">${standing.position}</span>
          <img class="team-logo" src="${(standing.team.crestUrl !== null) ? standing.team.crestUrl.replace(/^http:\/\//i, 'https://') : './img/noimage.jpg'}" alt="${standing.team.name} Logo">
          <span class="team-name">${standing.team.name}</span>
        </td>
        <td class="played">${standing.playedGames}</td>
        <td class="won">${standing.won}</td>
        <td class="draw">${standing.draw}</td>
        <td class="lost">${standing.lost}</td>
        <td class="goals-for">${standing.goalsFor}</td>
        <td class="goals-against">${standing.goalsAgainst}</td>
        <td class="goal-difference">${standing.goalDifference}</td>
        <td class="points">${standing.points}</td>
      </tr>
    `;
  });
  standingsContainer.innerHTML = html;
}

async function updateUITeams() {
  let teamsContainer = document.querySelector('.teams .row');
  teamsContainer.innerHTML = preloader();

  let teams = await getTeams();
  let html = '';
  getAll().then(favoriteTeams => {
    let { length } = favoriteTeams;
    teams.forEach(team => {
      let isFavorite = favoriteTeams.some(favoriteTeam => favoriteTeam.id == team.id);
      html += `
        <div class="col s12 m6">
          <div class="card-panel card team center">
            <a class="add-to-favorite red-text" href="#" data-id="${team.id}">
              <span class="material-icons">
              ${(isFavorite) ? 'favorite' : 'favorite_border'}
              </span>
            </a>
            <div class="card-image">
              <img src="${(team.crestUrl !== null) ? team.crestUrl.replace(/^http:\/\//i, 'https://') : './img/noimage.jpg'}" alt="${team.name} Logo">
            </div>
            <div class="card-content">
              <p>${team.name}</p>
              <address class="address">${team.address}</address>
              <span class="phone">${team.phone}</span>
            </div>
            <div class="card-action">
              <a class="grey-text grey-lighten-1" href="${team.website}" target="_blank">Visit the wesbite</a>
            </div>
          </div>
        </div>
      `;
    });
    teamsContainer.innerHTML = html;
  });
}

function updateUIFavorites(teams) {
  let favoriteContainer = document.querySelector('.favorite .row');
  favoriteContainer.innerHTML = preloader();

  let html = '';
  if (teams.length === 0) {
    html = `
      <div class="card-panel center">
        <h5 class="center">There is no favored teams.</h5>
      </div>
    `;
  } else {
    teams.forEach(team => {
      html += `
        <div class="col s12 m6">
          <div class="card-panel card team center">
            <a class="add-to-favorite red-text" href="#" data-id="${team.id}">
              <span class="material-icons">
              favorite
              </span>
            </a>
            <div class="card-image">
              <img src="${(team.crestUrl !== null) ? team.crestUrl.replace(/^http:\/\//i, 'https://') : './img/noimage.jpg'}" alt="${team.name} Logo">
            </div>
            <div class="card-content">
              <address class="address">${team.address}</address>
              <span class="phone">${team.phone}</span>
            </div>
            <div class="card-action">
              <a class="grey-text grey-lighten-1" href="${team.website}">Visit the wesbite</a>
            </div>
          </div>
        </div>
      `;
    });
  }
  favoriteContainer.innerHTML = html;
}

function preloader() {
  return `
    <div class="loading center" style="margin: 28px;">
      <div class="preloader-wrapper small active">
        <div class="spinner-layer spinner-red-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}