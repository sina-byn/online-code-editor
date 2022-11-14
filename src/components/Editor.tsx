import { Dispatch, FC, SetStateAction, useCallback, useRef, useState } from 'react';

// * code-mirror imports
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import * as themes from '@uiw/codemirror-themes-all';

// * icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';

// * components
import FullscreenButton from './ui/FullscreenButton';

// * interfaces
import { Code } from '../context/AppContextProvider';

interface EditorProps {
  lang: string;
  code: string;
  setCode: Dispatch<SetStateAction<Code>>;
  theme: string;
}

const Editor: FC<EditorProps> = ({ lang, code, setCode, theme }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<ReactCodeMirrorRef>(null);
  const setLangExt = useCallback(() => {
    switch (lang) {
      case 'html':
        return html({ autoCloseTags: true });
      case 'css':
        return css();
      default:
        return javascript({ jsx: false });
    }
  }, []);
  const changeHandler = useCallback((value: string) => {
    setCode(prev => ({ ...prev, [lang]: value }));
  }, []);
  const collapseToggler = useCallback(() => setIsCollapsed(prev => !prev), []);

  return (
    <div
      ref={containerRef}
      className={`
        w-full grid grid-cols-1 grid-rows-[30px,_1fr] 
        ${isCollapsed ? 'h-auto' : 'h-full overflow-y-auto'}
      `}
    >
      <div className='box-header sticky top-0 left-0 z-10 flex items-center justify-between h-[30px] text-gray-200 bg-zinc-700 border-b border-gray-200/50 px-2.5'>
        <h5 className='uppercase'>{lang}</h5>
        <div className='controls flex items-center gap-x-3'>
          <FontAwesomeIcon
            className='cursor-pointer'
            onClick={collapseToggler}
            icon={
              isCollapsed
                ? faUpRightAndDownLeftFromCenter
                : faDownLeftAndUpRightToCenter
            }
          />
          <FullscreenButton ref={containerRef} />
        </div>
      </div>
      <CodeMirror
        ref={editorRef}
        value={code}
        width='100%'
        height={isCollapsed ? '0' : '100%'}
        className={`${isCollapsed ? 'h-0' : 'h-full'} w-full`}
        // @ts-ignore
        theme={themes[theme] || theme}
        onChange={changeHandler}
        extensions={[setLangExt(), EditorView.lineWrapping]}
        basicSetup={{ tabSize: 4, autocompletion: true }}
      />
    </div>
  );
};

export default Editor;
