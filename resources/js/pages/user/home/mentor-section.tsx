import { InfiniteSlider } from '@/components/ui/infinite-slider';

interface Mentor {
    id: number;
    name: string;
    image: string;
    bgColor: string;
}

export default function MentorSection() {
    const mentors: Mentor[] = [
        {
            id: 1,
            name: 'Fikri Zuldareva',
            image: '/assets/images/mentors/Fikri Zuldareva.png',
            bgColor: 'bg-primary',
        },
        {
            id: 2,
            name: 'Alfian Syahawaluna',
            image: '/assets/images/mentors/Alfian Syahawaluna.png',
            bgColor: 'bg-primary',
        },
        {
            id: 3,
            name: 'Vania Frederica',
            image: '/assets/images/mentors/Vania Frederica.png',
            bgColor: 'bg-primary',
        },
        {
            id: 4,
            name: 'Imam Tobroni',
            image: '/assets/images/mentors/Imam Tobroni.png',
            bgColor: 'bg-primary',
        },
        {
            id: 5,
            name: 'Bunga Tiara',
            image: '/assets/images/mentors/Bunga Tiara.png',
            bgColor: 'bg-primary',
        },
        {
            id: 6,
            name: 'Nihayatul Maula Sari',
            image: '/assets/images/mentors/Nihayatul Maula Sari.png',
            bgColor: 'bg-primary',
        },
        {
            id: 7,
            name: 'Fitria Retno Arifiani',
            image: '/assets/images/mentors/Fitria Retno Arifiani.png',
            bgColor: 'bg-primary',
        },
        {
            id: 8,
            name: 'Azizah Ayu Maulida',
            image: '/assets/images/mentors/Azizah Ayu Maulida.png',
            bgColor: 'bg-primary',
        },
        {
            id: 9,
            name: 'Mochammad Angga Hartanto',
            image: '/assets/images/mentors/Mochammad Angga Hartanto.png',
            bgColor: 'bg-primary',
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
                                <div className={`absolute inset-0 ${mentor.bgColor} grayscale transition-all duration-500 group-hover:grayscale-0`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                </div>

                                <div className="absolute inset-0 flex items-start justify-center pt-4">
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="h-full w-full object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
                                    />
                                </div>

                                <div className="absolute inset-x-0 bottom-0 flex w-full flex-col items-center justify-end p-2 text-center">
                                    <div className="rounded-2xl border border-white/30 bg-white/20 p-2 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-white/30">
                                        <h3 className="text-sm font-bold text-white drop-shadow-lg md:text-base">{mentor.name}</h3>
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
