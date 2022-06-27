""" Backend to ToDo list at hacked.fyi/todo/ """

""" TODO: 
    1. add Auth Support - Loca DB with Hashed credentials like in Chat Room App? or Oauth? 
        https://stackoverflow.com/questions/28575234/login-required-trouble-in-flask-app
        https://pythonspot.com/login-authentication-with-flask/
        https://www.digitalocean.com/community/tutorials/how-to-add-authentication-to-your-app-with-flask-login
#Useful Plugins
Flask-PyMongo - http://readthedocs.org/docs/flask-pymongo/
Flask-SQLAlchemy - http://pypi.python.org/pypi/Flask-SQLAlchemy
Flask-WTF - http://pythonhosted.org/Flask-WTF/
Flask-Mail - http://pythonhosted.org/Flask-Mail/
FLask-RESTFul - https://flask-restful.readthedocs.org/
Flask-Uploads - https://flask-uploads.readthedocs.org/en/latest/
Flask-User - http://pythonhosted.org/Flask-User/
FLask-Login - http://pythonhosted.org/Flask-Login/
#Useful Links
Flask Website - http://flask.pocoo.org
Pretty Printed Website - http://prettyprinted.com
Pretty Pretty YouTube Channel -
https://www.youtube.com/c/prettyprintedtutorials.

0. Que system - skeleton works now - add q.pop after each action if successfully done if error dont pop que instead return to JS and try again/prompt user. only save when the que is fully empty. 
https://www.youtube.com/watch?v=sTHwi1W1ymY
 1. Fix appending to bottom then it refreshhes and its at top.. always add to top.
 2. refresh user screen if changes on server occurred.. or pull new data every X time. 
3. Update mechanism for already entered tasks. 
4. / is taken litterly so it break entrr.  change to POST form? 
5. have multiple Unorded lists with different titles. Completing it buts a line throught it and send it to bottom. instead of new section. 
6. tree like structure of loggin on each action: ex: 
 API-Call_1_ID_(Russian Short Words pulled from list):
        action: 
            addToCompleted
        
        Value: 
            Task1 
        
        Result: 
            Successf

        Actions Taked:
            Func 1 ran successfully
            Func 2 ran successfully
            Func 3 ran successfully
            Wrote to Var successfully
            Removed from Queue successfully
            Saved to File successfully
        
        Errors:
                Action:
                     index not found on Func 2
                Resutl:
                     Did not remove Task1 - send error to user. 
            
If you are trying to format this as HTML, I would suggest you add <br /> also to the returned text:

celldata = []

for count, tableData in enumerate(y, start=1):
    celldata.append('{}) {}<br/>'.format(count, tableData.text))

return '\n'.join(celldata)
This first builds a list of entries with the correct numbering, and then joins each line together with a newline. The newline is purely cosmetic and will only effect how the HTML appears when viewed as source. It is the <br /> which will ensure each entry appears on a different line.

enumerate() is used to automatically count your entries for you.



update 
https://github.com/jakerieger/FlaskIntroduction/blob/master/app.py



done/completed:
@app.route('/done/<int:task_id>')
def resolve_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return redirect('/')
    if task.done:
        task.done = False
    else:
        task.done = True

    db.session.commit()
    return redirect('/')
    https://github.com/abhishek305/Flask-ToDO-App-Using-SQLAlchemy/blob/master/app.py
"""


 
 

################################################################
# Last action: T

################################################################
from flask import Flask, render_template, request
import json
#from liveserver import LiveServer
from datetime import datetime
import logging

#from flask_autodoc.autodoc import Autodoc
from flask_cors import CORS, cross_origin
import sys

cross_origin = ["*"]
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
#auto = Autodoc(app)
#ls = LiveServer(app)


toDoFileName = "AllToDo.json"

notCompleted = 0
completed = 0
deleted = 0
allToDo = 0

lineBreak = "<br/>----------------------------------------------------------------<br/>"

