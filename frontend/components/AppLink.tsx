import Link, { LinkProps } from 'next/link';
import React, { FC } from 'react';

// !! Don't remove - Required by tailwind because the use of dynamic css !!
// bg-cyan-600 hover:bg-cyan-500 focus:bg-cyan-500 focus:ring-cyan-400
// bg-green-600 hover:bg-green-500 focus:bg-green-500 focus:ring-green-400

interface IAppLinkProps extends React.PropsWithChildren<LinkProps> {
  color: 'cyan' | 'green';
}

const AppLink: FC<IAppLinkProps> = ({ color, children, href }) => {
  return (
    <Link href={href}>
      <a
        className={`text-center block w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-${color}-600 rounded-md hover:bg-${color}-500 focus:outline-none focus:bg-${color}-500 focus:ring focus:ring-${color}-400 focus:ring-opacity-50`}
      >
        {children}
      </a>
    </Link>
  );
};

export default AppLink;
