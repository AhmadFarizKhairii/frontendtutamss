import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TotalBon() {
    const [totals, setTotals] = useState([]);
    const [isVisible, setIsVisible] = useState(false); // State untuk animasi fade-in

    useEffect(() => {
        axios
            .get('https://backendtutam-production.up.railway.app/api/bons/total')
            .then((response) => {
                setTotals(response.data);
                setTimeout(() => setIsVisible(true), 100); // Tambahkan delay untuk animasi
            })
            .catch((error) => {
                console.error('Error fetching total bon:', error.message);
            });
    }, []);

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url('/sem2.png')` }} // Tambahkan background image
        >
            <div className="bg-black bg-opacity-50 min-h-screen p-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#FFAC41]">Total Bon per Person</h2>
                {totals.length === 0 ? (
                    <p className="text-center text-[#FF1E56]">No data available.</p>
                ) : (
                    <div
                        className={`transition-opacity duration-700 ${
                            isVisible ? 'opacity-100' : 'opacity-0'
                        }`} // Animasi fade-in
                    >
                        <div className="space-y-4">
                            {totals.map((total) => (
                                <div
                                    key={total.name}
                                    className={`bg-[#323232] text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 ${
                                        total.statusColor === 'green'
                                            ? 'border-green-500'
                                            : total.statusColor === 'yellow'
                                            ? 'border-yellow-500'
                                            : 'border-red-500'
                                    }`}
                                >
                                    <h3 className="text-lg font-semibold">{total.name}</h3>
                                    <p className="text-sm">Total: Rp {total.total_amount.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TotalBon;