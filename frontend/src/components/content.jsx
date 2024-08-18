import React from 'react';
import BodyComponent from './body';
import Header from './header';
import { useUser } from '../context/user.context';

const Content = () => {
  const { user, setUser } = useUser();
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4 z-50">
        <Header />
      </header>
      <main className="pt-16 flex-1 p-4 bg-gray-100">
        {user ? <BodyComponent /> : <></>}
      </main>
    </div>
  );
};

export default Content;