interface Webinar {
    tools?: { name: string; description?: string | null; icon: string | null }[];
}

export default function ToolsSection({ webinar }: { webinar: Webinar }) {
    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Tools yang digunakan</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {webinar.tools?.map((tool) => (
                        <div
                            key={tool.name}
                            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 shadow-md dark:bg-neutral-800"
                        >
                            <img src={tool.icon ? `/storage/${tool.icon}` : '/assets/images/placeholder.png'} alt={tool.name} className="w-16" />
                            <h3 className="text-lg font-semibold md:text-xl">{tool.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
