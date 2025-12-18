import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head } from '@inertiajs/react';
import { BookOpen, Calendar, Info, Lightbulb, User, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import AboutSection from './about-section';
import HeroSection from './hero-section';
import MentorSection from './mentor-section';
import RegisterSection from './register-section';
import RequirementSection from './requirement-section';
import TimelineSection from './timeline-section';
import ToolsSection from './tools-section';

interface Bootcamp {
    id: string;
    title: string;
    category?: { name: string };
    category_id?: string;
    schedules?: { schedule_date: string; day: string; start_time: string; end_time: string }[];
    tools?: { name: string; description?: string | null; icon: string | null }[];
    batch?: string | null;
    strikethrough_price: number;
    price: number;
    quota: number;
    start_date: string;
    end_date: string;
    registration_deadline: string;
    status: string;
    bootcamp_url: string;
    registration_url: string;
    thumbnail?: string | null;
    description?: string | null;
    benefits?: string | null;
    instructions?: string | null;
    requirements?: string | null;
    curriculum?: string | null;
    user?: {
        id: string;
        name: string;
        bio?: string;
        avatar?: string;
    };
    created_at: string | Date;
}

// interface RelatedBootcamp {
//     id: string;
//     title: string;
//     slug: string;
//     thumbnail?: string | null;
//     price: number;
//     strikethrough_price: number;
//     start_date: string;
//     end_date: string;
//     category?: {
//         name: string;
//     };
// }

interface ReferralInfo {
    code?: string;
    hasActive: boolean;
}

export default function Bootcamp({ bootcamp, referralInfo }: { bootcamp: Bootcamp; referralInfo: ReferralInfo }) {
    const [activeTab, setActiveTab] = useState('tentang');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const refFromUrl = urlParams.get('ref');

        if (refFromUrl) {
            sessionStorage.setItem('referral_code', refFromUrl);
        } else if (referralInfo.code) {
            sessionStorage.setItem('referral_code', referralInfo.code);
        }
    }, [referralInfo]);

    const handleRegisterClick = () => {
        setActiveTab('informasi_program');
        setTimeout(() => {
            const tabsElement = document.querySelector('[role="tablist"]');
            if (tabsElement) {
                tabsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <div className="min-h-screen bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat">
            <Head title={`${bootcamp.title} - Bootcamp`} />

            <HeroSection bootcamp={bootcamp} onRegisterClick={handleRegisterClick} />

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
                            value="jadwal"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <Calendar className="h-5 w-5" />
                            Jadwal
                        </TabsTrigger>

                        <TabsTrigger
                            value="persyaratan"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <Lightbulb className="h-5 w-5" />
                            Persyaratan
                        </TabsTrigger>

                        <TabsTrigger
                            value="tools"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <Wrench className="h-5 w-5" />
                            Tools
                        </TabsTrigger>

                        <TabsTrigger
                            value="mentor"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <User className="h-5 w-5" />
                            Mentor
                        </TabsTrigger>

                        <TabsTrigger
                            value="informasi_program"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <Info className="h-5 w-5" />
                            Informasi Program
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="tentang" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <AboutSection bootcamp={bootcamp} />
                </TabsContent>

                <TabsContent value="jadwal" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <TimelineSection bootcamp={bootcamp} />
                </TabsContent>

                <TabsContent value="persyaratan" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <RequirementSection bootcamp={bootcamp} />
                </TabsContent>

                <TabsContent value="tools" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <ToolsSection bootcamp={bootcamp} />
                </TabsContent>

                <TabsContent value="mentor" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <MentorSection bootcamp={bootcamp} />
                </TabsContent>

                <TabsContent value="informasi_program" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <RegisterSection bootcamp={bootcamp} />
                </TabsContent>
            </Tabs>

            {/* <div className="mx-auto max-w-7xl px-4 pb-8">
                    <RelatedProduct relatedBootcamps={relatedBootcamps} myBootcampIds={myBootcampIds} />
                </div> */}
        </div>
    );
}
