import { useEffect } from 'react';

const Script = ({ src, async = false, onLoad }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.onload = onLoad;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [src, async, onLoad]);

  return null;
};
export default Script;
