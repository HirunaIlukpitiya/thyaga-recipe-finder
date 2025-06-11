import LogoImage from "../../assets/logo.png";

export default function Logo() {
    return (
        <div className="flex items-center space-x-2">
            <img src={LogoImage} alt="Logo" className="h-8 w-8" />
            <span className="md:text-lg font-bold">Recipe Finder</span>
        </div>
    );
}