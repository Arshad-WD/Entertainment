import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';         // Ensure correct case in filename and path
import Movie from './components/movie';       // Correct case for Movie component
import MovieDetail from './components/MovieDetail'; // Detail page for individual movie
import NotFound from './components/NotFound'; // 404 page
import ErrorBoundary from './components/ErrorBoundary'; // Error boundary for handling errors
import Navbar from './components/Navbar';
import './index.css';
import Game from './components/game';
import GameDetail from './components/GameDetail';
import Sign_in from './components/sign_in.jsx';

// Component to conditionally render Navbar based on route
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
        <Route path="/sign-in" element={<Sign_in/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  </Router>
);

export default App;
