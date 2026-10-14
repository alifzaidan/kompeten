import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, MoveRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqCategory {
    id: string;
    title: string;
    icon?: string;
    faqs: FaqItem[];
}

export default function FaqSection() {
    const { t } = useTranslation('home');

    const [expanded, setExpanded] = useState<Record<string, React.Key | null>>({
        general: 'faq-0',
        learning: null,
        certificate: null,
        payment: null,
        technical: null,
    });

    const faqCategoryKeys = ['general', 'learning', 'certificate', 'payment', 'technical'] as const;
    const faqCategories: FaqCategory[] = faqCategoryKeys.map((catKey) => {
        const items = (t(`faq.items.${catKey}`, { returnObjects: true }) as Array<{ q: string; a: string }>) || [];
        return {
            id: catKey,
            title: t(`faq.categories.${catKey}`),
            faqs: Array.isArray(items) ? items.map((item) => ({ question: item.q, answer: item.a })) : [],
        };
    });

    const handleExpandedChange = (category: string, value: React.Key | null) => {
        setExpanded((prev) => ({
            ...prev,
            [category]: value,
        }));
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8">
            <h6 className="text-primary mb-3 text-xl font-semibold">{t('faq.badge')}</h6>
            <div className="mb-8 flex flex-col justify-between gap-2 md:flex-row">
                <h2 className="max-w-lg text-3xl font-semibold md:text-4xl">{t('faq.title')}</h2>
                <p className="text-muted-foreground max-w-xl md:text-right">
                    {t('faq.subtitle')}
                </p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <div className="flex flex-col gap-8 lg:flex-row">
                    <TabsList className="flex w-full flex-row justify-start gap-3 overflow-x-auto bg-transparent px-1 py-2 lg:w-64 lg:flex-col lg:items-start lg:overflow-x-visible lg:px-0 lg:py-0">
                        {faqCategories.map((category) => (
                            <TabsTrigger
                                key={category.id}
                                value={category.id}
                                className="data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 flex w-full flex-shrink-0 items-center justify-between gap-3 rounded-full border border-neutral-200 bg-transparent p-5 text-left text-gray-700 transition-all hover:cursor-pointer hover:bg-gray-100 data-[state=active]:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                <span className="font-medium whitespace-nowrap">{category.title}</span>
                                <span className="text-2xl">
                                    <MoveRight />
                                </span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="flex-1 lg:h-[300px] lg:overflow-y-auto lg:pr-2">
                        {faqCategories.map((category) => (
                            <TabsContent key={category.id} value={category.id} className="mt-0">
                                <Accordion
                                    className="flex w-full flex-col gap-2"
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    expandedValue={expanded[category.id]}
                                    onValueChange={(value) => handleExpandedChange(category.id, value)}
                                >
                                    {category.faqs.map((faq, index) => (
                                        <AccordionItem
                                            key={`faq-${index}`}
                                            value={`faq-${index}`}
                                            className={`rounded-lg px-4 py-2 transition-colors hover:bg-neutral-100 ${
                                                expanded[category.id] === `faq-${index}` ? 'border-primary dark:bg-primary/10 bg-neutral-100' : ''
                                            }`}
                                        >
                                            <AccordionTrigger className="w-full text-left hover:cursor-pointer">
                                                <div className="flex w-full items-center justify-between gap-4">
                                                    <p className="font-medium text-gray-900 md:text-lg dark:text-gray-50">{faq.question}</p>
                                                    <ChevronDown className="text-primary h-5 w-5 shrink-0 transition-transform duration-200 group-data-expanded:-rotate-180" />
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <p className="text-sm text-gray-600 md:text-base dark:text-gray-400">{faq.answer}</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </TabsContent>
                        ))}
                    </div>
                </div>
            </Tabs>
        </section>
    );
}
