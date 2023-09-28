const {normalizeURL, getURLsFromHTML} = require("./crawl");
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

test('normalizeURL strip http', () => {
    const input = "https://BLOG.boot.dev/path/";
    const output = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(output).toEqual(expected);
})

test('getURLsFromHTML', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const output = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/"];
    expect(output).toEqual(expected);
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const output = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(output).toEqual(expected);
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog path1
            </a>
            <a href="/path2/">
                Boot.dev Blog path2
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const output = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"];
    expect(output).toEqual(expected);
})

