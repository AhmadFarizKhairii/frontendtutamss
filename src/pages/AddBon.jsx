import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddBon() {
    const [name, setName] = useState('');
    const [storeName, setStoreName] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [date, setDate] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [isVisible, setIsVisible] = useState(false); // State untuk animasi fade-in
    const navigate = useNavigate();

    useEffect(() => {
        // Tambahkan delay untuk animasi fade-in
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const addBon = async () => {
        // Validasi input
        if (!name || !storeName || !itemName || !itemPrice || !date || !ownerName) {
            alert('All fields are required!');
            return;
        }

        try {
            const bonData = {
                name,
                storeName,
                itemName,
                itemPrice: parseInt(itemPrice),
                date,
                ownerName,
            };

            console.log('Sending data to backend:', bonData); // Log data yang dikirim

            // Kirim data ke backend
            await axios.post('https://backendtutam-production.up.railway.app/api/bons', bonData);

            // Redirect ke halaman utama setelah berhasil
            navigate('/');
        } catch (error) {
            console.error('Error adding bon:', error.message);
            alert('Failed to add bon. Please try again.');
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url('/sem.png')` }}
        >
            <div className="bg-black bg-opacity-50 min-h-screen p-6 flex items-center justify-center">
                <div
                    className={`max-w-md mx-auto bg-[#323232] text-white p-6 rounded-lg shadow-md transition-opacity duration-700 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`} // Tambahkan animasi fade-in
                >
                    <h2 className="text-2xl font-bold mb-4 text-center text-[#FFAC41]">Add a New Bon</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            className="border border-[#FFAC41] rounded-lg p-2 w-full bg-[#000000] text-white placeholder-[#FFAC41] focus:ring-2 focus:ring-[#FFAC41] transition duration-300"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-[#FFAC41] rounded-lg p-2 w-full bg-[#000000] text-white placeholder-[#FFAC41] focus:ring-2 focus:ring-[#FFAC41] transition duration-300"
                            placeholder="Enter store name"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-[#FFAC41] rounded-lg p-2 w-full bg-[#000000] text-white placeholder-[#FFAC41] focus:ring-2 focus:ring-[#FFAC41] transition duration-300"
                            placeholder="Enter item name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                        <input
                            type="number"
                            className="border border-[#FFAC41] rounded-lg p-2 w-full bg-[#000000] text-white placeholder-[#FFAC41] focus:ring-2 focus:ring-[#FFAC41] transition duration-300"
                            placeholder="Enter item price"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                        />
                        <input
                            type="date"
                            className="border border-[#FFAC41] rounded-lg p-2 w-full bg-[#000000] text-white placeholder-[#FFAC41] focus:ring-2 focus:ring-[#FFAC41] transition duration-300"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-[#FFAC41] rounded-lg p-2 w-full bg-[#000000] text-white placeholder-[#FFAC41] focus:ring-2 focus:ring-[#FFAC41] transition duration-300"
                            placeholder="Enter owner name"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                        />
                        <button
                            className="bg-[#FF1E56] text-white px-4 py-2 rounded-lg hover:bg-[#FFAC41] transition-colors w-full"
                            onClick={addBon}
                        >
                            Add Bon
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBon;