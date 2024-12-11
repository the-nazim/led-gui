#!/bin/bash

terminate_flask() {
    pkill -f "python backend.py" && echo "Flask process terminated." || echo "No running Flask process found."
}

terminate_react() {
    pkill node && echo "React process terminated." || echo "No running React process found."
}



fileid=$1
echo "$fileid"
wget http://127.0.0.1:8000/send-file/$fileid
zipfile=$(basename http://127.0.0.1:8000/send-file/$fileid)
echo $zipfile

unzip $zipfile -d updates/


for dir in updates/*
do 
    if [ -d $dir ]
    then
        extdfolder=$dir 
    fi
done

front_end() {
    cd $extdfolder
    for dir in *
    do
        if [ -d "$dir" ]
        then
            #eval "$1=$dir"
            echo $dir
            mv $dir /home/nazim/Documents/Tihan/Server_App/test_clientapp/TEST/temp_frontend/ || exit              
        fi
    done
    cd - > /dev/null || exit

}

back_end() {
    cd $extdfolder
    for dir in *
    do
        if [ -f $dir ]
        then
            echo $dir
            mv $dir ../../temp_backend.py
        fi
    done
    cd - > /dev/null || exit
}

echo $extdfolder

front_end 
back_end 

if [ -d "temp_frontend" ] && [ -f "temp_backend.py" ] 
then
    # Safely remove the old front-end directory
    terminate_flask
    terminate_react
    mv frontend rollback/old/
    mv backend.py rollback/old.py

    # Move the temp_frontend to front-end
    mv temp_frontend frontend || exit
    mv temp_backend.py backend.py || exit

    nohup konsole --hold -e "python backend.py" >/dev/null 2>&1 &
    # Navigate to the React app directory and start the app
    if cd frontend/my-react-app/ 
    then
        # rm -rf node_modules
        nohup konsole --hold -e "npm intall" >/dev/null 2>&1 &
        nohup konsole --hold -e "npm start" >/dev/null 2>&1 &
    else
        echo "Error: my-react-app directory not found."
        exit 1
    fi
else
    echo "Error: temp_frontend was not created."
    exit 1
fi
