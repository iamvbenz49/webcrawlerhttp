const {sortPages} = require("./report");
const {test,expect} = require("@jest/globals")

test('sortPages', () => {
    const input = {
        "https://wagslane.dev/path/":1,
        "https://wagslane.dev":3
    };
    const output = sortPages(input);
    const expected = [
        ["https://wagslane.dev",3],
        [ "https://wagslane.dev/path/",1]
    ];
    expect(output).toEqual(expected);
})

test('sortPages 5 pages', () => {
    const input = {
        "https://wagslane.dev/path4/":1,
        "https://wagslane.dev":3,
        "https://wagslane.dev/path3/":1,
        "https://wagslane.dev/path2/":1,
        "https://wagslane.dev/path1/":1
    };
    const output = sortPages(input);
    const expected = [
        ["https://wagslane.dev",3],
        [ "https://wagslane.dev/path4/",1],
        [ "https://wagslane.dev/path3/",1],
        [ "https://wagslane.dev/path2/",1],
        [ "https://wagslane.dev/path1/",1]
    ];
    expect(output).toEqual(expected);
})
