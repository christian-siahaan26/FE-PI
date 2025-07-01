import React from "react";

interface PhotoModalProps {
  photoUrl: string;
  onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photoUrl, onClose }) => {
  if (!photoUrl) return null; // Jangan render modal jika tidak ada URL foto

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Menutup modal saat mengklik di luar gambar
    >
      <div
        className="relative max-w-full max-h-full bg-white rounded-lg overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()} // Mencegah event klik menyebar ke parent (modal)
      >
        <button
          className="absolute top-2 right-2 text-white text-3xl font-bold bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 focus:outline-none z-10"
          onClick={onClose}
          aria-label="Close photo"
        >
          &times;
        </button>
        <img
          src={photoUrl}
          alt="Enlarged complaint photo"
          className="max-w-full max-h-screen object-contain" // Membuat gambar menyesuaikan ukuran layar
        />
      </div>
    </div>
  );
};

export default PhotoModal;