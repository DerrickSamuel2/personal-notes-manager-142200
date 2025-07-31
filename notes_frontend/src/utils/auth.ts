import { User } from "@/types/models";

// PUBLIC_INTERFACE
export function saveUserToLocalStorage(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

// PUBLIC_INTERFACE
export function getUserFromLocalStorage(): User | null {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch {
    removeUserFromLocalStorage();
    return null;
  }
}

// PUBLIC_INTERFACE
export function removeUserFromLocalStorage() {
  localStorage.removeItem("user");
}

// PUBLIC_INTERFACE
export function isAuthenticated(): boolean {
  return !!getUserFromLocalStorage();
}
