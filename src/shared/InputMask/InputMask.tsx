import InputMask, { Props as InputMaskProps } from 'react-input-mask';
import { ReactNode } from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TInputMaskCorrect = Omit<InputMaskProps, 'children'> & { children?: (inputProps: any) => ReactNode };

export const InputMaskCorrect: React.FC<TInputMaskCorrect> = ({ children, ...props }) => {
  const child = children as ReactNode;
  return (
    <InputMask {...props}>
      {child}
    </InputMask>
  );
}
