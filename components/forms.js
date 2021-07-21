import { useForm, Controller } from 'react-hook-form';

export default function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return {
    control,
    Controller,
    handleSubmit,
    errors,
    reset
  };
}
