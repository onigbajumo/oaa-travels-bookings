"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

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
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwt.decode(storedToken);
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
    if (expirationTimeoutRef.current) clearTimeout(expirationTimeoutRef.current);
    
    expirationTimeoutRef.current = setTimeout(() => {
      handleTokenExpiration();
    }, expirationTime);
  };

  const handleTokenExpiration = () => {
    localStorage.removeItem("token");
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
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const data = await response.json();
      console.log("Login Data:", data);
      const { accessToken } = data;

      localStorage.setItem("token", accessToken);
      setToken(accessToken);

      const decodedToken = jwt.decode(accessToken);
      console.log(decodedToken)
      if (!decodedToken) {
        throw new Error("Failed to decode token.");
      }

      setIsAuthenticated(true);
      setUserRole(decodedToken.role);

      const expirationTime = decodedToken.exp * 1000 - Date.now();
      setExpirationTimeout(expirationTime);

      toast.success("Login successful!");
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleTokenLogin = (tokenFromUrl) => {
    if (isProcessingRef.current) return;

    setLoading(true);

    try {
      const decodedToken = jwt.decode(tokenFromUrl);

      if (!decodedToken) {
        throw new Error("Invalid token.");
      }

      const expirationDate = new Date(decodedToken.exp * 1000);
      if (expirationDate < new Date()) {
        throw new Error("Token has expired.");
      }

      localStorage.setItem("token", tokenFromUrl);
      setToken(tokenFromUrl);
      setIsAuthenticated(true);
      setUserRole("admin");

      const expirationTime = decodedToken.exp * 1000 - Date.now();
      setExpirationTimeout(expirationTime);

      router.push("/resources");
    } catch (err) {
      console.error("Error in handleTokenLogin:", err);
      toast.error(
        err.message || "An error occurred during token verification."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    setUserRole(null);
    if (expirationTimeoutRef.current) clearTimeout(expirationTimeoutRef.current);
    router.push("/access-management");
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
      const response = await fetch("/api/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token.");
      }

      const data = await response.json();
      const { token: newToken } = data;

      localStorage.setItem("token", newToken);
      setToken(newToken);

      const decodedNewToken = jwt.decode(newToken);
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
        handleTokenLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
