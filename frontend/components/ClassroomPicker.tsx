import { Dialog, Transition } from '@headlessui/react';
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import {} from 'react';

interface ClassroomPicker {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ClassroomPicker: FC<ClassroomPicker> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className={`fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-slate-50`}
    >
      <div className="flex flex-col bg-slate-100 w-96 py-8 px-4 text-center">
        <Dialog.Overlay />

        <h2></h2>

        <Dialog.Title className="text-green-500 text-5xl pb-8">
          Edificio A
        </Dialog.Title>

        <div className="pb-4">
          <h2 className="text-cyan-500 text-3xl">Primer Piso</h2>

          <div className="flex flex-wrap justify-center">
            <a href="#" className="text-xl m-2 hover:underline">
              A101
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A102
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A103
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A104
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A105
            </a>
            <a href="#" className="text-xl m-2 hover:underline">
              A106
            </a>
            <a href="#" className="text-xl m-2 hover:underline">
              A107
            </a>
          </div>
        </div>

        <div className="pb-4">
          <h2 className="text-cyan-500 text-3xl">Segundo Piso</h2>

          <div className="flex flex-wrap justify-center">
            <a href="#" className="text-xl m-2 hover:underline">
              A201
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A202
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A203
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A204
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A205
            </a>
            <a href="#" className="text-xl m-2 hover:underline">
              A206
            </a>
            <a href="#" className="text-xl m-2 hover:underline">
              A207
            </a>
          </div>
        </div>

        <div className="pb-4">
          <h2 className="text-cyan-500 text-3xl">Tercer Piso</h2>

          <div className="flex flex-wrap justify-center">
            <a href="#" className="text-xl m-2 hover:underline">
              A301
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A302
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A303
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A304
            </a>

            <a href="#" className="text-xl m-2 hover:underline">
              A305
            </a>
            <a href="#" className="text-xl m-2 hover:underline">
              A306
            </a>
            <a href="#" className="text-xl m-2 hover:underline">
              A307
            </a>
          </div>
        </div>

        <button
          className="m-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setIsOpen(false)}
        >
          Regresar
        </button>
      </div>
    </Dialog>
  );
};

export default ClassroomPicker;
