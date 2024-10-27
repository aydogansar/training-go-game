import { useEffect, useState } from 'react';

function useRouterTags() {
  const [hashTag, setHashTag] = useState('');

  useEffect(() => {
    const updateHashTag = () => {
      setHashTag(window.location.hash);
    };

    updateHashTag();

    window.addEventListener('hashchange', updateHashTag);

    return () => {
      window.removeEventListener('hashchange', updateHashTag);
    };
  }, []);

  return {
    hashTag,
  };
}

export default useRouterTags;
