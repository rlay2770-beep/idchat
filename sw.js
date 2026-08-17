// sw.js
self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
    body: data.message,
    icon: '/icon.png', // အစ်ကို့ App icon လမ်းကြောင်း
    badge: '/badge.png',
    vibrate: [200, 100, 200, 100, 200], // ဖုန်းတုန်ခါမှု
    actions: [
      { action: 'accept', title: '📞 ကိုင်မည်' },
      { action: 'reject', title: '📵 ငြင်းမည်' }
    ],
    data: { url: '/' },
    requireInteraction: true // SIM ဖုန်းလိုပဲ အသုံးပြုသူမပိတ်မချင်း Notification ရှိနေမည်
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification ကို နှိပ်လိုက်ရင် App ပြန်ပွင့်လာအောင် လုပ်ခြင်း
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'accept') {
    clients.openWindow('/'); // App ကို ပြန်ဖွင့်ပေးခြင်း
  }
});
    
