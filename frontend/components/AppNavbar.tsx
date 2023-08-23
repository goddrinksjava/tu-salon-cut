import Link, { LinkProps } from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { buttonClass, ButtonColor } from './AppButton';
import SearchBar from './SearchBar';
import Head from 'next/head';
import Router from 'next/router';

const AppNavbar: FC = () => {
  const [classrooms, setClassrooms] = useState<string[]>([])
  const [userType, setUserType] = useState<string>()

  useEffect(() => {
    fetch(`/api/classrooms`)
      .then(response => response.json())
      .then(c => setClassrooms(c));

    fetch(`/api/auth/userType`)
      .then(response => response.json())
      .then(ut => setUserType(ut));
  }, [])

  const logout = async () => {
    const response = await fetch(`/api/auth/logout`);

    if (response.ok) {
      setUserType('guest');
      Router.push('/')
    } else {
      Router.push('/500')
    }
  }

  return (
    <div className="p-2 flex">
      <SearchBar list={classrooms} />
      <div className="shrink-0 flex gap-4 justify-start items-center px-4">
        <Link href="/">
          <a className="hover:underline" href='login'>Inicio</a>
        </Link>
        {userType == 'guest' ?
          <Link href="/login">
            <a className="hover:underline" href='login'>Iniciar sesión</a>
          </Link>
          :
          <button className="hover:underline" onClick={logout}>
            Cerrar sesión
          </button>
        }
        {userType == 'admin' ?
          <Link href="/admin">
            <a className="hover:underline" href='login'>Administración</a>
          </Link>
          :
          null
        }
      </div>
    </div>
  );
};

export default AppNavbar;
