export function generateUUID(): string {
    const hexDigits = '0123456789abcdef';
    const chars = new Array(36);
    let rnd = 0;
    let r: number;

    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            chars[i] = '-';
        } else if (i === 14) {
            chars[i] = '4';
        } else {
            if (rnd <= 0x02) {
                rnd = (0x2000000 + Math.random() * 0x1000000) | 0;
            }
            r = rnd & 0xf;
            rnd = rnd >> 4;
            chars[i] = hexDigits[i === 19 ? (r & 0x3) | 0x8 : r];
        }
    }

    return chars.join('');
}
