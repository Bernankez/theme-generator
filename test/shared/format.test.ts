import { describe, expect, it } from "vitest";
import { findCommonPrefix } from "../../src";

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
