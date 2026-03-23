"use client";

import { useEffect, useState, FormEvent } from "react";
import { Plus, Search, Filter } from "lucide-react";
import GameTable from "@/app/admin/components/GameTable";
import GameFormModal from "@/app/admin/components/GameFormModal";
import { api } from "@/app/lib/api/client";
import type { AdminGame } from "@/app/lib/types";

const CATEGORIES = ["IO Games", "Strategy", "Action", "Shooter", "Puzzle", "Racing"];

const INITIAL_FORM = {
  name: "", slug: "", dev: "", release_date: "", technology: "",
  platforms: "", thumbnail: "", image: "", link_game: "", video: "",
  category: "", description: "", how_to_play: "",
};

export default function AdminDashboard() {
  const [games, setGames] = useState<AdminGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [currentGame, setCurrentGame] = useState<AdminGame | null>(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const getToken = () => localStorage.getItem("adminToken") || "";

  useEffect(() => {
    api.get("/games", { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((res) => res.json())
      .then((json) => setGames(json?.data ?? json))
      .catch((err) => console.error("Error fetching:", err))
      .finally(() => setLoading(false));
  }, []);

  const updateField = (field: keyof typeof INITIAL_FORM, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const openModal = (game?: AdminGame) => {
    if (game) {
      setCurrentGame(game);
      setFormData({
        ...INITIAL_FORM,
        ...game,
        release_date: game.release_date
          ? new Date(game.release_date).toISOString().slice(0, 10)
          : "",
        platforms: Array.isArray(game.platforms)
          ? game.platforms.join(", ")
          : game.platforms || "",
        image: Array.isArray(game.image) ? game.image.join(", ") : game.image || "",
      } as typeof INITIAL_FORM);
    } else {
      setCurrentGame(null);
      setFormData(INITIAL_FORM);
    }
    setShowModal(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa game này?")) return;
    const res = await api.delete(`/games/${slug}`, {
      Authorization: `Bearer ${getToken()}`,
    });
    if (res.ok) {
      setGames((prev) => prev.filter((g) => g.slug !== slug));
      alert("Xóa game thành công!");
    } else {
      alert("Xóa thất bại");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isEdit = !!currentGame;
    const images = formData.image.split(",").map((s) => s.trim()).filter(Boolean);
    const platformsArr = formData.platforms.split(",").map((s) => s.trim()).filter(Boolean);

    const payload = {
      ...formData,
      platforms: platformsArr,
      image: images,
      thumbnail: formData.thumbnail || images[0] || undefined,
      release_date: formData.release_date
        ? new Date(formData.release_date).toISOString()
        : undefined,
    };

    const authHeader = { Authorization: `Bearer ${getToken()}` };
    const res = isEdit
      ? await api.put(`/games/${currentGame!.slug}`, payload, authHeader)
      : await api.post("/games", payload, authHeader);

    if (res.ok) {
      const body = await res.json();
      const data = body.data ?? body;
      if (isEdit) {
        setGames((prev) => prev.map((g) => (g._id === data._id ? data : g)));
        alert("Cập nhật thành công!");
      } else {
        setGames((prev) => [...prev, data]);
        alert("Tạo mới thành công!");
      }
      setShowModal(false);
    } else {
      alert(`${isEdit ? "Cập nhật" : "Tạo"} thất bại`);
    }
  };

  const filteredGames = games.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === "all" ||
      (g.category || "").toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-[#0095BE]/30 border-t-[#0095BE] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#002B50] mb-2">Quản lý Games</h1>
        <p className="text-gray-600">Quản lý toàn bộ games trong hệ thống</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm game..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE] transition-all"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0095BE] appearance-none bg-white cursor-pointer"
              >
                <option value="all">Tất cả danh mục</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00C9FF] to-[#0095BE] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              <Plus size={20} /> Tạo Game Mới
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <GameTable games={filteredGames} onEdit={openModal} onDelete={handleDelete} />

      {/* Modal */}
      {showModal && (
        <GameFormModal
          currentGame={currentGame}
          formData={formData}
          updateField={updateField}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}