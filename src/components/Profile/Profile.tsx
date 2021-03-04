import React, { useState } from "react";
import { BaseCall } from "src/types/Call";
import { User } from "src/types/User";
import ProfileInfo from "./ProfileInfo";

interface Props {
  calls: BaseCall[];
  user: User;
}

const Profile: React.FC<Props> = ({ calls, user }) => {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? null : (
    <ProfileInfo user={user} calls={calls} onEdit={() => setIsEditing(true)} />
  );
};

export default Profile;
