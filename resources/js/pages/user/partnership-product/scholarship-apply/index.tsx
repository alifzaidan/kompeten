'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ArrowLeft, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface PartnershipProduct {
    id: string;
    title: string;
    slug: string;
    description?: string | null;
    short_description?: string | null;
    thumbnail?: string | null;

    category?: { name: string };
    registration_deadline?: string | null;
    duration_days?: number | null;
    price?: number | null;
    strikethrough_price?: number | null;
}

const formSchema = z.object({
    name: z.string().nonempty('Nama lengkap harus diisi'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().nonempty('Nomor telepon harus diisi'),
    nim: z.string().nonempty('NIM harus diisi'),
    university: z.string().nonempty('Nama universitas harus diisi'),
    major: z.string().nonempty('Program studi harus diisi'),
    semester: z.string().nonempty('Semester harus dipilih'),
    ktm_photo: z.instanceof(File, { message: 'Foto KTM harus diunggah' }).optional(),
    transcript_photo: z.instanceof(File, { message: 'Foto transkrip nilai harus diunggah' }).optional(),
    instagram_proof_photo: z.instanceof(File, { message: 'Foto bukti follow Instagram harus diunggah' }).optional(),
    instagram_tag_proof_photo: z.instanceof(File, { message: 'Foto bukti tag Instagram harus diunggah' }).optional(),
});

export default function ScholarshipApplicationForm({ partnershipProduct }: { partnershipProduct: PartnershipProduct }) {
    const [isLoading, setIsLoading] = useState(false);
    const [ktmPreview, setKtmPreview] = useState<string | null>(null);
    const [transcriptPreview, setTranscriptPreview] = useState<string | null>(null);
    const [instagramProofPreview, setInstagramProofPreview] = useState<string | null>(null);
    const [instagramTagProofPreview, setInstagramTagProofPreview] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            nim: '',
            university: '',
            major: '',
            semester: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('nim', values.nim);
        formData.append('university', values.university);
        formData.append('major', values.major);
        formData.append('semester', values.semester);

        if (values.ktm_photo) {
            formData.append('ktm_photo', values.ktm_photo);
        }
        if (values.transcript_photo) {
            formData.append('transcript_photo', values.transcript_photo);
        }
        if (values.instagram_proof_photo) {
            formData.append('instagram_proof_photo', values.instagram_proof_photo);
        }
        if (values.instagram_tag_proof_photo) {
            formData.append('instagram_tag_proof_photo', values.instagram_tag_proof_photo);
        }

        router.post(route('partnership-products.scholarship-store', partnershipProduct.slug), formData, {
            onSuccess: () => {
                toast.success('Pendaftaran beasiswa berhasil dikirim!');
                setIsLoading(false);
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat mengirim pendaftaran');
                setIsLoading(false);
            },
        });
    }

    const handleFilePreview = (e: React.ChangeEvent<HTMLInputElement>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const deadlineDate = partnershipProduct.registration_deadline ? new Date(partnershipProduct.registration_deadline) : null;
    const hasDiscount =
        (partnershipProduct.strikethrough_price ?? 0) > 0 &&
        (partnershipProduct.price ?? 0) > 0 &&
        (partnershipProduct.strikethrough_price ?? 0) > (partnershipProduct.price ?? 0);
    const discountPercentage = hasDiscount
        ? Math.round(
              (((partnershipProduct.strikethrough_price ?? 0) - (partnershipProduct.price ?? 0)) / (partnershipProduct.strikethrough_price ?? 1)) *
                  100,
          )
        : 0;

    return (
        <div>
            <Head title={`Daftar Beasiswa - ${partnershipProduct.title}`} />

            <div className="min-h-screen bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat">
                {/* Hero (match detail/hero-section style) */}
                <section className="relative py-12 text-gray-900">
                    <div className="relative mx-auto max-w-7xl px-4">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/">Beranda</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/certification">Sertifikasi Kerjasama</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={`/certification/${partnershipProduct.slug}`}>{partnershipProduct.title}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Daftar Beasiswa</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:items-start">
                            <div className="lg:col-span-2">
                                <div className="mb-4 flex flex-wrap items-center gap-3">
                                    {partnershipProduct.category?.name && (
                                        <span className="border-primary-foreground bg-secondary text-primary-foreground rounded-full border px-4 py-1 text-sm font-medium">
                                            {partnershipProduct.category.name}
                                        </span>
                                    )}
                                    {typeof partnershipProduct.duration_days === 'number' && partnershipProduct.duration_days > 0 && (
                                        <span className="rounded-full border border-blue-300 bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                            <Calendar className="mr-1 inline-block h-4 w-4" />
                                            {partnershipProduct.duration_days} Hari
                                        </span>
                                    )}
                                    {discountPercentage > 0 && (
                                        <span className="rounded-full border border-red-300 bg-red-100 px-4 py-1 text-sm font-medium text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300">
                                            Hemat {discountPercentage}%
                                        </span>
                                    )}
                                    <span className="rounded-full border border-emerald-300 bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                        <Award className="mr-1 inline-block h-4 w-4" />
                                        Program Beasiswa
                                    </span>
                                </div>

                                <h1 className="mb-4 max-w-3xl text-4xl leading-tight font-semibold sm:text-5xl">
                                    Daftar Beasiswa: {partnershipProduct.title}
                                </h1>

                                {(partnershipProduct.short_description || partnershipProduct.description) && (
                                    <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
                                        {partnershipProduct.short_description ?? partnershipProduct.description}
                                    </p>
                                )}

                                {deadlineDate && !Number.isNaN(deadlineDate.getTime()) && (
                                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                                        ⏰ Daftar sebelum: {format(deadlineDate, 'dd MMMM yyyy, HH:mm', { locale: id })} WIB
                                    </div>
                                )}

                                <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
                                    <Button variant="outline" asChild>
                                        <Link href={`/certification/${partnershipProduct.slug}`}>
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            Kembali ke Detail
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <a href="https://wa.me/+6289528514480" target="_blank" rel="noopener noreferrer">
                                            Hubungi Kami
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                {partnershipProduct.thumbnail && (
                                    <div className="overflow-hidden rounded-3xl border bg-white shadow-lg">
                                        <img
                                            src={
                                                partnershipProduct.thumbnail
                                                    ? `/storage/${partnershipProduct.thumbnail}`
                                                    : '/assets/images/placeholder.png'
                                            }
                                            alt={partnershipProduct.title}
                                            className="h-56 w-full object-cover sm:h-64"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content (match detail tab content cards) */}
                <div className="mx-auto w-full max-w-7xl px-4 pb-8">
                    <div className="grid gap-6 lg:grid-cols-5">
                        {/* Requirements */}
                        <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-2 dark:bg-zinc-800">
                            <div className="space-y-4">
                                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-zinc-900/40">
                                    <p className="text-sm font-semibold text-gray-900 md:text-base dark:text-gray-100">
                                        Kompeten membuka Program Beasiswa Kompetensi bagi mahasiswa yang ingin meningkatkan kemampuan di bidang
                                        perpajakan dan memperoleh sertifikasi profesional yang dibutuhkan di dunia kerja.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">🎓 Persyaratan Peserta</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/40">
                                            <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0 text-green-500" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Mahasiswa aktif jenjang D1–S1</span>
                                        </div>
                                        <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/40">
                                            <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0 text-green-500" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Memiliki IPK minimal 3,00</span>
                                        </div>
                                        <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/40">
                                            <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0 text-green-500" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Maksimal berada pada semester 8</span>
                                        </div>
                                        <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/40">
                                            <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0 text-green-500" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                Bersedia mengikuti seluruh tahapan seleksi
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">📅 Tahapan Pelaksanaan</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/40">
                                            <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                                                1
                                            </div>
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Pendaftaran administrasi</span>
                                        </div>
                                        <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/40">
                                            <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                                                2
                                            </div>
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Sosialisasi program</span>
                                        </div>
                                        <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/40">
                                            <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                                                3
                                            </div>
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Seleksi peserta</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4 text-sm text-gray-700 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-gray-200">
                                    <p className="font-semibold">📞 Untuk informasi lebih lanjut</p>
                                    <div className="mt-2 space-y-1">
                                        <p>
                                            📧 <span className="font-medium">kompetenidn@gmail.com</span>
                                        </p>
                                        <p>
                                            💬 <span className="font-medium">+62 895-2851-4480</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="overflow-hidden rounded-3xl bg-white shadow-lg lg:col-span-3 dark:bg-zinc-800">
                            <div className="border-b border-gray-200 bg-white px-6 py-6 dark:border-zinc-700 dark:bg-zinc-800">
                                <h2 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-gray-100">📝 Formulir Pendaftaran</h2>
                                <p className="mt-1 text-sm text-gray-600 md:text-base dark:text-gray-300">
                                    Lengkapi data diri dan dokumen pendukung Anda
                                </p>
                            </div>

                            <div className="p-3 md:p-6">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        {/* Personal Information */}
                                        <div className="space-y-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-5 dark:from-blue-950/20 dark:to-indigo-950/20">
                                            <div className="flex items-center gap-2">
                                                <span className="md:text-2xl">👤</span>
                                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Informasi Pribadi</h3>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nama Lengkap *</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Masukkan nama lengkap Anda" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email *</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} type="email" placeholder="Masukkan email Anda" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nomor Telepon *</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Masukkan nomor telepon Anda (08XXXX)" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* University Information */}
                                        <div className="space-y-4 rounded-lg border-t border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 pt-5 md:p-5 dark:border-zinc-700 dark:from-green-950/20 dark:to-emerald-950/20">
                                            <div className="flex items-center gap-2">
                                                <span className="md:text-2xl">🎓</span>
                                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Informasi Universitas</h3>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="university"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nama Universitas *</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Masukkan nama universitas Anda" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="major"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Program Studi *</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Contoh: Teknik Informatika, Ekonomi, etc" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="semester"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Semester *</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Pilih semester Anda" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="1">Semester 1</SelectItem>
                                                                <SelectItem value="2">Semester 2</SelectItem>
                                                                <SelectItem value="3">Semester 3</SelectItem>
                                                                <SelectItem value="4">Semester 4</SelectItem>
                                                                <SelectItem value="5">Semester 5</SelectItem>
                                                                <SelectItem value="6">Semester 6</SelectItem>
                                                                <SelectItem value="7">Semester 7</SelectItem>
                                                                <SelectItem value="8">Semester 8</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="nim"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>NIM *</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Masukkan NIM Anda" autoComplete="off" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Documents */}
                                        <div className="space-y-4 rounded-lg border-t border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50 p-4 pt-5 md:p-5 dark:border-zinc-700 dark:from-orange-950/20 dark:to-amber-950/20">
                                            <div className="flex items-center gap-2">
                                                <span className="md:text-2xl">📄</span>
                                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Dokumen Pendukung</h3>
                                            </div>

                                            {/* KTM Photo */}
                                            <FormField
                                                control={form.control}
                                                name="ktm_photo"
                                                render={({ field: { onChange, value, ...field } }) => {
                                                    void value;
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2">
                                                                <span>📋</span>
                                                                Foto KTM *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="space-y-3">
                                                                    {ktmPreview && (
                                                                        <div className="relative overflow-hidden rounded-lg border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-2 dark:from-green-950/30 dark:to-emerald-950/30">
                                                                            <img
                                                                                src={ktmPreview}
                                                                                alt="KTM Preview"
                                                                                className="h-40 w-full rounded object-contain"
                                                                            />
                                                                            <div className="absolute top-2 right-2 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                                                                                ✓ Terpilih
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    <Input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                onChange(file);
                                                                                handleFilePreview(e, setKtmPreview);
                                                                            }
                                                                        }}
                                                                        className="cursor-pointer border-2 border-dashed border-gray-300 py-6 hover:border-green-400 dark:border-zinc-600"
                                                                        {...field}
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormDescription className="text-xs">
                                                                📸 Format: JPG, PNG, WebP (Maks 5MB)
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />

                                            {/* Transcript Photo */}
                                            <FormField
                                                control={form.control}
                                                name="transcript_photo"
                                                render={({ field: { onChange, value, ...field } }) => {
                                                    void value;
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2">
                                                                <span>📊</span>
                                                                Foto Transkrip Nilai *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="space-y-3">
                                                                    {transcriptPreview && (
                                                                        <div className="relative overflow-hidden rounded-lg border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 p-2 dark:from-blue-950/30 dark:to-indigo-950/30">
                                                                            <img
                                                                                src={transcriptPreview}
                                                                                alt="Transcript Preview"
                                                                                className="h-40 w-full rounded object-contain"
                                                                            />
                                                                            <div className="absolute top-2 right-2 rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
                                                                                ✓ Terpilih
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    <Input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                onChange(file);
                                                                                handleFilePreview(e, setTranscriptPreview);
                                                                            }
                                                                        }}
                                                                        className="cursor-pointer border-2 border-dashed border-gray-300 py-6 hover:border-blue-400 dark:border-zinc-600"
                                                                        {...field}
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormDescription className="text-xs">
                                                                📸 Format: JPG, PNG, WebP (Maks 5MB)
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />

                                            {/* Instagram Follow Proof */}
                                            <FormField
                                                control={form.control}
                                                name="instagram_proof_photo"
                                                render={({ field: { onChange, value, ...field } }) => {
                                                    void value;
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2">
                                                                <span>📱</span>
                                                                Foto Bukti Follow Instagram @kompeten.idn *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="space-y-3">
                                                                    {instagramProofPreview && (
                                                                        <div className="relative overflow-hidden rounded-lg border-2 border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50 p-2 dark:from-pink-950/30 dark:to-rose-950/30">
                                                                            <img
                                                                                src={instagramProofPreview}
                                                                                alt="Instagram Proof Preview"
                                                                                className="h-40 w-full rounded object-contain"
                                                                            />
                                                                            <div className="absolute top-2 right-2 rounded-full bg-pink-500 px-2 py-1 text-xs font-semibold text-white">
                                                                                ✓ Terpilih
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    <Input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                onChange(file);
                                                                                handleFilePreview(e, setInstagramProofPreview);
                                                                            }
                                                                        }}
                                                                        className="cursor-pointer border-2 border-dashed border-gray-300 py-6 hover:border-pink-400 dark:border-zinc-600"
                                                                        {...field}
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormDescription className="text-xs">
                                                                📸 Format: JPG, PNG, WebP (Maks 5MB)
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />

                                            {/* Instagram Tag Proof */}
                                            <FormField
                                                control={form.control}
                                                name="instagram_tag_proof_photo"
                                                render={({ field: { onChange, value, ...field } }) => {
                                                    void value;
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2">
                                                                <span>👥</span>
                                                                Foto Bukti Tag 3 Teman di Instagram @kompeten.idn *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="space-y-3">
                                                                    {instagramTagProofPreview && (
                                                                        <div className="relative overflow-hidden rounded-lg border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-violet-50 p-2 dark:from-purple-950/30 dark:to-violet-950/30">
                                                                            <img
                                                                                src={instagramTagProofPreview}
                                                                                alt="Instagram Tag Proof Preview"
                                                                                className="h-40 w-full rounded object-contain"
                                                                            />
                                                                            <div className="absolute top-2 right-2 rounded-full bg-purple-500 px-2 py-1 text-xs font-semibold text-white">
                                                                                ✓ Terpilih
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    <Input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                onChange(file);
                                                                                handleFilePreview(e, setInstagramTagProofPreview);
                                                                            }
                                                                        }}
                                                                        className="cursor-pointer border-2 border-dashed border-gray-300 py-6 hover:border-purple-400 dark:border-zinc-600"
                                                                        {...field}
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormDescription className="text-xs">
                                                                📸 Format: JPG, PNG, WebP (Maks 5MB)
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex gap-3 border-t border-gray-200 pt-6 dark:border-zinc-700">
                                            <Button variant="outline" type="button" onClick={() => window.history.back()} className="border-2">
                                                ← Kembali
                                            </Button>
                                            <Button type="submit" disabled={isLoading} className="flex-1">
                                                {isLoading ? '⏳ Mengirim...' : '✓ Kirim Pendaftaran'}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
