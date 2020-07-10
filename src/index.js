import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import App from "./App";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";

const client = new ApolloClient({
  uri: "https://react-graphql-posts.herokuapp.com/v1/graphql"
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/new" component={CreatePost} />
        <Route path="/edit/:id" component={EditPost} />
      </Switch>
    </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
