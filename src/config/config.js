const mode = "dev";
let baseUrl;

if (mode === "dev") {
  baseUrl = "http://localhost:8000/api/v1";
} else {
  baseUrl = "https://node-js-ecommerse-api-v1.vercel.app/api/v1";
}

export default baseUrl;
