import React from 'react';

interface UserCardProps {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
}

const UserCard: React.FC<UserCardProps> = ({ avatar, firstName, lastName, email }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <img
        src={avatar}
        alt={`${firstName} ${lastName}`}
        className="rounded-full w-24 h-24 mx-auto"
      />
      <h2 className="text-xl font-semibold text-center mt-4">
        {firstName} {lastName}
      </h2>
      <p className="text-center text-gray-500">{email}</p>
    </div>
  );
};

export default UserCard;
