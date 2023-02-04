import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  const renderPhrase = (numberOfUsers) => {
    let lastUser = Number(numberOfUsers); //количество человек
    if (users.length >= 5 && users.length < 15)
      return `${lastUser} человек тусанет с тобой сегодня`;
    else if (users.length >= 2 && users.length <= 4)
      return `${lastUser} человека тусанут с тобой сегодня`;
    else if (users.length === 1)
      return `${lastUser} человек тусанет с тобой сегодня`;
  };

  return (
    <>
      <div
        className={"badge " + (users.length !== 0 ? "bg-primary" : "bg-danger")}
      >
        {users.length !== 0 ? (
          <h2>{renderPhrase(users.length)}</h2>
        ) : (
          <h2>Никто не тусанет с тобой</h2>
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качество</th>
            <th>Профессия</th>
            <th>Встретился, раз</th>
            <th>Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((qualitie) => (
                  <span
                    className={"badge m-1 bg-" + qualitie.color}
                    key={qualitie._id}
                  >
                    {qualitie.name}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}/5</td>
              <td>
                <button
                  className="btn btn-danger btn-sm m-2"
                  onClick={() => handleDelete(user._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Users;

// const getBageClasses = () => {
//   let classes = "badge ";
//   classes += users.length === 0 ? "bg-danger" : "bg-primary";
//   return classes;
// };
