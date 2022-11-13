import { FC, useContext, } from 'react';

// * context
import { AppCtx } from '../context/AppContextProvider';

// * components
import Switch from './ui/Switch';

const ModeSwitch: FC = () => {
  const { liveMode, setLiveMode } = useContext(AppCtx)!;
  const modeToggler = () => setLiveMode(prev => !prev);

  return <Switch label='live' checked={liveMode} onToggle={modeToggler} />;
};

export default ModeSwitch;
