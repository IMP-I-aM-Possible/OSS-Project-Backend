import pandas as pd
from pytest import data
import pymysql
import json
import openpyxl as op
conn = pymysql.connect(host='localhost', user='test', password='test', db='oss', charset='utf8')
cur = conn.cursor()
a = pd.read_excel('suboss.xlsx',sheet_name="Sheet1",engine='openpyxl')
f1 = a.loc[:,"id"]
f2 = a.loc[:,"name"]
f3 = a.loc[:,"price"]
f4 = a.loc[:,"barcode"]
f5 = a.loc[:,"stars"]
f6 = a.loc[:,"caution"]
f7 = a.loc[:,"info"]
f8 = a.loc[:,"link"]
narr = ["리놀레산","알파리놀레산","EPA","DHA","메티오닌","류신","이소류신","발린","라이신","페닐알라닌","티로신","트레오닌","트립토판","히스티딘","비타민A","비타민B","비타민D","비타민E","비타민K","비타민C","티아민","리보플라빈","니아신","나이아신","피리독신","엽산","코발라민","코발아민","판토텐산","비오틴","칼슘","인","나트륨","염소","칼륨","마그네슘","철","아연","징크","구리","불소","망간","요오드","셀레늄","몰리브덴","크롬","크로뮴"]
#1028,1029
""" wb = op.load_workbook("suboss.xlsx")
ws = wb["Sheet1"] """
for i in range(1001):
    string = ""
    abcde = f7[i].split("@")
    arr = []
    for j in range(2,len(abcde)-1,2):
        cnt = 1
        
        for k in narr:
            if k == "인":
                if abcde[j].replace(" ","").find(k) != -1 or abcde[j+1].replace(" ","").find(k) != -1 :
                    if abcde[j].replace(" ","").find("인도") == -1 or abcde[j+1].replace(" ","").find("인도") == -1:
                        if abcde[j].replace(" ","").find("인증") == -1 or abcde[j+1].replace(" ","").find("인증") == -1:
                            if abcde[j].replace(" ","").find("인지질") == -1 or abcde[j+1].replace(" ","").find("인지질") == -1:
                                cnt = 0
                if abcde[j].replace(" ","").find("1") == 0 or abcde[j].replace(" ","").find("2") == 0 or abcde[j].replace(" ","").find("3") == 0 or abcde[j].replace(" ","").find("4") == 0 or abcde[j].replace(" ","").find("5") == 0 or abcde[j].replace(" ","").find("6") == 0 or abcde[j].replace(" ","").find("7") == 0 or abcde[j].replace(" ","").find("8") == 0 or abcde[j].replace(" ","").find("9") == 0:
                    cnt = 0
            else:
                if abcde[j].replace(" ","").find(k) != -1 or abcde[j+1].replace(" ","").find(k) != -1:
                    cnt = 0
                if abcde[j].replace(" ","").find("1") == 0 or abcde[j].replace(" ","").find("2") == 0 or abcde[j].replace(" ","").find("3") == 0 or abcde[j].replace(" ","").find("4") == 0 or abcde[j].replace(" ","").find("5") == 0 or abcde[j].replace(" ","").find("6") == 0 or abcde[j].replace(" ","").find("7") == 0 or abcde[j].replace(" ","").find("8") == 0 or abcde[j].replace(" ","").find("9") == 0:
                    cnt = 0
        if cnt :
            arr.append([""+abcde[j]+"",""+abcde[j+1]+""])
    subinfoarr = {}
    subinfoarr2 = "{\""
    if len(arr) != 0: #CGN-00663
        for k in range(len(arr)):
            if k == len(arr)-1:
                subinfoarr2 +=  str(arr[k][0]) +"\"" + ": \"" + str(arr[k][1]) + "\""
            else:
                subinfoarr2 +=  str(arr[k][0]) +"\"" + ": \"" + str(arr[k][1]) + "\", \""
            #subinfoarr[str(arr[k][0])] = str(arr[k][1])
        subinfoarr2 += "}"
    else:
        subinfoarr2 = subinfoarr2[:1] +  "}"
    body = (subinfoarr2,f1[i])
    print(body)
    
    cur.execute("UPDATE nutritional set subinfo = %s where id = %s",body)
    conn.commit()
