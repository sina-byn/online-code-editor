import { FC, useContext } from 'react';

// * context
import { AppCtx } from '../context/AppContextProvider';

// * components
import Editor from './Editor';

const EditorsPane: FC = () => {
  const { code, setCode, theme } = useContext(AppCtx)!;

  return (
    <section className='editors-pane h-[calc(100vh_-_50px)] w-full md:w-3/12 min-w-[280px] md:max-w-[50vw] flex flex-col bg-zinc-800'>
      {Object.entries(code).map(([lang, code]) => (
        <Editor
          key={lang}
          lang={lang}
          code={code}
          setCode={setCode}
          theme={theme}
        />
      ))}
    </section>
  );
};

export default EditorsPane;
