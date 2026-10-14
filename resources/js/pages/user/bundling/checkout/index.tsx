import { parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { useTranslation } from 'react-i18next';
import InstallmentOptions, { ActiveInstallmentData, InstallmentTermOption } from '@/components/installment-options';

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
    installmentTerms?: InstallmentTermOption[];
    activeInstallment?: ActiveInstallmentData | null;
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

export default function CheckoutBundle({
    bundle,
    hasAccess,
    pendingInvoiceUrl,
    pendingInvoice,
    referralInfo,
    installmentTerms = [],
    activeInstallment: initialActiveInstallment = null,
}: CheckoutBundleProps) {
    const { t, i18n } = useTranslation('user');
    const numLocale = i18n.language === 'en' ? 'en-US' : 'id-ID';
    const { auth } = usePage<SharedData>().props;
    const isLoggedIn = !!auth.user;
    const isProfileComplete = isLoggedIn && auth.user?.phone_number && auth.user?.instance && auth.user?.city;

    const [activeInstallment, setActiveInstallment] = useState<ActiveInstallmentData | null>(initialActiveInstallment);
    const isAnyTermOverdue = !initialActiveInstallment && installmentTerms.some((t: any) => {
        if (!t.due_date) return false;
        try {
            const d = typeof t.due_date === 'string' ? parseISO(t.due_date) : new Date(t.due_date);
            if (isNaN(d.getTime())) return false;
            const endOfDay = new Date(d);
            endOfDay.setHours(23, 59, 59, 999);
            return new Date() > endOfDay;
        } catch {
            return false;
        }
    });

    const [paymentTab, setPaymentTab] = useState<'full' | 'installment'>(initialActiveInstallment ? 'installment' : 'full');
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
                setPromoError(response.data.message || t('bundling.checkout.errors.invalidPromo'));
            }
        } catch (error: unknown) {
            setDiscountData(null);
            if (axios.isAxiosError(error)) {
                setPromoError(error.response?.data?.message || t('bundling.checkout.errors.promoValidateError'));
            } else {
                setPromoError(t('bundling.checkout.errors.promoValidateError'));
            }
        } finally {
            setPromoLoading(false);
        }
    }, [bundle.id, bundle.price, emailExists, guestFormData.email, isLoggedIn, promoCode, t]);

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
                setReferralError(data.message || t('bundling.checkout.errors.invalidReferral'));
            }
        } catch (error: unknown) {
            setReferralData(null);
            if (axios.isAxiosError(error)) {
                setReferralError(error.response?.data?.message || t('bundling.checkout.errors.referralValidateError'));
            } else {
                setReferralError(t('bundling.checkout.errors.referralValidateError'));
            }
        } finally {
            setReferralLoading(false);
        }
    }, [promoCode, isLoggedIn, guestFormData.email, t]);

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
                const response = await axios.post('/api/check-email', {
                    email,
                    bundle_id: bundle.id,
                });
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

                    if (data.active_installment) {
                        setActiveInstallment(data.active_installment);
                        setPaymentTab('installment');
                    } else {
                        setActiveInstallment(null);
                    }
                } else {
                    setEmailExists(false);
                    setActiveInstallment(null);
                    setUserPoints(0);
                    setPointsChecked(false);
                    setPointsToUse(0);
                }
            } catch {
                setEmailExists(false);
                setActiveInstallment(null);
                setUserPoints(0);
                setPointsChecked(false);
                setPointsToUse(0);
            } finally {
                setCheckingEmail(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [guestFormData.email, isLoggedIn, bundle.id]);

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
            return { time: t('bundling.checkout.expiryExpired'), status: 'expired' };
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours < 1) {
            return { time: t('bundling.checkout.expiryMinutes', { minutes }), status: 'urgent' };
        }

        return { time: t('bundling.checkout.expiryHoursMinutes', { hours, minutes }), status: hours < 3 ? 'urgent' : 'normal' };
    };

    const ensureAuthenticated = async (): Promise<boolean> => {
        if (isLoggedIn) return true;

        if (!guestFormData.email || !guestFormData.phone_number) {
            toast.error(t('bundling.checkout.errors.emailPhoneRequired'));
            return false;
        }

        if (!guestFormData.instance) {
            toast.error(t('bundling.checkout.errors.instanceRequired'));
            return false;
        }

        if (!guestFormData.city) {
            toast.error(t('bundling.checkout.errors.cityRequired'));
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
                    throw new Error(loginData.message || t('bundling.checkout.errors.autoLoginFailed'));
                }
            } else {
                if (!guestFormData.name) {
                    toast.error(t('bundling.checkout.errors.nameRequired'));
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
                    throw new Error(regResponse.data.message || t('bundling.checkout.errors.registerFailed'));
                }
            }

            return true;
        } catch (error: unknown) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || getErrorMessage(error, t('bundling.checkout.errors.processLoginFailed')));
            } else {
                toast.error(getErrorMessage(error, t('bundling.checkout.errors.processLoginFailed')));
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
                    throw new Error(data.message || t('bundling.checkout.errors.createInvoiceFailed'));
                }
            } catch (error) {
                console.error('Payment error:', error);
                throw error;
            }
        },
        [bundle.id, bundle.price, bundleDiscount, transactionFee, pointsChecked, pointsToUse, codeType, referralData, promoCode, referralInfo, t],
    );

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsAccepted) {
            alert(t('bundling.checkout.errors.termsRequired'));
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
                ? error.response?.data?.message || t('bundling.checkout.errors.paymentFailed')
                : error instanceof Error
                  ? error.message
                  : t('bundling.checkout.errors.paymentFailed');
            toast.error(message);
            setLoading(false);
        }
    };

    if (isLoggedIn && !isProfileComplete) {
        return (
            <div className="min-h-screen bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-12">
                <Head title={t('bundling.checkout.incompleteProfileTitle')} />
                <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xs text-center space-y-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                        <User size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('bundling.checkout.incompleteProfileTitle')}</h2>
                        <p className="text-sm text-gray-500">
                            {t('bundling.checkout.incompleteProfileDesc')}
                        </p>
                    </div>
                    <Button asChild className="w-full py-6 rounded-full bg-[#F9A885] hover:bg-[#F9A885]/90 text-white font-semibold shadow-xs">
                        <Link href={route('profile.edit', { redirect: window.location.href })}>{t('bundling.checkout.btnCompleteProfile')}</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const renderFullPaymentForm = () => (
        <form onSubmit={handleCheckout} className="space-y-4">
            {/* Pilihan Jenis Kode */}
            <div className="space-y-2">
                <Label className="font-semibold text-gray-700">{t('bundling.checkout.codeType')}</Label>
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
                        <Label htmlFor="code-voucher" className="cursor-pointer font-medium">{t('bundling.checkout.voucher')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="referral" id="code-referral" />
                        <Label htmlFor="code-referral" className="cursor-pointer font-medium">{t('bundling.checkout.referral')}</Label>
                    </div>
                </RadioGroup>
            </div>

            {/* Input Kode Promo */}
            <div className="space-y-2">
                <Label htmlFor="promo-code" className="font-semibold text-gray-700">
                    {t('bundling.checkout.havePromoCode')}
                </Label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Input
                            id="promo-code"
                            type="text"
                            placeholder={codeType === 'voucher' ? t('bundling.checkout.enterVoucherCode') : t('bundling.checkout.enterReferralCode')}
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
                                {t('bundling.checkout.voucherSuccess', { code: discountData.discount_code.code })}
                            </p>
                        </div>
                        <p className="mt-1 text-xs text-green-600">
                            {t('bundling.checkout.voucherDiscount', { name: discountData.discount_code.name, value: discountData.discount_code.formatted_value })}
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
                                {t('bundling.checkout.referralSuccess')}
                            </p>
                        </div>
                        <p className="mt-1 text-xs text-green-600">
                            {t('bundling.checkout.referralReferredBy', { name: referralData.referrer?.name })}
                        </p>
                    </div>
                )}
            </div>

            {/* Point Reward/Redeem Section */}
            {(isLoggedIn || emailExists) && userPoints > 0 && (
                <div className="space-y-4 rounded-xl border border-gray-100 p-4 bg-gray-50/50">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base font-semibold text-gray-700">{t('bundling.checkout.useRewardPoints')}</Label>
                            <p className="text-muted-foreground text-xs">
                                {t('bundling.checkout.pointsBalance', { points: userPoints.toLocaleString(numLocale), rupiah: userPoints.toLocaleString(numLocale) })}
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
                            <Label htmlFor="points-input" className="text-sm font-medium text-gray-700">{t('bundling.checkout.pointsToUse')}</Label>
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
                                            setPointsError(t('bundling.checkout.pointsExceedBalance'));
                                        } else if (val > maxPointsAllowed) {
                                            setPointsError(t('bundling.checkout.pointsExceedMax', { max: maxPointsAllowed }));
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
                                    {t('bundling.checkout.maxPoints')}
                                </Button>
                            </div>
                            {pointsError && <p className="text-xs text-red-600">{pointsError}</p>}
                            {codeType === 'voucher' && !!discountData?.valid && (
                                <p className="text-xs text-amber-600">{t('bundling.checkout.pointsConflictVoucher')}</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-2 pt-2 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('bundling.checkout.normalPrice')}</span>
                    <span className="font-semibold text-gray-500 line-through">
                        {rupiahFormatter.format(bundle.strikethrough_price)}
                    </span>
                </div>

                {bundleDiscount > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">{t('bundling.checkout.bundleDiscount')}</span>
                        <span className="font-semibold text-red-500">-{rupiahFormatter.format(bundleDiscount)}</span>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('bundling.checkout.bundlePrice')}</span>
                    <span className="font-semibold text-gray-800">
                        {rupiahFormatter.format(bundle.price)}
                    </span>
                </div>

                {/* Promo Discount */}
                {codeType === 'voucher' && discountData?.valid && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">{t('bundling.checkout.promoDiscount', { code: discountData.discount_code.code })}</span>
                        <span className="font-semibold text-green-600">
                            -{rupiahFormatter.format(discountData.discount_amount)}
                        </span>
                    </div>
                )}

                {/* Points Discount */}
                {pointsChecked && pointsToUse > 0 && !pointsError && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">{t('bundling.checkout.pointsDiscount')}</span>
                        <span className="font-semibold text-green-600">
                            -{rupiahFormatter.format(pointsToUse)}
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('bundling.checkout.transactionFee')}</span>
                    <span className="font-semibold text-gray-800">
                        {rupiahFormatter.format(transactionFee)}
                    </span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between text-base">
                    <span className="font-bold text-gray-900">{t('bundling.checkout.totalPayment')}</span>
                    <span className="text-[#FA5F25] text-xl font-bold">
                        {rupiahFormatter.format(totalPrice)}
                    </span>
                </div>
            </div>

            {/* Referral Info */}
            {referralInfo.hasActive && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                    <p className="text-sm font-medium text-blue-800">
                        {t('bundling.checkout.referralActiveNotice', { code: referralInfo.code })}
                    </p>
                    <p className="mt-1 text-xs text-blue-600">
                        {t('bundling.checkout.referralHelpFriend')}
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
                    {t('bundling.checkout.agreeTerms')}{' '}
                    <a
                        href="/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline font-semibold"
                    >
                        {t('bundling.checkout.termsAndConditions')}
                    </a>{' '}
                    {t('bundling.checkout.termsNoticeSuffix')}
                </Label>
            </div>
            <Button
                className="w-full "
                type="submit"
                disabled={!termsAccepted || loading}
            >
                {loading ? t('bundling.checkout.processing') : t('bundling.checkout.btnPayNow')}
            </Button>
            <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5 mt-2">
                {t('bundling.checkout.safePaymentNotice')}
            </p>
        </form>
    );

    return (
        <UserLayout>
            <Head title={`${t('bundling.checkout.headTitle')} - ${bundle.title}`} />
            <div className="min-h-screen w-full bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat py-8 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-7xl">
                    {/* Breadcrumbs */}
                    <div className="text-xs md:text-sm text-gray-500 mb-2 flex items-center gap-1.5 font-medium">
                        <Link href="/bundling" className="hover:text-orange-600">
                            {t('bundling.checkout.breadcrumbBundling')}
                        </Link>
                        <span className="text-gray-400">/</span>
                        <Link href={`/bundling/${bundle.slug}`} className="hover:text-orange-600 truncate max-w-[200px] sm:max-w-none">
                            {bundle.title}
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">{t('bundling.checkout.breadcrumbCheckout')}</span>
                    </div>

                    {/* Page Title */}
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                        {t('bundling.checkout.headTitle')}
                    </h1>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
                        {/* Left Column */}
                        <div className="lg:col-span-2">
                            {/* Detail Pesanan Card */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-6">
                                <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                                    <ShoppingCart className="h-5 w-5 text-gray-900" />
                                    <h3 className="font-bold text-gray-900 text-lg">{t('bundling.checkout.orderDetail')}</h3>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                    <img
                                        src={bundle.thumbnail ? `/storage/${bundle.thumbnail}` : '/assets/images/placeholder.png'}
                                        alt={bundle.title}
                                        className="w-32 h-20 sm:w-40 sm:h-24 rounded-xl object-cover border border-gray-100"
                                    />
                                    <div className="flex-1 text-center sm:text-left">
                                        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">
                                            {t('bundling.checkout.breadcrumbBundling')}
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
                                    <h4 className="font-bold text-gray-900 mb-4">{t('bundling.checkout.itemsCount', { count: bundle.bundle_items_count })}</h4>
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
                                                            ? t('bundling.checkout.course')
                                                            : item.bundleable_type.includes('Bootcamp')
                                                              ? t('bundling.checkout.bootcamp')
                                                              : t('bundling.checkout.webinar')}
                                                    </p>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-700">
                                                    {item.price === 0 ? t('bundling.checkout.free') : rupiahFormatter.format(item.price)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="rounded-xl bg-green-50 p-4 border border-green-100">
                                    <h4 className="mb-2 flex items-center gap-2 font-bold text-green-800">
                                        <BadgeCheck size={18} />
                                        {t('bundling.checkout.packageBenefits')}
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-xs text-green-700 font-medium">
                                            <Check size={14} className="mt-0.5 flex-shrink-0" />
                                            <span>
                                                {t('bundling.checkout.benefitSave', { percent: Math.round(((bundle.strikethrough_price - bundle.price) / bundle.strikethrough_price) * 100) })}
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2 text-xs text-green-700 font-medium">
                                            <Check size={14} className="mt-0.5 flex-shrink-0" />
                                            <span>{t('bundling.checkout.benefitAccess', { count: bundle.bundle_items_count })}</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-xs text-green-700 font-medium">
                                            <Check size={14} className="mt-0.5 flex-shrink-0" />
                                            <span>{t('bundling.checkout.benefitCertificate')}</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-xs text-green-700 font-medium">
                                            <Check size={14} className="mt-0.5 flex-shrink-0" />
                                            <span>{t('bundling.checkout.lifetimeAccess')}</span>
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
                                    <h2 className="text-xl font-bold">{t('bundling.checkout.alreadyHaveAccessTitle')}</h2>
                                    <p className="text-sm text-gray-500">{t('bundling.checkout.alreadyHaveAccessDesc')}</p>
                                    <Button asChild className="w-full py-6 rounded-full bg-[#F9A885] hover:bg-[#F9A885]/90 text-white font-semibold shadow-xs">
                                        <a href={route('profile.index')}>{t('bundling.checkout.dashboardBtn')}</a>
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
                                                        <h4 className="font-bold text-red-700">{t('bundling.checkout.paymentFailedOrExpired')}</h4>
                                                    </>
                                                );
                                            }
                                            return (
                                                <>
                                                    <Hourglass className="h-5 w-5 text-yellow-600 animate-pulse" />
                                                    <h4 className="font-bold text-yellow-950">{t('bundling.checkout.pendingPayment')}</h4>
                                                </>
                                            );
                                        })()}
                                    </div>

                                    <div className="space-y-4">
                                        {pendingInvoice && (
                                            <div className="space-y-2 rounded-xl bg-gray-50/50 p-4 border border-gray-100 text-sm">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-500">{t('bundling.checkout.invoiceCodeLabel')}</span>
                                                    <span className="font-semibold text-gray-800">{pendingInvoice.invoice_code}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-500">{t('bundling.checkout.totalPayment')}</span>
                                                    <span className="text-lg font-bold text-[#FA5F25]">
                                                        Rp {pendingInvoice.amount.toLocaleString(numLocale)}
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
                                                        {t('bundling.checkout.paymentExpiredHelp')}
                                                    </div>
                                                );
                                            }

                                            const targetUrl = pendingInvoice?.invoice_url || pendingInvoiceUrl;
                                            return targetUrl ? (
                                                <Button asChild className="w-full py-6 rounded-full bg-[#F9A885] hover:bg-[#F9A885]/90 text-white font-semibold shadow-xs">
                                                    <a href={targetUrl}>{t('bundling.checkout.btnContinuePayment')}</a>
                                                </Button>
                                            ) : null;
                                        })()}

                                        <div className="flex gap-2">
                                            <Button onClick={() => window.location.reload()} variant="outline" className="flex-1 py-6 rounded-full border-gray-200 text-gray-700">
                                                {t('bundling.checkout.btnCheckStatus')}
                                            </Button>
                                            {pendingInvoice && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="flex-1 py-6 rounded-full border-red-200 text-red-600 hover:bg-red-50"
                                                    disabled={cancellingInvoice}
                                                    onClick={async () => {
                                                        if (confirm(t('bundling.checkout.confirmCancel'))) {
                                                            setCancellingInvoice(true);
                                                            try {
                                                                const res = await axios.post(route('invoice.cancel', pendingInvoice.id));
                                                                if (res.data?.success) {
                                                                    toast.success(t('bundling.checkout.cancelSuccess'));
                                                                    window.location.reload();
                                                                } else {
                                                                    toast.error(res.data?.message || t('bundling.checkout.cancelFailed'));
                                                                    setCancellingInvoice(false);
                                                                }
                                                            } catch (err: unknown) {
                                                                if (axios.isAxiosError(err)) {
                                                                    toast.error(err.response?.data?.message || t('bundling.checkout.cancelFailed'));
                                                                } else {
                                                                    toast.error(t('bundling.checkout.cancelFailed'));
                                                                }
                                                                setCancellingInvoice(false);
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {cancellingInvoice ? t('bundling.checkout.cancelling') : t('bundling.checkout.btnCancelOrder')}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-4">
                                    <h3 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">{t('bundling.checkout.paymentSummary')}</h3>

                                    {/* Data Diri for guest */}
                                    {!isLoggedIn && (
                                        <div className="space-y-4 rounded-xl border border-gray-100 p-4 bg-gray-50/50">
                                            <h4 className="font-bold text-gray-900">{t('bundling.checkout.personalDataTitle')}</h4>
                                            <div className="space-y-2">
                                                <Label htmlFor="guest-email" className="font-semibold text-gray-700">{t('bundling.checkout.emailLabel')}</Label>
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
                                                {checkingEmail && <p className="text-xs text-gray-500">{t('bundling.checkout.checkingEmail')}</p>}
                                                {emailExists && (
                                                    <p className="text-xs text-green-600">{t('bundling.checkout.emailFound')}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="guest-name" className="font-semibold text-gray-700">{t('bundling.checkout.nameLabel')}</Label>
                                                <Input
                                                    id="guest-name"
                                                    type="text"
                                                    placeholder={t('bundling.checkout.namePlaceholder')}
                                                    value={guestFormData.name}
                                                    onChange={(e) => updateGuestForm('name', e.target.value)}
                                                    disabled={emailExists}
                                                    className="rounded-xl bg-gray-50/50 border-gray-200 focus:border-orange-500"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="guest-phone" className="font-semibold text-gray-700">{t('bundling.checkout.phoneLabel')}</Label>
                                                <Input
                                                    id="guest-phone"
                                                    type="tel"
                                                    placeholder={t('bundling.checkout.phonePlaceholder')}
                                                    value={guestFormData.phone_number}
                                                    onChange={(e) => updateGuestForm('phone_number', e.target.value)}
                                                    disabled={emailExists}
                                                    className="rounded-xl bg-gray-50/50 border-gray-200 focus:border-orange-500"
                                                    required
                                                />
                                                {!emailExists && (
                                                    <p className="text-xs text-gray-500">{t('bundling.checkout.phoneNotice')}</p>
                                                )}
                                                {emailExists && (
                                                    <p className="text-xs text-blue-600">
                                                        {t('bundling.checkout.accountLockedNotice')}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="guest-instance" className="font-semibold text-gray-700">{t('bundling.checkout.instanceLabel')}</Label>
                                                <Input
                                                    id="guest-instance"
                                                    type="text"
                                                    placeholder={t('bundling.checkout.instancePlaceholder')}
                                                    value={guestFormData.instance}
                                                    onChange={(e) => updateGuestForm('instance', e.target.value)}
                                                    disabled={loading}
                                                    className="rounded-xl bg-gray-50/50 border-gray-200 focus:border-orange-500"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="guest-city" className="font-semibold text-gray-700">{t('bundling.checkout.cityLabel')}</Label>
                                                <Input
                                                    id="guest-city"
                                                    type="text"
                                                    placeholder={t('bundling.checkout.cityPlaceholder')}
                                                    value={guestFormData.city}
                                                    onChange={(e) => updateGuestForm('city', e.target.value)}
                                                    disabled={loading}
                                                    className="rounded-xl bg-gray-50/50 border-gray-200 focus:border-orange-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Tab Pilihan Pembayaran (Full / Cicilan) */}
                                    {((installmentTerms && installmentTerms.length > 0) || (activeInstallment && !activeInstallment.is_fully_paid)) && bundle.price > 0 ? (
                                        <Tabs
                                            value={paymentTab}
                                            onValueChange={(val) => {
                                                if (val === 'full' && activeInstallment && !activeInstallment.is_fully_paid) {
                                                    toast.error(t('bundling.checkout.activeInstallmentFullDisabled'));
                                                    return;
                                                }
                                                if (val === 'installment' && isAnyTermOverdue && !activeInstallment) {
                                                toast.error(t('bundling.checkout.overdueInstallmentError'));
                                                return;
                                            }
                                            setPaymentTab(val as 'full' | 'installment');
                                            }}
                                            className="w-full space-y-4"
                                        >
                                            <TabsList className="grid w-full grid-cols-2 h-10">
                                                <TabsTrigger
                                                    value="full"
                                                    disabled={!!activeInstallment && !activeInstallment.is_fully_paid}
                                                    className="text-xs sm:text-sm"
                                                >
                                                    {t('bundling.checkout.tabFullPayment')}
                                                </TabsTrigger>
                                                <TabsTrigger value="installment" disabled={isAnyTermOverdue && !activeInstallment} className="text-xs sm:text-sm">
                                                    {t('bundling.checkout.tabInstallment')} ({activeInstallment && !activeInstallment.is_fully_paid ? (activeInstallment.total_terms || activeInstallment.terms?.length) : installmentTerms.length}x)
                                                </TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="full" className="space-y-4 m-0">
                                                {renderFullPaymentForm()}
                                            </TabsContent>

                                            <TabsContent value="installment" className="space-y-4 m-0">
                                                <InstallmentOptions
                                                    productType="bundle"
                                                    productId={bundle.id}
                                                    productPrice={bundle.price}
                                                    terms={installmentTerms}
                                                    activeInstallment={activeInstallment}
                                                    termsAccepted={termsAccepted}
                                                    onTermsAcceptedChange={setTermsAccepted}
                                                    onBeforePay={async () => {
                                                        if (!activeInstallment && !termsAccepted) {
                                                            toast.error(t('bundling.checkout.errors.termsRequired'));
                                                            return false;
                                                        }
                                                        if (!isLoggedIn && (!guestFormData.email || !guestFormData.phone_number || !guestFormData.instance || !guestFormData.city || (!emailExists && !guestFormData.name))) {
                                                            toast.error(t('bundling.checkout.errors.completePersonalData'));
                                                            return false;
                                                        }
                                                        const authenticated = await ensureAuthenticated();
                                                        return authenticated;
                                                    }}
                                                />
                                            </TabsContent>
                                        </Tabs>
                                    ) : (
                                        renderFullPaymentForm()
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
