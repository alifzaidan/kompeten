import { BadgeCheck } from 'lucide-react';

interface Course {
    title: string;
    key_points?: string | null;
    images?: { image_url: string }[];
}

function parseList(items?: string | null): string[] {
    if (!items) return [];
    const matches = items.match(/<li>(.*?)<\/li>/g);
    if (!matches) return [];
    return matches.map((li) => li.replace(/<\/?li>/g, '').trim());
}

export default function KeyPointSection({ course }: { course: Course }) {
    const keyPoints = parseList(course.key_points);

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Mengapa memilih Kelas ini?</h2>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {keyPoints.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <BadgeCheck className="mt-1 min-w-12 text-green-600" />
                            <p>{req}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {course.images && course.images.length > 0 && (
                <div className="rounded-2xl bg-neutral-100 p-6">
                    <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Preview Kelas</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {course.images?.map((image, index) => (
                            <img
                                key={index}
                                src={image.image_url ? `/storage/${image.image_url}` : '/assets/images/placeholder.png'}
                                alt={course.title}
                                className="aspect-video rounded-lg border border-gray-200 object-cover shadow-md"
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
