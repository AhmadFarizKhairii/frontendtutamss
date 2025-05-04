import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [bons, setBons] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    // Fetch data dari backend
    useEffect(() => {
        const fetchBons = async () => {
            try {
                const response = await axios.get('http://backendtutam-production.up.railway.app/api/bons');
                console.log('Fetched bons:', response.data); // Log data yang diterima
                setBons(response.data);
                setTimeout(() => setIsVisible(true), 100); // Animasi fade-in
            } catch (error) {
                console.error('Error fetching bons:', error.message);
                alert('Failed to fetch bons. Please try again later.');
            }
        };

        fetchBons();
    }, []);

    // Fungsi untuk menghapus bon
    const deleteBon = async (id) => {
        try {
            const response = await axios.delete(`https://backendtutam-production.up.railway.app/api/bons/${id}`);
            if (response.status === 200) {
                console.log('Bon deleted successfully');
                // Perbarui daftar bon setelah berhasil menghapus
                setBons((prevBons) => prevBons.filter((bon) => bon.id !== id));
            } else {
                console.error('Failed to delete bon');
                alert('Failed to delete bon. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting bon:', error.message);
            alert('Error deleting bon. Please try again.');
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url('/kmhe.png')` }}
        >
            <div className="bg-black bg-opacity-50 min-h-screen p-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#FFAC41]">Bon List</h2>
                {bons.length === 0 ? (
                    <p className="text-center text-[#FF1E56]">No bons available. Add some!</p>
                ) : (
                    <div
                        className={`transition-opacity duration-700 ${
                            isVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bons.map((bon) => (
                                <div
                                    key={bon.id}
                                    className="bg-[#323232] text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <h3 className="text-lg font-semibold">{bon.name}</h3>
                                    <p className="text-sm">Store: {bon.store_name}</p>
                                    <p className="text-sm">Item: {bon.item_name}</p>
                                    <p className="text-sm">Price: Rp {bon.item_price.toLocaleString()}</p>
                                    <p className="text-sm">
                                        Date: {new Date(bon.date).toLocaleDateString('en-GB')}
                                    </p>
                                    <p className="text-sm">Owner: {bon.owner_name}</p>
                                    <button
                                        onClick={() => deleteBon(bon.id)}
                                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;