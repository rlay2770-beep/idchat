// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyD81JR9IoFkwGbkq0UWQ4aqfgwwpvLg668",
  authDomain: "idchat-2bc95.firebaseapp.com",
  databaseURL: "https://idchat-2bc95-default-rtdb.firebaseio.com",
  projectId: "idchat-2bc95",
  storageBucket: "idchat-2bc95.firebasestorage.app",
  messagingSenderId: "698756711127",
  appId: "1:698756711127:web:873c465228b2d0976fa692"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background Message Handler (ဖုန်းပိတ်ထားရင်တောင် အလုပ်လုပ်မယ်)
messaging.onBackgroundMessage((payload) => {
  console.log('📱 Background Message Received:', payload);
  
  const { callerID, callType } = payload.data || {};
  const notificationTitle = payload.notification?.title || '📞 Incoming Call';
  const notificationBody = payload.notification?.body || 'ဖုန်းဝင်လာပါသည်။';
  
  const notificationOptions = {
    body: notificationBody,
    icon: '/icon.png',
    badge: '/badge.png',
    vibrate: [200, 100, 200],
    data: {
      callerID: callerID || '',
      callType: callType || 'video',
      url: '/'
    },
    actions: [
      { action: 'accept', title: '📞 ဖြေမည်' },
      { action: 'decline', title: '❌ ပယ်မည်' }
    ]
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const data = event.notification.data || {};
  const action = event.action;
  
  if (action === 'accept') {
    // Call Screen ဖွင့်ပါ
    event.waitUntil(
      clients.openWindow(`/?callerID=${data.callerID}&callType=${data.callType}&accept=true`)
    );
  } else if (action === 'decline') {
    // Call ကို ပယ်လိုက်ပါ
    console.log('Call declined');
  } else {
    // Default - App ကိုဖွင့်ပါ
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
