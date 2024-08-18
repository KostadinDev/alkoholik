import React from 'react';
import './App.css'; // Ensure you import Tailwind CSS in this file
import BodyComponent from './components/body';
import Header from './components/header';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4 z-50">
        <Header />
      </header>
      <main className="pt-16 flex-1 p-4 bg-gray-100">
        <BodyComponent />
      </main>
    </div>
  );
}

export default App;
