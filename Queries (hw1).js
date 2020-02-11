// 1 - How many students are there per standing (freshman, sophomore, etc)?**************
function studentsPerStanding(){
  studentsPerStanding={}
  for(let student of students){
      if(!studentsPerStanding[student.standing] ){ studentsPerStanding[student.standing]=1;}
      else studentsPerStanding[student.standing] += 1;
  }

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

  console.log("Showing number of courses of each department...");
  for( let current of Object.keys(coursesPerDepartment)){
    numCourses = coursesPerDepartment[current];
    console.log(" > "+current +": "+ numCourses+" course/s");
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
  console.log("Showing number of students in each department...");
  for( let current of Object.keys(studentsPerDepartment)){
    numStudents = studentsPerDepartment[current];
    if(!numStudents)numStudents=0;
    if(current===undefined)current = "Course not listed in any department";
    console.log(" > "+current +": "+ numStudents+" student/s");
  }
}




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
    if(!studentForProfessor[currProf])studentForProfessor[currProf] = studentPerCourse[currCourse];
      else studentForProfessor[currProf] +=studentPerCourse[currCourse];

  }

  console.log("Showing courses number for each professor...");
  for( let current of Object.keys(studentForProfessor)){
    numCourses = studentForProfessor[current];
    if(!numCourses)numCourses=0;
    console.log(" > "+current +": "+ numCourses+" course/s");

  }
}

  // 5 - Which course has the most students enrolled in it?

function MinOrMaxEnrolledCourse(type){
  mostEnrolledCourse=courses[0].section; // temporary assigned a starting value
  for( let student of students){
      for( let currCourse of student.courses){
        if( !studentPerCourse[currCourse]) studentPerCourse[currCourse]=1;
        else studentPerCourse[currCourse]+=1;
        if(studentPerCourse[currCourse])
      }
    }
  }
}
- Which course has the fewest students enrolled in it?

- Which student has the biggest sum of credits for their enrolled classes?

// 9- What is the "major" of each student (the department they are taking most courses in)?



// 10- Which students are taking courses in the "ENG" department?

function studentsWithoutENG(){

  nonENGstudents=[]
  for (let student of students){
    let takingENG=false;
    for(let course of student.courses){
      if(course.substring(0,3)==="ENG"){
        takingENG=true;
      }
    }
    if(takingENG===false){
      nonENGstudents.push(student.name);
    }
  }
  console.log("Showing the student not taking ENG courses...");
  for (var i = 0; i < nonENGstudents.length; i++) {
    student =nonENGstudents[i];
    console.log(" > " + student);
  }
}
