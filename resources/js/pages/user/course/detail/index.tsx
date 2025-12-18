import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head } from '@inertiajs/react';
import { BookOpen, Info, Lightbulb, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import HeroSection from './hero-section';
import KeyPointSection from './key-point-section';
import MentorSection from './mentor-section';
import ModulesSection from './modules-section';
import RegisterSection from './register-section';

interface Course {
    id: string;
    title: string;
    user?: { id: string; name: string; bio: string | null };
    category?: { name: string };
    category_id?: string;
    tools?: { name: string; description?: string | null; icon: string | null }[];
    images?: { image_url: string }[];
    short_description?: string | null;
    description?: string | null;
    key_points?: string | null;
    strikethrough_price: number;
    price: number;
    thumbnail?: string | null;
    course_url: string;
    registration_url: string;
    status: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    created_at: string;
    updated_at: string;
    modules?: {
        title: string;
        description?: string | null;
        lessons?: {
            title: string;
            description?: string | null;
            type: 'text' | 'video' | 'file' | 'quiz';
            attachment?: string | null;
            video_url?: string | null;
            is_free?: boolean;
        }[];
    }[];
}

interface ReferralInfo {
    code?: string;
    hasActive: boolean;
}

export default function DetailCourse({ course, referralInfo }: { course: Course; referralInfo: ReferralInfo }) {
    const [activeTab, setActiveTab] = useState('materi');

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
            <Head title={`${course.title} - Kelas Online`} />
            <HeroSection course={course} onRegisterClick={handleRegisterClick} />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto w-full max-w-7xl gap-0 px-4 pb-8">
                <div className="overflow-x-auto">
                    <TabsList className="mb-0 flex h-auto w-full min-w-max justify-start gap-0 rounded-none border-b-0 bg-transparent p-0">
                        <TabsTrigger
                            value="materi"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <BookOpen className="h-5 w-5" />
                            Materi
                        </TabsTrigger>

                        <TabsTrigger
                            value="point_utama"
                            className="data-[state=inactive]:bg-primary hover:data-[state=inactive]:bg-primary/90 relative flex items-center gap-2 rounded-none rounded-t-3xl border-0 px-6 py-4 text-base font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-white"
                        >
                            <Lightbulb className="h-5 w-5" />
                            Benefit
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

                <TabsContent value="materi" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <ModulesSection course={course} />
                </TabsContent>
                <TabsContent value="point_utama" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <KeyPointSection course={course} />
                </TabsContent>
                <TabsContent value="mentor" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <MentorSection course={course} />
                </TabsContent>
                <TabsContent value="informasi_program" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <RegisterSection course={course} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
