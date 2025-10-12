import React from "react";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>📝 Blog Post</h2>
      <p>You are viewing blog post with ID: <strong>{id}</strong></p>
    </div>
  );
};

export default BlogPost;
