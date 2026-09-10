import axios from "axios";

const apiBaseUrl = `${import.meta.env.VITE_API_URL ?? ""}/api`;

export const adminApi = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

function csrfToken() {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("admin_csrf="))
    ?.split("=")[1];
}

export function csrfConfig() {
  const token = csrfToken();
  return token ? { headers: { "X-CSRF-Token": decodeURIComponent(token) } } : {};
}
