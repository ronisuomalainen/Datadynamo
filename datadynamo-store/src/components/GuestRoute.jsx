import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/store" replace />;
  }

  return children;
};

GuestRoute.propTypes = {
  user: PropTypes.object, // or PropTypes.bool if user is a boolean flag
  children: PropTypes.node.isRequired, // children can be any renderable content
};

export default GuestRoute;
