
# import sys;

# n = int(input("Chuck Size (Size to break down the string into per line) : "))
# s = input("Input String (Too-Long String) : ")

# lines = [s[i:i+n] for i in range(0, len(s), n)]

# quotechar = "'"
# hasSpace = False    # Set true with there should a whitespace after string
# hasIntermediateQuotes = True
# lineEnder = " + \n"
# tailRemove = len(lineEnder)
# #tailRemove = len(lineEnder) + 2 if hasIntermediateQuotes else 0
# #tailRemove = 2 + int(hasSpace) + int(hasIntermediateQuotes)
# output = ""
# if not hasIntermediateQuotes:
#     output += quotechar
# for line in lines:
#     if hasIntermediateQuotes:
#         output += quotechar + line + quotechar + lineEnder
#     else:
#         output += line + lineEnder

# output = output[:-tailRemove]    # Remove final characters
# if not hasIntermediateQuotes:
#     output += quotechar

# print(output)

# filename = "javascriptlongstringsplit.txt"
# f = open(filename, "w")
# f.write(output)

# print("Contents printed to : " + filename)


# import sys;

# n = int(input("Chuck Size (Size to break down the string into per line) : "))
# s = input("Input String (Too-Long String) : ")
# filename = "javascriptlongstringsplit.txt"
# # f = open(filename, "w")

# lines = [s[i:i+n] for i in range(0, len(s), n)]

# quotechar = "'"
# hasSpace = False    # Set true with there should a whitespace after string
# hasIntermediateQuotes = True
# lineEnder = " + \n"
# tailRemove = len(lineEnder)
# #tailRemove = len(lineEnder) + 2 if hasIntermediateQuotes else 0
# #tailRemove = 2 + int(hasSpace) + int(hasIntermediateQuotes)
# output = ""
# if not hasIntermediateQuotes:
#     output += quotechar
# f = open(filename, "w")
# f.write(output)
# f.close()

# for line in lines:
#     newline = quotechar + line + quotechar + lineEnder
#     f = open(filename, "a")
#     f.write(newline)
#     f.close();
#     # if hasIntermediateQuotes:
#     #     output += quotechar + line + quotechar + lineEnder
#     # else:
#     #     output += line + lineEnder

# output = output[:-tailRemove]    # Remove final characters
# if not hasIntermediateQuotes:
#     f = open(filename, "a")
#     f.write(quotechar)
#     f.close();
#     # output += quotechar

# print(output)

# print("Contents printed to : " + filename)

import sys;

n = int(input("Chuck Size (Size to break down the string into per line) : "))
#s = input("Input String (Too-Long String) : ")
outputFileName = "javascriptlongstringsplit.txt"
inputFileName = "embeddedfontinput.txt"

inputFile = open(inputFileName, "r")
s = inputFile.read()
print("Length: " + str(len(s)))
inputFile.close()

lines = [s[i:i+n] for i in range(0, len(s), n)]

quotechar = "'"
# hasSpace = False    # Set true with there should a whitespace after string
# hasIntermediateQuotes = True
lineEnder = " + \n"
# tailRemove = len(lineEnder)
# #tailRemove = len(lineEnder) + 2 if hasIntermediateQuotes else 0
# #tailRemove = 2 + int(hasSpace) + int(hasIntermediateQuotes)
# output = ""
# if not hasIntermediateQuotes:
#     output += quotechar
# for line in lines:
#     if hasIntermediateQuotes:
#         output += quotechar + line + quotechar + lineEnder
#     else:
#         output += line + lineEnder

output = ""
for line in lines:
    output += quotechar + line + quotechar + lineEnder
output = output[:-len(lineEnder)]

print("Output Length: ", str(len(output)))

outputFile = open(outputFileName, "w")
outputFile.write(output)
outputFile.close()

# output = output[:-tailRemove]    # Remove final characters
# if not hasIntermediateQuotes:
#     output += quotechar

# print(output)

# filename = "javascriptlongstringsplit.txt"
# f = open(filename, "w")
# f.write(output)

# print("Contents printed to : " + filename)