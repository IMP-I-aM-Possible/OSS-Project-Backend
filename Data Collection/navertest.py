import requests
import pandas as pd
from pytest import data
import pymysql
import openpyxl as op
import urllib
import json
import time
from difflib import SequenceMatcher

conn = pymysql.connect(host='localhost', user='test', password='test', db='oss', charset='utf8')
cur = conn.cursor()
a = pd.read_excel('ossexcel.xlsx',sheet_name="Sheet1",engine='openpyxl')
f1 = a.loc[:,"id"]
f2 = a.loc[:,"name"]
f7 = a.loc[:,"price"]
f4 = a.loc[:,"barcode"]
f5 = a.loc[:,"stars"]
f6 = a.loc[:,"caution"]
f3 = a.loc[:,"info"]
f8 = a.loc[:,"link"]
f9 = a.loc[:,"eating"]

for k in range(len(f1)):
    try:
        company = f2[k].split(",")[0]
        cutstring = "".join(f2[k].split(",")[1:])[1:]

        query = f2[k]
        query = urllib.parse.quote(query)
        display = "25"
        url = "https://openapi.naver.com/v1/search/shop?query=" + query + "&display=" + display
        client_id = "KOEmnPb9ojaBpJtau2eu"
        client_secret = "Ysajib3nFx"
        request = urllib.request.Request(url)
        request.add_header('X-Naver-Client-Id', client_id)
        request.add_header('X-Naver-Client-Secret', client_secret)

        response = urllib.request.urlopen(request)
        carr = []
        naverarr = []
        #print(response.read().decode('utf-8'))
        a = json.loads(response.read().decode('utf-8'))["items"]
        naver = a[:10]
        #print(len(json.loads(response.read().decode('utf-8'))["items"]))
        #print(arr) ,naver[i]["title"] 제품명
        for i in range(len(naver)):
            if naver[i]["mallName"] != "iherb":
                if f7[k]/int(naver[i]["lprice"]) <= 2:
                    if float(SequenceMatcher(None, cutstring, naver[i]["title"].replace("</b>","").replace("<b>","")).ratio())+float(SequenceMatcher(None, cutstring[-5:], naver[i]["title"].replace("</b>","").replace("<b>","")[-5:]).ratio()) >= 0.75: 
                        naverarr.append([(float(SequenceMatcher(None, cutstring, naver[i]["title"].replace("</b>","").replace("<b>","")).ratio())+float(SequenceMatcher(None, cutstring[-5:], naver[i]["title"].replace("</b>","").replace("<b>","")[-5:]).ratio())),cutstring,naver[i]["title"].replace("</b>","").replace("<b>",""),int(naver[i]["lprice"]),naver[i]["link"]])
        naverarr = sorted(naverarr, key=lambda x:-x[0])

        naverarr = naverarr[:5]

        naverarr = sorted(naverarr, key=lambda x:x[3])
        naverprice = 5555555555
        nlink = "None"
        asdb = "None"
        if(len(naverarr)!=0):
            asdb = naverarr[0][2]
            naverprice = naverarr[0][3]
            nlink = naverarr[0][4]
        print(naverprice,nlink,f7[k],f1[k],asdb)
        star = f5[k].split("/")[0]
        purchase = f5[k].split(" ")[2]
        body = (f1[k],company,cutstring,f7[k],naverprice,f4[k],star,purchase,f6[k],f3[k],f8[k],nlink,f9[k])
        cur.execute("INSERT INTO nutritional (id,company,name,iherb,naver,barcode,stars,purchase,caution,info,ilink,nlink,eating) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",body)
        conn.commit()
        print(end="\n")
    except:
        print("에러")
        print(k)
        print(naverprice,nlink,f7[k],f1[k],asdb)
    