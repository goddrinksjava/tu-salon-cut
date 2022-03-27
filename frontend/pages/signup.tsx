import React, { useState } from 'react';
import { NextPage } from 'next';
import AppTextInput from '../components/AppTextInput';
import { Form, Formik } from 'formik';
import AppButton from '../components/AppButton';
import { useRouter } from 'next/router';
import { signupSchema } from '../schema/signup';
import AppLink from '../components/AppLink';
import Head from 'next/head';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editor: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Registro</title>
      </Head>

      <ToastContainer />

      <div className="bg-white flex justify-center h-screen md:divide-x">
        <div className="flex-auto hidden md:flex pt-8 lg:pt-0 items-center w-full px-6 mx-auto">
          <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold text-gray-700">
            Noticias
          </h2>
        </div>

        <div className="flex pt-8 lg:pt-0 md:items-center w-full px-6 mx-auto">
          <div className="flex-1">
            <div>
              <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold text-gray-700">
                Tu Salón CUT
              </h2>
            </div>

            <Formik
              initialValues={{
                email: '',
                password: '',
                passwordConfirmation: '',
              }}
              validationSchema={signupSchema}
              onSubmit={async ({ passwordConfirmation, ...submitData }) => {
                const response = await fetch('/api/auth/signup', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(submitData),
                });

                console.log(response);

                if (response.status == 200) {
                  router.push('/');
                } else if (response.status == 400) {
                  const obj = await response.json();
                  toast(obj.error, {
                    type: 'error',
                  });
                } else if (response.status == 500) {
                  toast('Error del servidor, por favor intentalo más tarde', {
                    type: 'error',
                  });
                }
              }}
            >
              {({ isSubmitting }) => (
                <div className="mt-8">
                  <Form>
                    <div className="mt-6">
                      <AppTextInput
                        name="email"
                        type="email"
                        label="Correo institucional"
                        placeholder="ejemplo@alumno.udg.mx"
                      />
                    </div>

                    <div className="mt-6">
                      <AppTextInput
                        autoComplete="new-password"
                        name="password"
                        type="password"
                        label="Contraseña"
                        placeholder="Tu Contraseña"
                      />
                    </div>

                    <div className="mt-6">
                      <AppTextInput
                        autoComplete="new-password"
                        name="passwordConfirmation"
                        type="password"
                        label="Confirma tu contraseña"
                        placeholder="Tu Contraseña"
                      />
                    </div>

                    <div className="mt-6">
                      <AppButton
                        color="cyan"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Crear Cuenta
                      </AppButton>
                    </div>
                  </Form>

                  <div className="py-4">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>

                  <div>
                    <AppLink href="/login" color="green">
                      Iniciar Sesión
                    </AppLink>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>

        <div className="flex-auto hidden xl:flex pt-8 lg:pt-0 items-center w-full px-6 mx-auto">
          <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold text-gray-700">
            Salones
          </h2>
        </div>
      </div>
    </>
  );
};
export default Editor;
