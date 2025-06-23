import React from 'react';
import Image from 'next/image';

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  return (
    <div className="flex gap-4 items-center">
      <span className="text-gray-600 dark:text-gray-300">Share:</span>
      <div className="flex gap-2">
        {Object.entries(shareLinks).map(([platform, link]) => (
          <a
            key={platform}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={`Share on ${platform}`}
          >
            <Image
              src={`/icons/${platform}.svg`}
              alt={platform}
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons; 