const { performance } = require("perf_hooks");
const BoyerMoore = require("./enum 1/Boyer-Moore");
const RollingHash = require("./enum 1/Rooling-Hash");
const RabinKarp = require("./enum 2/Rabin-Karp");
const KMP = require("./enum 3/KMP");

/**
 * Generate a random lowercase string of given length, inserting the pattern at a random position.
 * @param {number} length Total length of the generated text
 * @param {string} pattern Pattern to embed
 * @returns {string}
 */
function generateRandomText(length, pattern) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const prefixLength = length - pattern.length;
  let text = "";
  for (let i = 0; i < prefixLength; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const pos = Math.floor(Math.random() * (prefixLength + 1));
  return text.slice(0, pos) + pattern + text.slice(pos);
}

// Read parameters: pattern and text size
const pattern = process.argv[2] || "pattern";
const size = parseInt(process.argv[3], 10) || 500000;
const text = generateRandomText(size, pattern);

/**
 * Helper to run a test and log metrics
 * @param {string} name Algorithm name
 * @param {Function} fn Function that executes the search and returns {matches, iterations, instructions}
 */
function runTest(name, fn) {
  console.log(
    `\n=== Testing ${name} with size=${size} and pattern='${pattern}' ===`
  );
  const start = performance.now();
  const { matches, iterations, instructions } = fn();
  const end = performance.now();
  console.log(`${name}: occurrences=${matches.length}`);
  console.log(
    `${name}: time=${(end - start).toFixed(
      2
    )} ms, iterations=${iterations}, instructions=${instructions}`
  );
}

// Run each algorithm
runTest("KMP", () => new KMP(pattern).search(text));
runTest("Rabin-Karp", () => new RabinKarp(pattern).search(text));
runTest("Boyer-Moore", () => new BoyerMoore(pattern).search(text));
runTest("RollingHash", () => new RollingHash().search(pattern, text));
