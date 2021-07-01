import React from "react";
import { useAppSelector } from "src/redux";
import { selectAllCalls } from "src/redux/selectors";
import "src/i18n/config";
import Profile from "src/components/Profile";
import { useAppDispatch } from "src/redux";
import { openModal } from "src/redux/modules/modalsSlice";
import { PROFILE_PHOTOS } from "src/constants/ProfilePhotos";

const ProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.session.user);
  const calls = useAppSelector((state) => selectAllCalls(state));
  const dispatch = useAppDispatch();
  return (
    <Profile
      calls={calls}
      user={user}
      openProfileImageModal={() =>
        dispatch(
          openModal({
            activeType: "PROFILE_PHOTO_MODAL",
            entity: PROFILE_PHOTOS,
          })
        )
      }
    />
  );
};

export default ProfilePage;
