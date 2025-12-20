interface Bundle {
    description?: string | null;
    benefits?: string | null;
}

interface BenefitsSectionProps {
    bundle: Bundle;
}

export default function BenefitsSection({ bundle }: BenefitsSectionProps) {
    if (!bundle.description && !bundle.benefits) {
        return null;
    }

    return (
        <>
            {bundle.benefits && (
                <section className="mx-auto w-full space-y-4 md:p-4">
                    <div className="rounded-2xl bg-neutral-100 p-6">
                        <h2 className="mb-2 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Manfaat Paket Bundling</h2>
                        <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: bundle.benefits }} />
                    </div>
                </section>
            )}
        </>
    );
}
