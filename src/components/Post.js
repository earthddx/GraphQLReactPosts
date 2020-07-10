import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";

const DELETE_POST = gql`
  mutation DeletePost($id: uuid!) {
    delete_posts(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export default function Post({ post, refetch }) {
  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => refetch(),
  });

  const handleDeletePost = (id) => {
    if (window.confirm("Delete post?")) {
      deletePost({
        variables: { id },
      });
    }
  };
  return (
    <div>
      {/* {post.id} */}
      {post.title}
      {post.body}
      {moment(post.createdAt).fromNow()}
      <div>
        <Link to={`/edit/${post.id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
      </div>
    </div>
  );
}
