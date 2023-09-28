const {normalizeURL} = require("./crawl");
const {test,expect} = require("@jest/globals")

test('normalizeURL strip protocol', () => {
    const input = "https://blog.boot.dev/path";
    const output = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(output).toEqual(expected);
})

test('normalizeURL strip trailing slash', () => {
    const input = "https://blog.boot.dev/path/";
    const output = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(output).toEqual(expected);
})

test('normalizeURL capitals', () => {
    const input = "https://BLOG.boot.dev/path/";
    const output = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(output).toEqual(expected);
})

test('normalizeURL strp http', () => {
    const input = "https://BLOG.boot.dev/path/";
    const output = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(output).toEqual(expected);
})