import { BadgeCheck } from 'lucide-react';

interface Webinar {
    benefits?: string | null;
}

function parseList(items?: string | null): string[] {
    if (!items) return [];
    const matches = items.match(/<li>(.*?)<\/li>/g);
    if (!matches) return [];
    return matches.map((li) => li.replace(/<\/?li>/g, '').trim());
}

export default function BenefitsSection({ webinar }: { webinar: Webinar }) {
    const benefitList = parseList(webinar.benefits);

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Manfaat yang didapatkan</h2>
                <ul className="space-y-2">
                    {benefitList.map((benefit, idx) => (
                        <li key={idx} className="flex gap-2">
                            <BadgeCheck className="mt-1 min-w-12 text-green-600" />
                            <div>
                                <h4 className="text-lg font-semibold">{benefit}</h4>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
