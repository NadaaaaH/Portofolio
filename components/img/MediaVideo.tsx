import React, { useEffect, useRef } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo, lazyload } from '@cloudinary/react';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { scale } from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({
    cloud: {
        cloudName: 'dblv5trjd'
    }
});

export interface MediaVideoProps {
    publicId?: string;
    src?: string;
    posterPublicId?: string;
    poster?: string;
    width?: number;
    className?: string;
    /**
     * Mode autoplay:
     * - `true`: Otomatis play saat terlihat di viewport (IntersectionObserver),
     *   pause saat keluar layar, loop, muted, playsInline, tanpa kontrol.
     * - `false`: Mode manual, menunggu interaksi/klik.
     */
    autoplay?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    playsInline?: boolean;
    preload?: string;
    innerRef?: any;
    onClick?: React.MouseEventHandler<HTMLVideoElement>;
    onPlay?: React.ReactEventHandler<HTMLVideoElement>;
    onPause?: React.ReactEventHandler<HTMLVideoElement>;
    onEnded?: React.ReactEventHandler<HTMLVideoElement>;
    onLoadedMetadata?: React.ReactEventHandler<HTMLVideoElement>;
    onError?: React.ReactEventHandler<HTMLVideoElement>;
    style?: React.CSSProperties;
}

export const CloudinaryVideo: React.FC<MediaVideoProps> = ({
    publicId,
    src,
    posterPublicId,
    poster,
    width,
    className,
    autoplay,
    autoPlay,
    loop,
    muted,
    controls,
    playsInline = true,
    preload = 'metadata',
    innerRef,
    onClick,
    onPlay,
    onPause,
    onEnded,
    onLoadedMetadata,
    onError,
    style,
}) => {
    const videoId = publicId || src;
    const isAutoplay = autoplay ?? autoPlay ?? false;
    const finalAutoPlay = isAutoplay;
    const finalLoop = loop !== undefined ? loop : isAutoplay;
    const finalMuted = muted !== undefined ? muted : (isAutoplay ? true : false);
    const finalControls = controls !== undefined ? controls : !isAutoplay;

    const videoElementRef = useRef<HTMLVideoElement | null>(null);

    // IntersectionObserver: ketika mode autoplay aktif, otomatis play saat terlihat di layar
    // dan pause saat keluar layar demi efisiensi performa & baterai
    useEffect(() => {
        if (!isAutoplay) return;
        const el = videoElementRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        el.play().catch(() => {});
                    } else {
                        el.pause();
                    }
                });
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [isAutoplay]);

    if (!videoId) return null;

    // Helper ref gabungan untuk innerRef dari luar dan videoElementRef internal
    const handleRef = (el: HTMLVideoElement | null) => {
        videoElementRef.current = el;
        if (typeof innerRef === 'function') {
            innerRef(el);
        } else if (innerRef && 'current' in innerRef) {
            (innerRef as any).current = el;
        }
    };

    // Poster: ambil dari posterPublicId / poster langsung / Cloudinary frame ke-0
    const posterUrl = poster || (posterPublicId
        ? cld.image(posterPublicId).delivery(format(autoFormat())).toURL()
        : !videoId.startsWith('http') && !videoId.startsWith('/')
        ? `https://res.cloudinary.com/dblv5trjd/video/upload/f_auto,q_auto,so_0/${videoId}.jpg`
        : undefined);

    // Fallback jika video berupa URL eksternal langsung (http/https/path lokal)
    if (videoId.startsWith('http://') || videoId.startsWith('https://') || videoId.startsWith('/')) {
        return (
            <video
                ref={handleRef}
                src={videoId}
                poster={posterUrl}
                className={className}
                autoPlay={finalAutoPlay}
                loop={finalLoop}
                muted={finalMuted}
                controls={finalControls}
                playsInline={playsInline}
                preload={preload}
                onClick={onClick}
                onPlay={onPlay}
                onPause={onPause}
                onEnded={onEnded}
                onLoadedMetadata={onLoadedMetadata}
                onError={onError}
                style={style}
            />
        );
    }

    const myVideo = cld.video(videoId);

    // Optimasi delivery: format auto + quality auto
    myVideo
        .delivery(format(autoFormat()))
        .delivery(quality(autoQuality()));

    if (width) {
        myVideo.resize(scale().width(width));
    }

    return (
        <AdvancedVideo
            cldVid={myVideo}
            innerRef={handleRef}
            className={className}
            poster={posterUrl}
            autoPlay={finalAutoPlay}
            loop={finalLoop}
            muted={finalMuted}
            controls={finalControls}
            playsInline={playsInline}
            preload={preload}
            onClick={onClick}
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onEnded}
            onLoadedMetadata={onLoadedMetadata}
            onError={onError}
            style={style}
            plugins={[
                lazyload({ rootMargin: '20px 20px 20px 20px', threshold: 0.15 })
            ]}
        />
    );
};

export const MediaVideo = CloudinaryVideo;
export default CloudinaryVideo;