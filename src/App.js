import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CssBaseline,
} from "@mui/material";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Login from "./components/Login";
import Register from "./components/Register";
import RuneList from "./components/RuneList";
import CreateRune from "./components/CreateRune";
import EditRune from "./components/EditRune";

const theme = createTheme();

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function Navigation() {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Runes Recognition
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/runes">
              My Runes
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navigation />
          <Container component="main" maxWidth="xs">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/runes"
                element={
                  <ProtectedRoute>
                    <RuneList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-rune"
                element={
                  <ProtectedRoute>
                    <CreateRune />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-rune/:id"
                element={
                  <ProtectedRoute>
                    <EditRune />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
