import { Route, Redirect } from 'react-router-dom';
import { isAuth } from 'utils/utils';
import { ROUTES } from 'utils/constsRoute';
import PropTypes from 'prop-types';

export function ProtectedRoute({ children, ...rest }) {

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
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired
};
