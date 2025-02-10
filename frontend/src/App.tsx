import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Leads from '../src/components/Leads';
import Properties from './components/Properties/properties';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/leads" element={<Leads />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/" element={<div>Welcome to Real Estate CRM</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
