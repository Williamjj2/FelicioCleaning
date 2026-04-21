
import React, { useState } from 'react';
import images from '../review-images.json';

const ReviewImages = () => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelect = (img: string) => {
        if (selected.includes(img)) {
            setSelected(selected.filter(i => i !== img));
        } else {
            setSelected([...selected, img]);
        }
    };

    const copySelection = () => {
        navigator.clipboard.writeText(selected.join('\n'));
        alert('Copied specific filenames to clipboard!');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Review Personal Images ({images.length})</h1>
            <p className="mb-4">Select images you like for "Before/After" and verify the filenames.</p>

            <div className="sticky top-0 bg-white z-10 p-4 shadow-md mb-4 flex gap-4">
                <button
                    onClick={copySelection}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Copy Selected Filenames
                </button>
                <div className="text-sm">
                    Selected: {selected.length}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`border-2 rounded p-2 cursor-pointer ${selected.includes(img) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                        onClick={() => toggleSelect(img)}
                    >
                        <img
                            src={`/review_images/${img}`}
                            alt={img}
                            className="w-full h-48 object-cover mb-2 rounded"
                            loading="lazy"
                        />
                        <p className="text-xs break-all text-gray-500">{img}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewImages;
