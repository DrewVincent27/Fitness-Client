import './App.css';
import {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { UserProvider } from './UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AppNavbar from './components/AppNavbar';
import AddWorkout from './pages/AddWorkout';
import Workouts from './pages/Workouts';
function App() {

  const [ user, setUser ] = useState({

    access:localStorage.getItem('token'),
    id: null,
    isAdmin: null
})

const unsetUser = () => {
  localStorage.clear();

}

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
      <AppNavbar/>
        <Container>
         <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/addWorkout" element={<AddWorkout/>} />
          <Route path="/workouts" element={<Workouts/>} />


        </Routes>
       </Container>
      </Router>
    </UserProvider>

  );
}

export default App;
