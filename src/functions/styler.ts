/**
 * a function that takes HTML tag name with a class list and returns the tag with the wrapped content and with classes
 * @param {string} tag
 * @param {object} styles
 * @returns HTML tag element
 */

import { AllElementsType } from "../types/HTMLElements";

export default function elementStyler(tag: string) {
  const element = document.createElement(tag);
  return function (styles: Partial<CSSStyleDeclaration>) {
    for (let key in styles) {
      if (key in styles) {
        element.style[key] = styles[key] as string;
      }
    }
    return element;
  };
}
