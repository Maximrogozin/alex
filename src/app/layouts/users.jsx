import React from "react";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import { useParams, Redirect } from "react-router-dom";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        currentUser._id === userId ? (
                            <EditUserPage userId={userId} />
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
