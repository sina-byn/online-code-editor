import { useRef } from 'react';

// * icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// * components
import Header from './components/Header';
import EditorsPane from './components/EditorsPane';
import Button from './components/ui/Button';

const App = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className='app-container flex flex-col h-screen w-screen overflow-hidden'>
      <Header>
        <Button
          onClick={() => null}
          className='bg-green-500 text-gray-200 gap-x-2 hover:bg-green-600'
        >
          run
          <FontAwesomeIcon icon={faPlay} />
        </Button>
      </Header>
      <main className='flex h-full'>
        <EditorsPane />
        {/* Resizer goes here */}
        <section className='preview-pane w-full flex flex-col'>
          <iframe
            width='100%'
            height='100%'
            title='output'
            ref={iframeRef}
            frameBorder='0'
            sandbox='allow-scripts allow-modals allow-same-origin'
          />
          {/* Console goes here */}
        </section>
      </main>
    </div>
  );
};

export default App;
