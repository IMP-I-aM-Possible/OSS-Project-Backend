import pymysql
conn = pymysql.connect(host='localhost', user='test', password='test', db='oss', charset='utf8')

cur = conn.cursor()
tname = ["linoleicacid","alphalinoleicacid","epadha","methionine","leucine","isoleucine","valine","lysine","phenylalanine","tyrosine","threonine","tryptophan","histamine","vitamina","vitamind","vitamine","vitamink","vitaminc","riboflavin","niacin","vitaminb","folate","pantothenic","biotin","calcium","phosphorus","natrium","chlorine","potassium","magnesium","iron","zinc","cu","fluorine","mangan","iodine","selenium","molybdenum","chrome"]
for i in range(len(tname)):
    sql = "CREATE TABLE " + tname[i] + " (idx INT NOT NULL AUTO_INCREMENT, age FLOAT NULL, gender VARCHAR(10) NULL, recommend VARCHAR(10) NULL, max VARCHAR(10) NULL, PRIMARY KEY (idx));"
    """ sql = "DROP TABLE " + tname[i] """
    cur.execute(sql)
    conn.commit()
