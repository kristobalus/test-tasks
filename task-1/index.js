/*
Given a string, split the string into two substrings at every possible point.
The rightmost substring is a suffix.
The beginning of the string is the prefix.
Determine the lengths of the common prefix between each suffix and the original string.
Sum and return the lengths of the common prefixes.
 */

const assert = require("assert")

/**
 *
 * @param {string} str
 * @returns {number}
 */
function sumCommonPrefix(str)  {

    let total = 0
    for(let i = 0; i < str.length; i++) {
        let suffix = str.substring(i)
        let sum = 0
        for(let j = 0; j < suffix.length && j < str.length && suffix[j] === str[j]; j++) {
            sum++
        }
        total = total + sum
    }

    return total
}

/**
 *
 * @param {string[]} cases
 * @returns {*[]}
 */
function commonPrefix(cases) {
    let result = []
    for(let i = 0; i < cases.length; i++) {
        result.push(sumCommonPrefix(cases[i]))
    }
    return result
}

const [ result1, result2, result3 ] = commonPrefix([ 'ababaa', 'aa', 'abcabcd' ])
assert(result1 === 11)
assert(result2 === 3)
assert(result3 === 10)

