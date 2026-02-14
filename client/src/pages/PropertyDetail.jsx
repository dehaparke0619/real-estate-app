import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Link eklendi
import api from '../services/api'; // api import edildi
import { MapPin, ArrowLeft, Phone, Calendar, Tag } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';

const PropertyDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await api.get(`/properties/${id}`);
                setProperty(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (!property) return <div className="text-center py-10 text-xl text-gray-600">İlan bulunamadı.</div>;

    const token = localStorage.getItem('token');
    const isAdmin = !!token;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 transition">
                <ArrowLeft size={20} className="mr-1" /> Listeye Dön
            </Link>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image Gallery */}
                    <div className="p-2 bg-gray-50">
                        <ImageGallery images={property.images} />
                    </div>

                    {/* Details */}
                    <div className="p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-3xl font-bold text-gray-900 leading-tight">{property.title}</h1>
                                <span className="text-3xl font-bold text-blue-600 whitespace-nowrap">
                                    {property.price.toLocaleString('tr-TR')} ₺
                                </span>
                            </div>

                            <div className="flex items-center text-gray-500 mb-6 text-lg">
                                <MapPin size={20} className="mr-2 text-blue-500" />
                                {property.location}
                            </div>

                            {/* Admin Note Section */}
                            {isAdmin && property.note && (
                                <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                                    <h3 className="text-sm font-bold text-yellow-800 uppercase tracking-wide mb-1">Özel Not (Sadece Yönetici)</h3>
                                    <p className="text-yellow-700">{property.note}</p>
                                </div>
                            )}

                            <div className="prose max-w-none text-gray-600 leading-relaxed mb-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Açıklama</h3>
                                <p className="whitespace-pre-line">{property.description}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-6">
                            <div className="flex items-center">
                                <Tag size={16} className="mr-1" />
                                <span>İlan No: #{property.id}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar size={16} className="mr-1" />
                                <span>Eklenme: {new Date(property.createdAt).toLocaleDateString('tr-TR')}</span>
                            </div>
                        </div>

                        <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            İletişime Geç
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
