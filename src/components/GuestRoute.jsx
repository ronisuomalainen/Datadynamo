import { Navigate } from "react-router-dom"

const GuestRoute = ({ user, children }) => {
    if (user) {
        return <Navigate to="/store" replace />
    }

    return children
}

export default GuestRoute