export default function AppContainer({ children, className }) {
  return (
    <div className={`w-full mx-auto px-4 md:px-6 lg:px-8 max-w-7xl ${className}`}>
        {children}
    </div>
  );
}