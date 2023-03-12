import User from "../models/users";

interface NavbarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

function Navbar({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavbarProps) {
  return <div>Navbar</div>;
}

export default Navbar;
