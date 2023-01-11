import { useNavigate } from "react-router-dom";
import { Button, Container } from "./components";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Container size="xl">
        <h1>MONITOR YOUR FINANCES WITH X-TRACKER</h1>
        <br />
        <p className="landing-page-text">
          Hello, welcome to X-Tracker. Do you wish to know what you daily spend your money on? Would you love to have a fair idea of your daily expenses? Do you want to be a better manager of your finances? Then X-Tracker is for you. We help you become a better manager of your finances by tracking your daily expenses. Click on the button below to login or create an account.
        </p>
        <br />
        <Button onClick={() => navigate("/login")}>Proceed</Button>
      </Container>
    </div>
  );
}

export default App;
