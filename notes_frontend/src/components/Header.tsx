"use client";

import React from "react";
import { getUserFromLocalStorage, removeUserFromLocalStorage } from "@/utils/auth";
import { useRouter } from "next/navigation";

const colors = {
  primary: "#2563eb",
  accent: "#f59e42",
};

export default function Header() {
  const router = useRouter();
  const [user, setUser] = React.useState(getUserFromLocalStorage());

  React.useEffect(() => {
    setUser(getUserFromLocalStorage());
  }, []);

  // PUBLIC_INTERFACE
  function handleLogout() {
    removeUserFromLocalStorage();
    setUser(null);
    router.push("/login");
  }

  return (
    <header
      className="flex items-center justify-between px-6 py-4"
      style={{
        background: colors.primary,
        color: "#fff",
        minHeight: 60,
        borderBottom: `2px solid ${colors.accent}`,
      }}
    >
      <div className="font-bold text-lg tracking-wider">Notes</div>
      <div>
        {!!user ? (
          <span>
            <span className="mr-4">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-[#fff] text-primary px-3 py-1 rounded hover:bg-[#f3f3f3] font-medium transition"
              style={{
                color: colors.primary,
                border: `1px solid ${colors.primary}`,
              }}
            >
              Logout
            </button>
          </span>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="bg-[#fff] text-primary px-3 py-1 rounded hover:bg-[#f3f3f3] font-medium transition"
            style={{
              color: colors.primary,
              border: `1px solid ${colors.primary}`,
            }}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
