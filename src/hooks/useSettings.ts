import { useState, useEffect } from "react";

export interface Settings {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    whatsappNumber: string;
    companyDescription: string;
}

const fallbackSettings: Settings = {
    siteName: "Antonio Store",
    siteDescription: "Catálogo de produtos e serviços de tecnologia",
    contactEmail: "contato@antonio.com",
    contactPhone: "(11) 99999-9999",
    contactAddress: "São Paulo, SP",
    whatsappNumber: "5511999999999",
    companyDescription:
        "Especialistas em tecnologia com anos de experiência no mercado. Oferecemos produtos de qualidade e serviços especializados.",
};

export function useSettings() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchSettings() {
            try {
                const response = await fetch("/api/settings");
                if (response.ok) {
                    const data = await response.json();
                    if (!cancelled) setSettings(data);
                }
            } catch (err) {
                if (!cancelled) setSettings(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchSettings();
        return () => {
            cancelled = true;
        };
    }, []);

    return {
        settings: settings || fallbackSettings,
        loading,
    };
}
