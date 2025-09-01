import sys


def parse(string):
    return string.split()






old_req = sys.argv[0]
new_req = parse(old_req)
output = ""
    
for i in range(len(new_req)):
    output += new_req[i]
output2 = output
