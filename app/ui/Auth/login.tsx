import React from 'react';
import { FcGoogle } from 'react-icons/fc'; 
import { X } from 'lucide-react'; 

interface LoginFormProps {
    onClose: () => void; 
    onToggleMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onToggleMode }) => {
    return (
        <div className="relative w-full max-w-sm p-8 bg-teal-900/90 rounded-2xl shadow-2xl border-2 border-teal-700/50">
            
            {/* Nút Đóng */}
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition duration-150"
              aria-label="Đóng"
              onClick={onClose} 
            >
              <X className=" cursor-pointer h-7 w-7" />
            </button>
            
            <h2 className="text-white text-2xl font-bold text-center mt-4 mb-8">
              Đăng nhập tại đây
            </h2>

            <form onSubmit={(e) => { e.preventDefault(); console.log('Đăng nhập'); }}>
              
              {/* Input: Tên đăng nhập */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Điền vào tên đăng nhập"
                  className="w-full px-4 py-3 bg-gray-900/70 text-white placeholder-gray-500 rounded-xl border border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:border-teal-400"
                  required
                />
              </div>

              {/* Input: Mật khẩu */}
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Điền vào mật khẩu"
                  className="w-full px-4 py-3 bg-gray-900/70 text-white placeholder-gray-500 rounded-xl border border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:border-teal-400"
                  required
                />
              </div>

              {/* Link Đăng ký: Gọi onToggleMode */}
              <p className="text-center text-sm mb-8">
                <a 
                  href="#" 
                  className="text-red-500 font-medium hover:text-red-400 transition duration-150" 
                  onClick={(e) => { e.preventDefault(); onToggleMode(); }}
                >
                  Đăng ký
                </a>
                {' '}tại đây nếu chưa có tài khoản
              </p>
              
              {/* Đường kẻ Hoặc */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-600" />
                <span className="mx-4 text-white font-semibold">Hoặc</span> 
                <hr className="flex-grow border-gray-600" />
              </div>

              {/* Nút Đăng nhập bằng Google */}
              <button
                type="button"
                className="w-full flex items-center justify-center bg-white text-gray-800 font-semibold py-3 px-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-200"
                onClick={() => console.log('Login with Google')}
              >
                <FcGoogle className="w-6 h-6 mr-3" />
                Đăng nhập bằng Google
              </button>
            </form>
        </div>
    );
}

export default LoginForm;