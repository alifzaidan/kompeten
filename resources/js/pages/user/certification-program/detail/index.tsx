import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head } from '@inertiajs/react';
import { BookOpen, Calendar, Info, Lightbulb, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import HeroSection from './hero-section';
import KeyPointsSection from './key-points-section';
import MentorSection from './mentor-section';
import RegisterSection from './register-section';
import RelatedPrograms from './related-programs';
import ScheduleInfoSection from './schedule-info-section';
import AboutSection from './about-section';

interface Mentor {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
}

interface Schedule {
    id: string;
    title?: string | null;
    schedule_date?: string;
    start_date?: string;
    day?: string;
    start_time?: string;
    end_time?: string;
}

interface Program {
    id: string;
    title: string;
    slug: string;
    short_description: string;
    description: string;
    benefits: string;
    terms_conditions?: string | null;
    scholarship_flow?: string | null;
    type: 'regular' | 'scholarship';
    status: string;
    category: { id: string; name: string };
    price: number;
    scholarship_price?: number;
    strikethrough_price?: number;
    thumbnail?: string | null;
    registration_deadline?: string;
    socialization_registration_deadline?: string;
    group_url?: string;
    batch?: string;
    document_required?: boolean;
    document_description?: string | null;
    schedules: Schedule[];
    socializationSchedules: Schedule[];
    mentors: Mentor[];
}

interface RelatedProgram {
    id: string;
    title: string;
    slug: string;
    type: 'regular' | 'scholarship';
    price: number;
    strikethrough_price?: number;
    category?: { name: string };
    thumbnail?: string | null;
    registration_deadline?: string;
}

interface DetailProps {
    program: Program;
    relatedPrograms: RelatedProgram[];
    myProgramIds: string[];
    scholarshipApplication?: { status: string } | null;
    approvedScholarshipProgramIds?: string[];
}

export default function Detail({ program, relatedPrograms, myProgramIds, scholarshipApplication, approvedScholarshipProgramIds = [] }: DetailProps) {
    const isEnrolled = myProgramIds.includes(program.id);
    const [activeTab, setActiveTab] = useState('tentang');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab');

        if (tab) {
            setActiveTab(tab);
        }
    }, []);

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
            <Head title={`${program.title} - Program Sertifikasi`} />

            <HeroSection program={program} onRegisterClick={handleRegisterClick} />

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
                    <AboutSection program={program} />
                </TabsContent>

                <TabsContent value="jadwal" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <ScheduleInfoSection program={program} />
                </TabsContent>

                <TabsContent value="persyaratan" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <KeyPointsSection program={program} />
                </TabsContent>

                <TabsContent value="mentor" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <MentorSection program={program} />
                </TabsContent>

                <TabsContent value="informasi_program" className="mt-0 rounded-b-3xl bg-white p-6 shadow-lg">
                    <RegisterSection program={program} isEnrolled={isEnrolled} scholarshipApplication={scholarshipApplication} />
                </TabsContent>
            </Tabs>

            <RelatedPrograms relatedPrograms={relatedPrograms} approvedScholarshipProgramIds={approvedScholarshipProgramIds} />
        </div>
    );
}
