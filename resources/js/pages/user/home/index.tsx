import PromotionPopup from '@/components/promotion-popup';
import UserLayout from '@/layouts/user-layout';
import { Head } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import AboutSection from './about-section';
import ArticleSection from './article-section';
import FaqSection from './faq-section';
import HeroSection from './hero-section';
import LatestProductsSection from './latest-products-section';
import MentorSection from './mentor-section';
import TestimonySection from './testimony-section';
import ToolsSection from './tools-section';

interface Tool {
    id: string;
    name: string;
    description: string;
    icon: string;
}

interface Category {
    id: string;
    name: string;
}

interface Product {
    id: string;
    title: string;
    thumbnail: string;
    slug: string;
    strikethrough_price: number;
    price: number;
    level?: 'beginner' | 'intermediate' | 'advanced';
    start_date?: string;
    end_date?: string;
    start_time?: string;
    registration_deadline?: string;
    duration_days?: number;
    bundle_url?: string;
    category?: Category;
    type: 'course' | 'bootcamp' | 'webinar' | 'bundle' | 'partnership';
    created_at: string;
}

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

interface MyProductIds {
    courses: string[];
    bootcamps: string[];
    webinars: string[];
    bundles: string[];
    partnerships: string[];
}

interface ReferralInfo {
    code?: string;
    hasActive: boolean;
}

interface Promotion {
    id: string;
    promotion_flyer: string;
    start_date: string;
    end_date: string;
    url_redirect?: string;
    is_active: boolean;
}

interface HomeProps {
    tools: Tool[];
    latestProducts: Product[];
    latestArticles: Article[];
    myProductIds: MyProductIds;
    allProducts: Array<{
        id: string;
        title: string;
        type: 'course' | 'bootcamp' | 'webinar';
        price: number;
    }>;
    activePromotion?: Promotion | null;
    referralInfo: ReferralInfo;
}

export default function Home({ tools, latestProducts, latestArticles, myProductIds, activePromotion, referralInfo }: HomeProps) {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const refFromUrl = urlParams.get('ref');

        if (refFromUrl) {
            sessionStorage.setItem('referral_code', refFromUrl);
        } else if (referralInfo.code) {
            sessionStorage.setItem('referral_code', referralInfo.code);
        }
    }, [referralInfo]);

    return (
        <UserLayout>
            <Head title="Beranda" />

            {activePromotion && <PromotionPopup promotion={activePromotion} suppressDuration={3} />}

            <HeroSection />
            <AboutSection />
            <ToolsSection tools={tools} />
            <LatestProductsSection latestProducts={latestProducts} myProductIds={myProductIds} />
            <MentorSection />
            <TestimonySection />
            <ArticleSection articles={latestArticles} />
            <FaqSection />

            <a
                href="https://wa.me/+6289528514480?text=Halo%20Admin%Kompeten,%20saya%20ingin%20bertanya%20tentang%20kelas%20online."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-primary/80 fixed right-4 bottom-18 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition duration-1000 md:right-8 lg:bottom-6"
                aria-label="Chat WhatsApp"
            >
                <MessageCircle className="text-primary-foreground h-6 w-6" />
            </a>
        </UserLayout>
    );
}
