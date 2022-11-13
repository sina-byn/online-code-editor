import { useContext } from 'react';

// * context
import { AppCtx } from '../context/AppContextProvider';

// * data
import themes from '../data/themes.json';

// * components
import Select from './ui/Select';

const ThemeSelect = () => {
  const { theme, setTheme } = useContext(AppCtx)!;

  return (
    <div>
      <Select value={theme} setValue={setTheme} items={themes} className='w-[5.8rem]' />
    </div>
  );
};

export default ThemeSelect;
