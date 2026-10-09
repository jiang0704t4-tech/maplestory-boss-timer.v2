// 安裝後立刻跳過等待，進入啟用狀態
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 啟用後立刻接管所有客戶端頁面
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 網路優先：直接走即時網路，斷網時才嘗試快取
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
