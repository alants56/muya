import { escapeCharacters } from '@/config/escapeCharacter'

/* eslint-disable no-useless-escape */
export const beginRules = {
  hr: /^(\*{3,}$|^\-{3,}$|^\_{3,}$)/,
  code_fense: /^(`{3,})([^`]*)$/,
  header: /(^ {0,3}#{1,6}(\s{1,}|$))/,
  reference_definition: /^( {0,3}\[)([^\]]+?)(\\*)(\]: *)(<?)([^\s>]+)(>?)(?:( +)(["'(]?)([^\n"'\(\)]+)\9)?( *)$/,

  // extra syntax (not belogs to GFM)
  multiple_math: /^(\$\$)$/
}

export const endRules = {
  tail_header: /^(\s{1,}#{1,})(\s*)$/
}

export const commonMarkRules = {
  strong: /^(\*\*|__)(?=\S)([\s\S]*?[^\s\\])(\\*)\1(?!(\*|_))/, // can nest
  em: /^(\*|_)(?=\S)([\s\S]*?[^\s\*\\])(\\*)\1(?!\1)/, // can nest
  inline_code: /^(`{1,3})([^`]+?|.{2,})\1/,
  image: /^(\!\[)(.*?)(\\*)\]\((.*)(\\*)\)/,
  link: /^(\[)((?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*?)(\\*)\]\((.*)(\\*)\)/, // can nest
  reference_link: /^\[([^\]]+?)(\\*)\](?:\[([^\]]*?)(\\*)\])?/,
  reference_image: /^\!\[([^\]]+?)(\\*)\](?:\[([^\]]*?)(\\*)\])?/,
  html_tag: /^(<!--[\s\S]*?-->|(<([a-zA-Z]{1}[a-zA-Z\d-]*) *[^\n<>]* *(?:\/)?>)(?:([\s\S]*?)(<\/\3 *>))?)/, // raw html
  html_escape: new RegExp(`^(${escapeCharacters.join('|')})`, 'i'),
  soft_line_break: /^(\n)(?!\n)/,
  hard_line_break: /^( {2,})(\n)(?!\n)/,

  // patched math marker `$`
  backlash: /^(\\)([\\`*{}\[\]()#+\-.!_>~:\|\<\>$]{1})/
}

export const gfmRules = {
  emoji: /^(:)([a-z_\d+-]+?)\1/,
  del: /^(~{2})(?=\S)([\s\S]*?\S)(\\*)\1/, // can nest
  auto_link: /^<(?:([a-zA-Z]{1}[a-zA-Z\d\+\.\-]{1,31}:[^ <>]*)|([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*))>/,
  // (extended www autolink|extended url autolink|extended email autolink) the email regexp is the same as auto_link.
  auto_link_extension: /^(?:(www\.[a-z_-]+\.[a-z]{2,}(?::[0-9]{1,5})?(?:\/[\S]+)?)|(http(?:s)?:\/\/(?:[a-z0-9\-._~]+\.[a-z]{2,}|[0-9.]+|localhost|\[[a-f0-9.:]+\])(?::[0-9]{1,5})?(?:\/[\S]+)?)|([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*))(?=\s|$)/
}

// Markdown extensions (not belongs to GFM and Commonmark)
export const inlineExtensionRules = {
  inline_math: /^(\$)([^\$]*?[^\$\\])(\\*)\1(?!\1)/,
  // This is not the best regexp, because it not support `2^2\\^`.
  // superscript: /^(\^)((?:[^\^\s]|(?<=\\)\1|(?<=\\) )+?)(?<!\\)\1(?!\1)/,
  // subscript: /^(~)((?:[^~\s]|(?<=\\)\1|(?<=\\) )+?)(?<!\\)\1(?!\1)/,
  // footnote_identifier: /^(\[\^)([^\^\[\]\s]+?)(?<!\\)\]/
  superscript: /^$/,
  subscript: /^$/,
  footnoteIdentifier: /^$/
}
/* eslint-enable no-useless-escape */

export const inlineRules = {
  ...endRules,
  ...commonMarkRules,
  ...gfmRules,
  ...inlineExtensionRules
}

const rawValidateRules = Object.assign({}, inlineRules)
delete rawValidateRules.em
delete rawValidateRules.strong
delete rawValidateRules.tail_header
delete rawValidateRules.backlash
delete rawValidateRules.superscript
delete rawValidateRules.subscript
delete rawValidateRules.footnote_identifier

export const validateRules = rawValidateRules
