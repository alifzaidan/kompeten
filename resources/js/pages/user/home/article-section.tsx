import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ArrowRight, Calendar } from 'lucide-react';

interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: string;
    is_featured: boolean;
    category: {
        id: string;
        name: string;
    };
    published_at: string;
}

interface ArticleSectionProps {
    articles: Article[];
}

export default function ArticleSection({ articles }: ArticleSectionProps) {
    if (!articles || articles.length === 0) {
        return null;
    }

    const featuredArticles = articles.filter((article) => article.is_featured);
    const nonFeaturedArticles = articles.filter((article) => !article.is_featured);

    const article1 = featuredArticles[0] || nonFeaturedArticles[0];
    const article2 = featuredArticles[1] || nonFeaturedArticles[1];

    let remainingArticles = [...nonFeaturedArticles];

    if (article1) {
        remainingArticles = remainingArticles.filter((a) => a.id !== article1.id);
    }
    if (article2) {
        remainingArticles = remainingArticles.filter((a) => a.id !== article2.id);
    }

    const article3 = remainingArticles[0];
    const article4 = remainingArticles[1];
    const article5 = remainingArticles[2];
    const article6 = remainingArticles[3];

    const displayArticles = [article1, article2, article3, article4, article5, article6].map((article, index) => {
        if (!article) {
            return {
                id: `placeholder-${index}`,
                title: 'Artikel Segera Hadir',
                slug: '#',
                excerpt: 'Nantikan artikel menarik lainnya dari kami',
                thumbnail: '',
                is_featured: false,
                category: { id: '', name: 'Umum' },
                published_at: new Date().toISOString(),
            };
        }
        return article;
    });

    const [displayArticle1, displayArticle2, displayArticle3, displayArticle4, displayArticle5, displayArticle6] = displayArticles;

    return (
        <section className="mx-auto mb-4 w-full max-w-7xl p-4 sm:mb-8">
            <div className="mb-8 text-center">
                <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                    Artikel & <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Insights</span>
                </h2>
                <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                    Temukan inspirasi, tips, dan panduan lengkap seputar pembelajaran dan teknologi terkini
                </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-12">
                <div className="col-span-12 grid grid-cols-2 gap-4 lg:col-span-9 lg:grid-cols-9">
                    {/* Article 1 - Large (Featured Priority) */}
                    <Link
                        href={displayArticle1.slug !== '#' ? `/article/${displayArticle1.slug}` : '#'}
                        className="group relative col-span-12 h-[400px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-4"
                    >
                        {displayArticle1.thumbnail && (
                            <img
                                src={`/storage/${displayArticle1.thumbnail}`}
                                alt={displayArticle1.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="mb-3 inline-block rounded-lg border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {displayArticle1.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{displayArticle1.title}</h3>
                            <p className="mb-3 line-clamp-2 text-sm text-white/90">{displayArticle1.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3.5 w-3.5" />
                                {format(new Date(displayArticle1.published_at), 'dd MMMM yyyy', { locale: id })}
                            </div>
                        </div>
                    </Link>

                    {/* Article 2 - Large (Featured Priority) */}
                    <Link
                        href={displayArticle2.slug !== '#' ? `/article/${displayArticle2.slug}` : '#'}
                        className="group relative col-span-12 h-[400px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-5"
                    >
                        {displayArticle2.thumbnail && (
                            <img
                                src={`/storage/${displayArticle2.thumbnail}`}
                                alt={displayArticle2.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="mb-3 inline-block rounded-lg border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {displayArticle2.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{displayArticle2.title}</h3>
                            <p className="mb-3 line-clamp-2 text-sm text-white/90">{displayArticle2.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3.5 w-3.5" />
                                {format(new Date(displayArticle2.published_at), 'dd MMMM yyyy', { locale: id })}
                            </div>
                        </div>
                    </Link>

                    {/* Article 4 - Medium */}
                    <Link
                        href={displayArticle4.slug !== '#' ? `/article/${displayArticle4.slug}` : '#'}
                        className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-3"
                    >
                        {displayArticle4.thumbnail && (
                            <img
                                src={`/storage/${displayArticle4.thumbnail}`}
                                alt={displayArticle4.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                            <div className="mb-2 inline-block rounded-lg border border-white/30 bg-white/20 px-2.5 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {displayArticle4.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{displayArticle4.title}</h3>
                            <p className="mb-2 line-clamp-2 text-sm text-white/90">{displayArticle4.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(displayArticle4.published_at), 'dd MMM yyyy', { locale: id })}
                            </div>
                        </div>
                    </Link>

                    {/* Article 5 - Medium */}
                    <Link
                        href={displayArticle5.slug !== '#' ? `/article/${displayArticle5.slug}` : '#'}
                        className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-6"
                    >
                        {displayArticle5.thumbnail && (
                            <img
                                src={`/storage/${displayArticle5.thumbnail}`}
                                alt={displayArticle5.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="mb-3 inline-block rounded-lg border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {displayArticle5.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{displayArticle5.title}</h3>
                            <p className="mb-3 line-clamp-2 text-sm text-white/90">{displayArticle5.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3.5 w-3.5" />
                                {format(new Date(displayArticle5.published_at), 'dd MMMM yyyy', { locale: id })}
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-span-12 grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-1">
                    {/* Article 3 - Tall */}
                    <Link
                        href={displayArticle3.slug !== '#' ? `/article/${displayArticle3.slug}` : '#'}
                        className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-3"
                    >
                        {displayArticle3.thumbnail && (
                            <img
                                src={`/storage/${displayArticle3.thumbnail}`}
                                alt={displayArticle3.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                            <div className="mb-2 inline-block rounded-lg border border-white/30 bg-white/20 px-2.5 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {displayArticle3.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{displayArticle3.title}</h3>
                            <p className="mb-2 line-clamp-2 text-sm text-white/90">{displayArticle3.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(displayArticle3.published_at), 'dd MMM yyyy', { locale: id })}
                            </div>
                        </div>
                    </Link>

                    {/* Article 6 - Tall */}
                    <Link
                        href={displayArticle6.slug !== '#' ? `/article/${displayArticle6.slug}` : '#'}
                        className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-3 lg:h-[400px]"
                    >
                        {displayArticle6.thumbnail && (
                            <img
                                src={`/storage/${displayArticle6.thumbnail}`}
                                alt={displayArticle6.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="mb-3 inline-block rounded-lg border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {displayArticle6.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{displayArticle6.title}</h3>
                            <p className="mb-3 line-clamp-2 text-sm text-white/90">{displayArticle6.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3.5 w-3.5" />
                                {format(new Date(displayArticle6.published_at), 'dd MMMM yyyy', { locale: id })}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* View All Button */}
            <div className="mt-8 text-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    <Link href="/article">
                        Lihat Semua Artikel
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>
    );
}