def timeNow():
    second = datetime.now()
    timee2 = second.hour, second.minute, second.second, second.microsecond
    return f"^^^^^^ TIME: {timee2} ^^^^^"

# logging config

def setupLogging():
    print("Starting Up program")
 
    ## File logging:
    logging.basicConfig(format= '%(levelname)s: %(asctime)s:%(message)s', filename="appLog.log", encoding="utf-8", level=logging.DEBUG,  datefmt='%m/%d/%A %I:%M:%S %p')

    # logRequest = logging.basicConfig(format= '%(levelname)s: %(asctime)s:%(message)s', filename="webRequests.log", encoding="utf-8", level=logging.DEBUG,  datefmt='%m/%d/%A %I:%M:%S %p')
    logging.info("<br/>----------------------------------------------------------------<br/>")
    logging.info("@@@@@@@@@@")
    logging.info(sys._getframe().f_code.co_name)
    logging.info("@@@@@@@@@@")

    logging.info("Logging Started At: " + datetime.time(datetime.now()).__str__())
 

    # ch = logging.StreamHandler()
    # logApp.addHandler(ch)
    # logRequest.addHandler(ch)

    # logApp.info(timeNow())
    # logRequest.info(timeNow())


setupLogging()
# create file if AllToDos.json doesnt exist
# if not os.path.exists(toDoFileName):
#     with open(toDoFileName, 'w') as f:
#         f.write("[]")
#         f.close()

with open(toDoFileName, 'w') as f:
    f.write("{\"notCompleted\": [], \"completed\": [], \"deleted\": []}")


# for logging from JS file
@app.route('/log', methods=['POST'])
def log():
    logging.info("JSJSJSJSJJSJSJSJSJS")
    logging.info(request.form['log'])
    logging.info("JSJSJSJSJJSJSJSJSJS")

    return "Success"

@app.route('/')
def index():
    logging.debug(sys._getframe().f_code.co_name)

#    return ls.render_template('index.html')
    data = request
    logging.info(data)

    logging.info(request)
    return render_template('index.html')

