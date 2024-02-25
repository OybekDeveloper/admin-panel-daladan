import { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';
//eslint-disable-next-line
export const ProductImg = ({ src }) => {
    const [imgLoading, setImageLoading] = useState(false);
    const baseUrl = 'https://media.istockphoto.com/id/1367855191/fr/vectoriel/galerie-dimages-ic%C3%B4ne-solide.jpg?s=612x612&w=0&k=20&c=6YcYJhK-H6i2wto10SJvSa-Y06TvzpM6aVOvBgUSWdo=';

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageLoading(true);
        };
        img.src = src;
    }, [src]);

    return (
        <div className='h-[200px] rounded-t-[16px] overflow-hidden'>
            <div
                style={{
                    display: imgLoading ? 'none' : 'block',
                    objectFit: 'cover',
                }}
                className='imgMenu'
            >
                <Blurhash
                    hash='LEHV6nWB2yk8pyo0adR*.7kCMdnj'
                    width={'100%'}
                    height={"200px"}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />
            </div>
            <img
                style={{ display: imgLoading ? 'block' : 'none' }}
                className="object-cover h-[200px] rounded-t-[16px]"
                src={src ? src : baseUrl}
                alt={'img'}
            />
        </div>
    );
};
