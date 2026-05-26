// Key points section: renders terms & scholarship flow (sanitized)

function sanitizeHtml(input?: string | null): string {
    if (!input) return '';
    if (typeof window === 'undefined' || typeof DOMParser === 'undefined') return input;

    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');

    // remove <style> tags
    doc.querySelectorAll('style').forEach((el) => el.remove());

    // remove dangerous attributes from all elements
    const forbiddenAttrs = ['style', 'onload', 'onclick', 'onerror', 'onmouseover', 'onfocus'];
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT);
    let node: Node | null = walker.nextNode();
    while (node) {
        const el = node as Element;
        forbiddenAttrs.forEach((attr) => {
            if (el.hasAttribute && el.hasAttribute(attr)) el.removeAttribute(attr);
        });

        // sanitize href/src that use javascript:
        if (el.hasAttribute && el.hasAttribute('href')) {
            const href = el.getAttribute('href') || '';
            if (href.trim().toLowerCase().startsWith('javascript:')) el.removeAttribute('href');
        }
        if (el.hasAttribute && el.hasAttribute('src')) {
            const src = el.getAttribute('src') || '';
            if (src.trim().toLowerCase().startsWith('javascript:')) el.removeAttribute('src');
        }

        node = walker.nextNode();
    }

    return doc.body.innerHTML;
}

interface Mentor {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
}

interface CertificationProgram {
    description?: string | null;
    benefits?: string | null;
    terms_conditions?: string | null;
    scholarship_flow?: string | null;
    type: 'regular' | 'scholarship';
    mentors: Mentor[];
}

export default function KeyPointsSection({ program }: { program: CertificationProgram }) {
    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            {program.terms_conditions && (
                <div className="rounded-2xl bg-neutral-100 p-6">
                    <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">
                        Syarat & Ketentuan
                    </h2>
                    <div
                        className="prose md:prose-lg max-w-none text-neutral-700"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(program.terms_conditions) }}
                    />
                </div>
            )}

            {program.type === 'scholarship' && program.scholarship_flow && (
                <div className="rounded-2xl bg-neutral-100 p-6">
                    <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">
                        Alur Beasiswa
                    </h2>
                    <div
                        className="prose md:prose-lg max-w-none text-neutral-700"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(program.scholarship_flow) }}
                    />
                </div>
            )}
        </section>
    );
}
