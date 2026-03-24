const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = {
  get: async (path: string, options?: RequestInit) => {
    return fetch(`${API_BASE}${path}`, options);
  },
  post: async (path: string, body: unknown, headers?: HeadersInit) => {
    return fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
  },
  put: async (path: string, body: unknown, headers?: HeadersInit) => {
    return fetch(`${API_BASE}${path}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
  },
  delete: async (path: string, headers?: HeadersInit) => {
    return fetch(`${API_BASE}${path}`, { method: "DELETE", headers });
  },
};

export default API_BASE;
