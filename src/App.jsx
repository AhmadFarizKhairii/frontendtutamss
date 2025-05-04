import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddBon from './pages/AddBon';
import TotalBon from './pages/TotalBon';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-[#000000] text-white flex flex-col">
                <nav className="bg-[#323232] p-4 shadow-md">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-[#FFAC41]">Bon Manager</h1>
                        <div className="space-x-4">
                            <Link to="/" className="hover:text-[#FF1E56] transition-colors">
                                Home
                            </Link>
                            <Link to="/add" className="hover:text-[#FF1E56] transition-colors">
                                Add Bon
                            </Link>
                            <Link to="/total" className="hover:text-[#FF1E56] transition-colors">
                                Total Bon
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="container mx-auto p-4 flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add" element={<AddBon />} />
                        <Route path="/total" element={<TotalBon />} />
                    </Routes>
                </div>
                <footer className="bg-[#323232] p-4 text-center">
                    <p className="text-[#FFAC41]">&copy; 2025 Bon Manager. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;