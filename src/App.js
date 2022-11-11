import { useNavigate } from "react-router-dom";
import { Button, Container } from "./components";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Container size="xl">
        <h1>Landing page</h1>
        <br />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas fugiat
          nesciunt itaque, corrupti deleniti asperiores a sapiente nobis quidem
          quo quos delectus debitis aperiam ipsum, architecto quasi facilis.
          Molestiae, accusantium!
        </p>
        <br />
        <Button onClick={() => navigate("/login")}>Login</Button>
      </Container>
    </div>
  );
}

export default App;
