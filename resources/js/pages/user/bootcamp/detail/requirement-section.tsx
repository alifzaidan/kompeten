import { BadgeCheck } from 'lucide-react';

interface Bootcamp {
    benefits?: string | null;
    requirements?: string | null;
}

type ParsedRichText = {
    heading: string | null;
    items: string[];
};

function parseList(items?: string | null): ParsedRichText {
    if (!items) return { heading: null, items: [] };

    const raw = String(items).trim();
    if (!raw) return { heading: null, items: [] };

    const liMatches = raw.match(/<li[^>]*>[\s\S]*?<\/li>/gi);
    const normalized = raw
        .replace(/<br\s*\/?\s*>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<\/div>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/\r\n?/g, '\n');

    const lines = normalized
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => s.replace(/^[-*•–—\u2022]+\s+/, '').trim())
        .filter(Boolean);

    let heading: string | null = null;
    if (lines.length >= 2) {
        const first = lines[0].toLowerCase();
        const looksLikeHeading =
            (first.includes('benefit') ||
                first.includes('manfaat') ||
                first.includes('requirement') ||
                first.includes('persyaratan') ||
                first.includes('syarat')) &&
            first.endsWith('.');
        if (looksLikeHeading) {
            heading = lines[0];
        }
    }

    if (liMatches?.length) {
        return {
            heading,
            items: liMatches
                .map((li) =>
                    li
                        .replace(/<li[^>]*>/gi, '')
                        .replace(/<\/li>/gi, '')
                        .replace(/<br\s*\/?\s*>/gi, '\n')
                        .replace(/<[^>]+>/g, '')
                        .trim(),
                )
                .filter(Boolean),
        };
    }

    const itemLines = heading ? lines.slice(1) : lines;
    return { heading, items: itemLines };
}

export default function RequirementSection({ bootcamp }: { bootcamp: Bootcamp }) {
    const { heading: requirementHeading, items: requirementList } = parseList(bootcamp.requirements);
    const { heading: benefitHeading, items: benefitList } = parseList(bootcamp.benefits);

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">
                    {requirementHeading ?? 'Persyaratan Peserta'}
                </h2>

                <ul className="space-y-2">
                    {requirementList.map((req, idx) => (
                        <li key={idx} className="flex gap-2">
                            <BadgeCheck className="mt-1 min-w-12 text-green-600" />
                            <div>
                                <h4 className="text-lg font-semibold">{req}</h4>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">
                    {benefitHeading ?? 'Manfaat yang Didapatkan'}
                </h2>

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
