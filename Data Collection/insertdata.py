import pymysql
conn = pymysql.connect(host='localhost', user='test', password='test', db='oss', charset='utf8')

cur = conn.cursor()
tname = ["linoleicacid","alphalinoleicacid","epadha","methionine","leucine","isoleucine","valine","lysine","phenylalanine","tyrosine","threonine","tryptophan","histamine","vitamina","vitamind","vitamine","vitamink","vitaminc","vitaminb","riboflavin","niacin","pyridoxine","folate","cobalamin","pantothenic","biotin","calcium","phosphorus","natrium","chlorine","potassium","magnesium","iron","zinc","cu","fluorine","mangan","iodine","selenium","molybdenum","chrome"]
# 임산부 200 수유부 300

sql = "INSERT INTO "+tname[40]+"( age, gender, recommend) VALUES (%s,%s,%s)"
sql2 = "INSERT INTO "+tname[40]+"( age, gender, recommend, max) VALUES (%s,%s,%s,%s)"
sql3 = "INSERT INTO "+tname[40]+"( age, gender, max) VALUES (%s,%s,%s)"

sql4 = "INSERT INTO "+tname[39]+"( age, gender) VALUES (%s,%s)"
print(tname[40])
body05 = (0.5,"영아","0.2μg")
body06 = (0.6,"영아","4.0μg")


bodymom = (200,"임산부","5μg")
bodymom2 = (300,"수유부","20μg")

cur.execute(sql,body05)
cur.execute(sql,body06)
for i in range(1,3):
    cur.execute(sql,(i,"유아","10μg"))
for i in range(3,6):
    cur.execute(sql,(i,"유아","10μg"))
for i in range(6,9):
    cur.execute(sql,(i,"남자","15μg"))
    cur.execute(sql,(i,"여자","15μg"))
for i in range(9,12):
    cur.execute(sql,(i,"남자","20μg"))
    cur.execute(sql,(i,"여자","20μg"))
for i in range(12,15):
    cur.execute(sql,(i,"남자","30μg"))
    cur.execute(sql,(i,"여자","20μg"))
for i in range(15,19):
    cur.execute(sql,(i,"남자","35μg"))
    cur.execute(sql,(i,"여자","20μg"))   
for i in range(19,30):
    cur.execute(sql,(i,"남자","30μg"))
    cur.execute(sql,(i,"여자","20μg"))
for i in range(30,50):
    cur.execute(sql,(i,"남자","30μg"))
    cur.execute(sql,(i,"여자","20μg"))
for i in range(50,65):
    cur.execute(sql,(i,"남자","30μg"))
    cur.execute(sql,(i,"여자","20μg"))
for i in range(65,75):
    cur.execute(sql,(i,"남자","25μg"))
    cur.execute(sql,(i,"여자","20μg"))
for i in range(75,76):
    cur.execute(sql,(i,"남자","25μg"))
    cur.execute(sql,(i,"여자","20μg"))
cur.execute(sql,bodymom)
cur. execute(sql,bodymom2)
conn.commit()
