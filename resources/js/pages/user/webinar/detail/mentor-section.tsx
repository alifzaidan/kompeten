import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { Link } from '@inertiajs/react';
import { Star, User } from 'lucide-react';

interface Webinar {
    user?: {
        id: string;
        name: string;
        bio?: string;
        avatar?: string;
    };
}

export default function MentorSection({ webinar }: { webinar: Webinar }) {
    const getInitials = useInitials();

    if (!webinar.user) {
        return null;
    }

    const mentor = webinar.user;
    const isAdmin = mentor.name === 'Admin';

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Dibimbing oleh expert</h2>

                <div className="flex flex-col items-center justify-center gap-2">
                    {mentor.avatar ? (
                        <Avatar className="ring-primary h-20 w-20 ring-4 md:h-24 md:w-24">
                            <AvatarImage src={mentor.avatar} alt={mentor.name} />
                            <AvatarFallback className="bg-secondary text-primary-foreground text-3xl font-bold md:text-4xl">
                                {getInitials(mentor.name)}
                            </AvatarFallback>
                        </Avatar>
                    ) : (
                        <div className="rounded-full bg-gray-200 p-4">
                            <User className="h-10 w-10 text-gray-500" />
                        </div>
                    )}

                    {isAdmin ? (
                        <div className="flex flex-col items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{mentor.name}</h3>
                            <p className="mb-2 text-center text-sm text-gray-600 dark:text-gray-400">{mentor.bio}</p>
                        </div>
                    ) : (
                        <Link href={`/mentor/${mentor.id}`} className="group flex flex-col items-center justify-between transition-colors">
                            <h3 className="group-hover:text-primary-foreground text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {mentor.name}
                            </h3>
                            <p className="group-hover:text-primary-foreground mb-2 text-center text-sm text-gray-600 dark:text-gray-400">
                                {mentor.bio}
                            </p>
                        </Link>
                    )}

                    <div className="flex items-center justify-center">
                        <div className="flex items-center gap-2">
                            <Star size={18} className="text-yellow-500" fill="currentColor" />
                            <Star size={18} className="text-yellow-500" fill="currentColor" />
                            <Star size={18} className="text-yellow-500" fill="currentColor" />
                            <Star size={18} className="text-yellow-500" fill="currentColor" />
                            <Star size={18} className="text-yellow-500" fill="currentColor" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
