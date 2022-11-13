import { FC, useCallback } from 'react';

// * interfaces
interface Log {
  type: string;
  message: number | string | boolean | object | Function;
}

interface LogProps {
  id: number;
  log: Log;
}

const Log: FC<LogProps> = ({ id, log }) => {
  const { type, message } = log;

  const setStyles = useCallback(() => {
    switch (type) {
      case 'error':
        return 'bg-red-500/50';
      case 'warn':
        return 'bg-yellow-500/50';
      case 'info':
        return 'bg-blue-500/50';
      default:
        return '';
    }
  }, []);

  const setMessage = useCallback(() => {
    switch (typeof message) {
      case 'function':
        return message.toString();
      case 'string':
        if (type !== 'error') return `"${message}"`;
        return `Error ${message}`;
      case 'object':
        if (Array.isArray(message)) return `Array ${JSON.stringify(message)}`;
        return `Object ${JSON.stringify(message)}`;
      default:
        return message;
    }
  }, []);

  return (
    <li className='log flex mb-1 last:mb-10'>
      <span className='log-number min-w-[2rem] text-yellow-400 text-center border-r border-gray-200'>
        {id}
      </span>
      <p className={`log-message ${setStyles()} pl-2 pr-5`}>{setMessage()}</p>
    </li>
  );
};

export default Log;
