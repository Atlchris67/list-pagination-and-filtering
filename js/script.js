/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing



//Get an ARRAY of all of the students to display instead of a nodelist 
//an array is needed to use the slice and foreach array prototypes;
//referenced https://davidwalsh.name/nodelist-array
const allStudents = Array.prototype.slice.call(document.getElementsByClassName('student-item'));
const pageSize = 10;


// studentList = the current result set show
// pageNumber = the page number to show
// pageSize = defaulted to 10 fo rhte excersize - could be removed as a param
function showPage(studentList, pageNumber, pageSize) {
   // because pages logically start with 1, but technically with 0
   pageNumber = pageNumber - 1;

   //The slice() method selects the elements starting at the given start argument, and ends at, 
   //but does not include, the given end argument. from https://stackoverflow.com/questions/42761068/paginate-javascript-array
   const pageView = studentList.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);

   //The forEach() method executes a provided function once for each array element.
   //This is a poor man's toggle as jQuery was not available per assignment.
   allStudents.forEach(function (student) {
      student.style.display = "none";
   });
   //this shows the selected studentList from the slice method.
   pageView.forEach(function (student) {
      student.style.display = "block"
   });

   //Rebuild the pagination incase this is a search reault
   appendPageLinks(studentList, pageNumber)
}

function clearPagination() {
   //clear old pagination if it exists
   let oldPagination = document.querySelector('.pagination');
   if (oldPagination) {
      oldPagination.parentElement.removeChild(oldPagination);
   }

}

function hideAll() {
   allStudents.forEach(function (student) {
      student.style.display = 'none'
   });
}

//Method to generate, append, and add functionality to the pagination buttons.
function appendPageLinks(studentList, pageNumber) {

   //find the location to add the pagination buttons
   const studentUL = document.querySelector('.student-list');
   //find the correct number of pagination buttons
   const buttonCount = Math.ceil(studentList.length / pageSize);

   clearPagination();

   //Create the div for the page controls;
   const div = document.createElement('div');
   div.classList.add('pagination');

   //create the ul
   const paginationUL = document.createElement('ul');

   //build the li entries for the page "links"
   for (let i = 0; i < buttonCount; i++) {
      const pageLi = document.createElement('li');
      const liAnchor = document.createElement('a');
      liAnchor.setAttribute('href', '#');

      //display the page count for starting from 1
      liAnchor.innerText = (i + 1);

      //set page 1 to active
      if (i === pageNumber) {
         liAnchor.classList.add('active');
      }

      //add new LI and anchor to the document
      pageLi.appendChild(liAnchor);
      paginationUL.appendChild(pageLi);
   };

   //add the new UL to the page
   div.appendChild(paginationUL);
   //found this at https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
   studentUL.insertAdjacentElement('afterend', div);


   //Add the event listener to "change the page" view
   paginationUL.addEventListener('click', function (e) {
      //Get the new and old active pages. 
      const newActiveButton = e.target;
      const oldActiveButton = paginationUL.querySelector('.active');

      //Move active state to the new page.
      oldActiveButton.classList.remove('active');
      newActiveButton.classList.add('active');

      //actually show the correct sections
      showPage(studentList, newActiveButton.innerText, pageSize);

      //keep the page from reloading as it will raise the DOMContentLoaded event.
      e.preventDefault();
   });
};

//unobtrusively build the search div
function apppendSearch() {

   //biuld and place thje search box
   const divSearch = document.createElement('div');
   divSearch.classList.add('student-search');
   const inputSearch = document.createElement('input')
   inputSearch.placeholder = 'Search for students...';
   const button = document.createElement('button');
   button.innerText = 'Search';
   divSearch.appendChild(inputSearch);
   divSearch.appendChild(button);
   const divH2 = document.querySelector('h2');
   divH2.parentNode.insertBefore(divSearch, divH2);

   //Build and place the error message place holder
   const errorAlert = document.createElement('p');
   errorAlert.id = "errorAlert";
   errorAlert.style.float = 'right';
   errorAlert.innerText = '';
   const studentUL = document.querySelector('.student-list');
   studentUL.parentNode.insertBefore(errorAlert, studentUL);

   //Check search input value before searching.
   //if the input is blank, reset the page the full results
   function searchValidation() {

      //if text then search else reset to original results. 
      if (inputSearch.value.length > 0) {
         searchFunction(inputSearch.value, allStudents);
      } else {
         showPage(allStudents, 1, pageSize);
      }
   };

   function searchFunction(searchInput, names) {

      const resultsArray = [];

      names.forEach(function (student) {
         if (student.querySelector('h3').innerText.toLowerCase().includes(searchInput.toLowerCase())) {
            resultsArray.push(student);
         };
      });

      if (resultsArray.length > 0) {
         showPage(resultsArray, '1', pageSize);
         errorAlert.innerText = '';
      } else {
         errorAlert.innerText = 'No results found.';
         clearPagination();
         hideAll();
      }
   }

   button.addEventListener('click', (event) => {
      event.preventDefault();
      searchValidation();
   });

   inputSearch.addEventListener('keyup', () => {
      searchValidation();
   });
};

//wait for it.....ok go!
document.addEventListener("DOMContentLoaded", function () {
   apppendSearch();
   showPage(allStudents, 1, pageSize);
});