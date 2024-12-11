self.addEventListener('push', function (event) {
    const data = event.data ? event.data.text() : 'No payload';
    const options = {
      body: data,
      icon: '/icon.png',
    };
  
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  