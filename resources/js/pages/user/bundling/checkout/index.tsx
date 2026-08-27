import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import UserLayout from '@/layouts/user-layout';
import { rupiahFormatter } from '@/lib/utils';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { BadgeCheck, Check, Hourglass, LoaderCircle, Package, RefreshCw, User, X, ShoppingCart, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Product {
    id: string;
    title: string;
    slug: string;
    price: number;
    thumbnail?: string | null;
}

interface BundleItem {
    id: string;
    bundleable_type: string;
    bundleable: Product;
    price: number;
}

interface Bundle {
    id: string;
    title: string;
    slug: string;
    short_description?: string | null;
    description?: string | null;
    thumbnail?: string | null;
    batch?: string | null;
    price: number;
    strikethrough_price: number;
    registration_deadline?: string | null;
    bundle_items: BundleItem[];
    bundle_items_count: number;
}

interface ReferralInfo {
    code?: string;
    hasActive: boolean;
}

interface PendingInvoice {
    id: string;
    invoice_code: string;
    status: string;
    amount: number;
    payment_method: string;
    payment_channel?: string;
    invoice_url?: string | null;
    created_at: string;
    expires_at: string;
}

interface CheckoutBundleProps {
    bundle: Bundle;
    hasAccess: boolean;
    pendingInvoiceUrl?: string | null;
    pendingInvoice?: PendingInvoice | null;
    referralInfo: ReferralInfo;
}

interface DiscountData {
    valid: boolean;
    discount_amount: number;
    final_amount: number;
    discount_code: {
        id: string;
        code: string;
        name: string;
        type: string;
        formatted_value: string;
    };
    message?: string;
}

interface GuestFormData {
    name: string;
    email: string;
    phone_number: string;
    instance: string;
    city: string;
}

interface PendingCheckoutData {
    bundleId: string;
    timestamp: number;
    promoCode: string;
    discountData: DiscountData | null;
    termsAccepted: boolean;
    codeType?: 'voucher' | 'referral';
    referralValid?: boolean;
    pointsChecked?: boolean;
    pointsToUse?: number;
}

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) return error.message;
    return fallback;
}

