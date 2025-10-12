import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();

  return (
    <div>
      <h2>📝 Post Page</h2>
      <p>Displaying details for Post ID: {postId}</p>
    </div>
  );
};

export default Post;
