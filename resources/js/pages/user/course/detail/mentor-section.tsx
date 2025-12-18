import { Link } from '@inertiajs/react';
import { Star, User } from 'lucide-react';

interface Course {
    user?: { id: string; name: string; bio: string | null };
}

export default function MentorSection({ course }: { course: Course }) {
    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Dibimbing oleh expert</h2>
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="rounded-full bg-gray-200 p-4">
                        <User className="h-10 w-10 text-gray-500" />
                    </div>
                    {course.user?.name === 'Admin' ? (
                        <div className="flex flex-col items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{course.user?.name}</h3>
                            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{course.user?.bio}</p>
                        </div>
                    ) : (
                        <Link href={`/mentor/${course.user?.id}`} className="flex flex-col items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{course.user?.name}</h3>
                            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{course.user?.bio}</p>
                        </Link>
                    )}
                    <div className="flex items-center justify-between">
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
