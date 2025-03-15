import { TotalSpent } from "./common/components/TotalSpent";
import { SignUp } from "./pages/sign-up";
import { Login } from "./pages/login";

function App() {
  return (
    <>
      <div className="bg-outline h-full flex justify-center">
        <SignUp />
        <Login />
      </div>
    </>
  );
}

export default App;
