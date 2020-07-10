import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useParams, useHistory } from "react-router-dom";

import PostForm from "./PostForm";

const UPDATE_POST = gql`
  mutation UpdatePost($id: uuid!, $body: String!, $title: String!) {
    update_posts(
      where: { id: { _eq: $id } }
      _set: { body: $body, title: $title }
    ) {
      returning {
        body
        title
      }
    }
  }
`;

const GET_POST = gql`
  query GetPosts($id: uuid!) {
    posts_by_pk(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`;

export default function EditPost() {
  const history = useHistory();
  const { id } = useParams();
  const { data, loading } = useQuery(GET_POST, {
    variables: {
      id,
    },
  });
  const [updatePost, { loading: loadingEdit, error }] = useMutation(
    UPDATE_POST,
    {
      onCompleted: () => history.push("/"),
    }
  );

  if (loading) return <div>loading...</div>;

  const savePost = ({ title, body }) => {
    updatePost({ variables: { title, body, id } });
  };

  return (
    <div>
      <header>
        <h2>Edit Post</h2>
      </header>
      <PostForm
        post={data.posts_by_pk}
        savePost={savePost}
        loading={loadingEdit}
        error={error}
      />
    </div>
  );
}
