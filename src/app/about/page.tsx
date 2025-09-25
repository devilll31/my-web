
import { Users, Zap, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="py-12 md:py-20 bg-hero-gradient">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline gradient-text">About D2ools</h1>
                    <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                        D2ools was born from a simple yet powerful idea: to create a single, reliable destination for the countless small digital tasks we face every day. We were tired of navigating dozens of ad-filled, slow, and insecure websites just to convert a file, resize an image, or format a piece of code.
                    </p>
                    <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                        We envisioned a world where powerful utilities were accessible to everyone—students, professional developers, marketers, writers, and anyone in between—without the frustration. We are committed to building a library of over 500 tools that are not only powerful and free but also prioritize user privacy and security above all else. For many of our tools, all processing happens directly in your browser, meaning your files never leave your computer.
                    </p>
                </div>

                <div className="text-center pt-16">
                    <h2 className="text-3xl font-bold font-headline">Our Core Principles</h2>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="text-center p-6 bg-card rounded-xl shadow-lg border border-border/20">
                        <Users className="w-16 h-16 mx-auto text-primary mb-4" />
                        <h3 className="text-2xl font-semibold mb-2 font-headline">For Everyone</h3>
                        <p className="text-muted-foreground">No sign-ups, no limits. Our tools are designed to be intuitive and useful for everyone, regardless of technical skill.</p>
                    </div>
                    <div className="text-center p-6 bg-card rounded-xl shadow-lg border border-border/20">
                        <Zap className="w-16 h-16 mx-auto text-primary mb-4" />
                        <h3 className="text-2xl font-semibold mb-2 font-headline">Lightning Fast</h3>
                        <p className="text-muted-foreground">By processing data on your device where possible and using optimized server infrastructure for complex tasks, we provide instant results.</p>
                    </div>
                    <div className="text-center p-6 bg-card rounded-xl shadow-lg border border-border/20">
                        <ShieldCheck className="w-16 h-16 mx-auto text-primary mb-4" />
                        <h3 className="text-2xl font-semibold mb-2 font-headline">Privacy First</h3>
                        <p className="text-muted-foreground">Your files and data are your own. We never upload or store your sensitive information unnecessarily. Your privacy is paramount.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
