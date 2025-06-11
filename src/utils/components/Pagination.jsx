export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
        onPageChange(page);
        }
    };
    
    return (
        <nav className="flex items-center justify-between pt-6">
        <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-24 h-10 px-3 py-2 bg-primary-light text-white rounded-md disabled:opacity-50 flex items-center justify-center"
        >
            Previous
        </button>
        <span className="text-sm text-gray-500 font-bold">
            Page {currentPage} of {totalPages}
        </span>
        <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-24 h-10 px-3 py-2 bg-primary-light text-white rounded-md disabled:opacity-50 flex items-center justify-center"
        >
            Next
        </button>
        </nav>
    );
}