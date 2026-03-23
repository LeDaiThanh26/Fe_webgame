"use client";

import type { FormEvent } from "react";
import type { AdminGame } from "@/app/lib/types";

const CATEGORIES = ["IO Games", "Strategy", "Action", "Shooter", "Puzzle", "Racing"];

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
    />
  </div>
);

const FormTextarea = ({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE] resize-none"
    />
  </div>
);

type FormData = {
  name: string; slug: string; dev: string; release_date: string;
  technology: string; platforms: string; thumbnail: string; image: string;
  link_game: string; video: string; category: string;
  description: string; how_to_play: string;
};

type GameFormModalProps = {
  currentGame: AdminGame | null;
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onClose: () => void;
};

export default function GameFormModal({
  currentGame,
  formData,
  updateField,
  onSubmit,
  onClose,
}: GameFormModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-[#002B50] to-[#003D6B] text-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-2xl font-bold">
            {currentGame ? "Chỉnh sửa Game" : "Tạo Game Mới"}
          </h2>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <FormInput label="Tên Game" value={formData.name} onChange={(v) => updateField("name", v)} required />
          <FormInput label="Slug" value={formData.slug} onChange={(v) => updateField("slug", v)} required />
          <FormInput label="URL Hình ảnh (cách nhau bởi dấu phẩy)" value={formData.image} onChange={(v) => updateField("image", v)} />
          <FormInput label="Thumbnail URL" value={formData.thumbnail} onChange={(v) => updateField("thumbnail", v)} />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Nhà phát triển" value={formData.dev} onChange={(v) => updateField("dev", v)} />
            <FormInput type="date" label="Release Date" value={formData.release_date} onChange={(v) => updateField("release_date", v)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Công nghệ" value={formData.technology} onChange={(v) => updateField("technology", v)} />
            <FormInput label="Platforms (cách nhau ,)" value={formData.platforms} onChange={(v) => updateField("platforms", v)} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Danh mục</label>
            <select
              value={formData.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE]"
            >
              <option value="">Chọn danh mục</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <FormTextarea label="Mô tả" value={formData.description} onChange={(v) => updateField("description", v)} />
          <FormTextarea label="How to play" value={formData.how_to_play} onChange={(v) => updateField("how_to_play", v)} rows={2} />
          <FormInput label="Link game" value={formData.link_game} onChange={(v) => updateField("link_game", v)} />
          <FormInput label="Video URL" value={formData.video} onChange={(v) => updateField("video", v)} />

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#00C9FF] to-[#0095BE] text-white font-bold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
            >
              {currentGame ? "Cập nhật" : "Tạo Game"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
