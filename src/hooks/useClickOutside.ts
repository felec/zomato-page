import React, { useEffect } from 'react';

function useClickOutside(elRef: React.RefObject<any>, callback: Function) {
  useEffect(() => {
    const listener = (e: any) => {
      if (!elRef.current || elRef.current.contains(e.target)) {
        return;
      }
      callback(e);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [callback, elRef]);
}

export default useClickOutside;
