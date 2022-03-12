import React from "react";
import { Button, Navbar, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function MyNav() {
  const { currentUser, logOut } = useAuth();

  async function handleLogout() {
    try {
      await logOut();
    } catch {
      console.log("Failed to log out");
    }
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Navbar.Text>Welcome {currentUser.displayName}</Navbar.Text>
      </Container>
      <Button onClick={handleLogout}>Logout</Button>
    </Navbar>
  );
}

export default MyNav;
