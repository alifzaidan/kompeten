interface Bundle {
    description?: string | null;
}

export default function AboutSection({ bundle }: { bundle: Bundle }) {
    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <div
                    className="prose md:prose-lg max-w-none text-neutral-700 dark:text-neutral-300"
                    dangerouslySetInnerHTML={{ __html: bundle.description || '<p>Deskripsi tidak tersedia.</p>' }}
                ></div>
            </div>
        </section>
    );
}
