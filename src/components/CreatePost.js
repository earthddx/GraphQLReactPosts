import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import PostForm from "./PostForm";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    insert_posts(objects: { body: $body, title: $title }) {
      affected_rows
    }
  }
`;


export default function CreatePost() {
  const history = useHistory();
  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: () => history.push("/"),
  });

  const savePost = ({ title, body }) => {
    createPost({
      variables: {
        title,
        body,
      },
    });
  };


  return (
    <>
      <PostForm savePost={savePost} loading={loading} error={error}/>
    </>
  );
}
