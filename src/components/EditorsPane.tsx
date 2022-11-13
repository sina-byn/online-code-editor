import { FC, useContext, useEffect } from 'react';

// * context
import { AppCtx } from '../context/AppContextProvider';

// * components
import Editor from './Editor';

const EditorsPane: FC = () => {
  const { code, setCode, theme } = useContext(AppCtx)!;

  return (
    <section className='editors-pane h-[calc(100vh_-_50px)] w-3/12 min-w-[300px] max-w-[50vw] flex flex-col bg-zinc-800'>
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
