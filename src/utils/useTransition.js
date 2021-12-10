import { useEffect } from 'react';
import { useFade } from '@frigobar/animation';

function useTransition(transitionStatus) {
  const [{ animation }, toggleAnimation] = useFade({ duration: 100 });

  useEffect(() => {
    if (transitionStatus === 'exiting') {
      toggleAnimation(false);
    }

    if (transitionStatus === 'entered') {
      toggleAnimation(true);
    }
  }, [transitionStatus]);

  return [animation];
}

export default useTransition;
