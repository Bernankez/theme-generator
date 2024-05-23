import { describe, expect, it } from "vitest";
import { findCommonPrefix, hexToHsl, hexToRGB } from "../../src";

const keys = ["primary", "primaryForeground", "border", "secondaryForeground", "secondary"];

describe("findCommonPrefix", () => {
  it("should return common prefix", () => {
    expect(findCommonPrefix("primary", keys)).toMatchInlineSnapshot(`
      [
        {
          "kebabCase": "primary",
          "key": "primary",
          "left": "",
          "prefix": "primary",
        },
        {
          "kebabCase": "primary-foreground",
          "key": "primaryForeground",
          "left": "foreground",
          "prefix": "primary",
        },
      ]
    `);
  });

  it("should return common prefix with reversed order", () => {
    expect(findCommonPrefix("secondary", keys)).toMatchInlineSnapshot(`
      [
        {
          "kebabCase": "secondary-foreground",
          "key": "secondaryForeground",
          "left": "foreground",
          "prefix": "secondary",
        },
        {
          "kebabCase": "secondary",
          "key": "secondary",
          "left": "",
          "prefix": "secondary",
        },
      ]
    `);
  });

  it("should only return one item if no common prefix", () => {
    expect(findCommonPrefix("border", keys)).toMatchInlineSnapshot(`
      [
        {
          "kebabCase": "border",
          "key": "border",
          "left": "",
          "prefix": "border",
        },
      ]
    `);
  });
});

describe("hexToRGB", () => {
  it("should convert hex", () => {
    expect(hexToRGB("#c14344")).toEqual({
      r: 193,
      g: 67,
      b: 68,
    });
  });
});

describe("hexToHsl", () => {
  it("should convert hex to hsl", () => {
    expect(hexToHsl("#c14344")).toEqual(
      {
        h: 359.5238095238095,
        l: 0.5098039215686274,
        s: 0.5039999999999999,
      },
    );
  });

  it("should handle hue-less colors properly", () => {
    expect(hexToHsl("#ffffff")).toEqual(
      {
        h: 0,
        l: 1,
        s: 0,
      },
    );

    expect(hexToHsl("#000000")).toEqual(
      {
        h: 0,
        l: 0,
        s: 0,
      },
    );
  });
});
