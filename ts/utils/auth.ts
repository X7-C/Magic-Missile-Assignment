const API_BASE = "https://v2.api.noroff.dev/auth";
const API_KEY = "b99247dd-8989-4e93-8790-01cbfd47910b";

export interface User {
  name: string;
  email: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
  accessToken: string;
}

export async function registerUser(name: string, email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.errors?.[0]?.message || "Registration failed");

    return data.data as User;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.errors?.[0]?.message || "Login failed");

    localStorage.setItem("token", data.data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.data));

    window.dispatchEvent(new Event("authChange"));

    return data.data as User;
  } catch (error) {
    throw error;
  }
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.dispatchEvent(new Event("authChange"));
}

export function getUser(): User | null {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("token");
}
