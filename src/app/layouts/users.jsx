import React from "react";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import { useParams, Redirect } from "react-router-dom";
// import UserProvider from "../hooks/useUsers";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const { userId, edit } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    // const dataStatus = useSelector(getDataStatus());
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     if (!dataStatus) dispatch(loadUsersList());
    //     // dispatch(loadUsersList());
    // }, []);

    // if (!dataStatus) return "Loading";
    return (
        <>
            <UsersLoader>
                {/* <UserProvider> */}
                {userId ? (
                    edit ? (
                        currentUserId === userId ? (
                            <EditUserPage userId={userId} />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
                {/* </UserProvider> */}
            </UsersLoader>
        </>
    );
};

export default Users;
