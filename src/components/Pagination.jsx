const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    // Toplam sayfa sayısı 1'den küçükse sayfalama bileşeni görünmez.
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center space-x-4 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-xl ${currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#4f46e5] text-white hover:bg-[#4338ca]"
                    }`}
            >
                Önceki
            </button>
            <span className="text-[#666]">
                Sayfa {currentPage} / {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-xl ${currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#4f46e5] text-white hover:bg-[#4338ca]"
                    }`}
            >
                Sonraki
            </button>
        </div>
    );
};

export default Pagination; 