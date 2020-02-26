const {parse, evaluateTree} = require('./parseEquation')

const compile = (wrapProgram, wrapLine) => (expression) => {
  const compileInner = ({ value, right, left }, depth = 1) => {
    if (parseInt(value,10) === value) {
      return {
        identifier: `${value}.0`,
        code: ''
      }
    }
    else {
      const leftCompiled = compileInner(left, depth+1)
      const rightCompiled = compileInner(right, depth*2+1)
      const identifier = `i${depth}`
      return {
        identifier,
        code: wrapLine({leftCompiled, rightCompiled, identifier, value})
      }
    }
  }
  const evaluatedTree = evaluateTree(parse(expression))
  const {identifier, code} = compileInner(evaluatedTree)
  return wrapProgram({identifier, code})
}

const wrapProgramJS = ({identifier, code}) => code + `console.log(${identifier})`
const wrapLineJS = ({leftCompiled, rightCompiled, identifier, value}) => `${leftCompiled.code}${rightCompiled.code}const ${identifier} = ${leftCompiled.identifier} ${value} ${rightCompiled.identifier};\n`

const compileJS = compile(wrapProgramJS, wrapLineJS)

const wrapProgramPY = ({identifier, code}) => code + `print(${identifier})`
const wrapLinePY = ({leftCompiled, rightCompiled, identifier, value}) => `${leftCompiled.code}${rightCompiled.code}${identifier} = ${leftCompiled.identifier} ${value} ${rightCompiled.identifier}\n`

const compilePY = compile(wrapProgramPY, wrapLinePY)

const wrapProgramRS = ({identifier, code}) => `
fn main() {
  ${code}
  println!("{}", ${identifier});
}
`
const wrapLineRS = ({leftCompiled, rightCompiled, identifier, value}) => `${leftCompiled.code}${rightCompiled.code}let ${identifier} = ${leftCompiled.identifier} ${value} ${rightCompiled.identifier};\n`
const compileRS = compile(wrapProgramRS, wrapLineRS)

module.exports = {
  compileJS,
  compilePY,
  compileRS
}