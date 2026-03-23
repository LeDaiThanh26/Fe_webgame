const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = {
  get: async (path: string, options?: RequestInit) => {
    const res = await fetch(`${API_BASE}${path}`, options);
    return res;
  },
  post: async (path: string, body: unknown, headers?: HeadersInit) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
    return res;
  },
  put: async (path: string, body: unknown, headers?: HeadersInit) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
    return res;
  },
  delete: async (path: string, headers?: HeadersInit) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "DELETE",
      headers,
    });
    return res;
  },
};

export default API_BASE;
