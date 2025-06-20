import {useState, useEffect} from 'react';

const useIsMobile = (breakpoint = 768): boolean => { // 768px is typically 'md'
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < breakpoint);
      };
  
      checkScreenSize(); // Initial check
      window.addEventListener('resize', checkScreenSize);
  
      return () => window.removeEventListener('resize', checkScreenSize);
    }, [breakpoint]);
  
    return isMobile;
  };
  
  export default useIsMobile;