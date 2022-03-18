import React, { FC } from 'react';
import { useField, FieldHookConfig } from 'formik';

interface IAppTextInputProps {
  label?: string;
}

const AppTextInput: FC<FieldHookConfig<string> & IAppTextInputProps> = ({
  label,
  ...props
}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]

  // which we can spread on <input>. We can use field meta to show an error

  // message if the field is invalid and it has been touched (i.e. visited)

  const [field, meta] = useField(props);

  return (
    <>
      {label ? (
        <label
          className="text-sm text-gray-600"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
      ) : null}

      <input
        placeholder={props.placeholder}
        type={props.type || 'text'}
        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        {...field}
      />

      {meta.touched && meta.error ? (
        <div className="text-sm text-rose-700">{meta.error}</div>
      ) : null}
    </>
  );
};

export default AppTextInput;
