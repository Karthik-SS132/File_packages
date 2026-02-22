#It will remove the unwanted spaces and character from the string

text = "  hello "
print(text.strip())

#It will remove the unwanted spaces and character from the string to left side only

text = "  hello "
print(text.lstrip())

#It will remove the unwanted spaces and character from the string to right side only

text = "  hello "
print(text.rstrip())

#It will remove the unwanted character from the string

text = "%%%hello%%%"
print(text.strip("%"))
print(text.lstrip("%"))
print(text.rstrip("%"))