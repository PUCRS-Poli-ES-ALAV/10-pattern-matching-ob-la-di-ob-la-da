class RabinKarp {
    constructor(pattern) {
        this.pattern = pattern;
        this.m = pattern.length;
        this.prime = 101;
        this.base = 256;
        this.patternHash = 0;
        this.h = 1;

        // Precompute h = pow(base, m-1) % prime
        for (let i = 0; i < this.m - 1; i++) {
            this.h = (this.h * this.base) % this.prime;
        }

        // Compute hash for the pattern
        for (let i = 0; i < this.m; i++) {
            this.patternHash = (this.base * this.patternHash + pattern.charCodeAt(i)) % this.prime;
        }
    }

    search(text) {
        const n = text.length;
        if (this.m === 0 || n === 0 || this.m > n) return [];

        let textHash = 0;
        const result = [];

        // Calculate hash value for first window of text
        for (let i = 0; i < this.m; i++) {
            textHash = (this.base * textHash + text.charCodeAt(i)) % this.prime;
        }

        // Slide the pattern over text one by one
        for (let i = 0; i <= n - this.m; i++) {
            if (this.patternHash === textHash) {
                let match = true;
                for (let j = 0; j < this.m; j++) {
                    if (text[i + j] !== this.pattern[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) result.push(i);
            }

            // Calculate hash value for next window of text
            if (i < n - this.m) {
                textHash = (this.base * (textHash - text.charCodeAt(i) * this.h) + text.charCodeAt(i + this.m)) % this.prime;
                if (textHash < 0) textHash += this.prime;
            }
        }

        return result;
    }
}

module.exports = RabinKarp;
