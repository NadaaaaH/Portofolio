import React from 'react';

const CLOUD_NAME = 'dblv5trjd';

interface CloudinaryImageProps {
    publicId?: string;
    alt?: string;
    width?: number;
    className?: string;
    onError?: React.ReactEventHandler<HTMLImageElement>;
    onLoad?: React.ReactEventHandler<HTMLImageElement>;
    style?: React.CSSProperties;
    loading?: 'lazy' | 'eager';
    draggable?: boolean;
}

/**
 * Build Cloudinary URL langsung — paling reliable, tanpa SDK complexity.
 * Format: https://res.cloudinary.com/{cloud}/image/upload/f_auto,q_auto,w_{width}/{publicId}
 */
export function buildUrl(publicId: string, width?: number): string {
    if (publicId.startsWith('http://') || publicId.startsWith('https://') || publicId.startsWith('/')) {
        return publicId;
    }
    const transforms = ['f_auto', 'q_auto'];
    if (width) transforms.push(`w_${width}`);
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(',')}/${publicId}`;
}

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
    publicId,
    alt,
    width,
    className,
    onError,
    onLoad,
    style,
    loading = 'lazy',
    draggable = false
}) => {
    if (!publicId) return null;

    const src = buildUrl(publicId, width);

    return (
        <img
            src={src}
            alt={alt || ''}
            className={className}
            loading={loading}
            decoding="async"
            onError={onError}
            onLoad={onLoad}
            style={style}
            draggable={draggable}
        />
    );
};