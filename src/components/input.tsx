import { TextInput, type TextInputProps } from '@mantine/core';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form';

export interface ControlledTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends TextInputProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
}
export const Input = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  ...textInputProps
}: ControlledTextInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <TextInput
            {...field}
            {...textInputProps}
            error={
              fieldState.error ? fieldState.error.message : textInputProps.error
            }
          />
        );
      }}
    />
  );
};
