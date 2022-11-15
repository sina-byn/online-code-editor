import { FC, ReactNode } from 'react';

// * components
import ThemeSelect from './ThemeSelect';
import ModeSwitch from './ModeSwitch';
import FullscreenButton from './ui/FullscreenButton';

// * interfaces
interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className='h-[60px] flex justify-between bg-zinc-900 px-4 py-3 md:py-0'>
      <div className='options left flex items-center gap-x-4'>
        <ThemeSelect />
        <ModeSwitch />
        {children}
      </div>
      <div className='options right hidden md:flex items-center'>
        <FullscreenButton className='text-xl' />
      </div>
    </header>
  );
};

export default Header;
