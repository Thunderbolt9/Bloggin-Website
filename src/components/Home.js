import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MyNav from "./MyNav";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Blogs from "./Blogs";

export default function Home() {
  const { currentUser } = useAuth();
  const [blogsList, setBlogList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "blogs"));
      setBlogList(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getPosts();
  }, []);

  console.log(blogsList);

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
          <div className="d-flex border">
            {blogsList.map((blog, index) => (
              <Blogs key={index} blog={blog} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
