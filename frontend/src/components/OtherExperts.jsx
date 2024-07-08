import React from "react";
import useGetOtherUsers from "../hooks/useGetOtherExperts";
import { useSelector } from "react-redux";
import OtherExpert from "./OtherExpert";

export default function OtherUsers() {
  useGetOtherUsers();
  const { otherUsers } = useSelector(store => store.user);

  if (!otherUsers) return null;

  const expertUsers = otherUsers.filter(user => user.role === 'expert');


  return (
    <div className="overflow-auto flex-1">
      {
        expertUsers.map((user) => (
          <OtherExpert key={user._id} user={user} />
        ))
      }
    </div>
  );
}
