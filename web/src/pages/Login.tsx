import React, { useState } from "react";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login] = useLoginMutation();

  return (
    <form
      onSubmit={async (evt) => {
        evt.preventDefault();
        console.log("Form submitted");
        console.log(email, password);
        const response = await login({
          variables: {
            email,
            password,
          },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }

            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data.login.user,
              },
            });
          },
        });

        if (response?.data) {
          setAccessToken(response.data.login.accessToken);
        }

        history.push("/");
        console.log(response);
      }}
    >
      <div>
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
