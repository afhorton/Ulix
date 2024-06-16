import { useContext } from "react";
import { UserContext } from "../AuthProvider";
import Error from "./Error";
import AdminPage from "./AdminPage";

function PrivateRoute() {
    const { user, isAdmin } = useContext(UserContext);
    return (
        user && user.isAdmin ? <AdminPage /> : <Error />
    )
}

export default PrivateRoute;