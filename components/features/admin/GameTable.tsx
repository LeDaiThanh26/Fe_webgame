"use client";

import { Eye, Edit, Trash2 } from "lucide-react";
import type { AdminGame } from "@/types";

type GameTableProps = {
  games: AdminGame[];
  onEdit: (game: AdminGame) => void;
  onDelete: (slug: string) => void;
};

export default function GameTable({ games, onEdit, onDelete }: GameTableProps) {
  if (games.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-12 text-center text-gray-400">Không tìm thấy game nào</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#002B50] to-[#003D6B] text-white">
            <tr>
              {["Hình ảnh", "Tên Game", "Nhà phát triển", "Slug", "Danh mục", "Ngày tạo", "Thao tác"].map((h) => (
                <th key={h} className="px-6 py-4 text-left text-sm font-bold first:text-left last:text-center">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {games.map((game) => {
              const imgUrl = game.thumbnail || (Array.isArray(game.image) ? game.image[0] : game.image);
              return (
                <tr key={game._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {imgUrl ? (
                      <img src={imgUrl} alt={game.name} className="w-16 h-16 object-cover rounded-lg shadow" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Eye size={24} className="text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">{game.name}</td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded break-all">{game.dev}</code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{game.slug}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {game.category || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {game.createdAt ? new Date(game.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(game)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                        title="Sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => game.slug && onDelete(game.slug)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
