import React, { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
const AdminUsersPage = () => {
  const userCtx = useContext(UserContext);
  useEffect(() => {
    userCtx.getUsers();
  }, []);
  return (
    <div className="w-full pr-10">
      <table className="table-fixed">
        <thead>
          <tr className="text-xl ">
            <th class="w-1/4 ...">Username</th>
            <th class="w-1/4 ...">Email</th>
            <th class="w-1/4 ...">Created At</th>
            <th class="w-1/4 ...">Ref Point</th>
            <th class="w-1/4 ...">User Id</th>
          </tr>
        </thead>
        <tbody className="text-lg leading-10 text-gray-700 border cursor-pointer">
          {userCtx?.state?.users?.data.map((el) => {
            const { username, email, createdAt, _id, refPoint = 0 } = el;
            return (
              <tr className="text-center border">
                <td className="border"> {username}</td>
                <td className="border"> {email}</td>
                <td className="border">{createdAt.slice(0, 10)}</td>
                <td className="border">{refPoint}</td>
                <td className="border">{_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
