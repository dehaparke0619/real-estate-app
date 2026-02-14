import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PlusSquare } from 'lucide-react';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = React.useState(!!localStorage.getItem('token'));

    React.useEffect(() => {
        const handleAuthChange = () => {
            setIsAdmin(!!localStorage.getItem('token'));
        };

        window.addEventListener('authChange', handleAuthChange);
        window.addEventListener('storage', handleAuthChange); // Also listen for storage changes if any

        return () => {
            window.removeEventListener('authChange', handleAuthChange);
            window.removeEventListener('storage', handleAuthChange);
        };
    }, []);

    const handleLogout = () => {
        // Logout logic is in AdminDashboard but if we add logout here:
        localStorage.removeItem('token');
        setIsAdmin(false);
        window.dispatchEvent(new Event('authChange'));
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-700 tracking-tight">
                    <Home size={28} />
                    <span>Emlak Portföy</span>
                </Link>
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Vitrin</Link>

                    {isAdmin && (
                        <>
                            <Link to="/admin" className="text-gray-600 hover:text-blue-600 font-medium transition">Panel</Link>
                            <Link to="/add" className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">
                                <PlusSquare size={18} />
                                <span>İlan Ekle</span>
                            </Link>
                        </>
                    )}

                    {!isAdmin ? (
                        <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition">Yönetici</Link>
                    ) : (
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/';
                            }}
                            className="text-red-500 hover:text-red-700 font-medium transition"
                        >
                            Çıkış
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
