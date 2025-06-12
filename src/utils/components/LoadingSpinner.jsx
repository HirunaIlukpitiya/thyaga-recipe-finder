export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center fixed inset-0 bg-black/10 backdrop-blur-[5px] z-50">
            <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M12 5c-1.7 0-3.2.9-4 2.3L6.7 5.9C8 3.8 9.9 2.5 12 2.5c3.9 0 7 3.1 7 7h-2.5c0-2.5-2-4.5-4.5-4.5z"/>
            </svg>
        </div>
    )
}