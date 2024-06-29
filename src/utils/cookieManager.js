const cookieManager = (action, name, value = '', days = 0, path = '/') => {
  switch (action) {
    case 'set':
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=' + path;
      return value;
    case 'get':
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    case 'delete':
      document.cookie = name + '=; Max-Age=-99999999; path=' + path;
      return null;
    case 'update':
      let expiresUpdate = '';
      if (days) {
        const dateUpdate = new Date();
        dateUpdate.setTime(dateUpdate.getTime() + days * 24 * 60 * 60 * 1000);
        expiresUpdate = '; expires=' + dateUpdate.toUTCString();
      }
      document.cookie = name + '=' + (value || '') + expiresUpdate + '; path=' + path;
      return value;
    default:
      console.log('Invalid action. Use "set", "get", "delete", or "update".');
      return null;
  }
};

export default cookieManager;