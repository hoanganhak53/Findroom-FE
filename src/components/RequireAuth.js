import { useLocation, Navigate, Outlet } from "react-router-dom"

export const RequireAuth = ({ allowedRoles, navigate }) => {
    const location = useLocation()
    const user = JSON.parse(localStorage.getItem("user"));
    
    if(!user?.roles)
        return <Navigate to={navigate} state={{ from: location }} replace />

    const content = (
        user.roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to={navigate} state={{ from: location }} replace />
    )
    return content
}
export default RequireAuth