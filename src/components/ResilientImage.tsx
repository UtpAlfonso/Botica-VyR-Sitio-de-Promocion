import { useState } from 'react';
import { Leaf } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EDF2EE] via-[#E2EBE5] to-[#D4E2D9] text-[#0E6245] p-6 text-center"
        role="img"
        aria-label={alt}
      >
        <Leaf className="w-8 h-8 mb-2 opacity-75" strokeWidth={1.5} />
        <span className="font-display text-sm font-medium text-[#0C231B]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onLoad={() => setLoaded(true)}
      onError={() => setHasError(true)}
      className={`${className} transition-opacity duration-300 ${
        loaded ? 'opacity-100' : 'opacity-90'
      }`}
    />
  );
}
