import React, { useState } from 'react';
import LoginForm from "./login" ;
import RegisterForm from "./register" ;

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    if (!isOpen) {
        return null;
    }

    const toggleMode = () => {
        setIsLoginMode(prev => !prev);
    };

    return (
        <div 
            className="fixed inset-0  bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="relative max-w-sm w-full transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {isLoginMode ? (
                    <LoginForm 
                        onClose={onClose} 
                        onToggleMode={toggleMode} 
                    />
                ) : (
                    <RegisterForm 
                        onClose={onClose} 
                        onToggleMode={toggleMode} 
                    />
                )}
            </div>
        </div>
    );
};

export default AuthModal;