import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, ArrowLeft } from 'lucide-react';

const EditProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        note: '',
        categoryId: '',
        existingImages: []
    });
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propRes, catsRes] = await Promise.all([
                    api.get(`/properties/${id}`),
                    api.get('/categories')
                ]);

                const prop = propRes.data;
                setFormData({
                    title: prop.title,
                    description: prop.description,
                    price: prop.price,
                    location: prop.location,
                    note: prop.note || '',
                    categoryId: prop.categoryId,
                    existingImages: prop.images || []
                });
                setCategories(catsRes.data);
            } catch (err) {
                console.error('Failed to load data', err);
                alert('Veriler yüklenirken hata oluştu.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);

        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    };

    const removeExistingImage = (imageName) => {
        setFormData({
            ...formData,
            existingImages: formData.existingImages.filter(img => img !== imageName)
        });
    };

    const removeNewImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newPreviewUrls = [...previewUrls];
        URL.revokeObjectURL(newPreviewUrls[index]);
        newPreviewUrls.splice(index, 1);
        setPreviewUrls(newPreviewUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('location', formData.location);
        data.append('note', formData.note);
        data.append('categoryId', formData.categoryId);
        data.append('existingImages', JSON.stringify(formData.existingImages));

        images.forEach(image => {
            data.append('images', image);
        });

        try {
            const token = localStorage.getItem('token');
            await api.put(`/properties/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/admin');
        } catch (error) {
            console.error('Failed to update property:', error);
            alert('İlan güncellenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-10">Yükleniyor...</div>;

    const uploadedImageUrl = (img) => `http://${window.location.hostname}:5000/uploads/${img}`;

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <button onClick={() => navigate('/admin')} className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition">
                <ArrowLeft size={20} className="mr-1" /> Panele Dön
            </button>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">İlanı Düzenle</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Başlık</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Fiyat (TL)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Kategori</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        >
                            <option value="">Kategori Seçiniz</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Konum</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Açıklama</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Özel Not (Sadece Yönetici)</label>
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        rows="2"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-yellow-50"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Mevcut Fotoğraflar</label>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {formData.existingImages.map((img, index) => (
                            <div key={index} className="relative group h-24 rounded-lg overflow-hidden border">
                                <img src={uploadedImageUrl(img)} alt="Existing" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(img)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Yeni Fotoğraflar Ekle</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                        <p className="text-gray-500">Fotoğrafları buraya sürükleyin veya seçmek için tıklayın</p>
                    </div>

                    {previewUrls.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative group h-24 rounded-lg overflow-hidden">
                                    <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeNewImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Güncelle' : 'Kaydet'}
                </button>
            </form>
        </div>
    );
};

export default EditProperty;
