import pandas as pd
from pytest import data
a = pd.read_excel('etestnew2.xlsx',sheet_name="Sheet1",engine='openpyxl')
b = a.loc[:,"info"]
print(b[0])

""" c = a.loc[:,"가격"] """
""" for i in range(10080,len(b)):
    print(i)
    data(b.values[i],c.values[i])
"""