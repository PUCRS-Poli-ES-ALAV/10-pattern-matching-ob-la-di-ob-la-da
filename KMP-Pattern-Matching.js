class KMP {
    constructor(pattern) {
        this.pattern = pattern;
        this.lps = this.computeLPSArray(pattern);
    }

    computeLPSArray(pattern) {
        const lps = Array(pattern.length).fill(0);
        let length = 0;
        let i = 1;
        while (i < pattern.length) {
            if (pattern[i] === pattern[length]) {
                length++;
                lps[i] = length;
                i++;
            } else {
                if (length !== 0) {
                    length = lps[length - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }

    search(text) {
        const result = [];
        let i = 0; // index for text
        let j = 0; // index for pattern
        while (i < text.length) {
            if (this.pattern[j] === text[i]) {
                i++;
                j++;
            }
            if (j === this.pattern.length) {
                result.push(i - j);
                j = this.lps[j - 1];
            } else if (i < text.length && this.pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = this.lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        return result;
    }
}

module.exports = KMP;