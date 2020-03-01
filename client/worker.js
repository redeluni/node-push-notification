console.log('Service Worker Loaded...');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push Recieved...');
  self.registration.showNotification(data.title, {
    body: 'Notified by Daniele Manzi 1!',
    icon: 'https://i.imgur.com/mgT7ltP.png'
  });
});
// icon: 'http://image.ibb.co/M9kFmp8/wp-logo-128x128.png'
// icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
