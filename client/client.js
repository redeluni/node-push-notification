/// Chiave pubblica da utilizzare solo lato client
const publicVapidKey =
  'BGHQnh1L4ae5m8T0uKazybR_3TtT6L8AKfDxxnAguyyDIjAA0YiOal-DJ6XWEyE0s2iqoR2EaR0DHcv0XbaMKeY';

// Check for service worker
if ('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}

/**
 * Register Service Worker, Register Push, Send Push.
 * <a> Register Service Worker
 * <b> Register Push
 * <c> Send Push Notification
 */
async function send() {
  // <a>
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log('Service Worker Registered...');
  // </a>

  // <b>
  console.log('Registering Push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('Push Registered...');

  // </b>

  // <c>
  console.log('Sending Push...');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Push Sent...');
  // </c>
}

/// Gestisce la chiave pubblica
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const button = document.querySelector('BUTTON');
button.addEventListener('click', () => {
  if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
  }
});
