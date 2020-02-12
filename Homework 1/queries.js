

functions=[studentsPerStanding,coursesPerDepartment,studentInEachDepartment,
           studentsForProfessor,MinOrMaxEnrolledCourse,biggestSumOfCredits,
           showMajors,studentWithENG]


// calls all the functions/queries
for (var i = 0; i < functions.length; i++) {
  functions[i]();
}

//-------------------------------------------------------------------------
// 1 - How many students are there per standing (freshman, sophomore, etc)?
function studentsPerStanding(){
  studentsPerStanding={}
  for(let student of students){
      if(!studentsPerStanding[student.standing] ){ studentsPerStanding[student.standing]=1;}
      else studentsPerStanding[student.standing] += 1;
  }

  // show results
  console.log("Showing number of students of each standing...");
  for( let current of Object.keys(studentsPerStanding)){
    numStudents = studentsPerStanding[current];
    console.log(" > "+current +": "+ numStudents+" student/s");
  }
}


//------------------------------------------------
// 2 - How many courses are there per department?
function coursesPerDepartment(){
  coursesPerDepartment={}
  for( let course of courses){
  	if(!coursesPerDepartment[course.department]){coursesPerDepartment[course.department]=1;}
  	else coursesPerDepartment[course.department] +=1;
  }
  // show results
  console.log("Showing number of courses of each department...");
  for( let current of Object.keys(coursesPerDepartment)){
    numCourses = coursesPerDepartment[current];
    console.log(" > "+current + ": " + numCourses +" course/s");
  }
}


//-------------------------------------------------
// 3 - How many students are in each department?
function studentInEachDepartment(){

  studentsPerDepartment={}
  // find what department corresponds to each course
  findDepartment ={}

  for(let course of courses){
  	findDepartment[course.section] = course.department;
  }
  // calculate students in each department

  for( let student of students){
    usedDepartment={}
  	for( let currCourse of student.courses ) {
      currDepartment = findDepartment[currCourse];
  		if(!studentsPerDepartment[currDepartment]){
          studentsPerDepartment[currDepartment]=1;
      }
      else {
        if(usedDepartment[currDepartment]!==0){
            usedDepartment[currDepartment]=0; // mark as used
            studentsPerDepartment[currDepartment]+= 1; // increment
        }
      }
  	}
  }
  // show results
  console.log("Showing number of students in each department...");
  for( let current of Object.keys(studentsPerDepartment)){
    numStudents = studentsPerDepartment[current];
    if(!numStudents)numStudents=0;
    if(current==="undefined")current = "MAT"; // ???not listed int departments???
    console.log(" > "+current +": "+ numStudents+" student/s");
  }
}



//-----------------------------------------------------
// 4 - How many students does each professor teach to?
function studentsForProfessor(){
  studentPerCourse = {}

  for( let student of students){
      for( let currCourse of student.courses){
        if( !studentPerCourse[currCourse]) studentPerCourse[currCourse]=1;
        else studentPerCourse[currCourse]+=1;
      }
  }

  studentForProfessor={}

  for( let course of courses ){
    currProf=course.instructor;
    currCourse = course.section;
    if(!studentForProfessor[currProf]){
      studentForProfessor[currProf] = studentPerCourse[currCourse];
    }
    else{
      studentForProfessor[currProf] += studentPerCourse[currCourse];
    }
  }
  // show results
  console.log("Showing students number for each professor...");
  for( let current of Object.keys(studentForProfessor)){
    numCourses = studentForProfessor[current];
    if(!numCourses)numCourses=0;
    console.log(" > "+current +": "+ numCourses+" students/s");

  }
}


