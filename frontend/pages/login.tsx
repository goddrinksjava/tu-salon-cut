import React, { useState } from 'react';
import { NextPage } from 'next';
import AppTextInput from '../components/AppTextInput';
import { Form, Formik } from 'formik';
import AppButton from '../components/AppButton';
import { loginSchema } from '../schema/login';
import AppError from '../components/AppError';
import { useRouter } from 'next/router';

const Editor: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);

  return (
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

          {error ? <AppError error={error} /> : null}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={async (data) => {
              const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });

              console.log(response);

              if (response.status == 200) {
                router.push('/');
              } else if (response.status == 403) {
                const obj = await response.json();
                setError(obj.error);
              } else if (response.status == 500) {
                setError('Error del servidor, por favor intentalo más tarde');
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
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600"
                      >
                        Contraseña
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        Olvidaste tu contraseña?
                      </a>
                    </div>

                    <AppTextInput
                      name="password"
                      type="password"
                      placeholder="Tu Contraseña"
                    />
                  </div>
                  <div className="mt-6">
                    <AppButton
                      color="cyan"
                      text="Iniciar Sesión"
                      type="submit"
                      disabled={isSubmitting}
                    />
                  </div>
                </Form>

                <div className="py-4">
                  <div className="w-full border-t border-gray-300"></div>
                </div>

                <div>
                  <a href="/signup">
                    <AppButton color="green" text="Crear Cuenta" />
                  </a>
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
  );
};
export default Editor;
