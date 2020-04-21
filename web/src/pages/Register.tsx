import React, { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [register] = useRegisterMutation();

  return (
    <form
      onSubmit={async (evt) => {
        evt.preventDefault();
        console.log("Form submitted");
        console.log(email, password);
        const response = await register({
          variables: {
            email,
            password,
          },
        });

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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
