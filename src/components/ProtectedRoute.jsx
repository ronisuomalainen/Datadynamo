import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Prop validation
ProtectedRoute.propTypes = {
  user: PropTypes.object, // Assuming 'user' is an object, adjust if needed
  children: PropTypes.node.isRequired, // 'children' should be a valid React node
};

export default ProtectedRoute;
