interface Bootcamp {
    description?: string | null;
    curriculum?: string | null;
}

function parseCurriculum(curriculum?: string | null): string[] {
    if (!curriculum) return [];
    const matches = curriculum.match(/<li>(.*?)<\/li>/g);
    if (!matches) return [];
    return matches.map((li) => li.replace(/<\/?li>/g, '').trim());
}

export default function AboutSection({ bootcamp }: { bootcamp: Bootcamp }) {
    const curriculumList = parseCurriculum(bootcamp.curriculum);

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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {curriculumList.map((curriculum, idx) => (
                        <div
                            key={idx}
                            className="bg-secondary border-primary-foreground flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4"
                        >
                            <h3 className="text-primary-foreground text-center text-xl font-medium">{curriculum}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
