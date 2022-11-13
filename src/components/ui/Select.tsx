import { Dispatch, FC, MouseEvent, SetStateAction, useRef, useState } from 'react';

// * icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// * hooks
import useClickOutside from '../../hooks/useClickOutside';

// * components
import Button from './Button';

// * interfaces
interface SelectProps {
  value: string;
  items: string[];
  setValue: Dispatch<SetStateAction<string>>;
  className?: string;
}

const Select: FC<SelectProps> = ({ items, value, setValue, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(buttonRef.current, () => setIsOpen(false));

  const openToggler = () => setIsOpen(prev => !prev);
  const selectHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const value = target.dataset.value!;
    setValue(value);
    openToggler();
  };

  return (
    <div className='select-container relative text-sm'>
      <Button
        ref={buttonRef}
        onClick={openToggler}
        className={`select-btn justify-between gap-x-2 bg-gray-200 pt-0.5 active:scale-100 ${className}`}
      >
        <span title={value} className='block truncate'>
          {value}
        </span>
        <FontAwesomeIcon
          icon={isOpen ? faChevronDown : faChevronRight}
          className='text-[0.6rem] mt-0.5'
        />
      </Button>
      <div
        className={`
        items-container w-full h-fit flex-col absolute left-0 top-[120%] z-50 rounded-md overflow-hidden
        ${isOpen ? 'flex' : 'hidden'}
      `}
      >
        {items.map((item, idx) => (
          <p
            key={idx}
            title={item}
            data-value={item}
            onClick={selectHandler}
            className='select-item truncate bg-white odd:bg-gray-200 hover:bg-blue-500 hover:text-gray-200 cursor-pointer px-2 pt-0.5 pb-1'
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Select;
