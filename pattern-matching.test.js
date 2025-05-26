
const { boyerMoore, bruteForce, fuzzi, kmp, rabinKarp } = require('../path/to/your/pattern/matching/files');

const text = "sample text for testing pattern matching algorithms";
const pattern = "pattern";

test('Boyer-Moore Pattern Matching', () => {
    const start = performance.now();
    const result = boyerMoore(text, pattern);
    const end = performance.now();
    assert.strictEqual(result.count, expectedCount);
    console.log(`Boyer-Moore execution time: ${end - start} ms`);
});

test('Brute Force Pattern Matching', () => {
    const start = performance.now();
    const result = bruteForce(text, pattern);
    const end = performance.now();
    assert.strictEqual(result.count, expectedCount);
    console.log(`Brute Force execution time: ${end - start} ms`);
});

test('Fuzzi Pattern Matching', () => {
    const start = performance.now();
    const result = fuzzi(text, pattern);
    const end = performance.now();
    assert.strictEqual(result.count, expectedCount);
    console.log(`Fuzzi execution time: ${end - start} ms`);
});

test('KMP Pattern Matching', () => {
    const start = performance.now();
    const result = kmp(text, pattern);
    const end = performance.now();
    assert.strictEqual(result.count, expectedCount);
    console.log(`KMP execution time: ${end - start} ms`);
});

test('Rabin-Karp Pattern Matching', () => {
    const start = performance.now();
    const result = rabinKarp(text, pattern);
    const end = performance.now();
    assert.strictEqual(result.count, expectedCount);
    console.log(`Rabin-Karp execution time: ${end - start} ms`);
});