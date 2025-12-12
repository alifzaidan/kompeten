import { InfiniteSlider } from '@/components/ui/infinite-slider';

interface Mentor {
    id: number;
    name: string;
    role: string;
    image: string;
    bgColor: string;
}

export default function MentorSection() {
    const mentors: Mentor[] = [
        {
            id: 1,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-yellow-400',
        },
        {
            id: 2,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-pink-300',
        },
        {
            id: 3,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-gray-300',
        },
        {
            id: 4,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-blue-300',
        },
        {
            id: 5,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-purple-300',
        },
    ];

    return (
        <section className="bg-background w-full px-4 py-8" id="mentor-section">
            <div className="mx-auto max-w-7xl">
                <h2 className="mx-auto mb-4 max-w-4xl text-center text-3xl font-semibold md:text-4xl">
                    Mentor terbaik dari industri untuk memastikan pembelajaranmu relevan dan impactful.
                </h2>
                <p className="text-muted-foreground mb-12 text-center">Ilmu real dari para expert industri.</p>

                <div className="relative">
                    <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r to-transparent" />
                    <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l to-transparent" />

                    <InfiniteSlider speedOnHover={20} gap={24} className="p-4">
                        {mentors.map((mentor) => (
                            <div
                                key={mentor.id}
                                className="group relative h-[240px] w-[180px] flex-shrink-0 overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-4 hover:shadow-xl md:h-[300px] md:w-[240px]"
                            >
                                <div className={`absolute inset-0 ${mentor.bgColor}`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                </div>

                                <div className="absolute inset-0 flex items-end justify-center">
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="h-full w-full object-cover object-center grayscale transition-all duration-500 group-hover:grayscale-0"
                                    />
                                </div>

                                <div className="absolute inset-x-0 bottom-0 flex w-full flex-col items-center justify-end p-2 text-center">
                                    <div className="rounded-2xl border border-white/30 bg-white/20 p-2 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-white/30">
                                        <h3 className="mb-1 text-sm font-bold text-white drop-shadow-lg md:text-base">{mentor.name}</h3>
                                        <p className="text-xs text-white/90 drop-shadow-md md:text-sm">{mentor.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteSlider>
                </div>
            </div>
        </section>
    );
}
