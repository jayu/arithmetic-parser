const fs = require('fs')
const cp = require('child_process')

const compile = require('./compileEquation')

const equation = '(1+2.5)*400/(132*123/2304235)+1*0.001'

const snippet = process.argv[2] || equation
const code = compile.compileJS(snippet)
console.log('Code')
console.log("_____")
console.log(code)
console.log("_____")
console.log('Result') 
eval(code)