/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing



//Get an ARRAY of all of the students to display instead of a nodelist 
//an array is needed to use the slice and foreach array prototypes;
//referenced https://davidwalsh.name/nodelist-array
const students = Array.prototype.slice.call(document.getElementsByClassName('student-item'));
const pageSize = 10;

// slice function from https://stackoverflow.com/questions/42761068/paginate-javascript-array
function showPage(studentList, pageNumber, pageSize) {
   // because pages logically start with 1, but technically with 0
   pageNumber = pageNumber - 1;

   //The slice() method selects the elements starting at the given start argument, and ends at, but does not include, the given end argument.
   const pageView = studentList.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
   
   //babystep check
   //console.log(pageView);

   //The forEach() method executes a provided function once for each array element.
   //This is a poor man's toggle as jQuery was not available per assignment.
   //
   //This hides all students
   studentList.forEach(function (student) {
      student.style.display = "none";
   });
   //this shows the selected students from the slice method.
   pageView.forEach(function (student) {
      student.style.display = "block"
   });
}


//Method to generate, append, and add functionality to the pagination buttons.
function appendPageLinks() {

   //find the location to add the pagination buttons
   const studentUL = document.querySelector('.student-list');
   //find the correct number of pagination buttons
   const buttonCount = Math.ceil(students.length / pageSize);

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

      //On initial view set page 1 to active
      if (i === 0) {
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
   paginationUL.addEventListener('click', function(e){
      //Get the new and old active pages. 
      const newActiveButton = e.target;
      const oldActiveButton = paginationUL.querySelector('.active');

      //Move active state to the new page.
      oldActiveButton.classList.remove('active');
      newActiveButton.classList.add('active');

      //actually show the correct sections
      showPage(students, newActiveButton.innerText, pageSize);

      //keep the page from reloading as it will raise the DOMContentLoaded event.
      e.preventDefault();
   });
};


//wait for it.....ok go!
document.addEventListener("DOMContentLoaded", function () {
   appendPageLinks();
   showPage(students, 1, pageSize);
});