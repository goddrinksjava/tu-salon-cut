import React, { FC } from 'react';

// !! Don't remove - Required by tailwind because the use of dynamic css !!
// bg-cyan-600 hover:bg-cyan-500 focus:bg-cyan-500 focus:ring-cyan-400
// bg-green-600 hover:bg-green-500 focus:bg-green-500 focus:ring-green-400

interface IAppButtonProps {
  type?: 'submit' | 'reset' | 'button';
  text: string;
  color: 'cyan' | 'green';
  disabled?: boolean;
}

const AppButton: FC<IAppButtonProps> = ({
  color,
  text,
  type,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-${color}-600 rounded-md hover:bg-${color}-500 focus:outline-none focus:bg-${color}-500 focus:ring focus:ring-${color}-400 focus:ring-opacity-50`}
    >
      {text}
    </button>
  );
};

export default AppButton;