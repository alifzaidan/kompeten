interface PartnershipProduct {
    description?: string | null;
    key_points?: string | null;
}

export default function KeyPointsSection({ partnershipProduct }: { partnershipProduct: PartnershipProduct }) {
    return (
        <>
            {partnershipProduct.key_points && (
                <section className="mx-auto w-full space-y-4 md:p-4">
                    <div className="rounded-2xl bg-neutral-100 p-6">
                        <h2 className="mb-2 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">
                            Poin Penting Sertifikasi Kerjasama
                        </h2>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: partnershipProduct.key_points }} />
                    </div>
                </section>
            )}
        </>
    );
}
