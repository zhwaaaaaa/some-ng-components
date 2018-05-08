interface RGBDescription {
    r: number;
    g: number;
    b: number;
}

export interface Color extends RGBDescription {
    toRGBStr(): string;

    toHexStr(): string;
}

class ColorImp implements Color {
    private static toDoubleHex(src: number): string {
        if (!src) {
            return '00';
        }
        const ret = src.toString(16);
        return ret.length === 1 ? ('0' + ret) : ret;
    }

    r: number;
    g: number;
    b: number;

    constructor(src: RGBDescription) {
        this.r = src.r;
        this.g = src.g;
        this.b = src.b;
    }

    toRGBStr(): string {
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    toHexStr(): string {
        return `#${ColorImp.toDoubleHex(this.r)}${ColorImp.toDoubleHex(this.g)}${ColorImp.toDoubleHex(this.b)}`;
    }

}

export class ColorGradient {
    static readonly rgbRex = new RegExp('^rgb\\((\\d{1,3})\\s*,\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})\\)', 'i');
    static readonly hexRex = new RegExp('^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$', 'i');

    private static fix(r) {
        r = Math.round(r);
        if (r > 255) {
            r = 255;
        }
        if (r < 0) {
            r = 0;
        }
        return r;
    }


    static parseColor(src: string | RGBDescription): Color {
        if (!src) {
            return null;
        }
        if (typeof src === 'string') {
            src = src.trim();
            let vals;
            if (vals = ColorGradient.hexRex.exec(src)) {
                const r = parseInt(vals[1], 16);
                const g = parseInt(vals[2], 16);
                const b = parseInt(vals[3], 16);
                return new ColorImp({r: r, g: g, b: b});
            } else if (vals = ColorGradient.rgbRex.exec(src)) {
                return new ColorImp({r: +vals[1], g: +vals[2], b: +vals[3]});
            }
            return null;
        } else {
            return new ColorImp(src);
        }
    }

    private origin: Color[];

    constructor(start: string | RGBDescription, end: string | RGBDescription) {
        if (start && end) {
            this.origin = [ColorGradient.parseColor(start), ColorGradient.parseColor(end)];
        }
    }

    get(pos): Color {
        const end = this.origin[1];
        const start = this.origin[0];
        let r = (end.r - start.r) * pos + start.r;
        let g = (end.g - start.g) * pos + start.g;
        let b = (end.b - start.b) * pos + start.b;

        r = ColorGradient.fix(r);
        g = ColorGradient.fix(g);
        b = ColorGradient.fix(b);
        return new ColorImp({r: r, g: g, b: b});
    }


}

//
