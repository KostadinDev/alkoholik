import React from 'react';
import './App.css'; // Ensure you import Tailwind CSS in this file
import { UserProvider } from './context/user.context';
import Content from './components/content';

function App() {
  return (
    <UserProvider>
      <Content />
    </UserProvider >
  );
}

export default App;
