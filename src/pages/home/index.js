import { useNavigate } from "react-router-dom";
import { Button, Container, Text } from "../../components";
import { useSession } from "../../hooks/useSession";

export const Home = () => {
  const navigate = useNavigate();
  const { setSession, getUser } = useSession();

  const user = getUser();

  const logout = () => {
    setSession({ user: null });
    navigate("/login");
  };

  return (
    <Container size="md">
      <h1>Dashboard</h1>
      <br />

      {user && <Text>{user.email} is logged in!</Text>}
      <br />

      <Text>
        Repudiandae unde vel laboriosam molestias dignissimos velit debitis at
        possimus. Consequuntur nobis facere quod quia tempora nostrum rerum
        soluta aperiam repudiandae aliquid officiis quas dolorum iste, nulla
        repellendus unde at, corrupti pariatur accusamus error iusto a quis.
        nihil aperiam dignissimos modi vitae beatae impedit illum? Inventore
        excepturi iusto enim iure, similique perspiciatis accusamus beatae.
      </Text>
      <br />

      <Text>
        Voluptate sapiente sint, quidem ut minus quod omnis? Officia debitis
        placeat quisquam expedita sed porro facere, iste magnam error est
        commodi consequatur neque, ad, et dolor velit voluptatem hic. Unde
        quidem dicta voluptatum ad sint quae laudantium minus dolor illum quasi
        excepturi iusto enim iure, similique perspiciatis accusamus beatae.
      </Text>

      <br />
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
};
