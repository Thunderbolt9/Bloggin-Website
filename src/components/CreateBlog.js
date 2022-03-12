import React, { useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import MyNav from "./MyNav";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const titleRef = useRef("");
  const contentRef = useRef("");
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser == null) {
      navigate("/login");
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "blogs"), {
        author: { name: currentUser.displayName, id: currentUser.uid },
        title: titleRef.current.value,
        content: contentRef.current.value,
      });
      navigate("/");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }
  return (
    <>
      {currentUser !== null ? (
        <>
          <MyNav />
          <Form onSubmit={handleSubmit} className="w-75 m-auto mt-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title of the Blog"
                ref={titleRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Content</Form.Label>
              <Form.Control
                style={{ height: "20rem" }}
                as="textarea"
                placeholder="content..."
                ref={contentRef}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </>
      ) : (
        "please sign in"
      )}

      {/* {isAuth && post.author.id === auth.currentUser.uid ? (
        <div className="deletePost">
          <button onClick={deletePost(post.author.id)}>&#128465;</button>
        </div>
      ) : null} */}
    </>
  );
}

export default CreateBlog;
