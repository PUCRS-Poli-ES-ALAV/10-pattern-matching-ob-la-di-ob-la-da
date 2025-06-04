const assert = require('assert');

const BoyerMoore = require('./Boyer-Moore');
const KMP = require('./KMP');
const RabinKarp = require('./Rabin-Karp');
const Fuzzy = require('./Fuzzy');
const RollingHash = require('./Rooling-Hash');


function test(description, fn) {
    try {
        fn();
        console.log(`✓ ${description}`);
    } catch (error) {
        console.error(`✗ ${description}`);
        console.error(error);
    }
}


const expectedCount = 1;
const text = "sample text for testing pattern matching algorithms";
const pattern = "pattern";



test('KMP Pattern Matching', () => {
    const matcher = new KMP(pattern);
    const start = performance.now();
    const result = matcher.search(text);
    const end = performance.now();
    assert.strictEqual(result.length, expectedCount);
    console.log(`KMP execution time: ${end - start} ms`);
    console.log(`KMP found ${result.length} occurrence(s)`);
});

test('Rabin-Karp Pattern Matching', () => {
    const rabinKarp = new RabinKarp(pattern);
    const start = performance.now();
    const result = rabinKarp.search(text);
    const end = performance.now();
    assert.strictEqual(result.count, expectedCount);
    console.log(`Rabin-Karp execution time: ${end - start} ms`);
    console.log(`Rabin-Karp found ${result.length} occurrence(s)`);
});

test('Boyer-Moore Pattern Matching', () => {
    const boyerMoore = new BoyerMoore(pattern);
    const start = performance.now();
    const result = boyerMoore.search(text);
    const end = performance.now();
    assert.strictEqual(result.length, expectedCount);
    console.log(`Boyer-Moore execution time: ${end - start} ms`);
    console.log(`Boyer-Moore found ${result.length} occurrence(s)`);
});

test('Fuzzy Pattern Matching', () => {
    const fuzzy = new Fuzzy(pattern);
    const start = performance.now();
    const result = fuzzy.search(text);
    const end = performance.now();
    assert.strictEqual(result.length, expectedCount);
    console.log(`Fuzzy execution time: ${end - start} ms`);
    console.log(`Fuzzy found ${result.length} occurrence(s)`);
});

test('Rolling Hash Pattern Matching', () => {
    const rollingHash = new RollingHash(pattern);
    const start = performance.now();
    const result = rollingHash.search(text);
    const end = performance.now();
    assert.strictEqual(result.length, expectedCount);
    console.log(`Rolling Hash execution time: ${end - start} ms`);
    console.log(`Rolling Hash found ${result.length} occurrence(s)`);
});
