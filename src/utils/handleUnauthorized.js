import cookieManager from "./cookieManager";

// Helper function to handle 401 and 403 responses
const handleUnauthorized = (response) => {
  if (response.status === 401) {
    cookieManager("delete", "JWTToken");
    throw window.location.replace("/log-in");
  }
  if (response.status === 403) {
    throw window.location.replace("/users/email-verification");
  }
  return response;
};

export default handleUnauthorized;
