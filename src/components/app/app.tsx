import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  HomePage,
  ForgotPasswordPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  FeedPage
} from '../../pages'
import Header from '../app-header/app-header';
import { ProtectedRoute } from '../protected-route/protected-route';
import { ROUTES } from '../../utils/constsRoute';
import { OrderInfoPage } from 'pages/orfer-info/order-info';

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={ROUTES.HOME} exact>
          <HomePage />
        </Route>
        <Route path={ROUTES.FEED} exact>
          <FeedPage />
        </Route>
        <Route path={ROUTES.FEED_ORDER} exact>
          <FeedPage />
        </Route>
        <Route path={ROUTES.LOGIN} exact>
          <LoginPage />
        </Route>
        <Route path={ROUTES.REGISTER} exact>
          <RegisterPage />
        </Route>
        <ProtectedRoute path={ROUTES.PROFILE} exact>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path={ROUTES.ORDERS} exact>
          <ProfilePage />
        </ProtectedRoute>
        <Route path={ROUTES.ORDER} exact>
          <ProfilePage />
        </Route>
        <Route path={ROUTES.FORGOT_PASSWORD} exact>
          <ForgotPasswordPage />
        </Route>
        <Route path={ROUTES.RESET_PASSWORD} exact>
          <ResetPasswordPage />
        </Route>
        <Route path={ROUTES.INGREDIENT} exact>
          <HomePage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}