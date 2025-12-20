import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UserLayout from '@/layouts/user-layout';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ArrowRight, BookOpen, Calendar, Clock, Eye, Search, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Category {
    id: string;
    name: string;
    articles_count: number;
}

interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    thumbnail?: string;
    category: {
        id: string;
        name: string;
    };
    user: {
        id: string;
        name: string;
    };
    read_time: number;
    views: number;
    published_at: string;
}

interface PopularArticle {
    id: string;
    title: string;
    slug: string;
    views: number;
    thumbnail?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface ArticleIndexProps {
    articles: {
        data: Article[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
    };
    categories: Category[];
    popularArticles: PopularArticle[];
    filters: {
        category?: string;
        sort?: string;
    };
}

export default function ArticleIndex({ articles, categories, popularArticles, filters }: ArticleIndexProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>(filters.category || '');
    const [sortBy, setSortBy] = useState<string>(filters.sort || 'latest');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleFilter = (category: string) => {
        setSelectedCategory(category);
        router.get(
            '/article',
            { category: category || undefined, sort: sortBy },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleSort = (sort: string) => {
        setSortBy(sort);
        router.get(
            '/article',
            { category: selectedCategory || undefined, sort },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <UserLayout>
            <Head title="Artikel" />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-16">
                <div className="relative mx-auto max-w-7xl px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-primary-foreground mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg"
                        >
                            <BookOpen className="h-4 w-4" />
                            Knowledge Hub
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-4 text-4xl font-black text-gray-900 md:text-6xl dark:text-white"
                        >
                            Artikel & <span className="bg-primary-foreground bg-clip-text text-transparent">Insights</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
                        >
                            Temukan inspirasi, tips, dan panduan lengkap seputar pembelajaran dan teknologi terkini
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mx-auto max-w-2xl"
                        >
                            <div className="relative">
                                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Cari artikel yang kamu butuhkan..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-14 rounded-full border-2 pr-4 pl-12 text-base shadow-lg"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Sidebar */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Sort Dropdown (Mobile) */}
                        <div className="lg:hidden">
                            <Select value={sortBy} onValueChange={handleSort}>
                                <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Urutkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="latest">Terbaru</SelectItem>
                                    <SelectItem value="popular">Paling Populer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Categories Filter */}
                        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:bg-gray-800">
                            <div className="bg-primary-foreground border-b p-4">
                                <h3 className="font-semibold text-white">Kategori Artikel</h3>
                            </div>
                            <div className="p-4">
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleFilter('')}
                                        className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors ${
                                            !selectedCategory
                                                ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <span className="font-medium">Semua Kategori</span>
                                        <Badge variant="secondary" className="ml-2">
                                            {categories.reduce((sum, cat) => sum + cat.articles_count, 0)}
                                        </Badge>
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleFilter(category.id)}
                                            className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors ${
                                                selectedCategory === category.id
                                                    ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20'
                                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <span className="font-medium">{category.name}</span>
                                            <Badge variant="secondary" className="ml-2">
                                                {category.articles_count}
                                            </Badge>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Popular Articles */}
                        <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-orange-50 to-white shadow-sm dark:from-gray-800 dark:to-gray-900">
                            <div className="bg-primary-foreground border-b p-4">
                                <div className="flex items-center gap-2 text-white">
                                    <TrendingUp className="h-5 w-5" />
                                    <h3 className="font-semibold">Trending Now</h3>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="space-y-3">
                                    {popularArticles.map((article, index) => (
                                        <Link
                                            key={article.id}
                                            href={`/article/${article.slug}`}
                                            className="group flex items-start gap-3 rounded-xl border bg-white p-3 transition-all hover:shadow-md dark:bg-gray-800"
                                        >
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white shadow-lg">
                                                {index + 1}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="mb-1 line-clamp-2 text-sm font-semibold group-hover:text-orange-600">{article.title}</p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Eye className="h-3 w-3" />
                                                    {article.views.toLocaleString()} views
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Articles Grid */}
                    <div className="lg:col-span-3">
                        {/* Sort Options (Desktop) */}
                        <div className="mb-8 hidden items-center justify-between lg:flex">
                            <div>
                                <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Menampilkan {articles.data.length} artikel</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={sortBy === 'latest' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleSort('latest')}
                                    className={sortBy === 'latest' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                                >
                                    <Clock className="mr-2 h-4 w-4" />
                                    Terbaru
                                </Button>
                                <Button
                                    variant={sortBy === 'popular' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleSort('popular')}
                                    className={sortBy === 'popular' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                                >
                                    <TrendingUp className="mr-2 h-4 w-4" />
                                    Populer
                                </Button>
                            </div>
                        </div>

                        {articles.data.length > 0 ? (
                            <>
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {articles.data.map((article, index) => (
                                        <motion.div
                                            key={article.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                        >
                                            <Link href={`/article/${article.slug}`} className="group block h-full">
                                                <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800">
                                                    <div className="relative aspect-video overflow-hidden">
                                                        <img
                                                            src={
                                                                article.thumbnail ? `/storage/${article.thumbnail}` : '/assets/images/placeholder.png'
                                                            }
                                                            alt={article.title}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                        <div className="absolute bottom-3 left-3">
                                                            <Badge className="bg-white/95 text-gray-900 backdrop-blur-sm hover:bg-white">
                                                                {article.category.name}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-1 flex-col p-5">
                                                        <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900 group-hover:text-orange-600 dark:text-white">
                                                            {article.title}
                                                        </h3>

                                                        {article.excerpt && (
                                                            <p className="mb-4 line-clamp-2 flex-1 text-sm text-gray-600 dark:text-gray-400">
                                                                {article.excerpt}
                                                            </p>
                                                        )}

                                                        <div className="mt-auto border-t pt-3">
                                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex items-center gap-1">
                                                                        <Clock className="h-3.5 w-3.5" />
                                                                        {article.read_time} min
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Eye className="h-3.5 w-3.5" />
                                                                        {article.views}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <Calendar className="h-3.5 w-3.5" />
                                                                    {format(new Date(article.published_at), 'dd MMM', { locale: id })}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-3 flex items-center text-sm font-medium text-orange-600 opacity-0 transition-opacity group-hover:opacity-100">
                                                            Baca Selengkapnya
                                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {articles.last_page > 1 && (
                                    <div className="mt-12 flex justify-center gap-2">
                                        {articles.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.visit(link.url)}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className={link.active ? 'bg-orange-500 hover:bg-orange-600' : ''}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-gray-50 dark:bg-gray-800">
                                <BookOpen className="mb-4 h-16 w-16 text-gray-300" />
                                <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Artikel tidak ditemukan</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Coba ubah filter atau kategori</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
