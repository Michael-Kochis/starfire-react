import './App.css';
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import {Routes, Route} from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/Login"
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path={"/"} element={<Layout />} >
                <Route exact path={"/"} element={<Home />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/register"} element={<Register />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
