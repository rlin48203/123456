const CACHE='word-trainer-v2';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.add('./')));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(self.clients.claim());});
self.addEventListener('fetch',event=>{event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)));});
self.addEventListener('message',event=>{
  if(event.data?.type==='SHOW_REMINDER'){
    self.registration.showNotification('📚 每日单词时间',{
      body:'今天的 10 个单词还在等你，来练一会儿吧！',
      tag:'daily-word-reminder',
      icon:'./icon.svg',
      badge:'./icon.svg',
      data:{url:'./'}
    });
  }
});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus' in c)return c.focus();}return clients.openWindow('./');}));});