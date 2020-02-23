const subtractionAddition = /(((?<=\+|\-)|[a-z])([a-z*\\]|((\(((\(.+\))|([a-z+*\\-]))*\))))+)|(\(((\(.+\))|([a-z+*\\-]))*\))|([a-z])/g

const text = `
(((a+b)*c)+d*e)
((a+b)*c)+(d*e)
((a+b)*c)+d*e\g*(a+b)*(a*n)
((a+b)*c)+d*e\g*(a+b)*(a*n)-a+b
(a+b)*c
a+(a+b)*a-x*z*(a+b)
a+b
a+b+c
d*e
a+b*c
d*e*a
a-z-c-v+w+a+z
`

const matches = text.match(subtractionAddition)

console.log(matches)