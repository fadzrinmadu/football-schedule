let dbPromised = idb.open('db-football', 1, upgradeDb => {
  let teamsObjectStore = upgradeDb.createObjectStore('teams', {
    keyPath: 'id'
  });
  teamsObjectStore.createIndex('name', 'name', { unique: false });
});

function saveToFavorite(teams) {
  dbPromised
    .then(db => {
      let tx = db.transaction('teams', 'readwrite');
      let store = tx.objectStore('teams');
      console.log(teams)
      store.add(teams);
      return tx.complete;
    })
    .then(() => { 
      M.toast({
        html: 'Added to favorites',
        classes: 'notification'
      });
      console.log('Team successfully saved to favorites.')
    });
}

function removeFromFavorite(id) {
  dbPromised
    .then(db => {
      let tx = db.transaction('teams', 'readwrite');
      let store = tx.objectStore('teams');
      console.log(id);
      store.delete(parseInt(id, 10));
      return tx.complete;
    })
    .then(() => {
      M.toast({html: 'Removed from favorites'});
      console.log('Item deleted');
    });
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        let tx = db.transaction('teams', 'readonly');
        let store = tx.objectStore('teams');
        return store.getAll();
      })
      .then(teams => {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        let tx = db.transaction('teams', 'readonly');
        let store = tx.objectStore('teams');
        return store.get(id);
      })
      .then(team => {
        resolve(team);
      });
  })
}