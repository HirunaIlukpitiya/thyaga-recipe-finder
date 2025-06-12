import Logo from "../../utils/components/Logo";
import AppContainer from "./AppContainer";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <AppContainer className="flex items-center justify-between py-4">
        <Logo />
        <Navbar />
      </AppContainer>
    </header>
  );
}
