import React from 'react';
import BodyComponent from './body';
import Header from './header';
import LoginPrompt from './login-prompt';
import { useUser } from '../context/user.context';
import { EMAIL_WHITELIST } from '../constants/auth.constants';
const Content = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-2 z-50">
        <Header />
      </header>
      <main className="flex-1 p-3 bg-gray-100">
        {user && EMAIL_WHITELIST.includes(user?.email) ? <BodyComponent /> : <LoginPrompt />}
      </main>
    </div>
  );
};

export default Content;