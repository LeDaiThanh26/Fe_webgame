"use client";

import React, { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        {isLoginMode ? (
          <LoginForm onClose={onClose} onToggleMode={() => setIsLoginMode(false)} />
        ) : (
          <RegisterForm onClose={onClose} onToggleMode={() => setIsLoginMode(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
