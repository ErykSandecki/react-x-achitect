import { ChangeEvent } from 'react';

// utils
import { isHexColor } from 'utils';

export type TUseOnChangeColorEvent = (
  event: ChangeEvent<HTMLInputElement>,
) => void;

export const useOnChangeColorEvent = (
  alpha: string,
  onChange: (alpha: string, value: string) => void,
  setValue: (value: string) => void,
): TUseOnChangeColorEvent => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target as HTMLInputElement;

    if (isHexColor(value)) {
      onChange(alpha, `#${value}`);
    }

    setValue(value);
  };

  return handleChange;
};
