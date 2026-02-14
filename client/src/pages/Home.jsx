import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PropertyCard from '../components/PropertyCard';
import { Search } from 'lucide-react';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propRes, catRes] = await Promise.all([
                    api.get('/properties'),
                    api.get('/categories')
                ]);
                setProperties(propRes.data);
                setCategories(catRes.data);
            } catch (err) {
                console.error('Veriler yüklenirken hata oluştu', err);
            }
        };
        fetchData();
    }, []);

    const filteredProperties = properties.filter(property => {
        const matchesCategory = selectedCategory === 'Tümü' ||
            (property.category && property.category.name === selectedCategory);
        const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        Hayalinizdeki Evi Bulun
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Türkiye'nin en geniş emlak portföyü ile aradığınız satılık veya kiralık mülke hemen ulaşın.
                    </p>
                </div>

                {/* Modern Search Box */}
                <div className="max-w-3xl mx-auto mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                        <input
                            type="text"
                            placeholder="İlan ara (başlık veya konum)..."
                            className="w-full pl-14 pr-6 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition shadow-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Category Pills */}
                <div className="max-w-4xl mx-auto mb-10">
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setSelectedCategory('Tümü')}
                            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${selectedCategory === 'Tümü'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 transform scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            Tümü
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${selectedCategory === cat.name
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 transform scale-105'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Properties Grid */}
                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-gray-400 text-xl mb-2 font-semibold">Sonuç bulunamadı</div>
                        <p className="text-gray-500">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
