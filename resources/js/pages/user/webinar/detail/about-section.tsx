import { useTranslation } from 'react-i18next';

interface Webinar {
    description?: string | null;
}

export default function AboutSection({ webinar }: { webinar: Webinar }) {
    const { t } = useTranslation('user');

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <div
                    className="prose md:prose-lg max-w-none text-neutral-700 dark:text-neutral-300"
                    dangerouslySetInnerHTML={{ __html: webinar.description || `<p>${t('webinar.detail.noDescription')}</p>` }}
                ></div>
            </div>
            <div className="grid grid-cols-1 gap-8 rounded-2xl bg-neutral-100 p-6 md:grid-cols-3 dark:border-zinc-700 dark:bg-zinc-800">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-3xl font-semibold">{t('webinar.detail.expertSpeaker')}</h3>
                    <p className="text-muted-foreground text-center text-sm">
                        {t('webinar.detail.expertSpeakerDesc')}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-3xl font-semibold">{t('webinar.detail.interactiveSession')}</h3>
                    <p className="text-muted-foreground text-center text-sm">
                        {t('webinar.detail.interactiveSessionDesc')}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-3xl font-semibold">{t('webinar.detail.latestInsights')}</h3>
                    <p className="text-muted-foreground text-center text-sm">
                        {t('webinar.detail.latestInsightsDesc')}
                    </p>
                </div>
            </div>
        </section>
    );
}
