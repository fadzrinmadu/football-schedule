const baseURL = 'https://api.football-data.org/v2';
const token = '965791a690034c05a4da3229e093fbeb';

const fetchAPI = function(url) {
  return fetch(url, {
    headers: {
      'X-Auth-Token': token
    }
  });
}

function status(response) {
  if (response.status !== 200) {
    console.log(`Error: ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log(`Error: ${error}`);
}

function getCompetitionSchedules() {
  if ('caches' in window) {
    caches.match(`${baseURL}/competitions/2021/matches?status=SCHEDULED`)
      .then(response => {
        if (response) {
          response.json().then(data => {
            let matches = data.matches.slice(0, 10);
            updateUIMatches(matches);
          });
        }
      });
  }

  fetchAPI(`${baseURL}/competitions/2021/matches?status=SCHEDULED`)
    .then(status)
    .then(json)
    .then(data => {
      let matches = data.matches.slice(0, 10);
      updateUIMatches(matches);
    })
    .catch(error);
}

function getTeams() {
  if ('caches' in window) {
    caches.match(`${baseURL}/teams`)
      .then(response => {
        if (response) {
          response.json().then(data => {
            return data.teams;
          });
        }
      });
  }

  return fetch(`${baseURL}/teams`, {
    headers: { 
      'X-Auth-Token': token
    }
  })
  .then(status)
  .then(json)
  .then(data => data.teams)
  .catch(error);
}

function getTeamLogo(teams, id) {
  let team = teams.find(team => team.id === id);
  return team.crestUrl;
}

function getStandings() {
  if ('caches' in window) {
    caches.match(`${baseURL}/competitions/2021/standings`)
      .then(response => {
        if (response) {
          response.json().then(data => {
            let standings = data.standings[0].table;
            updateUIStandings(standings);
          })
        }
      })
  }

  fetch(`${baseURL}/competitions/2021/standings`, {
    headers: {
      'X-Auth-Token': token
    }
  })
  .then(status)
  .then(json)
  .then(data => {
    let standings = data.standings[0].table;
    updateUIStandings(standings);
  })
  .catch(error);
}

function getTeamById(id) {
  return new Promise((resolve, reject) => {
    if ('caches' in window) {
      caches.match(`${baseURL}/teams/${id}`)
        .then(response => {
          if (response) {
            response.json().then(data => {
              resolve(data);
            })
          }
        });
    }
    
    fetchAPI(`${baseURL}/teams/${id}`)
      .then(status)
      .then(json)
      .then(data => {
        resolve(data);
      })
      .then(error);
  });
}

function getAllFavorites() {
  getAll().then(teams => {
    updateUIFavorites(teams);
  });
}

function getMatchSchedule(dateString) {
  let date = new Date(dateString);
  let hour = addZero(date.getHours());
  let minute = addZero(date.getMinutes());
  let day = checkDay(date.getDay());
  let timeSignal = checkTimeSignal(date.getHours());
  return `${day}, ${hour}:${minute} ${timeSignal}`;
}

function addZero(number) {
  if (number < 10) number = '0' + number;
  return number;
}

function checkDay(day) {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currentDay = new Date().getDay();

  if (currentDay === day) {
    return 'Today';
  } else if ((currentDay + 1) === day) {
    return 'Tomorrow';
  } else {
    return days[day];
  }
}

function checkTimeSignal(hour) {
  return (hour >= 12) ? 'PM' : 'AM';
}