//----------------------------------------------------------
// 5 - Which course has the most students enrolled in it?
// 6 - Which course has the fewest students enrolled in it?
function MinOrMaxEnrolledCourse(){
    studentPerCourse={};
    mostEnrolledCourse = courses[0].section; // temporary assigned a starting value
    minEnrolledCourse = courses[0].section;

    // assign number of students to each course
    for( let student of students){
      for( let currCourse of student.courses){
        if( !studentPerCourse[currCourse]){
          studentPerCourse[currCourse]=1;
        }
        else {
          studentPerCourse[currCourse]+=1;
        }
      }
    }

    // calculate the min or max
    for( let course of courses){
      currCourse = course.section;

      if(!studentPerCourse[currCourse]){
        studentPerCourse[currCourse]=0;
      }
      // update most enrolled
      if(studentPerCourse[currCourse] > studentPerCourse[mostEnrolledCourse]){
        mostEnrolledCourse = currCourse;
      }
      // update least enrolled
      if(studentPerCourse[currCourse] < studentPerCourse[minEnrolledCourse]){
        minEnrolledCourse = currCourse;
      }
      // [DEBUG] console.log("current course: "+ currCourse+" | "+studentPerCourse[currCourse]);
    }

    mostCourses=[];
    leastCourses=[];
    // Code below to add the courses if they are minimum or maximum
    for( let course of courses){
        currCourse = course.section;
        // if equal to maximum then add
        if(studentPerCourse[currCourse]==studentPerCourse[mostEnrolledCourse]){
          mostCourses.push(currCourse);
        }
        // if equal to minimum then add
        if(studentPerCourse[currCourse]==studentPerCourse[minEnrolledCourse]){
          leastCourses.push(currCourse);
        }
    }

    // show results
    console.log("Most enrolled course/s with " + studentPerCourse[mostEnrolledCourse] + " student/s... ")
    for (var i = 0; i < mostCourses.length; i++) {
      console.log(" > " + mostCourses[i]);
    }

    console.log("Least enrolled course/s with " + studentPerCourse[leastCourses] + " student/s... ")
    for (var i = 0; i < leastCourses.length; i++) {
      console.log(" > " + leastCourses[i]);
    }

}


// 7- Which student has the biggest sum of credits for their enrolled classes?
function biggestSumOfCredits(){

  creditPerCourse={}
  // map each course with its credits
  for( let course of courses){
    creditPerCourse[course.section]=course.credits;
  }
  // the output will be here
  mostCreditStudents=[];

  maxCredits=0;

  for(let student of students){
    currCredits=0;
    for(let currCourse of student.courses){
      currCredits += creditPerCourse[currCourse];
    }
    if(currCredits>maxCredits){maxCredits=currCredits;} // update max
  }

  for(let student of students){
    currCredits=0;
    for(let currCourse of student.courses){
      currCredits += creditPerCourse[currCourse]; // calculate the credits for student
    }
    // if equal to the maximum then add student to the list
    if(currCredits===maxCredits){mostCreditStudents.push(student.name);}
  }
  // show result
  console.log("Showing student/s with most credits (" + maxCredits +")...");
  for (var i = 0; i < mostCreditStudents.length; i++) {
    console.log(" > "+ mostCreditStudents[i]);
  }
}

// 8- What is the "major" of each student (the department they are taking most courses in)?

function showMajors(){

  majorOfStudent={};

  for(let student of students){
    name = student.name;
    major = findDepartment[student.courses[0]]; // temporary major
    depCounter={}; // keep count of departments for each student
    depSize=0;
    for(let course of student.courses){

      currDep = course.substring(0,3);
      if(currDep==="THR") currDep="FAR";
      // [DEBUG] console.log(course);
      if(!depCounter[currDep]){
        depCounter[currDep]=1;
      }
      else{
        depCounter[currDep]+=1;
        if(depCounter[currDep]>depSize){
          depSize = depCounter[currDep];
          majorOfStudent[name] = currDep; // map to the major
        }
      }
    }
    if(depSize<2) {
      majorOfStudent[name] = "Not enough courses for major";
    }
  }
  console.log("Showing majors of each student...");
  for (let student of students) {
    console.log(" > "+ student.name + " | " + majorOfStudent[student.name]);
  }
}

//---------------------------------------------------------------
// 9- Which students are taking courses in the "ENG" department?
function studentWithENG(){

  ENGstudents=[]
  for (let student of students){
    let takingENG=false;
    for(let course of student.courses){
      if(course.substring(0,3)==="ENG"){
        takingENG=true;
      }
    }
    if(takingENG===true){
      ENGstudents.push(student.name);
    }
  }

  // show results
  console.log("Showing the student taking ENG courses...");
  for (var i = 0; i < ENGstudents.length; i++) {
    student =ENGstudents[i];
    console.log(" > " + student);
  }
}
