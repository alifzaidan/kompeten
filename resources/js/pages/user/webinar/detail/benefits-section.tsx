import { BadgeCheck } from 'lucide-react';

interface Webinar {
    benefits?: string | null;
}

interface ParsedBenefits {
    heading: string | null;
    items: string[];
}

function parseList(items?: string | null): ParsedBenefits {
    if (!items) return { heading: null, items: [] };

    const raw = String(items).trim();
    if (!raw) return { heading: null, items: [] };

    const liMatches = raw.match(/<li[^>]*>[\s\S]*?<\/li>/gi);
    if (liMatches?.length) {
        return {
            heading: null,
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
    let itemLines = lines;

    if (lines.length >= 2) {
        const first = lines[0].toLowerCase();
        const looksLikeHeading = (first.includes('benefit') || first.includes('manfaat')) && first.endsWith('.');
        if (looksLikeHeading) {
            heading = lines[0];
            itemLines = lines.slice(1);
        }
    }

    return { heading, items: itemLines };
}

export default function BenefitsSection({ webinar }: { webinar: Webinar }) {
    const { heading, items } = parseList(webinar.benefits);

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6 dark:bg-neutral-900">
                {heading ? (
                    <h2 className="mb-6 text-center text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">{heading}</h2>
                ) : (
                    <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Manfaat yang didapatkan</h2>
                )}
                <ul className="space-y-2">
                    {items.map((benefit, idx) => (
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
