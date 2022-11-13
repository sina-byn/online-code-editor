import { FC, ReactNode } from 'react';

// * interfaces
interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className='flex justify-between bg-zinc-900 px-2 py-3'>
      <div className='options left flex items-center gap-x-4'>
        {/* ThemeSelect goes here */}
        {/* ModeSwitch goes here */}
        {children}
      </div>
      <div className='options right flex items-center pr-4'>
        {/* FullscreenButton goes here */}
      </div>
    </header>
  );
};

export default Header;
