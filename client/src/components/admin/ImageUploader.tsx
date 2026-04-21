import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageUploaderProps {
    label: string;
    currentImage?: string;
    onImageChange: (base64: string) => void;
    onImageRemove: () => void;
    helperText?: string;
    previewHeight?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    label,
    currentImage,
    onImageChange,
    onImageRemove,
    helperText = "Recommended size: 1920x1080px. Max 5MB.",
    previewHeight = "h-64"
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = (file: File) => {
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB");
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert("Please upload an image file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target?.result as string;
            onImageChange(base64);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <Card className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-white flex items-center gap-2">
                    <ImageIcon className="text-primary w-5 h-5" />
                    {label}
                </label>
                {currentImage && (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={onImageRemove}
                        className="h-8 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    >
                        <Trash2 className="w-4 h-4 mr-2" /> Remove
                    </Button>
                )}
            </div>

            <div
                className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ${isDragging
                    ? 'border-primary bg-primary/10'
                    : 'border-white/10 hover:border-white/20 bg-black/20'
                    }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />

                {currentImage ? (
                    <div className={`relative w-full ${previewHeight} group overflow-hidden rounded-xl`}>
                        <img
                            src={currentImage}
                            alt="Preview"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                                variant="secondary"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Change Image
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`flex flex-col items-center justify-center ${previewHeight} cursor-pointer`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-8 h-8 text-white/40" />
                        </div>
                        <p className="text-sm font-medium text-white/60 mb-1">Click to upload or drag & drop</p>
                        <p className="text-xs text-white/30">{helperText}</p>
                    </div>
                )}
            </div>
        </Card>
    );
};
