if ('serviceWorker' in navigator) {
  registerServiceWorker();
  requestPermission();
} else {
  console.log('Service worker is not supported by this browser.');
}

// Register service worker
function registerServiceWorker() {
  return navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      console.log('Service worker registration successful.');
      return registration;
    })
    .catch(() => {
      console.log('Service worker registration failed.')
    });
}

// Check The Notification Feature API
function requestPermission() {
  Notification.requestPermission().then(result => {
    if (result === 'denied') {
      console.log('Notification feature not permitted.');
      return;
    } 

    if (result === 'default') {
      console.log('The user closes the permission request dialog box.');
      return;
    }
    
    if (('PushManager' in window)) {
      navigator.serviceWorker.getRegistration().then(registration => {
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('BLOmclFZrpgSKFlTZzcyZZZpvEPOeueIyE1cP6kdnCnMXV2hPyufTWBpgUI_Z8TlD3aBJjXh8qFgxcTEMb_phNI')
        }).then(subscribe => {
          console.log('Successfully subscribed with endpoint: ', subscribe.endpoint);
          console.log('Successfully subscribed with p256dh key: ', btoa(String.fromCharCode.apply(
            null,
            new Uint8Array(subscribe.getKey('p256dh'))
          )));
          console.log('Successfully subscribed with auth key: ', btoa(String.fromCharCode.apply(
            null,
            new Uint8Array(subscribe.getKey('auth'))
          )));
        }).catch(error => {
          console.log("can't subscribe: ", error.message);
        })
      });
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}