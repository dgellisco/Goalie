# Project Requirements

This document outlines the base requirements for Project 2.


### Group Project 2

Goal: Create an app that allows users to plan and track their progress towards financial goals.


### App Flow

* User logs in and creates a profile (a table within our database).
    - If there is already a table, you are asked to either login to that table as your own, or create a new table.
* Initial setup
    - User enters their regular income amount and schedule (e.g. $500 a month).
    - User enters their current bank balance ($320).
    - User enters their goals.  E.g. (Item: Car, Amount: $5000, Date: goal date 02/02/2020)
    - App calculates how much money needs to be saved each day/week/month to afford this.  If a negative value, program throws an error.
* Dashboard display
    - Displays:
        . Goals
        . Progress towards goal
        . Amount they need to save per day/week/month/payment schedule
        . If they are on track towards their goals
        . Amount saved per cycle
    - Inputable data (these all recalculate and refresh the displays):
        . Add additional one-off income
        . Update their current bank balance
        . Adjust their goals manually


### Technology Required

* SQL
    - Tech: Sequelize
    - Type: Data
    - Usage:
        . User creates their own Table
            . Add to table with all users - add row "Alex"
                * Columns
                    - ID (e.g. 43)
                    - Name (e.g. Alex)
            . Create user table "Goals"
                * Rows
                    ID 43 Goal1
                    ID 43 Goal2
                    ID 43 Goal3
                    ID 44 Goal1
                * Columns
                    - ID
                    - UserID
                    - Goal1 Amount
                    - Goal1 Date
                    - Goal2 (as above)
                    - Goal3 (as above)
            . Create user table "Financials"            
                * Columns
                    - ID
                    - UserID
                    - Bank Balance (user entered)
                    - Date (timestamp)
                    - Income (converted to monthly) ($10,000) [INHERIT FROM PREVIOUS ENTRY, UNLESS CHANGED]
                    - Rate Of Saving (used to project if you're on track or not)
                        ~ Initially the intended rate, i.e. 15% of income (e.g. 15% of $10,000 = $1,500)
                        ~ Once balance has been entered twice, it equals the rate of saving (could be -$100 or $500)
        . Includes data of income, balance, and goals
    - Notes:
        . Populate database with several tables to demonstrate app

* ?
    - Tech: ?
    - Type: Front-End Framework
    - Usage:
        . CSS and front-end display

* To Display Progress Graph (based on rate of saving)
    - Tech: ?
    - Type: JavaScript Library
    - Usage:
        . Displays charts and graphs of data

* To Display Progress Bar (based on progress towards goal)
    - Tech: Loading.IO
    - Type: JavaScript Library
    - Usage:
        . Displays progress bar


### Requirements

Your project must:

* Use a Node and Express Web Server;


### Requirements

Your project must:

* Use a Node and Express Web Server;

* Be backed by a MySQL Database an ORM (not necessarily Sequelize);

* Have both GET and POST routes for retrieving and adding new data;

* Be deployed using Heroku (with Data);

* Utilize at least one new library, package, or technology that we haven’t discussed;

* Have a polished frontend / UI;

* Have folder structure that meets MVC Paradigm;

* Meet good quality coding standards (indentation, scoping, naming).

* Must not expose sensitive API key information on the server, see [Protecting-API-Keys-In-Node.md](../../../10-nodejs/03-Supplemental/Protecting-API-Keys-In-Node.md)
