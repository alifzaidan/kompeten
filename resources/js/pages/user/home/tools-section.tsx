import { InfiniteSlider } from '@/components/ui/infinite-slider';

interface Tool {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export default function ToolsSection({ tools }: { tools: Tool[] }) {
    return (
        <section className="w-full py-8">
            <h2 className="mx-auto mb-8 max-w-2xl text-center text-3xl font-semibold md:text-4xl">Technology We Use</h2>
            <InfiniteSlider speedOnHover={20} gap={24} className="p-4">
                {tools.map((tool) => (
                    <div key={tool.id} className="flex items-center justify-center gap-3 rounded-lg border-2 bg-white px-6 py-4">
                        <div className="rounded-lg bg-white p-3 inset-shadow-sm inset-shadow-neutral-500">
                            <img src={tool.icon ? `/storage/${tool.icon}` : '/assets/images/placeholder.png'} alt={tool.name} className="h-12" />
                        </div>
                        <div className="md:space-y-2">
                            <h3 className="text-xl font-semibold md:text-2xl dark:text-gray-900">{tool.name}</h3>
                            <p className="text-sm text-gray-500">{tool.description}</p>
                        </div>
                    </div>
                ))}
            </InfiniteSlider>
            <InfiniteSlider speedOnHover={20} gap={24} className="p-4" reverse>
                {tools.map((tool) => (
                    <div key={tool.id} className="flex items-center justify-center gap-3 rounded-lg border-2 bg-white px-6 py-4">
                        <div className="rounded-lg bg-white p-3 inset-shadow-sm inset-shadow-neutral-400">
                            <img src={tool.icon ? `/storage/${tool.icon}` : '/assets/images/placeholder.png'} alt={tool.name} className="h-12" />
                        </div>
                        <div className="md:space-y-2">
                            <h3 className="text-xl font-semibold md:text-2xl dark:text-gray-900">{tool.name}</h3>
                            <p className="text-sm text-gray-500">{tool.description}</p>
                        </div>
                    </div>
                ))}
            </InfiniteSlider>
        </section>
    );
}
