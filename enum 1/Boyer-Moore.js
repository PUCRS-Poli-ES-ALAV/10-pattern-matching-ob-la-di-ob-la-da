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

  // Search for pattern in text, returns object with matches and performance metrics
  search(text) {
    let iterations = 0;
    let instructions = 0;
    const matches = [];
    const n = text.length;
    let i = 0;

    while (i <= n - this.patternLength) {
      iterations++;
      let j = this.patternLength - 1;
      while (j >= 0) {
        instructions++;
        if (this.pattern[j] === text[i + j]) {
          j--;
        } else break;
      }
      if (j < 0) {
        matches.push(i);
        i += this.patternLength;
      } else {
        const badCharShift =
          this.badCharTable[text[i + j]] || this.patternLength;
        i += badCharShift;
      }
    }
    return { matches, iterations, instructions };
  }

  // Search using regex pattern
  static searchRegex(text, regex) {
    const matches = [];
    let match;
    const re = new RegExp(regex, "g");
    while ((match = re.exec(text)) !== null) {
      matches.push(match.index);
      // Avoid infinite loop for zero-length matches
      if (re.lastIndex === match.index) re.lastIndex++;
    }
    return matches;
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
  const start = performance.now();
  const { matches, iterations, instructions } = new BoyerMoore(pattern).search(
    text
  );
  const end = performance.now();
  console.log(`Boyer-Moore: found ${matches.length} occurrences`);
  console.log(
    `Time: ${
      end - start
    } ms, Iterations: ${iterations}, Instructions: ${instructions}`
  );
}

module.exports = BoyerMoore;
