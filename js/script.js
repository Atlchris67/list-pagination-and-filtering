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
   const buttonCount = Math.ceil(students.length/pageSize);

   //Create the div for hte page controls;
   const div = document.createElement('div');
   div.classList.add('pagination');

   //add the ul;
   const paginationUL = document.createElement('ul');
   


   const pageLi = document.createElement('li');
   const liAnchor = document.createElement('a');
   liAnchor.setAttribute('href','#');
   liAnchor.innerText = '1';

   pageLi.appendChild(liAnchor);
   div.appendChild(pageLi);
   studentUL.insertAdjacentElement('afterend' ,div);

   //appendToUl('span','textContent', text);

   //create a pagination button

   //Add the correct number of pagination buttons
   /***
     <!-- pagination HTML to create dynamically -->
         <div class="pagination">
           <ul>
             <li>
               <a class="active" href="#">1</a>
             </li>
              <li>
               <a href="#">2</a>
             </li>
              <li>
               <a href="#">3</a>
             </li>
              <li>
               <a href="#">4</a>
             </li>
              <li>
               <a href="#">5</a>
             </li>
           </ul>
         </div>
         <!-- end pagination -->
    */
   //const pagination
   //add the pagination buttons with a scoped function

   //add an eventhadler to buttons to capture the cleck event

   //get the pagenumber clicked and call show page.

};


//wait for it.....ok go!
document.addEventListener("DOMContentLoaded", function () {
   appendPageLinks();
   showPage(students, 1, pageSize);
});