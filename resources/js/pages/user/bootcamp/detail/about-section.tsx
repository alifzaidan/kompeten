interface Bootcamp {
    description?: string | null;
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

    // If curriculum contains <li> items, extract them (supports attributes and newlines).
    const liRegex = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
    const items: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = liRegex.exec(curriculum)) !== null) {
        const text = stripHtmlTags(match[1]).trim();
        if (text) items.push(text);
    }
    if (items.length) return items;

    // Fallback: treat as plain text separated by new lines.
    const asText = stripHtmlTags(curriculum);
    if (!asText) return [];
    return asText
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
}

export default function AboutSection({ bootcamp }: { bootcamp: Bootcamp }) {
    const hasHtmlList = /<(ol|ul)\b/i.test(bootcamp.curriculum || '');
    const curriculumItems = hasHtmlList ? [] : parseCurriculumItems(bootcamp.curriculum);

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <div
                    className="prose md:prose-lg max-w-none text-neutral-700 dark:text-neutral-300"
                    dangerouslySetInnerHTML={{ __html: bootcamp.description || '<p>Deskripsi tidak tersedia.</p>' }}
                ></div>
            </div>
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Materi yang akan kamu pelajari</h2>

                {hasHtmlList ? (
                    <div
                        className="prose md:prose-lg max-w-none text-neutral-700 dark:text-neutral-300"
                        dangerouslySetInnerHTML={{ __html: bootcamp.curriculum || '<p>Materi belum tersedia.</p>' }}
                    />
                ) : curriculumItems.length ? (
                    <ol className="list-decimal space-y-2 pl-5 text-neutral-800 md:columns-2 dark:text-neutral-200">
                        {curriculumItems.map((item, idx) => (
                            <li key={idx} className="break-inside-avoid">
                                {item}
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="text-center text-neutral-700 dark:text-neutral-300">Materi belum tersedia.</p>
                )}
            </div>
        </section>
    );
}
