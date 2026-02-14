import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const PropertyCard = ({ property }) => {
    const images = property.images && property.images.length > 0
        ? property.images
        : [];
    const mainImage = images.length > 0
        ? `http://localhost:5000/uploads/${images[0]}`
        : 'https://via.placeholder.com/400x300?text=No+Image';

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-56 overflow-hidden">
                <img
                    src={mainImage}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
                            {property.category?.name || 'Genel'}
                        </span>
                        <h3 className="text-xl font-bold text-gray-800 truncate pr-2">{property.title}</h3>
                    </div>
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded whitespace-nowrap">
                        {property.price.toLocaleString('tr-TR')} ₺
                    </span>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm truncate">{property.location}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {property.description}
                </p>
                <Link
                    to={`/property/${property.id}`}
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md transform hover:-translate-y-0.5"
                >
                    Detayları İncele
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;
