import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@store/index';
import Home from '@pages/Home';
import Apply from '@pages/Apply';
import Status from '@pages/Status';
import Confirmation from '@pages/Confirmation';
import Header from '@components/Header';
import Footer from '@components/Footer';
import '@styles/globals.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex items-center justify-center py-8 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/status" element={<Status />} />
              <Route path="/confirmation/:id" element={<Confirmation />} />
            </Routes>
          </main>
          <Footer />
          
          {/* Elementos decorativos */}
          <div className="decorative-circle circle-1"></div>
          <div className="decorative-circle circle-2"></div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;