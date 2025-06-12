import AppContainer from "./AppContainer";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <AppContainer>
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Thyaga. All rights reserved.
                </p>
                <p className="text-xs mt-2">
                    Follow us on 
                    <a href="https://twitter.com" className="text-blue-400 ml-1">Twitter</a>, 
                    <a href="https://facebook.com" className="text-blue-400 ml-1">Facebook</a>, 
                    <a href="https://instagram.com" className="text-blue-400 ml-1">Instagram</a>
                </p>
            </div>
            </AppContainer>
        </footer>
    );
}