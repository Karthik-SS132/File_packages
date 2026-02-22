#It used to divide a string into multiple parts based on a separator and return them as a list.
from copy import replace
myStr = 'Python,is,a,famous programming language'

print(myStr.split(","))

#Join Method -> It is used to combine elements of a list (or tuple) into a single string using a specified separator.

data = ["Karthik", "27", "97.20"]
result = ",".join(data)
print(result)

#It will return the index value of the string and find the index by value also 

myStr = 'Python is a famous programming language'

print(myStr.index("a"))
print(myStr.index("a", myStr.index("a") + 1))

#Replace Method -> It will replace the value based on the value 
# Syntax  variable.reaplce(old,new,count) 

myStr = 'Python is a famous programming language'

print(myStr.replace("famous","test"))