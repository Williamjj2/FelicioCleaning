import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { supabase } from "@/lib/supabase";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Info, Percent, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Addon {
    id: string;
    name: string;
    price: number;
    duration_min: number | null;
    status: string;
    tenant_id: string;
}

interface Surcharge {
    id: string;
    slug: string;
    label: string;
    type: "flat" | "percentage";
    value: number;
    description: string | null;
    is_active: boolean;
    tenant_id: string;
}

export const AddonsManager = forwardRef(({ tenantId }: { tenantId: string }, ref) => {
    const [addons, setAddons] = useState<Addon[]>([]);
    const [surcharges, setSurcharges] = useState<Surcharge[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();

    useImperativeHandle(ref, () => ({
        save: handleSave,
        refresh: fetchAll
    }));

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [addonsRes, surchargesRes] = await Promise.all([
                supabase
                    .from("addons")
                    .select("*")
                    .eq("tenant_id", tenantId)
                    .order("name"),
                supabase
                    .from("surcharges")
                    .select("*")
                    .eq("tenant_id", tenantId)
                    .order("slug")
            ]);

            if (addonsRes.error) throw addonsRes.error;
            if (surchargesRes.error) throw surchargesRes.error;

            setAddons(addonsRes.data || []);
            setSurcharges(surchargesRes.data || []);
        } catch (error: any) {
            toast({
                title: "Error loading data",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tenantId) fetchAll();
    }, [tenantId]);

    const updateAddon = (id: string, field: keyof Addon, value: any) => {
        setAddons(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
    };

    const updateSurcharge = (id: string, field: keyof Surcharge, value: any) => {
        setSurcharges(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Save addons
            for (const addon of addons) {
                const { error } = await supabase
                    .from("addons")
                    .update({
                        name: addon.name,
                        price: addon.price,
                        duration_min: addon.duration_min,
                        status: addon.status
                    })
                    .eq("id", addon.id);
                if (error) throw error;
            }

            // Save surcharges
            for (const surcharge of surcharges) {
                const { error } = await supabase
                    .from("surcharges")
                    .update({
                        label: surcharge.label,
                        value: surcharge.value,
                        is_active: surcharge.is_active,
                        description: surcharge.description
                    })
                    .eq("id", surcharge.id);
                if (error) throw error;
            }

            toast({ title: "Success", description: "Add-ons and surcharges updated!" });
            fetchAll();
        } catch (error: any) {
            toast({
                title: "Save failed",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* SURCHARGES */}
            <Card className="bg-card/30 backdrop-blur-2xl border-white/5 shadow-2xl overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                            Taxas e Sobretaxas
                        </CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-white/40" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Valores usados pela Ella no cálculo de cotação em tempo real.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Button variant="ghost" size="icon" onClick={fetchAll} disabled={loading} className="hover:bg-white/5">
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="font-bold text-[10px] uppercase text-white/70 px-4 py-3">Nome</TableHead>
                                <TableHead className="font-bold text-[10px] uppercase text-white/70 px-4 py-3 w-[100px]">Tipo</TableHead>
                                <TableHead className="font-bold text-[10px] uppercase text-white/70 px-4 py-3 w-[140px]">Valor</TableHead>
                                <TableHead className="font-bold text-[10px] uppercase text-white/70 px-4 py-3 w-[100px] text-center">Ativo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {surcharges.map(surcharge => (
                                <TableRow key={surcharge.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                    <TableCell className="px-4 py-3">
                                        <div>
                                            <div className="font-medium text-sm">{surcharge.label}</div>
                                            <div className="text-[10px] text-white/40 uppercase tracking-wider">{surcharge.slug}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <div className="flex items-center gap-1 text-xs text-white/60">
                                            {surcharge.type === "flat" ? (
                                                <><DollarSign className="h-3 w-3" /> Fixo</>
                                            ) : (
                                                <><Percent className="h-3 w-3" /> Percentual</>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <div className="relative">
                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/30">
                                                {surcharge.type === "flat" ? "$" : "%"}
                                            </span>
                                            <Input
                                                type="number"
                                                value={surcharge.value || ""}
                                                onChange={(e) => updateSurcharge(surcharge.id, "value", parseFloat(e.target.value) || 0)}
                                                className="h-9 pl-5 pr-2 text-center text-xs font-medium bg-black/30 border-transparent hover:border-white/10 focus:border-primary/50 focus:ring-0 transition-all rounded-sm w-[100px]"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        <Switch
                                            checked={surcharge.is_active}
                                            onCheckedChange={(checked) => updateSurcharge(surcharge.id, "is_active", checked)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* SERVICE ADD-ONS */}
            <Card className="bg-card/30 backdrop-blur-2xl border-white/5 shadow-2xl overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                            Serviços Extras (Add-ons)
                        </CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-white/40" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Serviços adicionais que a Ella pode oferecer aos clientes.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="font-bold text-[10px] uppercase text-white/70 px-4 py-3">Serviço</TableHead>
                                <TableHead className="font-bold text-[10px] uppercase text-white/70 px-4 py-3 w-[140px]">Preço</TableHead>
                                <TableHead className="font-bold text-[10px] uppercase text-white/70 px-4 py-3 w-[140px]">Duração (min)</TableHead>
                                <TableHead className="font-bold text-[10px] uppercase text-white/70 px-4 py-3 w-[100px] text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {addons.map(addon => (
                                <TableRow key={addon.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                    <TableCell className="px-4 py-3">
                                        <Input
                                            value={addon.name}
                                            onChange={(e) => updateAddon(addon.id, "name", e.target.value)}
                                            className="h-9 text-sm font-medium bg-black/30 border-transparent hover:border-white/10 focus:border-primary/50 focus:ring-0 transition-all rounded-sm"
                                        />
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <div className="relative">
                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/30">$</span>
                                            <Input
                                                type="number"
                                                value={addon.price || ""}
                                                onChange={(e) => updateAddon(addon.id, "price", parseFloat(e.target.value) || 0)}
                                                className="h-9 pl-5 pr-2 text-center text-xs font-medium bg-black/30 border-transparent hover:border-white/10 focus:border-primary/50 focus:ring-0 transition-all rounded-sm w-[100px]"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <Input
                                            type="number"
                                            value={addon.duration_min || ""}
                                            onChange={(e) => updateAddon(addon.id, "duration_min", parseInt(e.target.value) || 0)}
                                            className="h-9 text-center text-xs font-medium bg-black/30 border-transparent hover:border-white/10 focus:border-primary/50 focus:ring-0 transition-all rounded-sm w-[100px]"
                                        />
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        <Switch
                                            checked={addon.status === "active"}
                                            onCheckedChange={(checked) => updateAddon(addon.id, "status", checked ? "active" : "inactive")}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
});
