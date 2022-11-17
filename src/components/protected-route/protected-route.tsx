import { Route, Redirect } from "react-router-dom";
import { isAuth } from "utils/utils";
import { ROUTES } from "utils/constsRoute";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  path?: string;
  exact?: boolean;
}

export default function ProtectedRoute({ children, ...rest }: IProps) {
  const auth = isAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