export default function CheckoutBundle({ bundle, hasAccess, pendingInvoiceUrl, pendingInvoice, referralInfo }: CheckoutBundleProps) {
    const { auth } = usePage<SharedData>().props;
    const isLoggedIn = !!auth.user;
    const isProfileComplete = isLoggedIn && auth.user?.phone_number && auth.user?.instance && auth.user?.city;

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cancellingInvoice, setCancellingInvoice] = useState(false);

    const transactionFee = 5000;
    const bundleDiscount = bundle.strikethrough_price - bundle.price;
    const [discountData, setDiscountData] = useState<DiscountData | null>(null);
    const discountAmount = discountData?.valid ? discountData.discount_amount : 0;

    // Referral & Points State
    const [codeType, setCodeType] = useState<'voucher' | 'referral'>('voucher');
    const [userPoints, setUserPoints] = useState(0);
    const [pointsChecked, setPointsChecked] = useState(false);
    const [pointsToUse, setPointsToUse] = useState(0);
    const [pointsError, setPointsError] = useState('');

    const [promoCode, setPromoCode] = useState('');
    const [promoLoading, setPromoLoading] = useState(false);
    const [promoError, setPromoError] = useState('');

    const [referralData, setReferralData] = useState<{ valid: boolean; referrer?: { name: string } } | null>(null);
    const [referralLoading, setReferralLoading] = useState(false);
    const [referralError, setReferralError] = useState('');

    const [checkingEmail, setCheckingEmail] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    const [guestFormData, setGuestFormData] = useState<GuestFormData>({
        name: '',
        email: '',
        phone_number: '',
        instance: '',
        city: '',
    });

    const maxPointsAllowed = bundle.price - discountAmount;
    const finalBundle = bundle.price - discountAmount - (pointsChecked ? pointsToUse : 0);
    const totalPrice = finalBundle + transactionFee;

    const updateGuestForm = (field: keyof GuestFormData, value: string) => {
        setGuestFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Load points balance on mount
    useEffect(() => {
        if (isLoggedIn) {
            axios.get('/api/user/points')
                .then((response) => {
                    setUserPoints(response.data.point_balance || 0);
                })
                .catch((err) => {
                    console.error('Failed to load points balance:', err);
                });
        }
    }, [isLoggedIn]);

    const validatePromoCode = useCallback(async () => {
        if (!promoCode.trim()) return;

        setPromoLoading(true);
        setPromoError('');

        try {
            const requestData: Record<string, string | number> = {
                code: promoCode,
                amount: bundle.price,
                product_type: 'bundle',
                product_id: bundle.id,
            };

            if (!isLoggedIn && emailExists && guestFormData.email) {
                requestData.email = guestFormData.email;
            }

            const response = await axios.post('/api/discount-codes/validate', requestData);

            if (response.data.valid) {
                setDiscountData(response.data);
                setPromoError('');
            } else {
                setDiscountData(null);
                setPromoError(response.data.message || 'Kode promo tidak valid');
            }
        } catch (error: unknown) {
            setDiscountData(null);
            if (axios.isAxiosError(error)) {
                setPromoError(error.response?.data?.message || 'Terjadi kesalahan saat memvalidasi kode promo');
            } else {
                setPromoError('Terjadi kesalahan saat memvalidasi kode promo');
            }
        } finally {
            setPromoLoading(false);
        }
    }, [bundle.id, bundle.price, emailExists, guestFormData.email, isLoggedIn, promoCode]);

    const validateReferralCode = useCallback(async () => {
        if (!promoCode.trim()) return;

        setReferralLoading(true);
        setReferralError('');

        try {
            const response = await axios.post('/api/referral/validate', {
                code: promoCode,
                email: !isLoggedIn ? guestFormData.email : undefined,
            });
            const data = response.data;

            if (data.valid) {
                setReferralData(data);
                setReferralError('');
            } else {
                setReferralData(null);
                setReferralError(data.message || 'Kode referral tidak valid');
            }
        } catch (error: unknown) {
            setReferralData(null);
            if (axios.isAxiosError(error)) {
                setReferralError(error.response?.data?.message || 'Terjadi kesalahan saat memvalidasi kode referral');
            } else {
                setReferralError('Terjadi kesalahan saat memvalidasi kode referral');
            }
        } finally {
            setReferralLoading(false);
        }
    }, [promoCode, isLoggedIn, guestFormData.email]);

    useEffect(() => {
        if (!promoCode.trim()) {
            setDiscountData(null);
            setReferralData(null);
            setPromoError('');
            setReferralError('');
            return;
        }

        const timer = setTimeout(() => {
            if (codeType === 'voucher') {
                validatePromoCode();
            } else {
                validateReferralCode();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [promoCode, codeType, validatePromoCode, validateReferralCode]);

    useEffect(() => {
        if (isLoggedIn) return;

        const email = guestFormData.email.trim();
        if (!email || !email.includes('@')) {
            setEmailExists(false);
            return;
        }

        const timer = setTimeout(async () => {
            setCheckingEmail(true);

            try {
                const response = await axios.post('/api/check-email', { email });
                const data = response.data;

                if (data.exists) {
                    setEmailExists(true);
                    setGuestFormData((prev) => ({
                        ...prev,
                        name: data.name || prev.name,
                        phone_number: data.phone_number || prev.phone_number,
                        instance: data.instance || prev.instance,
                        city: data.city || prev.city,
                    }));
                    setUserPoints(data.point_balance || 0);
                } else {
                    setEmailExists(false);
                    setUserPoints(0);
                    setPointsChecked(false);
                    setPointsToUse(0);
                }
            } catch {
                setEmailExists(false);
                setUserPoints(0);
                setPointsChecked(false);
                setPointsToUse(0);
            } finally {
                setCheckingEmail(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [guestFormData.email, isLoggedIn]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const refFromUrl = urlParams.get('ref');

        if (refFromUrl) {
            sessionStorage.setItem('affiliate_code', refFromUrl);
        } else if (referralInfo?.code) {
            sessionStorage.setItem('affiliate_code', referralInfo.code);
        }
    }, [referralInfo]);

    const formatExpiryTime = (expiresAt?: string | null): { time: string; status: 'expired' | 'urgent' | 'normal' } => {
        if (!expiresAt) return { time: 'Normal', status: 'normal' };
        const now = new Date();
        const expiry = new Date(expiresAt);
        const diff = expiry.getTime() - now.getTime();

        if (diff <= 0) {
            return { time: 'Sudah kadaluarsa', status: 'expired' };
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours < 1) {
            return { time: `${minutes} menit lagi`, status: 'urgent' };
        }

        return { time: `${hours} jam ${minutes} menit lagi`, status: hours < 3 ? 'urgent' : 'normal' };
    };

    const ensureAuthenticated = async (): Promise<boolean> => {
        if (isLoggedIn) return true;

        if (!guestFormData.email || !guestFormData.phone_number) {
            toast.error('Email dan nomor telepon wajib diisi.');
            return false;
        }

        if (!guestFormData.instance) {
            toast.error('Instansi wajib diisi.');
            return false;
        }

        if (!guestFormData.city) {
            toast.error('Kota domisili wajib diisi.');
            return false;
        }

        setLoading(true);

        try {
            if (emailExists) {
                const loginResponse = await axios.post(route('auto-login'), {
                    email: guestFormData.email,
                    phone_number: guestFormData.phone_number,
                    instance: guestFormData.instance,
                    city: guestFormData.city,
                });

                const loginData = loginResponse.data;

                if (!loginData.success) {
                    throw new Error(loginData.message || 'Gagal login otomatis.');
                }
            } else {
                if (!guestFormData.name) {
                    toast.error('Nama wajib diisi.');
                    setLoading(false);
                    return false;
                }

                const regResponse = await axios.post(route('auto-register'), {
                    name: guestFormData.name,
                    email: guestFormData.email,
                    phone_number: guestFormData.phone_number,
                    instance: guestFormData.instance,
                    city: guestFormData.city,
                    password: guestFormData.phone_number,
                    password_confirmation: guestFormData.phone_number,
                    affiliate_code: sessionStorage.getItem('affiliate_code') || referralInfo?.code || '',
                });

                if (regResponse.data && regResponse.data.success === false) {
                    throw new Error(regResponse.data.message || 'Gagal registrasi.');
                }
            }

            return true;
        } catch (error: unknown) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || getErrorMessage(error, 'Gagal memproses login/registrasi otomatis.'));
            } else {
                toast.error(getErrorMessage(error, 'Gagal memproses login/registrasi otomatis.'));
            }
            return false;
        }
    };

    const submitPayment = useCallback(
        async (
            activeDiscountData: DiscountData | null,
        ): Promise<void> => {
            const activeDiscountAmount = activeDiscountData?.valid ? activeDiscountData.discount_amount : 0;
            const activeFinalPrice = bundle.price - activeDiscountAmount;
            
            const pointsDeduction = pointsChecked ? pointsToUse : 0;
            const finalNettAmount = activeFinalPrice - pointsDeduction;
            const activeTotal = finalNettAmount + transactionFee;

            const invoiceData: Record<string, string | number> = {
                bundle_id: bundle.id,
                discount_amount: bundleDiscount + activeDiscountAmount,
                nett_amount: finalNettAmount,
                transaction_fee: transactionFee,
                total_amount: activeTotal,
                points_redeemed: pointsDeduction,
            };
            if (activeDiscountData?.valid) {
                invoiceData.discount_code_id = activeDiscountData.discount_code.id;
                invoiceData.discount_code_amount = activeDiscountData.discount_amount;
            }

            if (codeType === 'referral' && referralData?.valid) {
                invoiceData.referral_code = promoCode;
            }
            invoiceData.affiliate_code = sessionStorage.getItem('affiliate_code') || referralInfo?.code || '';

            try {
                const response = await axios.post(route('invoice.store.bundle'), invoiceData);
                const data = response.data;

                if (data.success && data.payment_url) {
                    window.location.href = data.payment_url;
                } else {
                    throw new Error(data.message || 'Gagal membuat invoice.');
                }
            } catch (error) {
                console.error('Payment error:', error);
                throw error;
            }
        },
        [bundle.id, bundle.price, bundleDiscount, transactionFee, pointsChecked, pointsToUse, codeType, referralData, promoCode, referralInfo],
    );

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsAccepted) {
            alert('Anda harus menyetujui syarat dan ketentuan!');
            return;
        }

        setLoading(true);

        const authenticated = await ensureAuthenticated();
        if (!authenticated) {
            setLoading(false);
            return;
        }

        try {
            await submitPayment(discountData);
        } catch (error: unknown) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || 'Terjadi kesalahan saat proses pembayaran.'
                : error instanceof Error
                  ? error.message
                  : 'Terjadi kesalahan saat proses pembayaran.';
            toast.error(message);
            setLoading(false);
        }
    };

    if (isLoggedIn && !isProfileComplete) {
        return (
            <div className="min-h-screen bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-12">
                <Head title="Profil Belum Lengkap" />
                <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xs text-center space-y-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                        <User size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profil Belum Lengkap</h2>
                        <p className="text-sm text-gray-500">
                            Harap lengkapi nomor telepon, instansi, dan kota domisili terlebih dahulu untuk membeli paket bundling.
                        </p>
                    </div>
                    <Button asChild className="w-full py-6 rounded-full bg-[#F9A885] hover:bg-[#F9A885]/90 text-white font-semibold shadow-xs">
                        <Link href={route('profile.edit', { redirect: window.location.href })}>Lengkapi Profil</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <UserLayout>
            <Head title={`Checkout - ${bundle.title}`} />
            <div className="min-h-screen w-full bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat py-8 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-7xl">
                    {/* Breadcrumbs */}
                    <div className="text-xs md:text-sm text-gray-500 mb-2 flex items-center gap-1.5 font-medium">
                        <Link href="/bundling" className="hover:text-orange-600">
                            Paket Bundling
                        </Link>
                        <span className="text-gray-400">/</span>
                        <Link href={`/bundling/${bundle.slug}`} className="hover:text-orange-600 truncate max-w-[200px] sm:max-w-none">
                            {bundle.title}
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">Checkout</span>
                    </div>

                    {/* Page Title */}
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                        Checkout Paket Bundling
                    </h1>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
                        {/* Left Column */}
                        <div className="lg:col-span-2">
                            {/* Detail Pesanan Card */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-6">
                                <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                                    <ShoppingCart className="h-5 w-5 text-gray-900" />
                                    <h3 className="font-bold text-gray-900 text-lg">Detail Pesanan</h3>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                    <img
                                        src={bundle.thumbnail ? `/storage/${bundle.thumbnail}` : '/assets/images/placeholder.png'}
                                        alt={bundle.title}
                                        className="w-32 h-20 sm:w-40 sm:h-24 rounded-xl object-cover border border-gray-100"
                                    />
                                    <div className="flex-1 text-center sm:text-left">
                                        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">
                                            Paket Bundling
                                        </span>
                                        <h4 className="text-base md:text-lg font-bold text-gray-900 leading-snug">
                                            {bundle.title}
                                        </h4>
                                        {bundle.batch && (
                                            <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full inline-block mt-2">
                                                {bundle.batch}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="font-bold text-gray-900 mb-4">Isi Paket ({bundle.bundle_items_count} Program)</h4>
                                    <div className="space-y-3">
                                        {bundle.bundle_items.map((item, idx) => (
                                            <div key={item.id} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 bg-gray-50/50">
                                                <div className="bg-[#F9A885]/10 text-[#F9A885] flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm shrink-0">
                                                    {idx + 1}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-semibold text-gray-900 text-sm">{item.bundleable.title}</p>
                                                    <p className="text-[10px] text-gray-500 font-medium">
                                                        {item.bundleable_type.includes('Course')
                                                            ? 'Kelas Online'
                                                            : item.bundleable_type.includes('Bootcamp')
                                                              ? 'Bootcamp'
                                                              : 'Webinar'}
                                                    </p>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-700">
                                                    {item.price === 0 ? 'Gratis' : rupiahFormatter.format(item.price)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="rounded-xl bg-green-50 p-4 border border-green-100">
                                    <h4 className="mb-2 flex items-center gap-2 font-bold text-green-800">
                                        <BadgeCheck size={18} />
                                        Keuntungan Paket Bundling
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-xs text-green-700 font-medium">
                                            <Check size={14} className="mt-0.5 flex-shrink-0" />
                                            <span>
                                                Hemat {Math.round(((bundle.strikethrough_price - bundle.price) / bundle.strikethrough_price) * 100)}% dari harga normal
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2 text-xs text-green-700 font-medium">
                                            <Check size={14} className="mt-0.5 flex-shrink-0" />
                                            <span>Akses ke {bundle.bundle_items_count} program pembelajaran sekaligus</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-xs text-green-700 font-medium">
                                            <Check size={14} className="mt-0.5 flex-shrink-0" />
                                            <span>Sertifikat untuk semua program yang diselesaikan</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-xs text-green-700 font-medium">
                                            <Check size={14} className="mt-0.5 flex-shrink-0" />
                                            <span>Akses selamanya ke semua materi pembelajaran</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-1">
                            {hasAccess ? (
                                <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-xs">
                                    <BadgeCheck size={64} className="text-green-500" />
                                    <h2 className="text-xl font-bold">Anda Sudah Memiliki Akses</h2>
                                    <p className="text-sm text-gray-500">Anda sudah terdaftar di kelas ini. Silakan mulai belajar.</p>
                                    <Button asChild className="w-full py-6 rounded-full bg-[#F9A885] hover:bg-[#F9A885]/90 text-white font-semibold shadow-xs">
                                        <a href={route('profile.index')}>Lihat Dashboard</a>
                                    </Button>
                                </div>
                            ) : (pendingInvoice || pendingInvoiceUrl) ? (
                                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-6">
                                    <div
                                        className="rounded-xl p-4 flex items-center gap-2"
                                        style={{
                                            backgroundColor: (() => {
                                                const expiryInfo = formatExpiryTime(pendingInvoice?.expires_at);
                                                const isExpired = expiryInfo.status === 'expired';
                                                return isExpired ? '#fee2e2' : 'rgba(254, 249, 195, 0.5)';
                                            })(),
                                        }}
                                    >
                                        {(() => {
                                            const expiryInfo = formatExpiryTime(pendingInvoice?.expires_at);
                                            const isExpired = expiryInfo.status === 'expired';
                                            if (isExpired) {
                                                return (
                                                    <>
                                                        <X className="h-5 w-5 text-red-600" />
                                                        <h4 className="font-bold text-red-700">Pembayaran Gagal / Kadaluarsa</h4>
                                                    </>
                                                );
                                            }
                                            return (
                                                <>
                                                    <Hourglass className="h-5 w-5 text-yellow-600 animate-pulse" />
                                                    <h4 className="font-bold text-yellow-950">Pembayaran Tertunda</h4>
                                                </>
                                            );
                                        })()}
                                    </div>

                                    <div className="space-y-4">
                                        {pendingInvoice && (
                                            <div className="space-y-2 rounded-xl bg-gray-50/50 p-4 border border-gray-100 text-sm">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-500">No. Invoice</span>
                                                    <span className="font-semibold text-gray-800">{pendingInvoice.invoice_code}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-500">Total Pembayaran</span>
                                                    <span className="text-lg font-bold text-[#FA5F25]">
                                                        Rp {pendingInvoice.amount.toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {(() => {
                                            const expiryInfo = formatExpiryTime(pendingInvoice?.expires_at);
                                            const isExpired = expiryInfo.status === 'expired';

                                            if (isExpired) {
                                                return (
                                                    <div className="rounded-xl bg-red-50 p-4 text-xs text-red-700 leading-relaxed">
                                                        Waktu pembayaran telah habis. Jika Anda butuh bantuan, silakan hubungi admin atau batalkan pesanan untuk membuat transaksi baru.
                                                    </div>
                                                );
                                            }

                                            const targetUrl = pendingInvoice?.invoice_url || pendingInvoiceUrl;
                                            return targetUrl ? (
                                                <Button asChild className="w-full py-6 rounded-full bg-[#F9A885] hover:bg-[#F9A885]/90 text-white font-semibold shadow-xs">
                                                    <a href={targetUrl}>Lanjutkan Pembayaran</a>
                                                </Button>
                                            ) : null;
                                        })()}

                                        <div className="flex gap-2">
                                            <Button onClick={() => window.location.reload()} variant="outline" className="flex-1 py-6 rounded-full border-gray-200 text-gray-700">
                                                Cek Status
                                            </Button>
                                            {pendingInvoice && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="flex-1 py-6 rounded-full border-red-200 text-red-600 hover:bg-red-50"
                                                    disabled={cancellingInvoice}
                                                    onClick={async () => {
                                                        if (confirm('Apakah Anda yakin ingin membatalkan transaksi ini dan membuat pesanan baru?')) {
                                                            setCancellingInvoice(true);
                                                            try {
                                                                const res = await axios.post(route('invoice.cancel', pendingInvoice.id));
                                                                if (res.data?.success) {
                                                                    toast.success('Pesanan berhasil dibatalkan.');
                                                                    window.location.reload();
                                                                } else {
                                                                    toast.error(res.data?.message || 'Gagal membatalkan pesanan.');
                                                                    setCancellingInvoice(false);
                                                                }
                                                            } catch (err: unknown) {
                                                                if (axios.isAxiosError(err)) {
                                                                    toast.error(err.response?.data?.message || 'Gagal membatalkan pesanan.');
                                                                } else {
                                                                    toast.error('Gagal membatalkan pesanan.');
                                                                }
                                                                setCancellingInvoice(false);
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {cancellingInvoice ? 'Membatalkan...' : 'Batalkan Pesanan'}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleCheckout} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-4">
                                    <h3 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">Ringkasan Pembayaran</h3>

                                    {!isLoggedIn && (
                                        <div className="space-y-4 rounded-xl border border-gray-100 p-4 bg-gray-50/50">
                                            <h4 className="font-bold text-gray-900">Data Diri</h4>
                                            <div className="space-y-2">
                                                <Label htmlFor="guest-email" className="font-semibold text-gray-700">Email</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        id="guest-email"
                                                        type="email"
                                                        placeholder="email@example.com"
                                                        value={guestFormData.email}
                                                        onChange={(e) => updateGuestForm('email', e.target.value)}
                                                        className="flex-1 rounded-xl bg-gray-50/50 border-gray-200 focus:border-orange-500"
                                                        required
                                                    />
                                                </div>
                                                {checkingEmail && <p className="text-xs text-gray-500">Mengecek email...</p>}
                                                {emailExists && (
                                                    <p className="text-xs text-green-600">Email ditemukan. Login otomatis akan digunakan.</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="guest-name" className="font-semibold text-gray-700">Nama</Label>
                                                <Input
                                                    id="guest-name"
                                                    type="text"
                                                    placeholder="Nama lengkap"
                                                    value={guestFormData.name}
                                                    onChange={(e) => updateGuestForm('name', e.target.value)}
                                                    disabled={emailExists}
                                                    className="rounded-xl bg-gray-50/50 border-gray-200 focus:border-orange-500"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="guest-phone" className="font-semibold text-gray-700">No. Telepon</Label>
                                                <Input
                                                    id="guest-phone"
                                                    type="tel"
                                                    placeholder="08xxxxxxxxxx"
                                                    value={guestFormData.phone_number}
                                                    onChange={(e) => updateGuestForm('phone_number', e.target.value)}
                                                    disabled={emailExists}
                                                    className="rounded-xl bg-gray-50/50 border-gray-200 focus:border-orange-500"
                                                    required
                                                />
                                                {!emailExists && (
                                                    <p className="text-xs text-gray-500">Nomor telepon akan digunakan sebagai password akun Anda.</p>
                                                )}
                                                {emailExists && (
                                                    <p className="text-xs text-blue-600">
                                                        Data akun ditemukan dan dikunci agar sesuai akun terdaftar.
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="guest-instance" className="font-semibold text-gray-700">Instansi</Label>
                                                <Input
                                                    id="guest-instance"
                                                    type="text"
                                                    placeholder="Instansi / perusahaan"
                                                    value={guestFormData.instance}
                                                    onChange={(e) => updateGuestForm('instance', e.target.value)}
                                                    disabled={loading}
                                                    className="rounded-xl bg-gray-50/50 border-gray-200 focus:border-orange-500"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="guest-city" className="font-semibold text-gray-700">Kota Domisili</Label>
                                                <Input
                                                    id="guest-city"
                                                    type="text"
                                                    placeholder="Kota domisili Anda"
                                                    value={guestFormData.city}
                                                    onChange={(e) => updateGuestForm('city', e.target.value)}
                                                    disabled={loading}
                                                    className="rounded-xl bg-gray-50/50 border-gray-200 focus:border-orange-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Pilihan Jenis Kode */}
                                    <div className="space-y-2">
                                        <Label className="font-semibold text-gray-700">Jenis Kode</Label>
                                        <RadioGroup
                                            value={codeType}
                                            onValueChange={(val: 'voucher' | 'referral') => {
                                                setCodeType(val);
                                                setPromoCode('');
                                                setDiscountData(null);
                                                setReferralData(null);
                                                setPromoError('');
                                                setReferralError('');
                                                if (val === 'voucher') {
                                                    setPointsChecked(false);
                                                    setPointsToUse(0);
                                                }
                                            }}
                                            className="flex gap-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="voucher" id="code-voucher" />
                                                <Label htmlFor="code-voucher" className="cursor-pointer font-medium">Voucher</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="referral" id="code-referral" />
                                                <Label htmlFor="code-referral" className="cursor-pointer font-medium">Referral</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    {/* Input Kode Promo */}
                                    <div className="space-y-2">
                                        <Label htmlFor="promo-code" className="font-semibold text-gray-700">
                                            Punya Kode Promo?
                                        </Label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Input
                                                    id="promo-code"
                                                    type="text"
                                                    placeholder={codeType === 'voucher' ? 'Masukkan kode voucher' : 'Masukkan kode referral'}
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                                    className="rounded-xl pr-10"
                                                />
                                                {(promoLoading || referralLoading) && (
                                                    <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                                                        <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-orange-600"></div>
                                                    </div>
                                                )}
                                                {!(promoLoading || referralLoading) && promoCode && (
                                                    <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                                                        {codeType === 'voucher' ? (
                                                            discountData?.valid ? (
                                                                <Check className="h-4 w-4 text-green-600" />
                                                            ) : promoError ? (
                                                                <X className="h-4 w-4 text-red-600" />
                                                            ) : null
                                                        ) : (
                                                            referralData?.valid ? (
                                                                <Check className="h-4 w-4 text-green-600" />
                                                            ) : referralError ? (
                                                                <X className="h-4 w-4 text-red-600" />
                                                            ) : null
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {
                                                    setPromoCode('');
                                                    setDiscountData(null);
                                                    setReferralData(null);
                                                    setPromoError('');
                                                    setReferralError('');
                                                }}
                                                className="h-10 w-10 shrink-0 border border-orange-200 rounded-xl text-orange-500 hover:bg-orange-50 hover:text-orange-600"
                                            >
                                                <RotateCcw className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {codeType === 'voucher' && promoError && (
                                            <p className="text-sm text-red-600">{promoError}</p>
                                        )}
                                        {codeType === 'voucher' && discountData?.valid && (
                                            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                                                <div className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-600" />
                                                    <p className="text-sm font-medium text-green-800">
                                                        Voucher "{discountData.discount_code.code}" berhasil diterapkan!
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-xs text-green-600">
                                                    {discountData.discount_code.name} - Diskon {discountData.discount_code.formatted_value}
                                                </p>
                                            </div>
                                        )}
                                        {codeType === 'referral' && referralError && (
                                            <p className="text-sm text-red-600">{referralError}</p>
                                        )}
                                        {codeType === 'referral' && referralData?.valid && (
                                            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                                                <div className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-600" />
                                                    <p className="text-sm font-medium text-green-800">
                                                        Kode referral valid!
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-xs text-green-600">
                                                    Pembelian pertama Anda dirujuk oleh {referralData.referrer?.name}. Reward poin akan masuk setelah pembayaran sukses.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Point Reward/Redeem Section */}
                                    {(isLoggedIn || emailExists) && userPoints > 0 && (
                                        <div className="space-y-4 rounded-xl border border-gray-100 p-4 bg-gray-50/50">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-base font-semibold text-gray-700">Gunakan Reward Point</Label>
                                                    <p className="text-muted-foreground text-xs">
                                                        Anda memiliki {userPoints.toLocaleString('id-ID')} poin (Rp {userPoints.toLocaleString('id-ID')})
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={pointsChecked}
                                                    disabled={codeType === 'voucher' && !!discountData?.valid}
                                                    onCheckedChange={(checked) => {
                                                        setPointsChecked(checked);
                                                        if (checked) {
                                                            const autoPoints = Math.min(userPoints, maxPointsAllowed);
                                                            setPointsToUse(autoPoints);
                                                            setPointsError('');
                                                        } else {
                                                            setPointsToUse(0);
                                                            setPointsError('');
                                                        }
                                                    }}
                                                />
                                            </div>

                                            {pointsChecked && (
                                                <div className="space-y-2">
                                                    <Label htmlFor="points-input" className="text-sm font-medium text-gray-700">Jumlah poin yang digunakan</Label>
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            id="points-input"
                                                            type="number"
                                                            max={Math.min(userPoints, maxPointsAllowed)}
                                                            min={1}
                                                            value={pointsToUse || ''}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value) || 0;
                                                                if (val > userPoints) {
                                                                    setPointsError('Poin melebihi saldo Anda.');
                                                                } else if (val > maxPointsAllowed) {
                                                                    setPointsError(`Maksimal poin yang dapat digunakan adalah ${maxPointsAllowed}.`);
                                                                } else {
                                                                    setPointsError('');
                                                                }
                                                                setPointsToUse(val);
                                                            }}
                                                            className="rounded-xl"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setPointsToUse(Math.min(userPoints, maxPointsAllowed));
                                                                setPointsError('');
                                                            }}
                                                            className="rounded-xl border-orange-200 text-orange-500 hover:bg-orange-50"
                                                        >
                                                            Maksimal
                                                        </Button>
                                                    </div>
                                                    {pointsError && <p className="text-xs text-red-600">{pointsError}</p>}
                                                    {codeType === 'voucher' && !!discountData?.valid && (
                                                        <p className="text-xs text-amber-600">Poin tidak dapat digunakan bersamaan dengan kode voucher.</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="space-y-2 pt-2 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Harga Normal</span>
                                            <span className="font-semibold text-gray-500 line-through">
                                                {rupiahFormatter.format(bundle.strikethrough_price)}
                                            </span>
                                        </div>

                                        {bundleDiscount > 0 && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Diskon Bundle</span>
                                                <span className="font-semibold text-red-500">-{rupiahFormatter.format(bundleDiscount)}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Harga Bundle</span>
                                            <span className="font-semibold text-gray-800">
                                                {rupiahFormatter.format(bundle.price)}
                                            </span>
                                        </div>

                                        {/* Promo Discount */}
                                        {codeType === 'voucher' && discountData?.valid && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Diskon Promo ({discountData.discount_code.code})</span>
                                                <span className="font-semibold text-green-600">
                                                    -{rupiahFormatter.format(discountData.discount_amount)}
                                                </span>
                                            </div>
                                        )}

                                        {/* Points Discount */}
                                        {pointsChecked && pointsToUse > 0 && !pointsError && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Potongan Poin</span>
                                                <span className="font-semibold text-green-600">
                                                    -{rupiahFormatter.format(pointsToUse)}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Biaya Transaksi</span>
                                            <span className="font-semibold text-gray-800">
                                                {rupiahFormatter.format(transactionFee)}
                                            </span>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="flex items-center justify-between text-base">
                                            <span className="font-bold text-gray-900">Total Pembayaran</span>
                                            <span className="text-[#FA5F25] text-xl font-bold">
                                                {rupiahFormatter.format(totalPrice)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Referral Info */}
                                    {referralInfo.hasActive && (
                                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                                            <p className="text-sm font-medium text-blue-800">
                                                🎁 Menggunakan kode referral: <span className="font-bold">{referralInfo.code}</span>
                                            </p>
                                            <p className="mt-1 text-xs text-blue-600">
                                                Anda membantu teman Anda mendapatkan komisi!
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3 pt-2">
                                        <Checkbox
                                            id="terms"
                                            checked={termsAccepted}
                                            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                                            className="mt-0.5"
                                        />
                                        <Label htmlFor="terms" className="text-xs text-gray-600 leading-tight">
                                            Saya menyetujui{' '}
                                            <a
                                                href="/terms-and-conditions"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-orange-600 hover:underline font-semibold"
                                            >
                                                syarat dan ketentuan
                                            </a>{' '}
                                            yang berlaku
                                        </Label>
                                    </div>
                                    <Button
                                        className="w-full "
                                        type="submit"
                                        disabled={!termsAccepted || loading}
                                    >
                                        {loading ? 'Memproses...' : 'Bayar Sekarang'}
                                    </Button>
                                    <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5 mt-2">
                                        Pembayaran aman dan terenkripsi 🔒
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
