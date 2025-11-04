// Cart Storage Utilities for offline persistence

export const cartStorage = {
  // Get cart from storage
  async getCart() {
    try {
      if ('indexedDB' in window) {
        // Try to use IndexedDB first
        const db = await this._getDatabase();
        return await this._getCartFromDB(db) || [];
      }
    } catch (error) {
      console.log('IndexedDB not available, using localStorage');
    }
    
    // Fallback to localStorage
    const cart = localStorage.getItem('pwa-shop-cart');
    return cart ? JSON.parse(cart) : [];
  },

  // Save cart to storage
  async saveCart(cart) {
    try {
      if ('indexedDB' in window) {
        const db = await this._getDatabase();
        return await this._saveCartToDB(db, cart);
      }
    } catch (error) {
      console.log('IndexedDB not available, using localStorage');
    }
    
    // Fallback to localStorage
    localStorage.setItem('pwa-shop-cart', JSON.stringify(cart));
  },

  // Private helper methods
  async _getDatabase() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('pwa-shop-db', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('cart-data')) {
          db.createObjectStore('cart-data', { keyPath: 'id' });
        }
      };
    });
  },

  async _getCartFromDB(db) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['cart-data'], 'readonly');
      const store = transaction.objectStore('cart-data');
      const request = store.get('current-cart');
      
      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.data : []);
      };
      
      request.onerror = () => reject(request.error);
    });
  },

  async _saveCartToDB(db, cart) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['cart-data'], 'readwrite');
      const store = transaction.objectStore('cart-data');
      const request = store.put({ id: 'current-cart', data: cart });
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  // Queue action for background sync
  async queueAction(action, data) {
    const queue = JSON.parse(localStorage.getItem('pwa-shop-queue') || '[]');
    queue.push({ action, data, timestamp: Date.now(), synced: false });
    localStorage.setItem('pwa-shop-queue', JSON.stringify(queue));
  },

  // Get queued actions
  async getQueuedActions() {
    return JSON.parse(localStorage.getItem('pwa-shop-queue') || '[]');
  }
};

export default cartStorage;

