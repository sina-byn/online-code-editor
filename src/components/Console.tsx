import { FC, useCallback, useEffect, useRef, useState } from 'react';

// * icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons';

// * components
import Log from './Log';
import Button from './ui/Button';
import FullscreenButton from './ui/FullscreenButton';

// * interfaces
import { LogObject } from './Log';

const Console: FC = () => {
  const [logs, setLogs] = useState<LogObject[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const consoleRef = useRef<HTMLDivElement>(null);

  const expandToggler = () => setExpanded(prev => !prev);
  const messageHandler = useCallback((e: MessageEvent) => {
    if (typeof e.data !== 'string') return;
    if (!e.data.includes('log-messages')) return;
    setLogs(prev => [...prev, ...JSON.parse(e.data).slice(0, -1)]);
  }, []);
  const clearConsole = useCallback(() => {
    if (!logs.length) return;
    console.clear();
    setLogs([]);
  }, [logs]);

  useEffect(() => {
    window.addEventListener('message', messageHandler);

    return () => window.removeEventListener('message', messageHandler);
  }, []);

  return (
    <div
      ref={consoleRef}
      className={`
        w-full bg-zinc-800 text-gray-200 overflow-x-auto
        ${expanded ? 'h-[300px] overflow-y-auto' : 'h-[40px] overflow-y-hidden'}
      `}
    >
      <section className='console-header h-[40px] flex items-center justify-between border-b border-gray-200/50 pr-4'>
        <Button onClick={expandToggler} className='gap-x-2 text-sm'>
          <h6 title='supports only .log() - .info() - .warn() - .error()'>
            console
          </h6>
          <FontAwesomeIcon
            icon={expanded ? faChevronDown : faChevronUp}
            className='text-sm mt-1'
          />
        </Button>
        <div className='controls flex items-center gap-x-5 text-sm'>
          <FullscreenButton ref={consoleRef} className='mt-0.5' />
          <FontAwesomeIcon
            title='clear console'
            icon={faTrash}
            onClick={clearConsole}
            className='cursor-pointer'
          />
        </div>
      </section>
      <ul className='console-main font-consolas text-xs pt-2'>
        {logs && logs.map((log, idx) => <Log key={idx} id={++idx} log={log} />)}
      </ul>
    </div>
  );
};

export default Console;
