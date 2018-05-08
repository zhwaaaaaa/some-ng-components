export function numAdd(a, b) {
    let c;
    let d;
    let e;
    try {
        c = a.toString().split('.')[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split('.')[1].length;
    } catch (f) {
        d = 0;
    }
    e = Math.pow(10, Math.max(c, d));
    return (numMul(a, e) + numMul(b, e)) / e;
}

export function numSub(a, b) {
    let c;
    let d;
    let e;
    try {
        c = a.toString().split('.')[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split('.')[1].length;
    } catch (f) {
        d = 0;
    }
    e = Math.pow(10, Math.max(c, d));
    return (numMul(a, e) - numMul(b, e)) / e;
}

export function numMul(a, b) {
    let c = 0;
    const d = a.toString();
    const e = b.toString();
    try {
        c += d.split('.')[1].length;
    } catch (f) {
    }
    try {
        c += e.split('.')[1].length;
    } catch (f) {
    }
    return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c);
}

export function numDiv(a, b) {
    let c;
    let d;
    let e = 0;
    let f = 0;
    try {
        e = a.toString().split('.')[1].length;
    } catch (g) {
    }
    try {
        f = b.toString().split('.')[1].length;
    } catch (g) {
    }
    c = Number(a.toString().replace('.', ''));
    d = Number(b.toString().replace('.', ''));
    return numMul(c / d, Math.pow(10, f - e));
}
