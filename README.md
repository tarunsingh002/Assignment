# Assignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

## Sample Data of 4 transaction was added to the project

Sample Data of 4 transactions was added for better presentation of the project.

It will be added when you first open the application.

Its state of being already added once is persisted over the local Storage so that this sample data is not re-added every time you refresh the application.

## Project has been deployed to https://ng-assignment.vercel.app/

The add Transaction button on the form to add transactions will be disabled if any of the fields are left empty. It will be automatically enabled once the all the fields have some value.

## Searching and Sorting of the transactions on the All transactions page has also been implemented.

Both searching and sorting will work together and independent of each other.
The search and sorting state are also captured via the query params for better user experience.
To keep it simple, the search and sorting state has not been persisted over local storage, so the search and sorting state will be lost on refresh and the url will also remove the query params.
