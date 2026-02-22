name = 'Karthik'
age = 27
mark = 97.20

print("My Name is ", name , "and my age is ", age , "and my average is ", mark)

#String formatting in Python is used to add values or variables inside a string easily. 
#It helps combine text and data in a clear way while printing output. 
#Python supports different formatting methods like f-strings, format(), and the % operator. 
#Among these, f-strings are the easiest and most commonly used because they are simple to write and easy to read. 
#String formatting is useful when displaying messages, numbers, or results in real-time programs.

#Operator Method

    #String  -> "%s"
    #Single Character  -> "%c"
    #Floating Point Decimal  -> "%f"
    #Floating Point Exponential  -> "%f"
    #Single integer Decimal  -> "%d"
    
print("My Name is %s and my age is %d and my average score is %f" %(name,age,mark))
print("My Name is %s and my age is %d and my average score is %.2f" %(name,age,mark))

#format() -> It will return the value with {}

print("My Name is {} and my age is {} and my average score is {}".format(name,age,mark))

#f-String method -> It will return the value with {}
print(f"My Name is {name} and my age is {age} and my average score is {mark}")