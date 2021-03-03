import React from "react";
import { useAppSelector } from "src/redux";
import { selectAllCalls } from "src/redux/selectors";
import "src/i18n/config";
import Profile from "src/components/Profile";

const ProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.session.user);
  const calls = useAppSelector((state) => selectAllCalls(state));
  return <Profile calls={calls} user={user} />;
};

export default ProfilePage;
