/* eslint-disable import/no-named-as-default-member */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import './window/Window.scss';
import Builder from './window/builder/BuilderWindow';
import Toolbar from './window/header/Toolbar';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        minimize: () => void;
        maximize: () => void;
        close: () => void;
      };
    };
  }
}

const Hello = () => {
  return (
    <div className="window">
      <div className="window-header">
        <span>Set Builder</span>
        <Toolbar />
      </div>
      <div className="window-content">
        <Builder />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
