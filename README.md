## Distinctiveness and Complexity


## File list


## Instructions


## Additional info



## Proposed features of the app

The app is used to track fitness progress, especially in terms of weights lifted and body measurements.

* Users will be able to create an account.
	* Use email and password to create account.
* Users will be able to set a username and profile photo.
* The app will allow the user to create workout routines
	* Using existing exercises or creating new exercises
	* Large list of exercises, links to descriptions/ images
	* Offer popular workout regimens as ready-made routines
* Users will be able to schedule exercises
	* Calendar
* Users will be able to enter details from workouts
	* Fluid data entry 
	* This includes weights and reps for each exercise
	* Specify intensity and rest time per exercise
	* A place for user to save notes about the feeling during the workout
	* Plate calculator
	* Automatically back up data
	* Cardio workout logging
* Users will be able to view a log of workouts
	* Keep track of personal bests
	* Perhaps a graph for specific exercises
	* A journal/diary type document with notes 
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