let webPush = require('web-push');

const vapidKeys = {
  "publicKey": "BLOmclFZrpgSKFlTZzcyZZZpvEPOeueIyE1cP6kdnCnMXV2hPyufTWBpgUI_Z8TlD3aBJjXh8qFgxcTEMb_phNI",
  "privateKey": "lGNyuJZ3nu7lC8lwQc_fqScqC08LQtkm0aQE5f4Ecyo"
};

webPush.setVapidDetails(
  'mailto:aan.fadzrin@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/cFCphOlb-L8:APA91bGW8n99wLJXjnLAvT5pwvjYRc8MmArUJgdOHp13-HTfkmLgpyEsUGbPZS-smIBkuREleGBQ1_9imRilHHzvsch2qJ3PaiPdPanwtbHkjLyrtc3GKbVrrbYQy4nvxEkIIxobYiHE",
  "keys": {
    "p256dh": "BBpJRZmXox4D5FithlFIiULi4uZqf//+9vNjMkJcAdx5hi+i9byJca36J8dbPvOUHF2Uks2j/uFP0KFJb0NV2D8=",
    "auth": "fdZQ9EEfQy1pKo1q9cV3Jg=="
  }
}

let payload = 'Congratulations! Your application can already receive push notifications!';

let options = {
  gcmAPIKey: '802045398724',
  TTL: 60
}

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);