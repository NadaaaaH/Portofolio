import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo, lazyload, placeholder } from '@cloudinary/react';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { scale } from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({
    cloud: {
        cloudName: 'dblv5trjd'
    }
});

interface CloudinaryVideoProps {
    publicId?: string;
    posterPublicId?: string;
    width?: number;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
}

export const CloudinaryVideo: React.FC<CloudinaryVideoProps> = ({
    publicId,
    posterPublicId,
    width,
    className,
    autoPlay = false,
    loop = false,
    muted = true,
    controls = true,
}) => {
    if (!publicId) return null;

    const myVideo = cld.video(publicId);

    // Optimasi: format auto + quality auto
    myVideo
        .delivery(format(autoFormat()))
        .delivery(quality(autoQuality()));

    if (width) {
        myVideo.resize(scale().width(width));
    }

    // Poster dari Cloudinary (opsional)
    const posterUrl = posterPublicId
        ? cld.image(posterPublicId).delivery(format(autoFormat())).toURL()
        : undefined;

    return (
        <AdvancedVideo
            cldVid={myVideo}
            className={className}
            poster={posterUrl}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            controls={controls}
            plugins={[
                lazyload({ rootMargin: '10px 20px 10px 20px', threshold: 0.25 }),
                placeholder({ mode: 'blur' })
            ]}
        />
    );
};