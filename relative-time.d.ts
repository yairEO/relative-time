// Definitions by: Ben Grynhaus <https://github.com/bengry>

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
    constructor(settings?: Settings);
    from(d1: Date, d2?: Date): string;
    static from(d1: Date, d2?: Date, settings?: Settings): string;
}

export = RelativeTime;

export as namespace RelativeTime
