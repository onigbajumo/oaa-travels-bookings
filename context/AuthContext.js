"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const isProcessingRef = useRef(false);
  const expirationTimeoutRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedAccessToken) {
      setToken(storedAccessToken);
      const decodedToken = jwt.decode(storedAccessToken);

      if (decodedToken) {
        setIsAuthenticated(true);
        setUserRole(decodedToken.role);

        const expirationTime = decodedToken.exp * 1000 - Date.now();
        setExpirationTimeout(expirationTime);
      }
    }

    setLoading(false);
  }, []);

  const setExpirationTimeout = (expirationTime) => {
    if (expirationTimeoutRef.current) {
      clearTimeout(expirationTimeoutRef.current);
    }
    expirationTimeoutRef.current = setTimeout(() => {
      handleTokenExpiration();
    }, expirationTime);
  };

  const handleTokenExpiration = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setIsAuthenticated(false);
    setUserRole(null);
    router.push("/");
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrPhone: email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed.");
      }
  
      const data = await response.json();
      console.log("Login Response:", data);
  
      const { accessToken, refreshToken } = data;
  
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
  
      const decodedAccessToken = jwt.decode(accessToken);
      console.log("Decoded Access Token:", decodedAccessToken);
  
      if (!decodedAccessToken) {
        throw new Error("Failed to decode access token.");
      }
  
      setToken(accessToken);
      setIsAuthenticated(true);
      setUserRole(decodedAccessToken.role);
  
      const expirationTime = decodedAccessToken.exp * 1000 - Date.now();
      setExpirationTimeout(expirationTime);
  
      toast.success("Login successful!");
  
      if (decodedAccessToken.role) {
        router.push(`/${decodedAccessToken.role}`);
      } else {
        router.push("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };
  
  
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setIsAuthenticated(false);
    setUserRole(null);

    if (expirationTimeoutRef.current) {
      clearTimeout(expirationTimeoutRef.current);
    }
    router.push("/login");
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to send reset instructions."
        );
      }

      const data = await response.json();
      toast.success(
        data.message || "Password reset instructions sent to your email."
      );
    } catch (err) {
      toast.error(err.message || "An error occurred. Please try again later.");
    }
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available.");
      }

      const response = await fetch("/api/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token.");
      }

      const data = await response.json();
      const { token: newAccessToken } = data;

      localStorage.setItem("accessToken", newAccessToken);
      setToken(newAccessToken);

      const decodedNewToken = jwt.decode(newAccessToken);
      if (decodedNewToken) {
        setIsAuthenticated(true);
        setUserRole(decodedNewToken.role);

        const newExpirationTime = decodedNewToken.exp * 1000 - Date.now();
        setExpirationTimeout(newExpirationTime);
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      handleTokenExpiration();
    }
  };

  useEffect(() => {
    let refreshTimeout;

    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken) {
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        refreshTimeout = setTimeout(() => {
          refreshAuthToken();
        }, timeUntilExpiration - 60000);
      }
    }

    return () => {
      if (refreshTimeout) clearTimeout(refreshTimeout);
    };
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        loading,
        token,
        login,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
