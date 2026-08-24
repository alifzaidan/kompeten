import DeleteConfirmDialog from '@/components/delete-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
    ArrowLeft,
    CheckCircle2,
    Edit,
    KeyRound,
    Mail,
    Phone,
    Shield,
    Trash,
    User as UserIcon,
    XCircle,
} from 'lucide-react';
import { PermissionGroup } from './permission-selector';

interface StaffDetail {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    instance?: string;
    city?: string;
    avatar?: string;
    email_verified_at?: string;
    created_at: string;
    permissions: string[];
}

interface ShowStaffProps {
    staff: StaffDetail;
    permission_modules: PermissionGroup[];
}

export default function ShowStaff({ staff, permission_modules }: ShowStaffProps) {
    const modules = permission_modules
        .map((group) => ({
            ...group,
            modules: group.modules.filter((m) => m.key !== 'earnings'),
        }))
        .filter((group) => group.modules.length > 0);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Staff',
            href: '/admin/staff',
        },
        {
            title: staff.name,
            href: `/admin/staff/${staff.id}`,
        },
    ];

    const handleDelete = () => {
        router.delete(route('staff.destroy', staff.id));
    };

    const hasPermission = (permission: string) => staff.permissions.includes(permission);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((w) => w.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
    };

    const avatarSrc = staff.avatar
        ? staff.avatar.startsWith('http') || staff.avatar.startsWith('/')
            ? staff.avatar
            : `/storage/${staff.avatar}`
        : null;

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Staff - ${staff.name}`} />

            <div className="px-4 py-4 md:px-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">{staff.name}</h1>
                        <p className="text-muted-foreground text-sm">Detail data akun staff dan hak akses menu.</p>
                    </div>
                    <Button variant="outline" asChild className="hover:cursor-pointer">
                        <Link href={route('staff.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
                    {/* Left Column: Tabs Content */}
                    <Tabs defaultValue="detail" className="lg:col-span-2">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="detail">Informasi Akun</TabsTrigger>
                            <TabsTrigger value="permissions">
                                Hak Akses Menu ({staff.permissions.length})
                            </TabsTrigger>
                        </TabsList>

                        {/* Tab 1: Staff Details */}
                        <TabsContent value="detail">
                            <div className="rounded-lg border p-4 space-y-4">
                                <div className="flex items-center gap-4 pb-4 border-b">
                                    {avatarSrc ? (
                                        <img
                                            src={avatarSrc}
                                            alt={staff.name}
                                            className="h-16 w-16 rounded-full object-cover border"
                                        />
                                    ) : (
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                                            {getInitials(staff.name)}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-bold">{staff.name}</h3>
                                        <p className="text-sm text-muted-foreground">{staff.email}</p>
                                        <div className="mt-1 flex items-center gap-2">
                                            <Badge variant="secondary" className="text-xs">
                                                Role: Staff
                                            </Badge>
                                            {staff.email_verified_at ? (
                                                <Badge variant="outline" className="text-green-600 border-green-300 text-xs">
                                                    ✓ Terverifikasi
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-amber-600 border-amber-300 text-xs">
                                                    Belum Verifikasi
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-semibold text-muted-foreground w-1/3">Nama Lengkap</TableCell>
                                            <TableCell>{staff.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold text-muted-foreground">Email</TableCell>
                                            <TableCell>{staff.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold text-muted-foreground">Nomor Telepon</TableCell>
                                            <TableCell>{staff.phone_number || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold text-muted-foreground">Instansi / Asal</TableCell>
                                            <TableCell>{staff.instance || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold text-muted-foreground">Kota Domisili</TableCell>
                                            <TableCell>{staff.city || '-'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold text-muted-foreground">Total Hak Akses</TableCell>
                                            <TableCell>
                                                <div className="inline-flex items-center gap-1.5 rounded bg-gray-200 px-2 py-1 font-semibold text-xs text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                                                    <KeyRound className="h-3 w-3 text-primary" />
                                                    <span>{staff.permissions.length} Akses Diberikan</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        {/* Tab 2: Permissions Matrix */}
                        <TabsContent value="permissions">
                            <div className="space-y-4 rounded-lg border p-4">
                                <div className="flex items-center justify-between border-b pb-3">
                                    <div>
                                        <h2 className="text-lg font-medium">Hak Akses Menu</h2>
                                        <p className="text-muted-foreground text-xs">
                                            Daftar menu dan tingkat akses yang diizinkan untuk staff ini.
                                        </p>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {staff.permissions.length} Akses Aktif
                                    </Badge>
                                </div>

                                <div className="space-y-4">
                                    {modules.map((group) => {
                                        const groupModuleKeys = group.modules.flatMap((m) => [`${m.key}.view`, `${m.key}.manage`]);
                                        const groupActiveCount = groupModuleKeys.filter((p) => hasPermission(p)).length;

                                        return (
                                            <div key={group.group} className="rounded-lg border overflow-hidden">
                                                <div className="flex items-center justify-between bg-muted/40 px-4 py-2.5 border-b">
                                                    <h3 className="text-sm font-semibold">{group.group}</h3>
                                                    <span className="text-xs text-muted-foreground">
                                                        {groupActiveCount} dari {groupModuleKeys.length} akses aktif
                                                    </span>
                                                </div>
                                                <div className="divide-y">
                                                    {group.modules.map((module) => {
                                                        const canView = hasPermission(`${module.key}.view`);
                                                        const canManage = hasPermission(`${module.key}.manage`);

                                                        return (
                                                            <div
                                                                key={module.key}
                                                                className="flex items-center justify-between px-4 py-3 text-sm hover:bg-muted/10 transition-colors"
                                                            >
                                                                <span className="font-medium">{module.label}</span>
                                                                <div className="flex items-center gap-2">
                                                                    {canView ? (
                                                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                                                                            <CheckCircle2 className="mr-1 h-3 w-3" />
                                                                            Lihat
                                                                        </span>
                                                                    ) : null}

                                                                    {canManage ? (
                                                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-300">
                                                                            <CheckCircle2 className="mr-1 h-3 w-3" />
                                                                            Kelola
                                                                        </span>
                                                                    ) : null}

                                                                    {!canView && !canManage && (
                                                                        <span className="inline-flex items-center text-xs text-muted-foreground/60">
                                                                            <XCircle className="mr-1 h-3 w-3" />
                                                                            Tidak Ada Akses
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Right Column: Actions */}
                    <div>
                        <h2 className="my-2 text-lg font-medium">Edit & Kustom</h2>
                        <div className="space-y-4 rounded-lg border p-4">
                            <div className="space-y-2">
                                <Button className="w-full hover:cursor-pointer" variant="secondary" asChild>
                                    <Link href={route('staff.edit', staff.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Staff & Hak Akses
                                    </Link>
                                </Button>
                                <DeleteConfirmDialog
                                    trigger={
                                        <Button variant="destructive" className="w-full hover:cursor-pointer">
                                            <Trash className="mr-2 h-4 w-4" /> Hapus Staff
                                        </Button>
                                    }
                                    title="Apakah Anda yakin ingin menghapus staff ini?"
                                    itemName={staff.name}
                                    onConfirm={handleDelete}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer timestamp */}
                <div className="mt-4 rounded-lg border p-4">
                    <h3 className="text-muted-foreground text-center text-sm">
                        Dibuat pada : {format(new Date(staff.created_at), 'dd MMMM yyyy HH:mm', { locale: id })}
                    </h3>
                </div>
            </div>
        </AdminLayout>
    );
}
