class RollingHash {
    constructor(base = 256, mod = 101) {
        this.base = base; // Base for the hash function (number of possible characters)
        this.mod = mod;   // A prime number for modulo operations to reduce collisions
    }

    // Helper to compute hash for a string
    computeHash(str, length) {
        let hash = 0;
        for (let i = 0; i < length; i++) {
            hash = (hash * this.base + str.charCodeAt(i)) % this.mod;
        }
        return hash;
    }

    // Main search method: returns array of starting indices where pattern is found
    search(pattern, text) {
        const m = pattern.length;
        const n = text.length;
        if (m > n) return [];

        const result = [];
        const patternHash = this.computeHash(pattern, m);
        let textHash = this.computeHash(text, m);

        // Precompute (base^(m-1)) % mod for use in removing leading digit
        let h = 1;
        for (let i = 0; i < m - 1; i++) {
            h = (h * this.base) % this.mod;
        }

        for (let i = 0; i <= n - m; i++) {
            // If hash values match, check the actual substring
            if (patternHash === textHash) {
                if (text.substr(i, m) === pattern) {
                    result.push(i);
                }
            }
            // Calculate hash for next window
            if (i < n - m) {
                textHash = (
                    (this.base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m))
                    % this.mod
                );
                // Ensure positive hash
                if (textHash < 0) textHash += this.mod;
            }
        }
        return result;
    }
}

module.exports = RollingHash;