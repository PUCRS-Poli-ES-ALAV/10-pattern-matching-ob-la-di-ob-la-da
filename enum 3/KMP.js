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
    let iterations = 0;
    let instructions = 0;
    const result = [];
    let i = 0; // index for text
    let j = 0; // index for pattern
    while (i < text.length) {
      iterations++;
      instructions++; // char compare
      if (this.pattern[j] === text[i]) {
        i++;
        j++;
        instructions++;
      }
      if (j === this.pattern.length) {
        result.push(i - j);
        j = this.lps[j - 1];
        instructions++; // reset j
      } else if (i < text.length) {
        instructions++; // mismatch check
        if (this.pattern[j] !== text[i]) {
          if (j !== 0) {
            j = this.lps[j - 1];
            instructions++; // shift j
          } else {
            i++;
            instructions++; // advance i
          }
        }
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
  const kmp = new KMP(pattern);
  const start = performance.now();
  const { matches, iterations, instructions } = kmp.search(text);
  const end = performance.now();
  console.log(`KMP: found ${matches.length} occurrences`);
  console.log(
    `Time: ${
      end - start
    } ms, Iterations: ${iterations}, Instructions: ${instructions}`
  );
}

module.exports = KMP;

// Example usage:
const kmp = new KMP("abc");
const text = "ababcabcabc";
const result = kmp.search(text);
console.log(result); // Output: [2, 5, 8]
