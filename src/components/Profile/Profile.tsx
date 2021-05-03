import React from "react";

import { BaseCall } from "src/types/Call";
import { User } from "src/types/User";
import ProfileInfo from "./ProfileInfo";

interface Props {
  calls: BaseCall[];
  user: User;
  openProfileImageModal: () => void;
}

const Profile: React.FC<Props> = ({ calls, user, openProfileImageModal }) => {
  return (
    <ProfileInfo user={user} calls={calls} onEdit={openProfileImageModal} />
  );
};

export default Profile;
