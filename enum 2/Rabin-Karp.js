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
      this.patternHash =
        (this.base * this.patternHash + pattern.charCodeAt(i)) % this.prime;
    }
  }

  search(text) {
    const n = text.length;
    let iterations = 0;
    let instructions = 0;
    if (this.m === 0 || n === 0 || this.m > n)
      return { matches: [], iterations, instructions };

    let textHash = 0;
    const result = [];

    // Calculate hash value for first window of text
    for (let i = 0; i < this.m; i++) {
      instructions++; // initial hash computation
      textHash = (this.base * textHash + text.charCodeAt(i)) % this.prime;
    }

    // Slide the pattern over text one by one
    for (let i = 0; i <= n - this.m; i++) {
      iterations++;
      instructions++; // hash comparison
      if (this.patternHash === textHash) {
        instructions += this.m; // character comparisons
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
        instructions++; // rolling hash update
        textHash =
          (this.base * (textHash - text.charCodeAt(i) * this.h) +
            text.charCodeAt(i + this.m)) %
          this.prime;
        if (textHash < 0) textHash += this.prime;
      }
    }
    return { matches: result, iterations, instructions };
  }
}

// Self-test when run directly
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
  const rk = new RabinKarp(pattern);
  const start = performance.now();
  const { matches, iterations, instructions } = rk.search(text);
  const end = performance.now();
  console.log(`Rabin-Karp: found ${matches.length} occurrences`);
  console.log(
    `Time: ${
      end - start
    } ms, Iterations: ${iterations}, Instructions: ${instructions}`
  );
}

module.exports = RabinKarp;
