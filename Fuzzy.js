class FuzzyPatternMatcher {
    /**
     * Calcula a distância de Levenshtein entre duas strings.
     * @param {string} a 
     * @param {string} b 
     * @returns {number}
     */
    static levenshtein(a, b) {
        const m = a.length, n = b.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (a[i - 1] === b[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                }
            }
        }
        return dp[m][n];
    }

    /**
     * Busca fuzzy de um padrão em um texto.
     * @param {string} text - Texto onde buscar.
     * @param {string} pattern - Padrão a ser buscado.
     * @param {number} [maxDistance=2] - Distância máxima permitida.
     * @returns {Array<{index: number, match: string, distance: number}>}
     */
    static search(text, pattern, maxDistance = 2) {
        const results = [];
        const window = pattern.length;
        for (let i = 0; i <= text.length - window; i++) {
            const substring = text.substr(i, window);
            const distance = this.levenshtein(substring, pattern);
            if (distance <= maxDistance) {
                results.push({ index: i, match: substring, distance });
            }
        }
        return results;
    }
}

module.exports = FuzzyPatternMatcher;