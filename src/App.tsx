import { useContext, useEffect, useRef } from 'react';

// * icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// * context
import { AppCtx } from './context/AppContextProvider';

// * components
import Header from './components/Header';
import EditorsPane from './components/EditorsPane';
import Button from './components/ui/Button';
import Console from './components/Console';
import Resizer from './components/Resizer';

// * functions
import { srcDocTemplate } from './utils/functions';

const App = () => {
  const { code, liveMode } = useContext(AppCtx)!;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const execCode = () => (iframeRef.current!.srcdoc = srcDocTemplate(code, liveMode));

  useEffect(() => {
    if (!liveMode || !iframeRef.current) return;
    const timeout = setTimeout(execCode, 250);

    return () => clearTimeout(timeout);
  }, [code, liveMode, iframeRef.current]);

  return (
    <div className='app-container flex flex-col h-screen w-screen overflow-x-hidden md:overflow-hidden'>
      <Header>
        <Button
          onClick={execCode}
          className='bg-green-500 text-gray-200 gap-x-2 hover:bg-green-600'
        >
          run
          <FontAwesomeIcon icon={faPlay} className='text-sm mt-1' />
        </Button>
      </Header>
      <main className='flex h-full flex-col md:flex-row'>
        <EditorsPane />
        <Resizer />
        <section className='preview-pane w-full flex flex-col pb-[40px] md:pb-0'>
          <iframe
            width='100%'
            height='100%'
            title='output'
            ref={iframeRef}
            frameBorder='0'
            sandbox='allow-scripts allow-modals allow-same-origin'
          />
          <Console />
        </section>
      </main>
    </div>
  );
};

export default App;
