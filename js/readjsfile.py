import re

hand = open('app.js')
count = 0


for line in hand:
    line = line.rstrip()
    if re.search('^function .+ ', line): #search for line beginning with the word function / followed by any number of chars (.+)
        print(line)


# C:\Users\RickP\Documents\Python for Everybody or
# C:\Users\RickP\Documents\\Py4Inf_Python for Info
# pythonlearn_for Python 3.x.pdf
