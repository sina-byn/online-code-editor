import { ReactNode, forwardRef, MouseEventHandler } from 'react';

// * interfaces
interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { onClick, className, children } = props;
  
  return (
    <button
      type='button'
      ref={ref || null}
      onClick={onClick}
      className={`flex items-center rounded-md transition-transform duration-100 pb-1 px-3 active:scale-95 outline-0 ${className}`}
    >
      {children}
    </button>
  );
});

export default Button;
