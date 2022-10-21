import { Route, Redirect } from "react-router-dom";
import { isAuth } from "utils/utils";
import { ROUTES } from "utils/constsRoute";
import PropTypes from "prop-types";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  path?: string;
  exact?: boolean;
}

export const ProtectedRoute: FC<IProps> = ({ children, ...rest }) => {
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
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
