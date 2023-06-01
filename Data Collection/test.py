""" import requests
import os 
req=requests.get("https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cen/cen22263/u/27.jpg")
photo=open('1.jpg','wb')
photo.write(req.content)
photo.close """
from difflib import SequenceMatcher
a = "Arthur Andrew Medical (아서 앤드류 메디컬) Neprinol AFD 어드밴스드 피브린 디펜스 500mg 캡슐 300정"
b = "Arthur Andrew (아서 앤드류 메디컬) Neprinol AFD 어드밴스드 피브린 디펜스 500mg 캡슐 300정"
print(SequenceMatcher(None, a, b).ratio())