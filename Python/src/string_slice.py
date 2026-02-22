#In this method we have syntax for this method 

#[start_index:end_index]
myStr = 'Python is a famous programming language'

print(myStr[0:16])

#[start_index:end_index] Both index are not mandatory if we dnt give any value it will automatically picking

myStr = 'Python is a famous programming language'

print(myStr[:])

#Using string slicing with a step value of 2, it prints every alternate character from the string starting from the first character.

myStr = 'Python is a famous programming language'

print(myStr[::2])

#It will return the value from reverse order

myStr = 'Python is a famous programming language'

print(myStr[::-2])