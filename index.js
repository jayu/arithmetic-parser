const fs = require('fs')
const cp = require('child_process')

const compile = require('./compileEquation')

const equation = '((a+b)*c)+d*e/g*(a+b)*(a*n)-a+b'

const snippet = process.argv[2] || equation
const code = compile.compileJS(snippet)
eval(code)