class BoyerMoore {
    constructor(pattern) {
        this.pattern = pattern;
        this.patternLength = pattern.length;
        this.badCharTable = this.buildBadCharTable();
    }

    // Build the bad character shift table
    buildBadCharTable() {
        const table = {};
        for (let i = 0; i < this.patternLength - 1; i++) {
            table[this.pattern[i]] = this.patternLength - 1 - i;
        }
        return table;
    }

    // Search for pattern in text, returns array of start indices
    search(text) {
        const matches = [];
        const n = text.length;
        let i = 0;

        while (i <= n - this.patternLength) {
            let j = this.patternLength - 1;
            while (j >= 0 && this.pattern[j] === text[i + j]) {
                j--;
            }
            if (j < 0) {
                matches.push(i);
                i += this.patternLength;
            } else {
                const badCharShift = this.badCharTable[text[i + j]] || this.patternLength;
                i += badCharShift;
            }
        }
        return matches;
    }

    // Search using regex pattern
    static searchRegex(text, regex) {
        const matches = [];
        let match;
        const re = new RegExp(regex, 'g');
        while ((match = re.exec(text)) !== null) {
            matches.push(match.index);
            // Avoid infinite loop for zero-length matches
            if (re.lastIndex === match.index) re.lastIndex++;
        }
        return matches;
    }
}

module.exports = BoyerMoore;