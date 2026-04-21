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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, RefreshCw, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PricingData {
    id?: string;
    bedrooms: number;
    bathrooms: number;
    price_standard: number;
    price_deep: number;
    price_move: number;
    tenant_id: string;
}

interface MatrixState {
    [key: string]: {
        standard: number;
        deep: number;
        move: number;
        id?: string;
    };
}

type ServiceType = 'standard' | 'deep' | 'move';

export const PricingMatrix = forwardRef(({ tenantId }: { tenantId: string }, ref) => {
    const [matrix, setMatrix] = useState<MatrixState>({});
    const [activeService, setActiveService] = useState<ServiceType>('standard');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();

    useImperativeHandle(ref, () => ({
        save: handleSave,
        refresh: fetchPricing
    }));

    const fetchPricing = async () => {
        setLoading(true);
        try {
            console.log("Fetching pricing for tenant:", tenantId);
            const { data, error } = await supabase
                .from("pricing_matrix")
                .select("*")
                .eq("tenant_id", tenantId);

            if (error) throw error;

            const initialMatrix: MatrixState = {};
            data?.forEach((item: any) => {
                // Handle both numeric and string bathrooms (e.g., 2.5)
                const bathStr = item.bathrooms.toString();
                const key = `${item.bedrooms}-${bathStr}`;
                initialMatrix[key] = {
                    standard: parseFloat(item.price_standard) || 0,
                    deep: parseFloat(item.price_deep) || 0,
                    move: parseFloat(item.price_move) || 0,
                    id: item.id
                };
            });
            setMatrix(initialMatrix);
        } catch (error: any) {
            toast({
                title: "Error fetching pricing",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tenantId) fetchPricing();
    }, [tenantId]);

    const handlePriceChange = (beds: number, baths: string, value: string) => {
        const numValue = parseFloat(value) || 0;
        const key = `${beds}-${baths}`;
        setMatrix(prev => ({
            ...prev,
            [key]: {
                ...(prev[key] || { standard: 0, deep: 0, move: 0 }),
                [activeService]: numValue
            }
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates = Object.entries(matrix).map(([key, data]) => {
                const [bedrooms, bathrooms] = key.split("-");
                return {
                    id: data.id,
                    bedrooms: parseInt(bedrooms),
                    bathrooms: bathrooms, // Keep as string for half-baths
                    price_standard: data.standard,
                    price_deep: data.deep,
                    price_move: data.move,
                    tenant_id: tenantId
                };
            });

            const { error } = await supabase
                .from("pricing_matrix")
                .upsert(updates, { onConflict: 'tenant_id, bedrooms, bathrooms' });

            if (error) throw error;

            toast({ title: "Success", description: "Pricing matrix updated successfully!" });
            fetchPricing();
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

    const bedrooms = Array.from({ length: 10 }, (_, i) => i + 1);
    const bathrooms = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

    return (
        <Card className="bg-card/30 backdrop-blur-2xl border-white/5 shadow-2xl overflow-hidden flex flex-col h-[750px]">
            <CardHeader className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 pb-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Gestão de Preços (10x10)
                    </CardTitle>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4 text-white/40" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Valores usados pela Ella para cálculos em tempo real.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className="flex items-center gap-4">
                    <Tabs value={activeService} onValueChange={(v) => setActiveService(v as ServiceType)} className="w-[400px]">
                        <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/5">
                            <TabsTrigger value="standard" className="text-xs data-[state=active]:bg-primary">REGULAR</TabsTrigger>
                            <TabsTrigger value="deep" className="text-xs data-[state=active]:bg-primary">PROFUNDA</TabsTrigger>
                            <TabsTrigger value="move" className="text-xs data-[state=active]:bg-primary">MUDANÇA</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={fetchPricing} disabled={loading} className="hover:bg-white/5">
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden relative flex-1">
                <div className="overflow-auto h-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <Table className="border-separate border-spacing-0">
                        <TableHeader className="sticky top-0 z-20 bg-card/90 backdrop-blur-md">
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="sticky left-0 z-30 bg-card/90 backdrop-blur-md w-[80px] min-w-[80px] font-black text-[10px] uppercase text-primary border-r border-b border-white/5 flex items-center justify-center">
                                    BED\BATH
                                </TableHead>
                                {bathrooms.map(b => (
                                    <TableHead key={b} className="text-center font-bold text-[10px] uppercase text-white/70 min-w-[80px] border-b border-white/5 px-4 py-3">
                                        {b} Banho
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bedrooms.map(bed => (
                                <TableRow key={bed} className="border-white/5 hover:bg-white/5 transition-colors group">
                                    <TableCell className="sticky left-0 z-10 bg-card/90 backdrop-blur-md font-bold text-xs text-primary border-r border-white/5 text-center py-4">
                                        {bed} Qto
                                    </TableCell>
                                    {bathrooms.map(bath => {
                                        const key = `${bed}-${bath}`;
                                        const value = matrix[key]?.[activeService] || 0;
                                        return (
                                            <TableCell key={bath} className="p-1 border-white/5 transition-colors group-hover:border-white/10">
                                                <div className="relative">
                                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/30">$</span>
                                                    <Input
                                                        type="number"
                                                        value={value || ""}
                                                        onChange={(e) => handlePriceChange(bed, bath, e.target.value)}
                                                        className="h-9 pl-5 pr-2 text-center text-xs font-medium bg-black/30 border-transparent hover:border-white/10 focus:border-primary/50 focus:ring-0 transition-all rounded-sm placeholder:text-white/10"
                                                        placeholder="0"
                                                    />
                                                </div>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                
                {/* Visual fading for table edges */}
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                <div className="absolute left-[80px] top-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
            </CardContent>
            
            <div className="p-3 border-t border-white/5 bg-black/20 flex justify-between items-center text-[10px] text-white/40 uppercase tracking-widest font-bold">
                <div>Visualizando: {activeService === 'standard' ? 'Limpeza Regular' : activeService === 'deep' ? 'Limpeza Profunda' : 'Mudança'}</div>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> Editável</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-white/20" /> Auto-Save Off</span>
                </div>
            </div>
        </Card>
    );
});
