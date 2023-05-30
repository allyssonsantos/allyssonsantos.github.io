import { useEffect } from 'react';
import { useRouter } from 'next/router';
import languageDetector from './language-detector';

export const useRedirect = (to?: string) => {
  const router = useRouter()
  const destination = to || router.asPath as string;

  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect();

    if (destination.startsWith('/' + detectedLng) && router.route === '/404') {
      router.replace('/' + detectedLng + router.route);

      return;
    }

    if (languageDetector) {
      languageDetector.cache?.(detectedLng as string)
    }

    router.replace('/' + detectedLng + to)
  })

  return <></>
};

export const Redirect = () => {
  useRedirect()
  return <></>
}

// eslint-disable-next-line react/display-name
export const getRedirect = (to: string) => () => {
  useRedirect(to)
  return <></>
}
