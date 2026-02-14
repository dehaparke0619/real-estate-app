import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Edit, X, Save } from 'lucide-react';

const AdminDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingName, setEditingName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
        fetchCategories();
    }, []);

    const fetchProperties = async () => {
        try {
            const res = await api.get('/properties');
            setProperties(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
            try {
                await api.delete(`/properties/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                fetchProperties();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await api.post(
                '/categories',
                { name: newCategory },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setNewCategory('');
            fetchCategories();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
            try {
                await api.delete(`/categories/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                fetchCategories();
            } catch (err) {
                console.error('Kategori silinemedi:', err);
                alert('Kategori silinirken hata oluştu.');
            }
        }
    };

    const startEditingCategory = (category) => {
        setEditingCategory(category.id);
        setEditingName(category.name);
    };

    const saveCategory = async () => {
        try {
            await api.put(
                `/categories/${editingCategory}`,
                { name: editingName },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setEditingCategory(null);
            fetchCategories();
        } catch (err) {
            console.error('Kategori güncellenemedi:', err);
            alert('Kategori güncellenirken hata oluştu.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
                <h1 className="text-3xl font-bold text-gray-800">Yönetici Paneli</h1>
                <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium">
                    Çıkış Yap
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Properties Section */}
                <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-700">İlanlar</h2>
                        <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition shadow-sm">
                            <Plus size={20} className="mr-1" /> İlan Ekle
                        </Link>
                    </div>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Başlık</th>
                                    <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                                    <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fiyat</th>
                                    <th className="py-3 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {properties.map((property) => (
                                    <tr key={property.id} className="hover:bg-gray-50 transition">
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">{property.title}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {property.category?.name || '-'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-green-600 font-bold">
                                            {property.price.toLocaleString('tr-TR')} ₺
                                        </td>
                                        <td className="py-4 px-6 text-right text-sm font-medium flex justify-end space-x-3">
                                            <Link to={`/edit-property/${property.id}`} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-1.5 rounded-full hover:bg-indigo-100 transition">
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(property.id)}
                                                className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded-full hover:bg-red-100 transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Categories Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Kategoriler</h2>
                    <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-100">
                        <form onSubmit={handleAddCategory} className="flex gap-2">
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Yeni Kategori"
                                className="border border-gray-300 p-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                            <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
                                Ekle
                            </button>
                        </form>
                    </div>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                        <ul className="divide-y divide-gray-200">
                            {categories.map((category) => (
                                <li key={category.id} className="p-4 hover:bg-gray-50 transition flex justify-between items-center group">
                                    {editingCategory === category.id ? (
                                        <div className="flex items-center gap-2 w-full">
                                            <input
                                                type="text"
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                className="border border-blue-300 rounded px-2 py-1 flex-1 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                                            />
                                            <button onClick={saveCategory} className="text-green-600 hover:text-green-800">
                                                <Save size={18} />
                                            </button>
                                            <button onClick={() => setEditingCategory(null)} className="text-gray-500 hover:text-gray-700">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="font-medium text-gray-700">{category.name}</span>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => startEditingCategory(category)}
                                                    className="text-gray-400 hover:text-blue-600 transition"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(category.id)}
                                                    className="text-gray-400 hover:text-red-500 transition"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
