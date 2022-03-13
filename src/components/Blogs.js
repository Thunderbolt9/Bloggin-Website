import React, { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
// import { doc, deleteDoc } from "firebase/firestore";
// import { db } from "../firebase";

function Blogs({ blogsList, getAllBlogs, uid }) {
  const [blogsData, setBlogsData] = useState(blogsList);

  useEffect(() => {
    if (getAllBlogs === false) {
      setBlogsData(blogsList.filter((blog) => blog.author.id === uid));
    } else {
      setBlogsData(blogsList);
    }
  }, [blogsList, getAllBlogs, uid]);

  return (
    <>
      {blogsData !== null ? (
        <div>
          {blogsData.map((blog, index) => (
            <div key={index} className="w-50 m-auto shadow mb-4 p-5 rounded">
              <h3>{blog.title}</h3>
              <Badge bg="primary" className="mb-2">
                {blog.author.name}
              </Badge>
              <p>{blog.content}</p>
              {blog.author.id === uid ? (
                <div className="d-flex mt-4">
                  <Button variant="outline-secondary me-3">Update</Button>
                  <Button variant="outline-danger">Delete</Button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default Blogs;
