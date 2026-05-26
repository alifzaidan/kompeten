import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { User } from 'lucide-react';

interface Mentor {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
}

interface CertificationProgram {
    mentors?: Mentor[];
}

export default function MentorSection({ program }: { program: CertificationProgram }) {
    const getInitials = useInitials();

    if (!program.mentors || program.mentors.length === 0) {
        return null;
    }

    const mentors = program.mentors;
    const isSingleMentor = mentors.length === 1;
    const isTwoMentors = mentors.length === 2;

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Dibimbing oleh expert</h2>

                <div
                    className={`${
                        isSingleMentor
                            ? 'flex justify-center'
                            : isTwoMentors
                              ? 'mx-auto grid max-w-4xl gap-6 sm:grid-cols-2'
                              : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                    }`}
                >
                    {mentors.map((mentor) => (
                        <div
                            key={mentor.id}
                            className={`flex flex-col items-center justify-center gap-2 rounded-xl bg-white/40 p-4 dark:bg-zinc-800/40 ${
                                isSingleMentor ? 'w-full max-w-sm' : 'w-full'
                            }`}
                        >
                            {mentor.avatar ? (
                                <Avatar className="ring-primary h-20 w-20 ring-4 md:h-24 md:w-24">
                                    <AvatarImage src={`/storage/${mentor.avatar}`} alt={mentor.name} className="object-cover" />
                                    <AvatarFallback className="bg-secondary text-primary-foreground text-3xl font-bold md:text-4xl">
                                        {getInitials(mentor.name)}
                                    </AvatarFallback>
                                </Avatar>
                            ) : (
                                <div className="rounded-full bg-gray-200 p-4">
                                    <User className="h-10 w-10 text-gray-500" />
                                </div>
                            )}

                            <div className="flex flex-col items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{mentor.name}</h3>
                                <p className="mb-2 text-center text-sm text-gray-600 dark:text-gray-400">{mentor.bio}</p>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-yellow-500">★</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
