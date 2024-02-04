import { FormEventHandler, useState } from 'react';

export function useForm(inputValues = {}) {
  const [values, setValues] = useState(inputValues);

  const handleChange: FormEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };
  return [values, handleChange, setValues];
}
