Project Assignment 1: Primary Proposal
====
· Project Title
----
  Google Facial Recognition:
  A facial recognition software to find all public pictures of a user on the internet. 

· Project Team Members
----
  Juan Zapata-Gomez;
  Hung-Yi Chang;
  Xiaoyi Zhou;
  Mohao Yi;
  Xuanting Chen.

· Project Goal
----
  To instruct users to delete all negative pictures that may potentially affect their 
  career opportunity and public figure. 

· Usage Description 
----
  To use the google custom search engine, users are asked to input their names. Correctly 
  positioned face pictures of users need to be added to database. The facial recognition 
  software will match pictures from the google custom search engine to find all public 
  images that potential employers may find when searching the names of the users.

· Table of Content 
----
	a. Data sets via APIs
		1) [Kairo](https://www.kairos.com/)
		   Face recognition API
		2) [Google Custom Search Engine](https://cse.google.com/cse/)
		   https://github.com/vadimdemedes/google-images
		   (returns images based on customers full name)
		   Show a paginated result of images returned that match with the image detection 
		   software.
		   
    b. Front End & Back End
		1) Back end with Google Firebase (Datastore) and ExpressJs
		2) Front end: NodeJS with ReactJS, Bootstrap
		
    c. Database
       Users' images are stored in Kairo database
      
    e. Application Features
	  	-Authentication (Username and Password)
  		-After returning the results of images from API calls, the application will 
   	 	 recommend ways to have the picture deleted if users disprove the image returned 
   	 	 from the Google Custom Search Engine.
  		-Return the link where the disproved pictures may be found to users.
  		-Users are asked to upload image to compare with images returned from Custom 
  	 	 Search Engine API.
 	   	-Sign Up/Sign In to save images of the user in database.
  		-Allows users to return to old searches.
  		-Allows users for quicker use of our service



Secondary Proposal (Informal, not approved)
====

· Project Title
----
  A nutrition and fitness application to recommend healthy choice of food based on the real time activity of a user.

· Project Goal
----
  Based on users’ daily amount of movement recorded by phone, the application will calculate recommended amount of nutrition the user should get from food. 

· Usage Description 
----
  When users scan a barcode of food item, the application should display information of nutrition and inform user whether this food item is recommended. The application also builds a profile for user’s long term health goal and allergic information.

· Table of Content 
----
	a. Data sets via APIs
	
		1) [Can I Eat It? Barcode API](https://www.programmableweb.com/api/can-i-eat-it-barcode) 
			-Product search by name
			-Product search by barcode
			-Basic Product information
			-Detailed Nutritional Data
			-Allergen Lists
			-Vegan, Vegetarian, Fairtrade status
			
		2) [Moves API](https://www.programmableweb.com/api/moves)
			- Moves is an application for mobile phones that allows users to automatically 
			record their movements throughout the day. Moves uses data and sensors from 
			smart phones to record how much the user moves throughout the day. The Moves 
			API allows developers to access and integrate the functionality of Moves with 
			other applications and to create new applications. Some example API methods 
			include retrieving data, managing accounts, and sending data.
