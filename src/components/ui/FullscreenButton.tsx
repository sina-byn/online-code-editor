import { forwardRef, useContext, useState, useEffect } from 'react';

// * icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faExpand, fas } from '@fortawesome/free-solid-svg-icons';

// * context
import { AppCtx } from '../../context/AppContextProvider';

// * interfaces
interface Document {
    webkitFullscreenEnabled: any;
};

interface FullscreenButtonProps {
  className?: string;
}

const FullscreenButton = forwardRef<HTMLElement | null, FullscreenButtonProps>(({ className }, ref) => {
    const { fullscreenElem } = useContext(AppCtx)!;
    const [targetElem, setTargetElem] = useState<Element | null>(null);

    const isFullscreenSupported = () => {
        if (document.fullscreenEnabled) return true;
        return false;
    };

    const fullscreenToggler = () => {
        if (!fullscreenElem) {
            targetElem?.requestFullscreen();
            return;
        }

        if (fullscreenElem !== targetElem) {
            document.exitFullscreen().then(_ => {
                targetElem!.requestFullscreen();
            });
            return;
        }

        document.exitFullscreen();
    };

    useEffect(() => {
        if (ref && 'current' in ref) setTargetElem(ref.current);
        else setTargetElem(document.documentElement);
    },  [ref]);

    if (!isFullscreenSupported()) return null;

    return (
      <FontAwesomeIcon
        title='fullscreen'
        onClick={fullscreenToggler}
        className={`${className} text-gray-200 cursor-pointer`}
        icon={targetElem === fullscreenElem ? faClose : faExpand}
      />
    );
  }
);

export default FullscreenButton;
