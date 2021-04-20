import { Avatar } from "antd";
import { AvatarSize } from "antd/lib/avatar/SizeContext";
import React from "react";
import { Contact } from "src/types/User";
import { getFullName, getInitials } from "src/utils";
import { getAvatarBackgroundColor } from "src/utils/UI";

interface Props {
  contacts: Contact[];
  size?: AvatarSize;
}

const ContactAvatarGroup: React.FC<Props> = ({ contacts, size }) => {
  return (
    <Avatar.Group>
      {contacts.map((contact) => (
        <Avatar
          size={size}
          className={`${getAvatarBackgroundColor(
            getFullName(contact)
          )} text-white`}
        >
          {getInitials(getFullName(contact))}
        </Avatar>
      ))}
    </Avatar.Group>
  );
};

export default ContactAvatarGroup;
