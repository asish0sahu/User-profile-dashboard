import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./Features/userSlice";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersList) || [];
  const editedUsers = useSelector((state) => state.users.editedUsers) || {};

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Users List</h1>
      <ul className="divide-y divide-gray-200">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="py-4">
              <Link
                to={`/edit/${user.id}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {editedUsers[user.id] ? editedUsers[user.id].name : user.name}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
