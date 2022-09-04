import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import Result from "./pages/result";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import ProtectedRoute from "./components/protectedroute";
import PublicRoute from "./components/publicroute";
import { Authprovider } from "./context/Authcontext";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Authprovider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/quiz/:id" element={<Quiz />} />
              <Route path="/result/:id" element={<Result />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
            </Route>
          </Routes>
        </Authprovider>
      </Router>
    </>
  );
}

export default App;
