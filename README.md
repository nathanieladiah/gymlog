## Distinctiveness and Complexity

This project is a django web app that allows users to track their workouts. The application allows users to register and sign in to access a list of exercises that are unique to them. 
There are models for users, exercises, exercise sets, exercise logs, and routines. There are several views that allow users to add custom or predefined exercises to their exercise list; add routines of exercises; view the history of each exercise; access a page for each day that displays the exercise logs and notes for that day.

JavaScript is used to render the day views and journal views dynamically based on the user input.
JavaScript is also used for the calendar as well as the graph that shows progess.

I believe the project satisfies the complexity requirement since it has multiple models and views as well as multiple JavaScript functions for rendering the webpages.

I also think the project satisfies the distinctiveness requirement since none of the other projects in the course were for keeping track of anything in the same way. This application has a calendar view that allows the user to select dates on it to go to corresponding logs. It also has a graphical representation of user data.


## File list
* **Root**
	* **images** contains images used in this README
	* **staticfiles** created for the heroku deployment
	* **Procfile** used to run the processes on the heroku server
	* **Procfile.windows** used to run heroku locally on windows machines (gunicorn doesn't work)
	* **Logger** - this is the app folder created by django
		* **static/logger** - the static files for the app
			* **db** - files for the dashboard (the main part of the app)
				* **css** 
					* bootstrap.min.css - bootstrap css 
					* day.css - css styles for the day page
					* exercise.css - styling for the page that lists users' exercises
					* graph.css - styling for the graph page 
					* journal.css - styling for the journal page of users' notes
					* lineicons.css - icons for the template
					* main.css - main css for dashboard template
					* materialdesignicons.min.css - more icons
					* routine.css - styling for the routines page
				* **js** 
					* bootstrap.bundle.min.js - bootstrap javascript functions
					* calendar.js - functions that allow the calendar to be displayed and allows users to select dates
					* chart.min.js - chart.js code
					* date.js - dynamically shows log contents and notes for a specific date
					* exercise.js - javascript functions that allow adding sets to new exercise logs
					* graph.js - displays a graph of users volume load per day based on the option selected by user
					* journal.js dynamically displays entries for a particular month based on current date or what user selects
					* main.js - javascript functions for the template to work
					* routine.js - functions to support the adding of routines and displaying of routines on the page
			* **landing** - files for the  landing page of the web app
		* **models.py** - the models for the django database
		* **urls.py** - the url paths associatd with the logger app
		* **views.py** - the python code that handles the backend
		* **custom_context_processor.py** - allows a date variable to be accessible in all pages

## Instructions

* Go to https://fitness-tracker-logger.herokuapp.com/. (or localhost if running locally)
* Register a new account
* This takes you to the dashboard page, which shows a calendar, where you can select days
* On the sidenav, select exercises to add exercises to your list,
* Once exercises are added you can click on them to be taken to the exercise page, which has a nav to new, history, and graph.
	* new allows you to enter a new log which comprises the date, time, sets, and notes
		* the sets include a number of weight, reps, and unit arrays.
	* history shows all the logs you have created for that exercise in reverse chronological order
	* graph shows the total volume load (sum of (weight * reps) for each set) per day for the period selected
* On the sidenav, select journal to show a list of the notes you've made in chronological order per month
	* navigation buttons on the top allow you to change the months
* On the sidenav, select routines to create or add routines to your profile
* Going back to the dashboard brings up the calendar, where you can click on a day to bring up the logs and notes for that particular day
	* Using the navigation buttons on top you can go to previous and next days or back to the calendar.

## Additional info

* A template for the dashboard was used - PlainAdmin  
	The license is included



## Proposed features of the app

The app is used to track fitness progress, especially in terms of weights lifted and body measurements.

* Users will be able to create an account. **Done**
	* Use email and password to create account. **Done**
* Users will be able to set a username and profile photo.
* The app will allow the user to create workout routines
	* Using existing exercises or creating new exercises
	* Large list of exercises, links to descriptions/ images
	* Offer popular workout regimens as ready-made routines
* Users will be able to schedule exercises
	* Calendar
* Users will be able to enter details from workouts
	* Fluid data entry  **Done**
	* This includes weights and reps for each exercise **Done**
	* Specify intensity and rest time per exercise
	* A place for user to save notes about the feeling during the workout **Done** 
	* Plate calculator
	* Automatically back up data
	* Cardio workout logging
* Users will be able to view a log of workouts
	* Keep track of personal bests **Done**
	* Perhaps a graph for specific exercises
	* A journal/diary type document with notes **Done**
	* Allow import and export of data
* Users will be able to store body measurements such as height, weight, as well as different body part measurements.

### Minimum Viable Product

* User login
* Store log of weights and reps for each user


## Design mockups

### Main screens - sketches

**Register Page**  
![Register Page](/images/Register.jpg "Register web page")

> The register page allows a user to enter a username and email address to create a new account.

**Register Page - mobile**
![Register Page - mobile](/images/Register2.jpg)

> The components of the register page would be stacked in a mobile view/ smaller screen.

**Login Page**
![Login Page](/images/Login.jpg)

> Allows an existing user to enter credentials to access their information.

**Homepage**
![Homepage](/images/Homepage.jpg)

> Shows a calendar alongside a side nav that has links to the other pages: 
>
> * Exercise
> * Routine
> * etc

**Homepage - mobile**
![Homepage - mobile](/images/homepage-m.jpg)

> Move the sidebar behind a toggle button 

**Exercises**
![Exercise list](/images/exercises-list.jpg)

> Gives a list of exercises for each user.
> A button to add new exercises

**Exercise**
![Single Exercise](/images/single-exercise.jpg)

> Page with details on each exercise
>
> navigation buttons on top for new, history, and graph
> 
> default page is the new with form to add new sets of the exercise

**Exercise History**
![Exercise History](/images/exercise-history.jpg)

> a list with newest first of exercises added

**Add Exercise**
![Add exercise](/images/add-exercise.jpg)

> A modal to add a new exercise to the user

<br>

## Create graphic design

**Register Page**    

![Register Page](/images/testscreens/register-1.png "Register web page")

![Register Page](/images/testscreens/register-2.png "Register web page")


**Register Page - mobile**  
![Register Page - mobile](/images/testscreens/register-mobile-1.png)

![Register Page - mobile](/images/testscreens/register-mobile-2.png)

**Login Page**  
![Login Page](/images/testscreens/login.png)

**Login Page mobile**  
![Login Page](/images/testscreens/login-mobile-1.png)

![Login Page](/images/testscreens/login-mobile-2.png)


**Dashboard**
![Homepage](/images/testscreens/db-calendar.png)

**mobile**  
![Homepage](/images/testscreens/db-calendar-mobile.png)


> Shows a calendar alongside a side nav that has links to the other pages: 
>
> * Exercise
> * Routine
> * etc

**Homepage - mobile**  
![Homepage](/images/testscreens/menu-mobile.png)


> Move the sidebar behind a toggle button 

**Exercises**
![Exercise list](/images/exercises-list.jpg)

> Gives a list of exercises for each user.
> A button to add new exercises

**Exercise**
![Single Exercise](/images/single-exercise.jpg)

> Page with details on each exercise
>
> navigation buttons on top for new, history, and graph
> 
> default page is the new with form to add new sets of the exercise

**Exercise History**
![Exercise History](/images/exercise-history.jpg)

> a list with newest first of exercises added

**Add Exercise**
![Add exercise](/images/add-exercise.jpg)

> A modal to add a new exercise to the user

<br>


## Build Log

### October 6th 2021

Created the project and logger app. Added templates for login, logout, register, dashboard, and exercise pages.  
Added logic views for login, logout, and register.
The exercise page has a button for a modal to add new exercises.

There should be a list of pre programmed-exercises - do this in refinements.

### October 8th 2021

Create a javascript function to add current set information. Should be able to add all the sets for an exercise before submitting the entire form.

How to implement the functions?

#### Saving new exercise logs

* need to take the info from exercise form and store it into the database.
	* date
	* time
	* exercise name
	* notes
	* list of sets (reps, weights, units)

* Store the weight, reps, and units in datasets in each div, with an incrementing id


* Store sets in a separate table, and link it to logs:
	* many-to-many? 1 log can have many sets, but each set only belongs in one log.

|**Logs**| **Set** |
| --- | --- |
| date | weight |
| time | reps | 
| exercise name | unit |
| notes |
| set |

### October 9th 2021

Created javascript function to perform Ajax request when new log form is submitted. Adds data to the database and redirects afterwards.
Considering, saving the sets as a javascript object field in the log table, or creating a set group instead of having them all separate, or just group them by date and exercise?

Next step is to focus on the history part of the exercises

Need to display the Sets for each log for the exercise page
finished. Using django html templates

**Create javascript to add active to sidebar depending on the page**

**Journal Page**
Using either a week archive view or a month archive view, probably do a month
The journal link in the navbar needs to automatically have the month in the href, do a custom thing where the current month is available on all views (check auction)

**custom_context_processor.py**

	from datetime import datetime 

	def journal_link_renderer(request):
		now = datetime.now()
		current_month = now.strftime("%Y/%b")
		return {
			'current_month': current_month
		}

use datetime module and pass in date.today()
or datetime.now().date()

or in template use `{% now "l, j F Y" %}`
need the format journal/year/month eg journal/2021/sep  "Y/M"

`{% now "P" %}` gives the current time

Need to group journal entries by the date:

	from django.db.models import Count
	result = (Log.objects
		.values('notes', 'date')
		.annotate(dcount=Count('date'))
		.order_by()
	)

### October 10th 2021
**New idea** use javascript to populate the day and journal pages, using ajax do something similar to the calendar.
Would putting the javascript in a script tag in the html allow the urls to work with the django template?

**Note** with the defualt font on firefox, the journal writing stays on the line, use these settings on all.
also, the font size and stye is very pleasing and legible.

Changing all the calendar pages into a link to the same page and then just update it for each day.
put the calendar on the same page as the day.html elements and just hide the calendar on click

completed using single page for calendar and all dates. via javascript
will probably rename this view to calendar or something.


**Tackle journal now**
completed

### October 11th 2021

**Outstanding**:  
[ ] Still need to put an edit option for new sets  
[x] Don't let exercises save if there are no sets
[ ] Maybe an edit for history of exercises  
[ ] The graph function for exercises hasn't been started yet  
[x] Need to check dates when using previous and next buttons in journal and day views  
[ ] Routine section hasn't been started yet  

** Routinek


### October 12th 2021

**Graphs**

Figuring out how chart.js works

**Deciding on equations for graphs**

**total sets**  
The toal number of sets within a selected time period. Can show how many different exercises you do per bodypart and the sets you devote to them.

**Total reps** = the total number of reps within selected time period.
**total body reps** shows the total reps per body part

**reps/set** number of reps / number of sets in selected time period.

**The above 3 don't signify getting stronger, just the composition of the sets**

**Cumulative weight** = The sum of the (# reps x weight) of all the sets within a time period.
* an increase in this number means that you are working more by lifting more total weight. 
* this is a good metric to gauge increase in strength if set composition (#reps/set) remains fixed.


**Average Total set weight** = (Cumulative weight of all sets)/ # sets
* an increase in this number can signify an increase in strength
* wihin a set composition, the weight you lift is increasing.

**Number average rep weight** = (Cumulative weight of all sets)/# reps  
**weight average rep weight** = (cumulative rep x weight x weight)/ cumulative weight
* bot averages tend to increase as you increase the weight of set assuming relatively constant composition.

 **Strength Factor** = (number or weight average rep weight)/(#reps/#sets)
 * decrease as total reps increase.
 * increase if (#reps/#sets is constant) but more weight is added across sets

 **Exercise Factor** = (weight avg weight rep)/(number average rep weight)
 * indicates how 'spread apart' your set is

 **Max Weight - 1rep** only look for max weight of 1 rep 
 **max weight -1rep+** max set weigh for th elowest number of reps


 **reps per weight histogram** weights vs # of reps for those weights


**Routine**

create a table where routine holds exercises - many to many (exercises to routines)
also allow exercises to be many to many with users
when a user creates an exercise, first check if it exists (check exercise name), if it doesn't create it; if it does add user to users
routines can be many to many with users as well.

### October 13th 2021

## Update on incomplete goals

* Users will be able to set a username and profile photo.
* The app will allow the user to create workout routines
	* Using existing exercises or creating new exercises **Done**
	* Large list of exercises, links to descriptions/ images
	* Offer popular workout regimens as ready-made routines
* Users will be able to schedule exercises
	* Calendar
* Users will be able to enter details from workouts
	* Specify intensity and rest time per exercise
	* Plate calculator
	* Automatically back up data
	* Cardio workout logging
* Users will be able to view a log of workouts
	* Keep track of personal bests 
	* Perhaps a graph for specific exercises
	* Allow import and export of data
* Users will be able to store body measurements such as height, weight, as well as different body part measurements.

Added routine table, and updated exercise table. add way to add custom or premade routines and exercises.
Add a method to add exercises to custom routines and that will be the mvp.
**done**

username and profile photo:
skip in mvp
finished for now.

TODO: sort exercise list by muscles, with a dropdown list perhaps
TODO: display a different new exercise page if cardio or strength
TODO: add instructions/ description/ pictures to exercises
TODO: when you add a routine, add all the exercises to user profile
TODO: in the graphing section, need to convert units to kg