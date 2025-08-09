// Definitions by: Ben Grynhaus <https://github.com/bengry>

type DateInput = Date | string | number;

interface Settings {
    /**
     * @default browser locale
     * @example 'es'
     */
    locale?: string;

    /**
     * @default { numeric: 'auto' }
     */
    options?: Intl.RelativeTimeFormatOptions;
}

declare class RelativeTime {
    /**
     * Creates a new RelativeTime instance with specified settings
     * @param settings Configuration object for locale and formatting options
     */
    constructor(settings?: Settings);

    /**
     * Returns a relative time string comparing two dates
     * @param d1 The date to format (target date)
     * @param d2 The reference date (defaults to current time)
     * @returns Formatted relative time string (e.g., "2 days ago", "in 3 hours")
     */
    from(d1: DateInput, d2?: DateInput): string;

    /**
     * Static method for convenience - creates instance per call
     * @param d1 The date to format (target date)
     * @param d2 The reference date (defaults to current time)
     * @param locale Optional locale string (e.g., 'es', 'fr')
     * @returns Formatted relative time string (e.g., "2 days ago", "in 3 hours")
     */
    static from(d1: DateInput, d2?: DateInput, locale?: string): string;
}

export = RelativeTime;

export as namespace RelativeTime;
