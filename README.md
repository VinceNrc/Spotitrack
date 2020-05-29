# Spotitrack

This Repository is the result of the project of Information system architecture courses. The aim was to connect webservices to API's.
Spotitrack is the name of site web application which consists on getting informations about the song the user is currently listening to. These informations are then stored and shown in an other tab.

# HOW TO USE IT

Pre-requisite : you need to install node  JS and react on your device and have 3 ports ready to be used.

### 1)  Start Authorisation Server to connect to spotify's API
- Navigate to the auth-server directory `cd auth-server`
- Install the dependencies `npm install`
- Paste in the redirect uri, client id, and client secret you copied in step 1
- Run the Server `node authorization_code/app.js`

### 2)  Start Client interface
- Navigate to the auth-server directory `cd client`
- Install the dependencies `npm install`
- Run the Server `npm start`
- A React interface should be launched.

### 3)  Use the App to have infos
- Make sure you are connected to spotifyApi
- Run a song on spotify
- Log to Spotitrack with the username and password you use on Spotify's app
- Click on the button "Information sur le son en écoute"
- Some informations should appear on the table at the top.


### 4)  Check history
- Go to the "historique" tab
- Some informations should be displayed, if not do not hesitate to load the page again

### 5)  Delete informations
- Click on the trash icon.


BY Les miserables
