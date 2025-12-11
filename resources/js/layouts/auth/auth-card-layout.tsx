import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <Card className="rounded-xl">
                        <Link href={route('home')} className="flex items-center gap-2 self-center pt-8 font-medium">
                            <div className="flex h-9 w-16 items-center justify-center">
                                <img src="/assets/images/logo-primary.png" alt="Logo Kompeten" className="fill-current" />
                            </div>
                        </Link>
                        <CardHeader className="px-10 pt-6 pb-0 text-center">
                            <CardTitle className="text-xl">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 py-6">{children}</CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
