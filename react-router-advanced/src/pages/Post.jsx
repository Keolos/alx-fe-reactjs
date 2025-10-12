import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();

  return (
    <div>
      <h2>Blog Post #{postId}</h2>
      <p>This is the content for post ID: {postId}</p>
    </div>
  );
};

export default Post;
