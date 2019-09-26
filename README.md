# [](#pagination-and-content-filter)Pagination and Content Filter

### [](#project-2---treehouse-full-stack-js-techdegree)Project 2 - Treehouse Full Stack JS TechDegree

by Chris Simmons  
September 26, 2019

View Project at : [https://atlchris67.github.io/list-pagination-and-filtering/](https://atlchris67.github.io/list-pagination-and-filtering/)

## [](#project-objective)Project Objective:

Using progressive enhancement and unobtrusive JavaScript, add pagination to the page in order to filter through a long list of students.

## [](#project-functions)Project Functions:

*   The pagination is added dynamically to the page with JavaScript.
*   The appropriate number of pagination buttons are dynamically added based on the amount of students provided.
*   Each pagination button shows the appropriate group of 10 students from the list when clicked. 
*   It works with any number of students.
    * [https://atlchris67.github.io/list-pagination-and-filtering/examples/64students.html](https://atlchris67.github.io/list-pagination-and-filtering/examples/64students.html)
    * [https://atlchris67.github.io/list-pagination-and-filtering/examples/44students.html](https://atlchris67.github.io/list-pagination-and-filtering/examples/44students.html)
*   By default it shows the first 10 students when page is loaded.

## [](#exceeds-expectations)Exceeds Expectations:

*   Clearing the search bar of it's value will display all the students starting on the first page.
*   Dynamically adds a search bar to filter the students by name.
*   The search returns results where the search term is found in any part of the name or email address.
*   If there are less than 10 results no pagination is displayed. If there are more than 10 the appropriate amount of pagination links are displayed.
*   If there are no matches found a message displays that tells the user so.


*The project was built using plain JavaScript. No jQuery was used intentionally.
