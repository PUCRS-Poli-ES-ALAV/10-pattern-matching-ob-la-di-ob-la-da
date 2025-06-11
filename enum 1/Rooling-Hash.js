class RollingHash {
  constructor(base = 256, mod = 101) {
    this.base = base; // Base for the hash function (number of possible characters)
    this.mod = mod; // A prime number for modulo operations to reduce collisions
  }

  // Helper to compute hash for a string
  computeHash(str, length) {
    let hash = 0;
    for (let i = 0; i < length; i++) {
      hash = (hash * this.base + str.charCodeAt(i)) % this.mod;
    }
    return hash;
  }

  // Main search method: returns performance metrics in addition to matches
  search(pattern, text) {
    let iterations = 0;
    let instructions = 0;
    const m = pattern.length;
    const n = text.length;
    if (m > n) return { matches: [], iterations, instructions };

    const result = [];
    const patternHash = this.computeHash(pattern, m);
    let textHash = this.computeHash(text, m);

    // Precompute (base^(m-1)) % mod for use in removing leading digit
    let h = 1;
    for (let i = 0; i < m - 1; i++) {
      h = (h * this.base) % this.mod;
    }

    for (let i = 0; i <= n - m; i++) {
      iterations++;
      instructions++; // hash compare
      if (patternHash === textHash) {
        instructions += m; // substring compare
        if (text.substr(i, m) === pattern) result.push(i);
      }
      if (i < n - m) {
        textHash =
          (this.base * (textHash - text.charCodeAt(i) * h) +
            text.charCodeAt(i + m)) %
          this.mod;
        if (textHash < 0) textHash += this.mod;
      }
    }
    return { matches: result, iterations, instructions };
  }
}

// CLI self-test
if (require.main === module) {
  const { performance } = require("perf_hooks");
  function generateRandomText(length, pattern) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let text = "";
    for (let i = 0; i < length - pattern.length; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const pos = Math.floor(Math.random() * (text.length + 1));
    return text.slice(0, pos) + pattern + text.slice(pos);
  }
  const pattern = process.argv[2] || "pattern";
  const size = parseInt(process.argv[3], 10) || 500000;
  const text = generateRandomText(size, pattern);
  const start = performance.now();
  const { matches, iterations, instructions } = new RollingHash().search(
    pattern,
    text
  );
  const end = performance.now();
  console.log(`RollingHash: found ${matches.length} occurrences`);
  console.log(
    `Time: ${
      end - start
    } ms, Iterations: ${iterations}, Instructions: ${instructions}`
  );
}

module.exports = RollingHash;
