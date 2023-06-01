from bs4 import BeautifulSoup
from urllib.request import Request,urlopen 
from fake_useragent import UserAgent
import requests
import pymysql
import time
conn = pymysql.connect(host='localhost', user='test', password='test', db='oss', charset='utf8')

def data(url,price):
    print(url)
    ua = UserAgent()
    header = {
        'User-Agent': ua.random
    }
    try:
        url2 = Request(url,headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'})
    except Exception as e:
        print(e)
        time.sleep(3)
        return
    html = urlopen(url2)
    soup = BeautifulSoup(html,"html.parser")
    try:
        name = " ".join(soup.select_one("#name").text.split()) # 제품명
        code = soup.select_one("#product-specs-list > li:nth-of-type(4) > span").text #제품번호
        ucode = soup.select_one("#product-specs-list > li:nth-of-type(5) > span").text #upc코드
        # 별점
        stars = soup.select_one("#product-summary-header > div.rating > a.stars")
        stra = stars["title"]

        # 주의 사항
        a = soup.find_all("div",{"class":"prodOverviewDetail"})[1].get_text()
        # 영양 성분 정보 
        b = soup.find_all("div",{"class":"supplement-facts-container"})[0].get_text()
        #이미지 
        imgsrc=soup.select_one("#iherb-product-image")["src"]
        req=requests.get(imgsrc+"")
        photo=open(code+".jpg",'wb')
        photo.write(req.content)
        photo.close
        body = (code+"",name+"",price,ucode,stra,a+"",b+"",url+"")
        print(body)
        cur = conn.cursor()
        cur.execute("INSERT INTO nutritional (nutritional_id,nutritional_name,price,barcode,stars,caution,nutritional_info,link) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",body)
        cur.close()
        conn.commit()
        time.sleep(3)
    except Exception as e:
        print(e)
        time.sleep(3)
    

    


    