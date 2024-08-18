import React, { useState } from 'react';
import { handleLogout, handleLoginSuccess } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";
import { Avatar, Button } from "antd";

const Header = () => {

  const [user, setUser] = useState();

  const onLoginSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    const token = credentialResponse.credential;
    const user = await handleLoginSuccess(token);
    setUser(user);
  };

  const onLoginError = () => {
    console.error("Login Failed");
  };

  const onLogout = async () => {
    await handleLogout();
    setUser(null);
  };

  return (
    <header className="flex items-center justify-center p-4 bg-gray-800 text-white">
      {user ? (
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={onLogout}
          className="flex gap-3 items-center"
        >
          {user.picture && <Avatar src={user.picture} size={30} />}
          <span>Log out</span>
        </Button>
      ) : (
        <GoogleLogin
          onSuccess={onLoginSuccess}
          theme="filled_blue"
          text={undefined}
          useOneTap
          shape="circle"
          onError={onLoginError}
        />
      )}
    </header>
  );
};

export default Header;
