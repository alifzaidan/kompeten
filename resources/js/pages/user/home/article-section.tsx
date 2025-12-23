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

    // Ensure we have at least 6 articles, fill with placeholders if needed
    const displayArticles = [...articles];
    while (displayArticles.length < 6) {
        displayArticles.push({
            id: `placeholder-${displayArticles.length}`,
            title: 'Artikel Segera Hadir',
            slug: '#',
            excerpt: 'Nantikan artikel menarik lainnya dari kami',
            thumbnail: '',
            category: { id: '', name: 'Umum' },
            published_at: new Date().toISOString(),
        });
    }

    const [article1, article2, article3, article4, article5, article6] = displayArticles;

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
                    {/* Article 1 - Large */}
                    <Link
                        href={article1.slug !== '#' ? `/article/${article1.slug}` : '#'}
                        className="group relative col-span-12 h-[400px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-4"
                    >
                        {article1.thumbnail && (
                            <img
                                src={`/storage/${article1.thumbnail}`}
                                alt={article1.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="mb-3 inline-block rounded-lg border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {article1.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{article1.title}</h3>
                            <p className="mb-3 line-clamp-2 text-sm text-white/90">{article1.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3.5 w-3.5" />
                                {format(new Date(article1.published_at), 'dd MMMM yyyy', { locale: id })}
                            </div>
                        </div>
                    </Link>

                    {/* Article 2 - Large */}
                    <Link
                        href={article2.slug !== '#' ? `/article/${article2.slug}` : '#'}
                        className="group relative col-span-12 h-[400px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-5"
                    >
                        {article2.thumbnail && (
                            <img
                                src={`/storage/${article2.thumbnail}`}
                                alt={article2.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="mb-3 inline-block rounded-lg border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {article2.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{article2.title}</h3>
                            <p className="mb-3 line-clamp-2 text-sm text-white/90">{article2.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3.5 w-3.5" />
                                {format(new Date(article2.published_at), 'dd MMMM yyyy', { locale: id })}
                            </div>
                        </div>
                    </Link>

                    {/* Article 4 - Medium */}
                    <Link
                        href={article4.slug !== '#' ? `/article/${article4.slug}` : '#'}
                        className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-3"
                    >
                        {article4.thumbnail && (
                            <img
                                src={`/storage/${article4.thumbnail}`}
                                alt={article4.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                            <div className="mb-2 inline-block rounded-lg border border-white/30 bg-white/20 px-2.5 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {article4.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{article4.title}</h3>
                            <p className="mb-2 line-clamp-2 text-sm text-white/90">{article4.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(article4.published_at), 'dd MMM yyyy', { locale: id })}
                            </div>
                        </div>
                    </Link>

                    {/* Article 5 - Medium */}
                    <Link
                        href={article5.slug !== '#' ? `/article/${article5.slug}` : '#'}
                        className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-6"
                    >
                        {article5.thumbnail && (
                            <img
                                src={`/storage/${article5.thumbnail}`}
                                alt={article5.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="mb-3 inline-block rounded-lg border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {article5.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{article5.title}</h3>
                            <p className="mb-3 line-clamp-2 text-sm text-white/90">{article5.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3.5 w-3.5" />
                                {format(new Date(article5.published_at), 'dd MMMM yyyy', { locale: id })}
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-span-12 grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-1">
                    {/* Article 3 - Tall */}
                    <Link
                        href={article3.slug !== '#' ? `/article/${article3.slug}` : '#'}
                        className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-3"
                    >
                        {article3.thumbnail && (
                            <img
                                src={`/storage/${article3.thumbnail}`}
                                alt={article3.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                            <div className="mb-2 inline-block rounded-lg border border-white/30 bg-white/20 px-2.5 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {article3.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{article3.title}</h3>
                            <p className="mb-2 line-clamp-2 text-sm text-white/90">{article3.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(article3.published_at), 'dd MMM yyyy', { locale: id })}
                            </div>
                        </div>
                    </Link>

                    {/* Article 6 - Tall */}
                    <Link
                        href={article6.slug !== '#' ? `/article/${article6.slug}` : '#'}
                        className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-3 lg:h-[400px]"
                    >
                        {article6.thumbnail && (
                            <img
                                src={`/storage/${article6.thumbnail}`}
                                alt={article6.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="mb-3 inline-block rounded-lg border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                {article6.category.name}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{article6.title}</h3>
                            <p className="mb-3 line-clamp-2 text-sm text-white/90">{article6.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-white/80">
                                <Calendar className="h-3.5 w-3.5" />
                                {format(new Date(article6.published_at), 'dd MMMM yyyy', { locale: id })}
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
