import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import {
    LayoutDashboard,
    Image as ImageIcon,
    Save,
    LogOut,
    Loader2,
    Home,
    Users,
    Briefcase,
    Grid,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// Types based on the new schema
interface SiteContent {
    home?: {
        hero?: { backgroundImage?: string };
        services_section?: { backgroundImage?: string };
        why_choose?: { image?: string };
        service_areas?: Array<{ id: string; image: string; title: string }>;
    };
    about?: {
        story?: { image?: string };
        team?: Array<{ id: string; image: string; name: string }>;
    };
    services?: {
        residential?: { image?: string };
        commercial?: { image?: string };
        deep?: { image?: string };
        move?: { image?: string };
        post_construction?: { image?: string };
        floor?: { image?: string };
    };
    portfolio?: Array<{ id: string; category: string; title: string; url: string }>;
    beforeAfter?: Array<{
        id: number;
        before: string;
        after: string;
        category: string;
        title: string;
        enabled: boolean;
    }>;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'home' | 'about' | 'services' | 'portfolio' | 'transformations'>('home');
    const [content, setContent] = useState<SiteContent>({});
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();
    const [, setLocation] = useLocation();

    // Fetch Content
    useEffect(() => {
        fetch('/api/site-content')
            .then(res => res.json())
            .then(data => setContent(data))
            .catch(err => toast({ title: "Error", description: "Failed to load content", variant: "destructive" }));
    }, []);

    // Save Content
    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/site-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content)
            });
            if (!res.ok) throw new Error("Failed to save");
            toast({ title: "Success", description: "Changes saved successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to save changes", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    const updateContent = (path: string[], value: any) => {
        setContent(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            let current: any = newData;
            for (let i = 0; i < path.length - 1; i++) {
                if (!current[path[i]]) current[path[i]] = {};
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
            return newData;
        });
    };

    const handleDownload = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "site-content.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        toast({ title: "Downloaded", description: "site-content.json downloaded successfully" });
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-card/50 backdrop-blur-xl fixed inset-y-0 left-0 z-50">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-black uppercase tracking-widest text-primary">Admin Panel</h1>
                </div>
                <nav className="p-4 space-y-2">
                    <Button
                        variant={activeTab === 'home' ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('home')}
                    >
                        <Home className="mr-2 h-4 w-4" /> Home Page
                    </Button>
                    <Button
                        variant={activeTab === 'about' ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('about')}
                    >
                        <Users className="mr-2 h-4 w-4" /> About Page
                    </Button>
                    <Button
                        variant={activeTab === 'services' ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('services')}
                    >
                        <Briefcase className="mr-2 h-4 w-4" /> Services Page
                    </Button>
                    <Button
                        variant={activeTab === 'portfolio' ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('portfolio')}
                    >
                        <Grid className="mr-2 h-4 w-4" /> Portfolio
                    </Button>
                    <Button
                        variant={activeTab === 'transformations' ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('transformations')}
                    >
                        <ImageIcon className="mr-2 h-4 w-4" /> Transformations
                    </Button>
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <Button variant="destructive" className="w-full" onClick={() => setLocation('/')}>
                        <LogOut className="mr-2 h-4 w-4" /> Exit to Site
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold capitalize">{activeTab} Management</h2>
                    <Button
                        variant="outline"
                        onClick={handleDownload}
                        className="gap-2"
                    >
                        <Save className="h-4 w-4" /> Export JSON
                    </Button>
                </div>

                <div className="grid gap-8 max-w-5xl mx-auto">
                    {/* HOME EDITOR */}
                    {activeTab === 'home' && (
                        <>
                            <ImageUploader
                                label="Hero Background"
                                currentImage={content.home?.hero?.backgroundImage}
                                onImageChange={(val) => updateContent(['home', 'hero', 'backgroundImage'], val)}
                                onImageRemove={() => updateContent(['home', 'hero', 'backgroundImage'], "")}
                            />
                            <ImageUploader
                                label="Services Section Background"
                                currentImage={content.home?.services_section?.backgroundImage}
                                onImageChange={(val) => updateContent(['home', 'services_section', 'backgroundImage'], val)}
                                onImageRemove={() => updateContent(['home', 'services_section', 'backgroundImage'], "")}
                            />
                            <ImageUploader
                                label="Why Choose Us Image"
                                currentImage={content.home?.why_choose?.image}
                                onImageChange={(val) => updateContent(['home', 'why_choose', 'image'], val)}
                                onImageRemove={() => updateContent(['home', 'why_choose', 'image'], "")}
                                previewHeight="h-96"
                            />
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">Service Areas</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {content.home?.service_areas?.map((area, index) => (
                                        <Card key={index} className="p-4 bg-white/5 border-white/10">
                                            <h4 className="font-bold mb-4">{area.title}</h4>
                                            <ImageUploader
                                                label={`${area.title} Image`}
                                                currentImage={area.image}
                                                onImageChange={(val) => {
                                                    const newAreas = [...(content.home?.service_areas || [])];
                                                    newAreas[index] = { ...newAreas[index], image: val };
                                                    updateContent(['home', 'service_areas'], newAreas);
                                                }}
                                                onImageRemove={() => {
                                                    const newAreas = [...(content.home?.service_areas || [])];
                                                    newAreas[index] = { ...newAreas[index], image: "" };
                                                    updateContent(['home', 'service_areas'], newAreas);
                                                }}
                                                previewHeight="h-48"
                                            />
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* ABOUT EDITOR */}
                    {activeTab === 'about' && (
                        <>
                            <ImageUploader
                                label="Our Story Image"
                                currentImage={content.about?.story?.image}
                                onImageChange={(val) => updateContent(['about', 'story', 'image'], val)}
                                onImageRemove={() => updateContent(['about', 'story', 'image'], "")}
                                previewHeight="h-96"
                            />
                            <div className="space-y-4 pt-8">
                                <h3 className="text-xl font-bold">Team Members</h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {content.about?.team?.map((member, index) => (
                                        <Card key={index} className="p-4 bg-white/5 border-white/10">
                                            <div className="mb-2 font-bold">{member.name}</div>
                                            <ImageUploader
                                                label="Profile Photo"
                                                currentImage={member.image}
                                                onImageChange={(val) => {
                                                    const newTeam = [...(content.about?.team || [])];
                                                    newTeam[index] = { ...newTeam[index], image: val };
                                                    updateContent(['about', 'team'], newTeam);
                                                }}
                                                onImageRemove={() => {
                                                    const newTeam = [...(content.about?.team || [])];
                                                    newTeam[index] = { ...newTeam[index], image: "" };
                                                    updateContent(['about', 'team'], newTeam);
                                                }}
                                                previewHeight="h-48"
                                            />
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* SERVICES EDITOR */}
                    {activeTab === 'services' && (
                        <div className="grid md:grid-cols-2 gap-8">
                            {['residential', 'commercial', 'deep', 'move', 'post_construction', 'floor'].map((serviceKey) => (
                                <div key={serviceKey}>
                                    <ImageUploader
                                        label={`${serviceKey.replace('_', ' ').toUpperCase()} Service Image`}
                                        // @ts-ignore
                                        currentImage={content.services?.[serviceKey]?.image}
                                        onImageChange={(val) => updateContent(['services', serviceKey, 'image'], val)}
                                        onImageRemove={() => updateContent(['services', serviceKey, 'image'], "")}
                                        previewHeight="h-48"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PORTFOLIO EDITOR */}
                    {activeTab === 'portfolio' && (
                        <div className="space-y-6">
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => {
                                        const newImg = { id: Date.now().toString(), category: "Residential", title: "New Project", url: "" };
                                        updateContent(['portfolio'], [...(content.portfolio || []), newImg]);
                                    }}
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add New Item
                                </Button>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {content.portfolio?.map((item, index) => (
                                    <Card key={index} className="p-4 bg-white/5 border-white/10 relative group">
                                        <div className="space-y-4">
                                            <ImageUploader
                                                label="Project Image"
                                                currentImage={item.url}
                                                onImageChange={(val) => {
                                                    const newPortfolio = [...(content.portfolio || [])];
                                                    newPortfolio[index] = { ...newPortfolio[index], url: val };
                                                    updateContent(['portfolio'], newPortfolio);
                                                }}
                                                onImageRemove={() => {
                                                    const newPortfolio = [...(content.portfolio || [])];
                                                    newPortfolio[index] = { ...newPortfolio[index], url: "" };
                                                    updateContent(['portfolio'], newPortfolio);
                                                }}
                                                previewHeight="h-48"
                                            />
                                            <div className="space-y-2">
                                                <Label>Title</Label>
                                                <Input
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        const newPortfolio = [...(content.portfolio || [])];
                                                        newPortfolio[index] = { ...newPortfolio[index], title: e.target.value };
                                                        updateContent(['portfolio'], newPortfolio);
                                                    }}
                                                    className="bg-black/20 border-white/10"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Category</Label>
                                                <select
                                                    className="w-full h-10 px-3 rounded-md bg-black/20 border border-white/10"
                                                    value={item.category}
                                                    onChange={(e) => {
                                                        const newPortfolio = [...(content.portfolio || [])];
                                                        newPortfolio[index] = { ...newPortfolio[index], category: e.target.value };
                                                        updateContent(['portfolio'], newPortfolio);
                                                    }}
                                                >
                                                    <option value="Residential">Residential</option>
                                                    <option value="Commercial">Commercial</option>
                                                    <option value="Deep Clean">Deep Clean</option>
                                                    <option value="Post-Construction">Post-Construction</option>
                                                </select>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                className="w-full mt-4"
                                                onClick={() => {
                                                    const newPortfolio = [...(content.portfolio || [])];
                                                    newPortfolio.splice(index, 1);
                                                    updateContent(['portfolio'], newPortfolio);
                                                }}
                                            >
                                                Delete Project
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TRANSFORMATIONS EDITOR */}
                    {activeTab === 'transformations' && (
                        <div className="space-y-6">
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => {
                                        const maxId = content.beforeAfter?.reduce((max, item) => Math.max(max, item.id), 0) || 0;
                                        const newItem = {
                                            id: maxId + 1,
                                            before: "",
                                            after: "",
                                            category: "Residential",
                                            title: "New Transformation",
                                            enabled: true
                                        };
                                        updateContent(['beforeAfter'], [...(content.beforeAfter || []), newItem]);
                                    }}
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add Transformation
                                </Button>
                            </div>
                            <div className="grid gap-6">
                                {content.beforeAfter?.map((item, index) => (
                                    <Card key={item.id} className="p-6 bg-white/5 border-white/10">
                                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                                            <ImageUploader
                                                label="Before Image"
                                                currentImage={item.before}
                                                onImageChange={(val) => {
                                                    const newItems = [...(content.beforeAfter || [])];
                                                    newItems[index] = { ...newItems[index], before: val };
                                                    updateContent(['beforeAfter'], newItems);
                                                }}
                                                onImageRemove={() => {
                                                    const newItems = [...(content.beforeAfter || [])];
                                                    newItems[index] = { ...newItems[index], before: "" };
                                                    updateContent(['beforeAfter'], newItems);
                                                }}
                                                previewHeight="h-48"
                                            />
                                            <ImageUploader
                                                label="After Image"
                                                currentImage={item.after}
                                                onImageChange={(val) => {
                                                    const newItems = [...(content.beforeAfter || [])];
                                                    newItems[index] = { ...newItems[index], after: val };
                                                    updateContent(['beforeAfter'], newItems);
                                                }}
                                                onImageRemove={() => {
                                                    const newItems = [...(content.beforeAfter || [])];
                                                    newItems[index] = { ...newItems[index], after: "" };
                                                    updateContent(['beforeAfter'], newItems);
                                                }}
                                                previewHeight="h-48"
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label>Title</Label>
                                                <Input
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        const newItems = [...(content.beforeAfter || [])];
                                                        newItems[index] = { ...newItems[index], title: e.target.value };
                                                        updateContent(['beforeAfter'], newItems);
                                                    }}
                                                    className="bg-black/20 border-white/10"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Category</Label>
                                                <Input
                                                    value={item.category}
                                                    onChange={(e) => {
                                                        const newItems = [...(content.beforeAfter || [])];
                                                        newItems[index] = { ...newItems[index], category: e.target.value };
                                                        updateContent(['beforeAfter'], newItems);
                                                    }}
                                                    className="bg-black/20 border-white/10"
                                                />
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <Button
                                                    variant={item.enabled ? "outline" : "secondary"}
                                                    className="flex-1"
                                                    onClick={() => {
                                                        const newItems = [...(content.beforeAfter || [])];
                                                        newItems[index] = { ...newItems[index], enabled: !item.enabled };
                                                        updateContent(['beforeAfter'], newItems);
                                                    }}
                                                >
                                                    {item.enabled ? "Enabled" : "Disabled"}
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                        const newItems = [...(content.beforeAfter || [])];
                                                        newItems.splice(index, 1);
                                                        updateContent(['beforeAfter'], newItems);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Bottom Save Bar */}
            <div className="fixed bottom-0 left-64 right-0 p-4 border-t border-white/10 bg-card/80 backdrop-blur-xl z-50 flex justify-end items-center gap-4">
                <span className="text-sm text-muted-foreground mr-auto">
                    Changes are local until saved. Use "Export JSON" for production updates.
                </span>
                <Button
                    onClick={handleDownload}
                    variant="secondary"
                    className="shadow-md"
                >
                    <Save className="mr-2 h-4 w-4" /> Export JSON
                </Button>
                <Button
                    onClick={handleSave}
                    size="lg"
                    disabled={isSaving}
                    className="bg-primary hover:bg-primary/90 text-white min-w-[150px] shadow-lg"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-5 w-5" /> Save Changes
                        </>
                    )}
                </Button>
            </div>
            {/* Spacer for bottom bar */}
            <div className="h-24"></div>
        </div>
    );
}
