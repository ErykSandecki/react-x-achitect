export type TUseOnBlurColorEvent = () => void;

export const useOnBlurColorEvent = (
  currentValue: string,
  setValue: (value: string) => void,
): TUseOnBlurColorEvent => {
  const handleBlur = (): void => {
    setValue(currentValue);
  };

  return handleBlur;
};
