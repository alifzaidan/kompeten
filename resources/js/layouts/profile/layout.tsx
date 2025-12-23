import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Banknote, BookText, LayoutDashboard, MonitorPlay, Presentation, Settings } from 'lucide-react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/profile/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Kelas Online',
        href: '/profile/my-courses',
        icon: BookText,
    },
    {
        title: 'Bootcamp',
        href: '/profile/my-bootcamps',
        icon: Presentation,
    },
    {
        title: 'Webinar',
        href: '/profile/my-webinars',
        icon: MonitorPlay,
    },
    {
        title: 'Transaksi',
        href: '/profile/transactions',
        icon: Banknote,
    },
    {
        title: 'Pengaturan Akun',
        href: '/settings/profile',
        icon: Settings,
    },
];

export default function ProfileLayout({ children }: PropsWithChildren) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <div className="mx-auto w-full max-w-7xl sm:px-4">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
                    <aside className="w-full rounded-2xl border bg-white/95 p-4 shadow-lg backdrop-blur-sm lg:w-64 lg:max-w-xl dark:bg-gray-800/95">
                        <div className="mb-6 border-b pb-4 text-center dark:border-gray-700">
                            <Avatar className="mx-auto mb-3 size-20 overflow-hidden rounded-full ring-4 ring-orange-100 dark:ring-orange-900/30">
                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                <AvatarFallback className="bg-secondary text-primary-foreground text-xl font-bold">
                                    {getInitials(auth.user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{auth.user.name}</h1>
                        </div>
                        <nav className="flex flex-col space-y-1">
                            {sidebarNavItems.map((item, index) => (
                                <Button
                                    key={`${item.href}-${index}`}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('hover:bg-secondary/80 w-full justify-start gap-3 font-medium transition-colors', {
                                        'bg-secondary text-primary-foreground hover:bg-secondary/80 hover:text-primary-foreground':
                                            currentPath === item.href,
                                    })}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon className="h-4 w-4" />} {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>

                    <div className="max-w-4xl flex-1 xl:max-w-5xl">{children}</div>
                </div>
            </div>
        </div>
    );
}
