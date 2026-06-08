const API_URL = import.meta.env.VITE_API_URL || "https://yusratuitionlab.onrender.com/api";

export async function logoutSession() {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Still clear local session if the request fails
  }
  localStorage.removeItem("user");
  try {
    window.dispatchEvent(new Event("userChanged"));
  } catch {
    // ignore
  }
}
