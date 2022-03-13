import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MyNav from "./MyNav";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Blogs from "./Blogs";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useAuth();
  const uid = currentUser !== null ? currentUser.uid : null;
  const [blogsList, setBlogList] = useState([]);
  const [activeAllBlogs, setActiveAllBlogs] = useState("");
  const [activeMyBlogs, setActiveMyBlogs] = useState("");
  const [getAllBlogs, setAllBlogs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
    } else {
      const getPosts = async () => {
        const data = await getDocs(collection(db, "blogs"));
        setBlogList(data.docs.map((doc) => ({ ...doc.data() })));
      };

      getPosts();

      isAllBlogsClicked();
    }
  }, [setAllBlogs, currentUser, navigate]);

  function isAllBlogsClicked() {
    // Here active text is a custom css class
    setActiveAllBlogs("activeText");
    setActiveMyBlogs("");
    setAllBlogs(true);
  }

  function isMyBlogsClicked() {
    // Here active text is a custom css class
    setActiveAllBlogs("");
    setActiveMyBlogs("activeText");
    setAllBlogs(false);
  }

  return (
    <>
      {currentUser === null ? (
        <Link to="/login">
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <h1>Please Sign in</h1>
          </div>
        </Link>
      ) : (
        <>
          <MyNav />
          <div className="d-flex w-50 m-auto mt-5 mb-3 justify-content-center gap-4">
            <h5
              onClick={isAllBlogsClicked}
              className={activeAllBlogs}
              style={{ cursor: "pointer" }}
            >
              All blogs
            </h5>
            <h5
              onClick={isMyBlogsClicked}
              className={activeMyBlogs}
              style={{ cursor: "pointer" }}
            >
              My Blogs
            </h5>
          </div>

          {blogsList.length !== 0 ? (
            <Blogs blogsList={blogsList} getAllBlogs={getAllBlogs} uid={uid} />
          ) : null}
        </>
      )}
    </>
  );
}
