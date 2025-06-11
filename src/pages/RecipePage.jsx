export default function RecipePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Recipe Page</h1>
      <p className="text-lg text-gray-700">This is the recipe page content.</p>
      <a href="/" className="mt-4 text-blue-600 hover:underline">
        Go back to Home
      </a>
    </div>
  );
}