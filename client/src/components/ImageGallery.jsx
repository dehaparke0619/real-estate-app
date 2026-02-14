import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({ images }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-xl">
                <span className="text-gray-500">Görsel yok</span>
            </div>
        );
    }

    return (
        <div className="relative group">
            <div className="overflow-hidden rounded-xl bg-gray-100" ref={emblaRef}>
                <div className="flex">
                    {images.map((img, index) => (
                        <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[500px]">
                            <img
                                src={`http://localhost:5000/uploads/${img}`}
                                alt={`Slide ${index}`}
                                className="w-full h-full object-contain bg-black/5"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {images.length > 1 && (
                <>
                    <button
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition opacity-0 group-hover:opacity-100"
                        onClick={scrollPrev}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition opacity-0 group-hover:opacity-100"
                        onClick={scrollNext}
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex ? 'bg-white w-4' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageGallery;
