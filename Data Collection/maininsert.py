import pandas as pd
from pytest import data
import pymysql
import openpyxl as op
conn = pymysql.connect(host='localhost', user='test', password='test', db='oss', charset='utf8')
cur = conn.cursor()
a = pd.read_excel('ossexcelfinal.xlsx',sheet_name="Sheet1",engine='openpyxl')

f1 = a.loc[:,"id"]
f2 = a.loc[:,"company"]
f3 = a.loc[:,"name"]
f4 = a.loc[:,"iherb_price"]
f5 = a.loc[:,"naver_price"]
f6 = a.loc[:,"iherb_link"]
f7 = a.loc[:,"naver_link"]
f8 = a.loc[:,"rating"]
f9 = a.loc[:,"rating_count"]
f10 = a.loc[:,"caution"]
f11 = a.loc[:,"nutrient_info"]
f12 = a.loc[:,"sub_nutrient_info"]
f13 = a.loc[:,"daily_eating"]

for i in range(len(f1)):
    cur = conn.cursor()
    body = (f1[i],f2[i],f3[i],f4[i],f5[i],f6[i],f7[i],f8[i],f9[i],f10[i],f11[i],f12[i],f13[i])
    cur.execute("INSERT INTO nutritional (id,company,name,iherb_price,naver_price,iherb_link,naver_link,rating,rating_count,caution,nutrient_info,sub_nutrient_info,daily_eating) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",body)
    conn.commit()