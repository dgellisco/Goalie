Plan:
-----
Have three pages
1) Login/welcome page.  User can either:
  A) login with name/password
  B) select from drop-down of current users (current, easiest for demonstration purposes)
2) New user page.  User enters all their details.
3) Specific user progress page.  Contains their details and allows them to update their current savings progress, which automatically recalculates their progress.


Current state:
---------------
Three pages, functioning with handlebars.  We need to get it presentable, and use some JS libraries/plugins to cleanly display data.


To do:
----------
JS [Dave] - Clean up code.  Get logic out of html.Routes and into proper JS file.
JS [Dave] - Make calculations push progress etc. to database.
JS - Code "update savings" button on financials page, it should update database and refresh page with new calculations.
JS - Calcuations.  Add in moment.js calculations to show progress since last entry, updated projected goal, etc.
JS - Form validation.  Ensure all fields are entered.  Ensure they are of the right type.
CSS - Template for every page.  Upload to single file "main.handlebars" in views/layouts to work on all handlebars pages.
CSS - Specific styling for each page (login/newuser/userprofile pages)


Stretch:
----------
JS - Multiple goals
JS - Login page with password