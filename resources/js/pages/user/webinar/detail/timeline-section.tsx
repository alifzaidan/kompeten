import { Button } from '@/components/ui/button';
import { File } from 'lucide-react';

interface Bootcamp {
    curriculum?: string | null;
}

function stripHtmlTags(input: string): string {
    return input
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/?p>/gi, '\n')
        .replace(/<[^>]*>/g, '')
        .replace(/\n{2,}/g, '\n')
        .trim();
}

function parseCurriculumItems(curriculum?: string | null): string[] {
    if (!curriculum) return [];

    const liRegex = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
    const items: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = liRegex.exec(curriculum)) !== null) {
        const text = stripHtmlTags(match[1]).trim();
        if (text) items.push(text);
    }
    if (items.length) return items;

    const asText = stripHtmlTags(curriculum);
    if (!asText) return [];
    return asText
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
}

export default function TimelineSection({ bootcamp }: { bootcamp: Bootcamp }) {
    const hasHtmlList = /<(ol|ul)\b/i.test(bootcamp.curriculum || '');
    const curriculumItems = hasHtmlList ? [] : parseCurriculumItems(bootcamp.curriculum);

    return (
        <section className="to-primary mt-8 w-full bg-gradient-to-tl from-black px-4">
            <div className="mx-auto my-12 w-full max-w-7xl px-4">
                <h2 className="mx-auto mb-8 max-w-3xl bg-gradient-to-r from-[#71D0F7] via-white to-[#E6834A] bg-clip-text text-center text-3xl font-bold text-transparent italic sm:text-4xl">
                    Materi yang akan kamu pelajari
                </h2>
                {hasHtmlList ? (
                    <div
                        className="prose prose-invert md:prose-lg mx-auto max-w-none"
                        dangerouslySetInnerHTML={{ __html: bootcamp.curriculum || '<p>Materi belum tersedia.</p>' }}
                    />
                ) : curriculumItems.length ? (
                    <ol className="grid list-decimal grid-cols-1 gap-x-20 gap-y-4 pl-6 sm:grid-cols-2 lg:grid-cols-4">
                        {curriculumItems.map((item, idx) => (
                            <li key={idx} className="text-primary-foreground">
                                <div className="flex flex-col items-center">
                                    <Button variant="secondary" className="mb-2 w-fit">
                                        <File />
                                    </Button>
                                    <h3 className="text-center text-xl font-medium">{item}</h3>
                                </div>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="text-primary-foreground text-center">Materi belum tersedia.</p>
                )}
            </div>
        </section>
    );
}
