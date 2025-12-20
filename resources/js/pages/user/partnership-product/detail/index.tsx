import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head } from '@inertiajs/react';
import { Award, BookOpen, Calendar, Info } from 'lucide-react';
import { useState } from 'react';
import AboutSection from './about-section';
import HeroSection from './hero-section';
import KeyPointsSection from './key-points-section';
import RegisterSection from './register-section';
import ScheduleInfoSection from './schedule-info-section';

interface PartnershipProduct {
    id: string;
    title: string;
    slug: string;
    category?: { id: string; name: string };
    short_description?: string | null;
    description?: string | null;
    key_points?: string | null;
    thumbnail?: string | null;
    registration_deadline: string;
    duration_days: number;
    schedule_days: string[];
    strikethrough_price: number;
    price: number;
    product_url: string;
    registration_url: string;
    status: string;
    created_at: string | Date;
}

// interface RelatedPartnershipProduct {
//     id: string;
//     title: string;
//     slug: string;
//     thumbnail?: string | null;
//     price: number;
//     strikethrough_price: number;
//     registration_deadline: string;
//     duration_days: number;
//     schedule_days: string[];
//     category?: {
//         id: string;
//         name: string;
//     };
// }

export default function PartnershipProductDetail({ partnershipProduct }: { partnershipProduct: PartnershipProduct }) {
    const [activeTab, setActiveTab] = useState('tentang');

    const handleRegisterClick = () => {
        setActiveTab('informasi_pendaftaran');
        setTimeout(() => {
            const tabsElement = document.querySelector('[role="tablist"]');
            if (tabsElement) {
                tabsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <div className="min-h-screen bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat">
            <Head title={`${partnershipProduct.title} - Sertifikasi Kerjasama`} />

            <HeroSection partnershipProduct={partnershipProduct} onRegisterClick={handleRegisterClick} />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto w-full max-w-7xl gap-0 px-4 pb-8">
                <div className="overflow-x-auto">
                    <TabsList className="mb-0 flex h-auto w-full min-w-max justify-start gap-0 rounded-none border-b-0 bg-transparent p-0">
                        <TabsTrigger
                            value="tentang"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <BookOpen className="h-5 w-5" />
                            Tentang
                        </TabsTrigger>

                        <TabsTrigger
                            value="poin_penting"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <Award className="h-5 w-5" />
                            Poin Penting
                        </TabsTrigger>

                        <TabsTrigger
                            value="jadwal"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <Calendar className="h-5 w-5" />
                            Jadwal
                        </TabsTrigger>

                        <TabsTrigger
                            value="informasi_pendaftaran"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <Info className="h-5 w-5" />
                            Informasi Pendaftaran
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="tentang" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <AboutSection partnershipProduct={partnershipProduct} />
                </TabsContent>

                <TabsContent value="poin_penting" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <KeyPointsSection partnershipProduct={partnershipProduct} />
                </TabsContent>

                <TabsContent value="jadwal" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <ScheduleInfoSection partnershipProduct={partnershipProduct} />
                </TabsContent>

                <TabsContent value="informasi_pendaftaran" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <RegisterSection partnershipProduct={partnershipProduct} />
                </TabsContent>
            </Tabs>

            {/* <div className="mx-auto max-w-7xl px-4 pb-8">
                <RelatedProduct relatedPartnershipProducts={relatedPartnershipProducts} />
            </div> */}
        </div>
    );
}
