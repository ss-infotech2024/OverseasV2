import { useState, useEffect } from 'react';

import img1 from '../assets/crop/1.png';
import img2 from '../assets/crop/2.png';
import img3 from '../assets/crop/3.png';
import img4 from '../assets/crop/4.png';
import img5 from '../assets/crop/5.png';
import img6 from '../assets/crop/6.png';
import img7 from '../assets/crop/7.png';
import img8 from '../assets/crop/8.png';
import img9 from '../assets/crop/9.png';
import img10 from '../assets/crop/10.png';
import img11 from '../assets/crop/11.png';
import img12 from '../assets/crop/12.png';

const PinterestGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockImages = [
            { id: 1, src: img1, title: "Campus Life Experience", description: "Students enjoying modern campus facilities and social spaces", height: 480 },
            { id: 2, src: img2, title: "Library & Study Areas", description: "State-of-the-art library with collaborative learning spaces", height: 520 },
            { id: 3, src: img3, title: "Graduation Ceremony", description: "Celebrating student achievements and academic success", height: 600 },
            { id: 4, src: img4, title: "Research Laboratories", description: "Advanced research facilities for innovative projects", height: 600 },
            { id: 5, src: img5, title: "Student Accommodation", description: "Comfortable and modern housing options for students", height: 400 },
            { id: 6, src: img6, title: "International Community", description: "Diverse student body from around the world", height: 600 },
            { id: 7, src: img7, title: "Sports Facilities", description: "Modern sports complex and athletic programs", height: 520 },
            { id: 8, src: img8, title: "Classroom Learning", description: "Interactive and engaging classroom environments", height: 580 },
            { id: 9, src: img9, title: "Campus Events", description: "Vibrant campus life with cultural and social events", height: 500 },
            { id: 10, src: img10, title: "New Campus Highlight", description: "Additional campus activities and student engagement", height: 500 },
            { id: 11, src: img11, title: "New Campus Highlight", description: "Additional campus activities and student engagement", height: 550 },
            { id: 12, src: img12, title: "New Campus Highlight", description: "Additional campus activities and student engagement", height: 550 }
        ];

        setTimeout(() => {
            setImages(mockImages);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return <LoadingSkeleton />;

    return (
        <div className="min-h-screen bg-white pt-12 sm:pt-16 lg:pt-20">
            {/* Header */}
           <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 text-center">
    <div className="inline-flex items-center bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 text-[10px] sm:text-xs shadow-md">
        <svg className="w-3 h-3 mr-1 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
        </svg>
        SUCCESS STORIES
    </div>

    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight drop-shadow-sm">
        Our Students Around the World
    </h1>

    <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-800 max-w-xl mx-auto px-2 font-medium">
        We have successfully guided students to top universities across the globe. Explore the journeys of our students who achieved their dream of studying abroad with our support.
    </p>
</header>

            {/* Responsive Masonry Grid */}
            <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-10">
                <div className="columns-1 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
                    {images.map((image) => (
                        <PinterestCard key={image.id} image={image} />
                    ))}
                </div>
            </main>
        </div>
    );
};

const PinterestCard = ({ image }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="break-inside-avoid mb-3 sm:mb-4 group cursor-pointer transform transition-all duration-300 hover:-translate-y-1">
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
                <div className="relative overflow-hidden">
                    <img
                        src={image.src}
                        alt={image.title}
                        className={`w-full object-cover transition-all duration-700 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{ height: `${image.height}px` }}
                        onLoad={() => setIsLoaded(true)}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <h3 className="text-sm sm:text-base font-bold leading-tight drop-shadow-lg">{image.title}</h3>
                        <p className="text-xs sm:text-sm mt-1 opacity-90 drop-shadow">{image.description}</p>
                    </div>

                    {!isLoaded && (
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl sm:rounded-2xl"
                            style={{ height: `${image.height}px` }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-white pt-12 sm:pt-16 lg:pt-20 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
            {/* Skeleton Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center bg-gray-300 text-transparent text-xs font-semibold px-3 py-1 rounded-full mb-3 animate-pulse text-[10px] h-6 w-36"></div>
                <div className="h-8 sm:h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg w-64 sm:w-96 mx-auto animate-pulse mb-3"></div>
                <div className="h-4 sm:h-5 bg-gray-200 rounded w-56 sm:w-2/3 mx-auto animate-pulse"></div>
            </div>

            <div className="columns-1 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="break-inside-avoid mb-3 sm:mb-4">
                        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-gray-200">
                            <div
                                className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                                style={{ height: `${280 + Math.random() * 280}px` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default PinterestGallery;