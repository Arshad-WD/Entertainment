import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';        
import Movie from './components/movie';      
import MovieDetail from './components/MovieDetail'; 
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import './index.css';
import Game from './components/game';
import GameDetail from './components/GameDetail';
import Sign_in from './components/sign_in.jsx';
import About from './components/About.jsx';
import Login from './components/Login.jsx'
import Settings from './components/setting.jsx';

const ConditionalNavbar = () => {
  const location = useLocation();
  return location.pathname !== '/' ? <Navbar /> : null;
};

const App = () => (
  <Router>
    <ErrorBoundary>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game/:id" element={<GameDetail />} />

        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<Sign_in/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  </Router>
);

export default App;
