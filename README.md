Welcome to My Project YouTrash:

First of all, I find the name humorous but not as relevant as I initially intended.

The project initially was meant to show a user's history of watched videos which would shed light on all the "trash" we view on YouTube.

However as you'll see in the learnlog.txt, I found out this functionality had been completely depracated.

Instead I switched the app to pull data from the user's liked videos.

**check out learnlog.txt**

Warnings and Dependencies:
-This app requires the user to have a youtube account that is linked to their google account
-This app has to run on localhost:3000 as youtube's api's attempt to redirect the page back to "localhost:3000" after authorization is complete
-In order to have the best experience the user should have an account with some liked videos on youtube, it will work otherwise but probably looks bad

-Warning: if you don't want anyone to see what videos you have liked on youtube do not run this app with others around

How To Run the App:
-git clone the repo
-make sure you have node.js and react.js packages from npm

-do "npm start"

