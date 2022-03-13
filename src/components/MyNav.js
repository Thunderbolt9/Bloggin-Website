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
        <div>
          <Navbar.Brand href="/">Q-Blogs</Navbar.Brand>
          <Navbar.Text className="text-white">
            <a href="/createblog" style={{ textDecoration: "none" }}>
              Create blog
            </a>
          </Navbar.Text>
        </div>
        <div>
          <Navbar.Text className="text-white">
            Welcome {currentUser.displayName}
          </Navbar.Text>
          <Button
            onClick={handleLogout}
            className="ms-5 bg-white text-black border-white"
          >
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default MyNav;
