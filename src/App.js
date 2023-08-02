import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Spinner from "./component/spinner";
import Sepet from './screens/Sepet'
import Profile from './screens/Profile'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (user) {
        localStorage.setItem("isLoggedIn", "true");
      } else {
        localStorage.setItem("isLoggedIn", "false");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  if (isLoading) {
    return <Spinner />;
  }

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      <Routes>
        {/* Erişim kontrolü burada yapılıyor */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* isLoggedIn değişkenine göre rotalar yönlendiriliyor */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/home" replace /> : <Register />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/sepet"
          element={isLoggedIn ? <Sepet /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
