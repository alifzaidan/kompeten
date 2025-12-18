import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronUp, FileCheck, Lock, PlayCircle } from 'lucide-react';
import { useState } from 'react';

interface Course {
    description?: string | null;
    modules?: {
        title: string;
        description?: string | null;
        lessons?: {
            title: string;
            description?: string | null;
            type: 'text' | 'video' | 'file' | 'quiz';
            is_free?: boolean;
        }[];
    }[];
    tools?: { name: string; description?: string | null; icon: string | null }[];
}

export default function ModulesSection({ course }: { course: Course }) {
    const [expanded, setExpanded] = useState<React.Key | null>('0');

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <div
                    className="prose md:prose-lg max-w-none text-neutral-700 dark:text-neutral-300"
                    dangerouslySetInnerHTML={{ __html: course.description || '<p>Deskripsi tidak tersedia.</p>' }}
                ></div>
            </div>
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-4 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Materi yang akan kamu dapatkan</h2>

                <Accordion
                    className="mb-8 flex w-full flex-col gap-2 divide-y divide-neutral-200 dark:divide-neutral-700"
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    expandedValue={expanded}
                    onValueChange={setExpanded}
                >
                    {course.modules?.map((module, idx) => (
                        <AccordionItem key={idx} value={String(idx)} className="py-4">
                            <AccordionTrigger className="w-full text-left text-neutral-950 hover:cursor-pointer dark:text-neutral-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {/* <div className="border-primary bg-primary/20 text-primary dark:text-primary-foreground rounded-full border px-3 py-1 text-sm font-medium dark:bg-neutral-800">
                                            <p>{idx + 1}</p>
                                        </div> */}
                                        <FileCheck className="text-primary-foreground h-4 w-4 dark:text-neutral-50" />
                                        <p className="md:text-lg">{module.title}</p>
                                    </div>
                                    <ChevronUp className="text-primary h-4 w-4 transition-transform duration-200 group-data-expanded:-rotate-180 dark:text-neutral-50" />
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="mt-2 text-sm text-neutral-500 md:text-base dark:text-neutral-400">
                                    {module.lessons?.length ? (
                                        module.lessons.map((lesson, lidx) => (
                                            <li key={lidx} className="ms-8 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {lesson.is_free ? <PlayCircle size="14" className="text-green-500" /> : <Lock size="14" />}
                                                    <p>{lesson.title}</p>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="ms-8 text-neutral-400">Belum ada materi</li>
                                    )}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Tools yang digunakan</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {course.tools?.map((tool) => (
                        <div
                            key={tool.name}
                            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 shadow-md dark:bg-neutral-800"
                        >
                            <img src={tool.icon ? `/storage/${tool.icon}` : '/assets/images/placeholder.png'} alt={tool.name} className="w-16" />
                            <h3 className="text-lg font-semibold md:text-xl">{tool.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
