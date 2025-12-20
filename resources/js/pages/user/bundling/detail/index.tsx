import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head } from '@inertiajs/react';
import { BookOpen, Gift, Info, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import AboutSection from './about-section';
import BenefitsSection from './benefits-section';
import BundleItemsSection from './bundle-items-section';
import HeroSection from './hero-section';
import RegisterSection from './register-section';

interface Product {
    id: string;
    title: string;
    slug: string;
    price: number;
}

interface BundleItem {
    id: string;
    bundleable_type: string;
    bundleable_id: string;
    bundleable: Product;
    price: number;
    order: number;
}

interface GroupedItems {
    courses: BundleItem[];
    bootcamps: BundleItem[];
    webinars: BundleItem[];
}

interface Bundle {
    id: string;
    title: string;
    slug: string;
    short_description?: string | null;
    description?: string | null;
    benefits?: string | null;
    thumbnail?: string | null;
    price: number;
    strikethrough_price: number;
    registration_deadline?: string | null;
    registration_url: string;
    status: string;
    bundle_items: BundleItem[];
    bundle_items_count: number;
}

interface BundleDetailProps {
    bundle: Bundle;
    groupedItems: GroupedItems;
    totalOriginalPrice: number;
    discountAmount: number;
    discountPercentage: number;
    relatedBundles: Bundle[];
    hasOwnedItems: boolean;
    ownedItems: Array<{
        id: string;
        title: string;
        type: string;
    }>;
}

export default function BundleDetail({
    bundle,
    groupedItems,
    totalOriginalPrice,
    discountAmount,
    discountPercentage,
    hasOwnedItems,
    ownedItems,
}: BundleDetailProps) {
    const [activeTab, setActiveTab] = useState('paket');

    const handleRegisterClick = () => {
        setActiveTab('informasi_paket');
        setTimeout(() => {
            const tabsElement = document.querySelector('[role="tablist"]');
            if (tabsElement) {
                tabsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <div className="min-h-screen bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat">
            <Head title={`${bundle.title} - Paket Bundling`} />

            <HeroSection bundle={bundle} discountPercentage={discountPercentage} onRegisterClick={handleRegisterClick} />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto w-full max-w-7xl gap-0 px-4 pb-8">
                <div className="overflow-x-auto">
                    <TabsList className="mb-0 flex h-auto w-full min-w-max justify-start gap-0 rounded-none border-b-0 bg-transparent p-0">
                        <TabsTrigger
                            value="paket"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <ShoppingBag className="h-5 w-5" />
                            Isi Paket
                        </TabsTrigger>

                        <TabsTrigger
                            value="tentang"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <BookOpen className="h-5 w-5" />
                            Tentang
                        </TabsTrigger>

                        <TabsTrigger
                            value="manfaat"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <Gift className="h-5 w-5" />
                            Manfaat
                        </TabsTrigger>

                        <TabsTrigger
                            value="informasi_paket"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <Info className="h-5 w-5" />
                            Informasi Paket
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="paket" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <BundleItemsSection bundle={bundle} groupedItems={groupedItems} totalOriginalPrice={totalOriginalPrice} />
                </TabsContent>

                <TabsContent value="tentang" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <AboutSection bundle={bundle} />
                </TabsContent>

                <TabsContent value="manfaat" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <BenefitsSection bundle={bundle} />
                </TabsContent>

                <TabsContent value="informasi_paket" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <RegisterSection
                        bundle={bundle}
                        totalOriginalPrice={totalOriginalPrice}
                        discountAmount={discountAmount}
                        discountPercentage={discountPercentage}
                        hasOwnedItems={hasOwnedItems}
                        ownedItems={ownedItems}
                    />
                </TabsContent>
            </Tabs>

            {/* <div className="mx-auto max-w-7xl px-4 pb-8">
                <RelatedBundles relatedBundles={relatedBundles} />
            </div> */}
        </div>
    );
}
