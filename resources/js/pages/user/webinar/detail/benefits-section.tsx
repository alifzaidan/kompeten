import { BadgeCheck } from 'lucide-react';

interface Webinar {
    benefits?: string | null;
}

function parseList(items?: string | null): string[] {
    if (!items) return [];

    const raw = String(items).trim();
    if (!raw) return [];

    const liMatches = raw.match(/<li[^>]*>[\s\S]*?<\/li>/gi);
    if (liMatches?.length) {
        return liMatches
            .map((li) =>
                li
                    .replace(/<li[^>]*>/gi, '')
                    .replace(/<\/li>/gi, '')
                    .replace(/<br\s*\/?\s*>/gi, '\n')
                    .replace(/<[^>]+>/g, '')
                    .trim(),
            )
            .filter(Boolean);
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

    if (lines.length >= 2) {
        const first = lines[0].toLowerCase();
        const looksLikeHeading = (first.includes('benefit') || first.includes('manfaat')) && first.endsWith('.');
        if (looksLikeHeading) {
            return lines.slice(1);
        }
    }

    return lines;
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
