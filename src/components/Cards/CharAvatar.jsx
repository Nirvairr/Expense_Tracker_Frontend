/* eslint-disable react-refresh/only-export-components */
import React from 'react'

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

const CharAvatar = ({fullName,width, height, style}) => {
  return <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
   {getInitials(fullName || "")} 
  </div>;
   
};

export default CharAvatar;
