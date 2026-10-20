import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UserLayout from '@/layouts/user-layout';
import { type SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { enUS, id } from 'date-fns/locale';
import { AlertCircle, Award, Calendar, Check, Copy, Download, ExternalLink, Mail, Phone, Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface CertificateParticipant {
    id: string;
    certificate_code: string;
    certificate_number: number;
    created_at: string;
    user?: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
    } | null;
    certificate: {
        id: string;
        title: string;
        issued_date: string;
        course?: { title: string } | null;
        bootcamp?: { title: string } | null;
        webinar?: { title: string } | null;
        design?: {
            id: string;
            name: string;
            image_1: string | null;
            image_2: string | null;
        } | null;
    };
}

interface CheckCertificateProps {
    participants: CertificateParticipant[];
    searched: boolean;
    error: string | null;
    filters: {
        email: string | null;
        phone_number: string | null;
    };
}

export default function CheckCertificate({ participants, searched, error, filters }: CheckCertificateProps) {
    const { t, i18n } = useTranslation('user');
    const dateLocale = i18n.language === 'en' ? enUS : id;
    const { auth } = usePage<SharedData>().props;

    const [email, setEmail] = useState(filters.email || (auth.user?.email as string) || '');
    const [phone, setPhone] = useState(filters.phone_number || (auth.user?.phone_number as string) || '');
    const [loading, setLoading] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !phone.trim()) return;

        setLoading(true);
        router.get(
            route('certificates.check'),
            { email, phone_number: phone },
            {
                preserveState: true,
                onFinish: () => setLoading(false),
            }
        );
    };

    const handleCopyCode = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        toast.success(t('certificate.codeCopied', 'Kode sertifikat berhasil disalin!'));
        setTimeout(() => setCopiedId(null), 2000);
    };

    const getProgramDetails = (participant: CertificateParticipant) => {
        const cert = participant.certificate;
        if (cert.course) {
            return {
                title: cert.course.title,
                type: t('certificate.types.course', 'Kelas Online'),
                color: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50',
                accentColor: 'bg-blue-500',
            };
        }
        if (cert.bootcamp) {
            return {
                title: cert.bootcamp.title,
                type: t('certificate.types.bootcamp', 'Bootcamp'),
                color: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50',
                accentColor: 'bg-emerald-500',
            };
        }
        if (cert.webinar) {
            return {
                title: cert.webinar.title,
                type: t('certificate.types.webinar', 'Webinar'),
                color: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50',
                accentColor: 'bg-amber-500',
            };
        }
        return {
            title: cert.title,
            type: t('certificate.types.certificate', 'Sertifikasi'),
            color: 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/50',
            accentColor: 'bg-purple-500',
        };
    };

    const breadcrumbs = [
        { title: t('common:nav.home', 'Beranda'), href: '/' },
        { title: t('certificate.headTitle', 'Cek Sertifikat'), href: route('certificates.check') },
    ];

    return (
        <UserLayout breadcrumbs={breadcrumbs}>
            <Head title={t('certificate.headTitle', 'Cek Sertifikat')} />

            <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-secondary/35 via-transparent to-background pb-20 dark:from-orange-950/10 dark:via-background dark:to-background">
                {/* Background decorative blurs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-gradient-to-l from-secondary/50 to-transparent blur-3xl dark:from-orange-500/10"></div>
                    <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-gradient-to-r from-orange-200/20 to-transparent blur-3xl dark:from-blue-500/10"></div>
                </div>

                <div className="relative z-10">
                    {/* Hero Section */}
                    <section className="w-full px-4 pt-16 pb-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-6 flex justify-center">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary dark:border-primary/30 dark:bg-primary/20">
                                    <Award className="h-3.5 w-3.5" /> {t('certificate.officialVerification', 'Verifikasi Resmi')}
                                </span>
                            </div>
                            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
                                {t('certificate.title', 'Cek Sertifikat Anda')}
                                <span className="block mt-1 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                    {t('certificate.officialVerified', 'Resmi & Terverifikasi')}
                                </span>
                            </h1>
                            <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
                                {t('certificate.subtitle', 'Masukkan email dan nomor WhatsApp Anda yang terdaftar untuk mencari, melihat, dan mengunduh sertifikat kelulusan program.')}
                            </p>
                        </div>
                    </section>

                    {/* Main Form Section */}
                    <section className="mx-auto max-w-7xl px-4 space-y-12">
                        {/* Centered Form */}
                        <div className="mx-auto max-w-2xl">
                            <Card className="border border-gray-200/80 bg-white/80 shadow-md backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
                                <CardHeader className="pb-4 text-center">
                                    <CardTitle className="text-lg font-semibold">{t('certificate.searchFormTitle', 'Form Pencarian')}</CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        {t('certificate.searchFormDesc', 'Masukkan data Anda untuk melihat sertifikat kelulusan.')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                    <Mail className="h-3.5 w-3.5 text-primary" /> {t('certificate.registeredEmail', 'Email Terdaftar')}
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder={t('certificate.emailPlaceholder', 'contoh@email.com')}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="h-10 focus-visible:ring-primary/30 focus-visible:border-primary transition-all duration-200"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                    <Phone className="h-3.5 w-3.5 text-primary" /> {t('certificate.waNumber', 'Nomor WhatsApp')}
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    type="text"
                                                    placeholder={t('certificate.phonePlaceholder', '0812xxxxxxxx')}
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                    className="h-10 focus-visible:ring-primary/30 focus-visible:border-primary transition-all duration-200"
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" disabled={loading} className="w-full gap-2 h-10 mt-2 font-medium bg-primary text-primary-foreground hover:bg-primary/95 active:scale-[0.98] transition-all">
                                            <Search className="h-4 w-4" />
                                            {loading ? t('certificate.searching', 'Mencari...') : t('certificate.searchButton', 'Cari Sertifikat')}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Results Section */}
                        <div className="w-full">
                            {searched ? (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b pb-4 max-w-5xl mx-auto">
                                        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                                            {t('certificate.searchResults', 'Hasil Pencarian')}
                                        </h3>
                                        <Badge variant="secondary" className="font-medium text-xs px-2.5 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground border border-secondary">
                                            {t('certificate.certificatesFound', { count: participants.length })}
                                        </Badge>
                                    </div>

                                    {error && (
                                        <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive max-w-2xl mx-auto shadow-sm">
                                            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold">{t('certificate.searchFailed', 'Pencarian Gagal')}</p>
                                                <p className="text-muted-foreground mt-0.5">{error}</p>
                                            </div>
                                        </div>
                                    )}

                                    {!error && participants.length === 0 && (
                                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center bg-card/30 max-w-2xl mx-auto shadow-sm">
                                            <Award className="mb-3 h-12 w-12 text-muted-foreground opacity-40 animate-bounce" />
                                            <p className="font-bold text-foreground text-lg">{t('certificate.notAvailable', 'Sertifikat Belum Tersedia')}</p>
                                            <p className="text-muted-foreground mt-1 text-sm max-w-sm">
                                                {t('certificate.notAvailableDesc', 'Email dan nomor WhatsApp terdaftar, tetapi tidak ada sertifikat yang terbit atas akun tersebut saat ini.')}
                                            </p>
                                        </div>
                                    )}

                                    {!error && participants.length > 0 && (
                                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                                            {participants.map((p) => {
                                                const details = getProgramDetails(p);
                                                return (
                                                    <Card key={p.id} className="group relative flex flex-col justify-between overflow-hidden border bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20">
                                                        {/* Top indicator gradient accent based on program type */}
                                                        <div className={`absolute top-0 left-0 h-[3px] w-full ${details.accentColor}`} />

                                                        <CardHeader className="pt-6 pb-4">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider rounded-md ${details.color}`}>
                                                                    {details.type}
                                                                </Badge>

                                                                <div className="flex items-center gap-1.5 bg-muted/60 dark:bg-zinc-800/60 rounded-md px-2 py-0.5 border border-border/60">
                                                                    <span className="font-mono text-[10px] font-medium text-muted-foreground">
                                                                        {p.certificate_code}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => handleCopyCode(p.certificate_code, p.id)}
                                                                        className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-sm"
                                                                        title={t('certificate.copyCode', 'Salin')}
                                                                    >
                                                                        {copiedId === p.id ? (
                                                                            <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                                        ) : (
                                                                            <Copy className="h-3 w-3" />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <CardTitle className="text-base font-semibold line-clamp-2 leading-snug min-h-[2.5rem] group-hover:text-primary transition-colors duration-200">
                                                                {details.title}
                                                            </CardTitle>
                                                        </CardHeader>

                                                        <CardContent className="px-6 pb-4 pt-0 text-xs text-muted-foreground space-y-2.5">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4 text-primary/70" />
                                                                <span>{t('certificate.issuedDate', 'Diterbitkan:')}</span>
                                                                <span className="font-medium text-foreground">
                                                                    {p.certificate.issued_date
                                                                        ? format(new Date(p.certificate.issued_date), 'dd MMMM yyyy', { locale: dateLocale })
                                                                        : '-'}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Award className="h-4 w-4 text-primary/70" />
                                                                <span>{t('certificate.certNumber', 'No. Sertifikat:')}</span>
                                                                <span className="font-medium text-foreground font-mono">
                                                                    {p.certificate_number}
                                                                </span>
                                                            </div>
                                                        </CardContent>

                                                        <div className="border-t bg-muted/10 dark:bg-zinc-800/10 px-6 py-3 flex items-center justify-end gap-2">
                                                            <Button asChild size="sm" variant="ghost" className="h-8 gap-1.5 text-xs text-primary hover:text-primary hover:bg-primary/5 px-3">
                                                                <a href={route('certificate.participant.detail', p.certificate_code)} target="_blank" rel="noopener noreferrer">
                                                                    {t('certificate.view', 'Lihat')}
                                                                    <ExternalLink className="h-3 w-3" />
                                                                </a>
                                                            </Button>
                                                            <Button asChild size="sm" variant="outline" className="h-8 gap-1.5 text-xs px-3 border-primary/20 text-primary hover:bg-primary/5">
                                                                <a href={route('certificate.participant.download.public', p.certificate_code)}>
                                                                    {t('certificate.download', 'Unduh')}
                                                                    <Download className="h-3 w-3" />
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 dark:border-zinc-800 p-12 text-center bg-white/50 dark:bg-zinc-900/50 min-h-[300px] max-w-2xl mx-auto shadow-sm">
                                    <Award className="mb-4 h-16 w-16 text-primary/40 animate-pulse" />
                                    <h3 className="text-lg font-bold text-foreground">{t('certificate.initialStateTitle', 'Temukan Sertifikat Anda')}</h3>
                                    <p className="text-muted-foreground mt-2 text-sm max-w-sm leading-relaxed">
                                        {t('certificate.initialStateDesc', 'Silakan masukkan email dan nomor WhatsApp terdaftar Anda di form pencarian di atas untuk menampilkan semua sertifikat kelulusan Anda.')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </UserLayout>
    );
}