# Get the current saved ToDos form File 
@app.route('/loadsavedtodo')
def loadSavedToDo():
    logging.info(" &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& NEW RUN &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    logging.debug(sys._getframe().f_code.co_name)
    logging.info(timeNow())
    #everyTimeRequest()
    return readFromFile()

# Save contents to file. 
@app.route('/save')
def saveToFile():
    logging.info("save Sleep BEFORE")
    #time.sleep(.5)
    global singleTodo2

    logging.info("save Sleep AFTER")
    
    logging.info(sys._getframe().f_code.co_name)
    logging.info(timeNow())
    logging.info("Saving now")
    allToDo = combineNCD()
    writeToFile(allToDo)
    logging.info("JSJSJSJSJJSJSJ")

    logging.info(f"Successfully Saved {singleTodo2}")
    dataToReturn = {"Attempting": "Save to file", "Result": singleTodo2}
    #return f"Attempting: {action} \n Result: {result} \n"
    # logging.info("Que after save")
    # logging.info(qLine)
    # logging.info("Que after Pop")
    # qLine.pop(0)
    # qLine.pop(0)
    # logging.info(qLine)
    return dataToReturn
    #return f"Successfully Saved {singleTodo}"
     
# Add a Todo - class and singleTodo required. class: notCompleted, completed, deleted
# all options: removeCompleted/TOD
#  removeNotCompleted/TOD - 
# delete/TOD - 
# notCompleted/TOD
# completed/TOD 

qLine = []
@app.route('/addtodo/<string:classNCD>/<string:singleTodo>')
def addTodo(classNCD, singleTodo):
    logging.info("Que before append")
    # logging.info(qLine)
    # logging.info("Que after append")
    # qLine.append((classNCD,singleTodo))
    # logging.info(qLine)

    #saveToFile(singleTodo)
    global singleTodo2
    singleTodo2 = singleTodo
    logging.info(sys._getframe().f_code.co_name)
    #everyTimeRequest()
    action = "NULL"
    result = "NULL"
    global notCompleted, completed, deleted 

    if classNCD == "removeCompleted":
        action = f"Remove ∆∆ {singleTodo} ∆∆ from Completed"
        result = removeSingleTodo("completed", singleTodo)

    elif  "removeNotCompleted" in classNCD:
        action = f"Remove ∆∆ {singleTodo} ∆∆ from Not Completed"
        result = removeSingleTodo("notCompleted", singleTodo)
    elif  "delete" in classNCD:
        action = f"Delete ∆∆ {singleTodo} ∆∆ from Deleted"
        result = removeSingleTodo("deleted", singleTodo)

    elif classNCD in ["notCompleted", "completed"]:
        action = f"Add to {classNCD}:"
        result = addSingleTodo(classNCD, singleTodo)
    else:
        action = "ELSE AddTODO"
    #allToDo = combineNCD()
    #logging.info(" --- after COmbineNCD 129 --- ")
    #logging.info(allToDo)
    # writeToFile(allToDo)
    # logging.info(" --- after write to file 132 --- ")
    # logging.info(allToDo)
    logging.info("JSJSJSJSJJSJSJ")
    logging.info(f"Attempting: {action} | Result: {result} \n")
    logging.info(" @@@@@ DONE?? ")
    saveToFile()
    dataToReturn = {"Attempting": action, "Result": result}
    #return f"Attempting: {action} \n Result: {result} \n"
    return dataToReturn
    # Current ToDo's: {readFromFile('endpoint')} \n {lineBreak}"



# !! Function to read the file contents and assemble on every request
def everyTimeRequest():
    logging.info(sys._getframe().f_code.co_name)
    logging.info(timeNow())
    
  #read data from file
    global notCompleted, completed, deleted 
    notCompleted, completed, deleted = readFromFile()
    #combineNCD()

# !! Function to read all the JSON data from File
def readFromFile(sourceFunction=None):
    logging.info(sys._getframe().f_code.co_name)
    logging.info(" --- start of readFromFile 150 --- ")
    logging.info(allToDo)
    logging.info(timeNow())
    global notCompleted, completed, deleted 

    with open(toDoFileName, encoding='utf-8-sig', errors='ignore') as r:
        try:
            data = json.load(r, strict=False)
            notCompleted = data['notCompleted']
            completed = data['completed']
            deleted = data['deleted']
            logging.info("Done reading from File ")
            logging.info(data)
            return data
        except Exception as e:
            logging.info("error reading from file: \n " + str(e))
            logging.info(timeNow())

            return [], [], []
        
        # if sourceFunction == "endpoint":
        #     logging.info(" --- endpoint readFromFile 159 --- ")
        #     logging.info(data)
        #     logging.info(timeNow())

        #     return data
        # else:
        #     logging.info(" --- else 163 --- ")
        #     logging.info(data)
        #     logging.info(timeNow())
        #     return data["notCompleted"], data["completed"], data["deleted"]
    
            

            
# !!function to write to file the finished JSON data
def writeToFile(allToDo):
    logging.info(sys._getframe().f_code.co_name)
    logging.info(" --- write to fil 174 --- ")
    logging.info(allToDo)
    logging.info(timeNow())

    try:
        with open(toDoFileName, "w") as r:
            j = json.dumps(allToDo)
            logging.info(" --- json.dumps alltodo 179 --- ")
            logging.info(j)
            logging.info(timeNow())

            r.write(j)
    except Exception as e:
        return f"Errorr in *writeToFile*: {e}"
    else:
        return "Finished writing to file"

# !! Function to add to notCompleted
def addToNotCompleted(singleToDo):
    logging.info(sys._getframe().f_code.co_name)
    logging.info(timeNow())
    notCompleted.insert(0,singleToDo)
    return "addToNotCompleted Successfully"

# !! Function to add to completed
def addToCompleted(singleToDo):
    logging.info(sys._getframe().f_code.co_name)
    logging.info(timeNow())
    completed.insert(0, singleToDo)
    return "addToCompleted Successfully"

# !! Function to add to deleted
def addToDeleted(singleToDo):
    logging.info(sys._getframe().f_code.co_name)
    logging.info(timeNow())
    deleted.insert(0, singleToDo)
    return "addToDeleted Successfully"



# !! Function that takes in a TODo and a Class (notCompleted, completed, deleted) and adds it to class
def addSingleTodo(whereTo, singleToDo):
    logging.info(sys._getframe().f_code.co_name)
    logging.info(timeNow())
    if whereTo == "notCompleted":
        #return addToNotCompleted(singleToDo)
        notCompleted.insert(0,singleToDo)
        return("Added to notCompleted Successfully")
    elif whereTo == "completed":
        #return addToCompleted(singleToDo)
        completed.insert(0, singleToDo)
        return "addToCompleted Successfully"

    elif whereTo == "deleted":
    #    return addToDeleted(singleToDo)
        deleted.insert(0, singleToDo)
        return "addToDeleted Successfully"

    else:
        logging.info("ERROR in addSingleToDo Funciton")  
        return "error in addSingleToDo Funciton"


# !! Function that takes in a TODO and Class (notCompleted, completed, deleted) and removed is form Class
def removeSingleTodo(whereFrom, singleToDo):
    logging.info(sys._getframe().f_code.co_name)
    logging.info(timeNow())
    global notCompleted, completed, deleted
    try: 
        if whereFrom == "notCompleted":
            logging.info('!!!!!!!!!!!! Remving from NotCompleted')
            notCompleted.remove(singleToDo)
            #addSingleTodo("deleted", singleToDo)
            logging.info(notCompleted)
            logging.info(timeNow())

            return "Removed Successfully #notCompleted"
        elif whereFrom == "completed":
            completed.remove(singleToDo)
            logging.info(completed)
            logging.info(timeNow())
            #addSingleTodo("deleted", singleToDo)

            return "Removed Successfully #completed"
        elif whereFrom == "deleted":
            deleted.remove(singleToDo)
            return "Deleted Successfully"
        else:
            logging.info("ERROR in Remove Single TODO")
            logging.info(timeNow())
    except Exception as e:
        logging.warning(f"{singleToDo} | is not in: {whereFrom} | e = {e}")
        return (f"{singleToDo} | is not in: {whereFrom} | e = {e}")

# !! Function to combine all classesNCD 
def combineNCD():
    logging.info(sys._getframe().f_code.co_name)
    logging.info(timeNow())
    global notCompleted, completed, deleted, allToDo

    allToDo = {"notCompleted": notCompleted, "completed": completed, "deleted": deleted}
    logging.info(" --- CombineNCD --- ")
    logging.info(allToDo)
    logging.info(timeNow())
    return allToDo
   




# if __name__ == "__main__":
# #    app.run(debug=True)
#     logging.info(sys._getframe().f_code.co_name)
#     ## File logging:
#     logApp = logging.basicConfig(format= '%(levelname)s: %(asctime)s:%(message)s', filename="appLog.log", encoding="utf-8", level=logging.DEBUG,  datefmt='%m/%d/%A %I:%M:%S %p')

#     logRequest = logging.basicConfig(format= '%(levelname)s: %(asctime)s:%(message)s', filename="webRequests.log", encoding="utf-8", level=logging.DEBUG,  datefmt='%m/%d/%A %I:%M:%S %p')

#     ch = logging.StreamHandler()
#     logApp.addHandler(ch)
#     logRequest.addHandler(ch)

#     logApp.info(timeNow())
#     logRequest.info(timeNow())
#     #logging.info(timeNow())
#     app.run()

#     #.run("0.0.0.0", 8080)
 
    
#     # writeToFile(allToDo)
