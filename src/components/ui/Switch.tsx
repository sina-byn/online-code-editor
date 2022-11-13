import { FC, useId, ChangeEventHandler } from 'react';

// * interfaces
interface SwitchProps {
  label: string;
  checked: boolean;
  onToggle: ChangeEventHandler;
}

const Switch: FC<SwitchProps> = ({ label, checked, onToggle }) => {
  const id = useId();

  return (
    <div className='switch-container flex items-center gap-x-1 text-gray-200'>
      <span className='text-sm font-bold'>{label}</span>
      <label
        htmlFor={`switch-${id}`}
        className={`
            inline-block h-5 w-10 px-1 rounded-full cursor-pointer
            ${checked ? 'bg-red-500' : 'bg-blue-500'}
        `}
      >
        <span
          className={`
              slider inline-block h-[70%] aspect-square rounded-full bg-gray-200 -translate-y-[10%] transition-all duration-300
              ${checked ? 'translate-x-[1.1rem] animate-pulse' : ''}
          `}
        />
        <input
          type='checkbox'
          checked={checked}
          id={`switch-${id}`}
          onChange={onToggle}
          className='opacity-0 w-0 h-0'
        />
      </label>
    </div>
  );
};

export default Switch;
