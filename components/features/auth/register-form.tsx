"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { X } from "lucide-react";
import { registerUser } from "@/services/auth.service";

interface RegisterFormProps {
  onClose: () => void;
  onToggleMode: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose, onToggleMode }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }
    setLoading(true);
    try {
      const response = await registerUser(formData.name, formData.email, formData.password);
      const data = await response.json();
      if (response.ok) {
        alert("Đăng ký thành công!");
        onToggleMode();
      } else {
        alert(data.message || "Có lỗi xảy ra");
      }
    } catch {
      alert("Không thể kết nối tới server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm p-8 bg-teal-900/90 rounded-2xl shadow-2xl border-2 border-teal-700/50">
      <button className="absolute top-4 right-4 text-white hover:text-gray-300" aria-label="Đóng" onClick={onClose}>
        <X className="cursor-pointer h-7 w-7" />
      </button>
      <h2 className="text-white text-2xl font-bold text-center mt-4 mb-8">Đăng ký tại đây</h2>
      <form onSubmit={handleSubmit}>
        {[
          { name: "name", type: "text", placeholder: "Tên người dùng" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Mật khẩu" },
          { name: "confirmPassword", type: "password", placeholder: "Nhập lại mật khẩu" },
        ].map((field) => (
          <div key={field.name} className="mb-4">
            <input name={field.name} type={field.type} placeholder={field.placeholder}
              className="w-full px-4 py-3 bg-gray-900/70 text-white placeholder-gray-500 rounded-xl border border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-400"
              required onChange={handleChange} />
          </div>
        ))}
        <button type="submit" disabled={loading}
          className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-teal-400 transition duration-200 mb-4 disabled:opacity-50">
          {loading ? "Đang đăng ký..." : "Đăng Ký"}
        </button>
        <p className="text-center text-sm text-gray-300 mb-8">
          <a href="#" className="text-red-500 font-medium hover:text-red-400"
            onClick={(e) => { e.preventDefault(); onToggleMode(); }}>Đăng nhập</a>{" "}tại đây nếu đã có tài khoản
        </p>
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-4 text-white font-semibold text-sm">Hoặc</span>
          <hr className="flex-grow border-gray-600" />
        </div>
        <button type="button" className="w-full flex items-center justify-center bg-white text-gray-800 font-semibold py-3 px-4 rounded-full shadow-lg hover:bg-gray-100">
          <FcGoogle className="w-6 h-6 mr-3" />Đăng nhập bằng Google
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
