export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
    }
}

export const pageview = (url: string) => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
        return;
    }

    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
    });
};

export const event = ({
    action,
    category,
    label,
    value,
    parameters,
}: {
    action: string;
    category?: string;
    label?: string;
    value?: number;
    parameters?: Record<string, string | number | boolean>;
}) => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
        return;
    }

    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
        ...parameters,
    });
};
