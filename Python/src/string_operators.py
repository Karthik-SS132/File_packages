# String having 4 types of operators

# 1) Concatenation Operator (+)

myStr1 = "Python"
myStr2 = "Programming"
myStr3 = "Language"

print(myStr1+' '+myStr2+' '+myStr3)

# 2) Repetition Operator (*) If we want to repeat the string

myStr1 = "Python"

print(myStr1*3)

# 3) String Operator 
    # a) ==   -> (It will compare the value of string)
    # b) >    -> (It will compare the ASCII Code)
    # c) >=   -> (It will compare the ASCII Code)
    # d) <    -> (It will compare the ASCII Code)
    # e) <=   -> (It will compare the ASCII Code)
    # f) !=   -> (It will compare the value of string)

value1 = "Dog"
value2 = "Cat"

if value1 == value2 :
    print ("Dog")
else :
    print ("Cat")
print('a'>'A')
print('a'>='A')
print('a'<'A')
print('a'<='A')
    
if value1 != value2 :
    print ("Dog")
else :
    print ("Cat")
    
# 4 Membership Operator

fruit = "apple"

print('l' in fruit)
    
fruit = "apple"

print('Z' not in fruit)    