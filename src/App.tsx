// * components
import Header from './components/Header';
import EditorsPane from './components/EditorsPane';

const App = () => {
  return (
    <div className='app-container flex flex-col h-screen w-screen overflow-hidden'>
      <Header>
        <span className='text-gray-200'>Header</span>
      </Header>
      <main className='flex h-full'>
        <EditorsPane />
        {/* Resizer goes here */}
        <section className='preview-pane w-full flex flex-col'>
          <iframe
            ref={null}
            width='100%'
            height='100%'
            title='output'
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
