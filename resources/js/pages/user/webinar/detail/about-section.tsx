interface Webinar {
    description?: string | null;
}

export default function AboutSection({ webinar }: { webinar: Webinar }) {
    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <div
                    className="prose md:prose-lg max-w-none text-neutral-700 dark:text-neutral-300"
                    dangerouslySetInnerHTML={{ __html: webinar.description || '<p>Deskripsi tidak tersedia.</p>' }}
                ></div>
            </div>
            <div className="grid grid-cols-1 gap-8 rounded-2xl bg-neutral-100 p-6 md:grid-cols-3 dark:border-zinc-700 dark:bg-zinc-800">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-3xl font-semibold">Pembicara Ahli</h3>
                    <p className="text-muted-foreground text-center text-sm">
                        Belajar langsung dari para ahli dan praktisi berpengalaman di bidangnya untuk mendapatkan wawasan mendalam.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-3xl font-semibold">Sesi Interaktif</h3>
                    <p className="text-muted-foreground text-center text-sm">
                        Manfaatkan sesi tanya jawab langsung untuk berdiskusi, mengklarifikasi keraguan, dan memperluas pemahaman Anda.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-3xl font-semibold">Wawasan Terkini</h3>
                    <p className="text-muted-foreground text-center text-sm">
                        Dapatkan pemahaman mendalam tentang tren dan teknologi terbaru yang relevan dengan perkembangan karir Anda.
                    </p>
                </div>
            </div>
        </section>
    );
}
