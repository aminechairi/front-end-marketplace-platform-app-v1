function cookieManager(action, name, value = "", days = 0) {
  switch (action) {
    case "set":
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
      break;
    case "get":
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return c.substring(nameEQ.length, c.length);
      }
      return null;
    case "delete":
      document.cookie = name + "=; Max-Age=-99999999;";
      break;
    case "update":
      var expiresUpdate = "";
      if (days) {
        var dateUpdate = new Date();
        dateUpdate.setTime(dateUpdate.getTime() + days * 24 * 60 * 60 * 1000);
        expiresUpdate = "; expires=" + dateUpdate.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expiresUpdate + "; path=/";
      break;
    default:
      console.log('Invalid action. Use "set", "get", "delete", or "update".');
  }
}

export default cookieManager;

// cookieManager("set", "JWTToken", "123.123.123", 90);

// var username = cookieManager("get", "JWTToken");
// console.log(username);

// cookieManager("update", "JWTToken", "456456.456456.456456", 90);

// cookieManager('delete', 'JWTToken');