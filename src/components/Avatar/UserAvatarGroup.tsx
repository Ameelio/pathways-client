import { Avatar } from "antd";
import { AvatarSize } from "antd/lib/avatar/SizeContext";
import React from "react";
import { Contact } from "src/types/User";
import { getFullName, getInitials } from "src/utils";
import { getAvatarBackgroundColor } from "src/utils/UI";

interface Props {
  contacts: Contact[];
  size?: AvatarSize;
  className?: string;
}

const ContactAvatarGroup: React.FC<Props> = ({ contacts, size, className }) => {
  return (
    <Avatar.Group className={className}>
      {contacts.map((contact) => (
        <Avatar
          key={contact.id}
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
