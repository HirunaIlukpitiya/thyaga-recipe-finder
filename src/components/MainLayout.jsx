import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="lg:sticky lg:top-0 lg:z-50 lg:bg-white lg:shadow-xl">
        <Header />
      </div>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
