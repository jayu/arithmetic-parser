const { re } = require('re-template-tag')

const re_variable = /[a-z]/
const re_onlyVariable = re`/^${re_variable}$/`
const re_mulOrDiv = /[*/]/
const re_addOrSub = /[+-]/
const re_startAddOrSub = re`^${re_addOrSub}`
const re_startMulOrDiv = re`^${re_mulOrDiv}`
const re_anyBracket = /\(.+\)/
const re_nonBracketExpression = /[a-z+*/-]/
const re_bracketWithExpressionOrBracket = re`/(\(((${re_anyBracket})|(${re_nonBracketExpression}))*\))/`
const re_onlyBracket = re`/^${re_bracketWithExpressionOrBracket}$/`

const re_subtractionAddition = re`/(${re_addOrSub}){0,1}((${re_variable}|${re_bracketWithExpressionOrBracket})(${re_mulOrDiv}){0,1})+/g`
const re_multiplicationDivision = re`/(${re_mulOrDiv}){0,1}((${re_variable}|${re_bracketWithExpressionOrBracket}))+/g`

const node = (value, left, right) => ({
  value, left, right
})

const parse = (expression) => {
  if (re_onlyBracket.test(expression)) {
    expression = expression.substring(1, expression.length - 1)
  }

  if (re_onlyVariable.test(expression)) {
    return node(expression)
  }
  const matchedAddSub = expression.match(re_subtractionAddition)
  if (matchedAddSub.length > 1) {
    const right = matchedAddSub[matchedAddSub.length - 1]
    const left = matchedAddSub.slice(0, matchedAddSub.length - 1).join('')
    const sign = right.match(re_startAddOrSub)
    const rightWithoutSign = right.substring(1)
    return node(sign[0], parse(left), parse(rightWithoutSign))
  }
  else {
    const matchedMulDiv = expression.match(re_multiplicationDivision)
    if (matchedMulDiv.length > 1) {
      const right = matchedMulDiv[matchedMulDiv.length - 1]
      const left = matchedMulDiv.slice(0, matchedMulDiv.length - 1).join('')
      const sign = right.match(re_startMulOrDiv)
      const rightWithoutSign = right.substring(1)
      return node(sign[0], parse(left), parse(rightWithoutSign))
    }
  }
}

const getValue = (variable) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  return alphabet.indexOf(variable) + 1
}

const evaluate = ({ value, left, right }) => {
  switch (value) {
    case '+': {
      return evaluate(left) + evaluate(right)
    };
    case '-': {
      return evaluate(left) - evaluate(right)
    };
    case '*': {
      return evaluate(left) * evaluate(right)
    }
    case '/': {
      return evaluate(left) / evaluate(right)
    }
    default: {
      return getValue(value)
    }
  }
}

const evaluateTree = ({ value, left, right }) => {
  if (/[+*/-]/.test(value)) {
    return node(value, evaluateTree(left), evaluateTree(right))
  }
  else {
    return node(getValue(value))
  }
}

const evaluateValidate = (expression) => {
  const expressionTree = parse(expression)
  const parsedValue = evaluate(expressionTree)
  let transformedExpression = expression
  while (re_variable.test(transformedExpression)) {
    const [char] = transformedExpression.match(re_variable)
    transformedExpression = transformedExpression.replace(char, getValue(char))
  }
  const actualValue = eval(transformedExpression)
  console.log({
    expression,
    transformedExpression,
    parsedValue,
    actualValue,
    match: parsedValue === actualValue
  })
}

module.exports = {
  parse,
  evaluateTree
}