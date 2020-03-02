# Arithmetic parser

The goal of this project was to train some regular expressions and create parser for arithmetic expressions.
Initially I wanted to create simple programing language, but I wanted to start with something easy.
After I managed to implement this parser, I started looking on how parsers and compilers are build.
It turned out that building programming language parser just with regexps is not a the best idea due to low maintainability and issues with nested recursive expressions. I decided to give up on further development of this parser, and hopefully starting a new project of simple programing language parser.
However I think the work that was done here was quite successful. My parser can:

- parse expressions with subtraction, addition, multiplication, division and parenthesis.
- compile equation to three languages: JavaScript, Python and Rust.

Of course, any of the languages can execute this kind of equation just as it is, but I wanted to check how actually code is interpreted by the machine, without looking on any tutorials at first.

## Example

```sh
node index.js (1+3)/4+7-1*2
```

will output "compiled" source code, and print the result.

```sh
Code
_____
const i7 = 1.0 + 3.0;
const i3 = i7 / 4.0;
const i1 = i3 + 7.0;
const i2 = 1.0 * 2.0;
const i0 = i1 - i2;
console.log(i0)
_____
Result
6
```

## Missing features

- unary operators for negative numbers (be able to parse `-5`)
- power operator (`3^2`, `2^2^2`)
