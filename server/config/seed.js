'use strict';
import Student from '../api/student/student.model';

Student.find({}).removeAsync().then(() => {
  Student.create(
      {
        "firstName": "Love",
        "lastName": "Roberts",
        "dateOfBirth": "1989-01-18",
        "gender": "male",
        "email": "loveroberts@eweville.com",
        "phone": "+1 (875) 519-3316",
        "address": "562 Eastern Parkway, Crayne, Virginia, 5152",
        "courses": [
          {
            "course": {
              "name": "Models of Computing Systems",
              "subject": "CSCI",
              "courseNumber": 3401,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Software Design and Development",
              "subject": "CSCI",
              "courseNumber": 3601,
              "credits": 5
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "PreCalculus I: Functions",
              "subject": "MATH",
              "courseNumber": 1012,
              "credits": 5
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Calculus II",
              "subject": "MATH",
              "courseNumber": 1102,
              "credits": 5
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Data Structures",
              "subject": "CSCI",
              "courseNumber": 2101,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Theory: Quantum Computing",
              "subject": "CSCI",
              "courseNumber": 4557,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Beginning French I",
              "subject": "FREN",
              "courseNumber": 1001,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Intermediate French I",
              "subject": "FREN",
              "courseNumber": 2001,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Intermediate French II",
              "subject": "FREN",
              "courseNumber": 2002,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Reading and Analysis of Texts",
              "subject": "FREN",
              "courseNumber": 3401,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Fundamentals of Genetics, Evolution, and Development",
              "subject": "BIOL",
              "courseNumber": 1101,
              "credits": 3
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Introduction to Film Studies",
              "subject": "ENGL",
              "courseNumber": 2015,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Beginning Ceramics",
              "subject": "ARTS",
              "courseNumber": 1050,
              "credits": 3
            },
            "grade": "B"
          }
        ],
        "major1": "ENGLISH",
        "major2": null
      },
      {
        "firstName": "Hilary",
        "lastName": "Morgan",
        "dateOfBirth": "1987-01-21",
        "gender": "female",
        "email": "hilarymorgan@eweville.com",
        "phone": "+1 (980) 437-2261",
        "address": "254 Stoddard Place, Chautauqua, Hawaii, 4930",
        "courses": [
          {
            "course": {
              "name": "Foundations of Computer Science",
              "subject": "CSCI",
              "courseNumber": 1302,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Models of Computing Systems",
              "subject": "CSCI",
              "courseNumber": 3401,
              "credits": 5
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "Software Design and Development",
              "subject": "CSCI",
              "courseNumber": 3601,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "PreCalculus I: Functions",
              "subject": "MATH",
              "courseNumber": 1012,
              "credits": 5
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "PreCalculus II: Trigonometry",
              "subject": "MATH",
              "courseNumber": 1013,
              "credits": 2
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Calculus III",
              "subject": "MATH",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Mathematical Perspectives",
              "subject": "MATH",
              "courseNumber": 2202,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Data Structures",
              "subject": "CSCI",
              "courseNumber": 2101,
              "credits": 5
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Programming and Languages: Human-Computer Interaction and Interface Design",
              "subject": "CSCI",
              "courseNumber": 4656,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Theory: Quantum Computing",
              "subject": "CSCI",
              "courseNumber": 4557,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Beginning French I",
              "subject": "FREN",
              "courseNumber": 1001,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Beginning French II",
              "subject": "FREN",
              "courseNumber": 1002,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Intermediate French I",
              "subject": "FREN",
              "courseNumber": 2001,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Intermediate French II",
              "subject": "FREN",
              "courseNumber": 2002,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Writing for the Liberal Arts",
              "subject": "ENGL",
              "courseNumber": 1601,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Beginning Ceramics",
              "subject": "ARTS",
              "courseNumber": 1050,
              "credits": 3
            },
            "grade": "B"
          }
        ],
        "major1": "MATH",
        "major2": null
      },
      {
        "firstName": "Barron",
        "lastName": "Rodriguez",
        "dateOfBirth": "1991-06-07",
        "gender": "male",
        "email": "barronrodriguez@eweville.com",
        "phone": "+1 (890) 440-3827",
        "address": "590 Fenimore Street, Flintville, Puerto Rico, 4516",
        "courses": [
          {
            "course": {
              "name": "Introduction to Digital Media Computation",
              "subject": "CSCI",
              "courseNumber": 1201,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Foundations of Computer Science",
              "subject": "CSCI",
              "courseNumber": 1302,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Models of Computing Systems",
              "subject": "CSCI",
              "courseNumber": 3401,
              "credits": 5
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Software Design and Development",
              "subject": "CSCI",
              "courseNumber": 3601,
              "credits": 5
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "PreCalculus I: Functions",
              "subject": "MATH",
              "courseNumber": 1012,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "PreCalculus II: Trigonometry",
              "subject": "MATH",
              "courseNumber": 1013,
              "credits": 2
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Calculus II",
              "subject": "MATH",
              "courseNumber": 1102,
              "credits": 5
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Calculus III",
              "subject": "MATH",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Programming and Languages: Human-Computer Interaction and Interface Design",
              "subject": "CSCI",
              "courseNumber": 4656,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Theory: Quantum Computing",
              "subject": "CSCI",
              "courseNumber": 4557,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Beginning French II",
              "subject": "FREN",
              "courseNumber": 1002,
              "credits": 4
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "Fundamentals of Genetics, Evolution, and Development",
              "subject": "BIOL",
              "courseNumber": 1101,
              "credits": 3
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Evolution of Biodiversity",
              "subject": "BIOL",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Writing for the Liberal Arts",
              "subject": "ENGL",
              "courseNumber": 1601,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Introduction to Film Studies",
              "subject": "ENGL",
              "courseNumber": 2015,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Basic Studio Drawing I",
              "subject": "ARTS",
              "courseNumber": 1101,
              "credits": 2
            },
            "grade": "C"
          }
        ],
        "major1": "POLY SCI",
        "major2": "PSYCH"
      },
      {
        "firstName": "Parks",
        "lastName": "Hanson",
        "dateOfBirth": "1988-03-03",
        "gender": "male",
        "email": "parkshanson@eweville.com",
        "phone": "+1 (824) 450-2947",
        "address": "183 Boardwalk , Fresno, Georgia, 2402",
        "courses": [
          {
            "course": {
              "name": "Foundations of Computer Science",
              "subject": "CSCI",
              "courseNumber": 1302,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Models of Computing Systems",
              "subject": "CSCI",
              "courseNumber": 3401,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Software Design and Development",
              "subject": "CSCI",
              "courseNumber": 3601,
              "credits": 5
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Calculus I",
              "subject": "MATH",
              "courseNumber": 1101,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Calculus II",
              "subject": "MATH",
              "courseNumber": 1102,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Linear Algebra",
              "subject": "MATH",
              "courseNumber": 2111,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Data Structures",
              "subject": "CSCI",
              "courseNumber": 2101,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Beginning French I",
              "subject": "FREN",
              "courseNumber": 1001,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Beginning French II",
              "subject": "FREN",
              "courseNumber": 1002,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Intermediate French I",
              "subject": "FREN",
              "courseNumber": 2001,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Evolution of Biodiversity",
              "subject": "BIOL",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Writing for the Liberal Arts",
              "subject": "ENGL",
              "courseNumber": 1601,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Introduction to Film Studies",
              "subject": "ENGL",
              "courseNumber": 2015,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Beginning Ceramics",
              "subject": "ARTS",
              "courseNumber": 1050,
              "credits": 3
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Basic Studio Drawing I",
              "subject": "ARTS",
              "courseNumber": 1101,
              "credits": 2
            },
            "grade": "IP"
          }
        ],
        "major1": "ENGLISH",
        "major2": "FRENCH"
      },
      {
        "firstName": "Ferrell",
        "lastName": "Thomas",
        "dateOfBirth": "1989-07-10",
        "gender": "male",
        "email": "ferrellthomas@eweville.com",
        "phone": "+1 (974) 437-2688",
        "address": "700 Reed Street, Escondida, North Dakota, 7913",
        "courses": [
          {
            "course": {
              "name": "Introduction to Digital Media Computation",
              "subject": "CSCI",
              "courseNumber": 1201,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Foundations of Computer Science",
              "subject": "CSCI",
              "courseNumber": 1302,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Software Design and Development",
              "subject": "CSCI",
              "courseNumber": 3601,
              "credits": 5
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "PreCalculus I: Functions",
              "subject": "MATH",
              "courseNumber": 1012,
              "credits": 5
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "PreCalculus II: Trigonometry",
              "subject": "MATH",
              "courseNumber": 1013,
              "credits": 2
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Calculus II",
              "subject": "MATH",
              "courseNumber": 1102,
              "credits": 5
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Linear Algebra",
              "subject": "MATH",
              "courseNumber": 2111,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Data Structures",
              "subject": "CSCI",
              "courseNumber": 2101,
              "credits": 5
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Programming and Languages: Human-Computer Interaction and Interface Design",
              "subject": "CSCI",
              "courseNumber": 4656,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Beginning French II",
              "subject": "FREN",
              "courseNumber": 1002,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Intermediate French I",
              "subject": "FREN",
              "courseNumber": 2001,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Intermediate French II",
              "subject": "FREN",
              "courseNumber": 2002,
              "credits": 4
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "Reading and Analysis of Texts",
              "subject": "FREN",
              "courseNumber": 3401,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Evolution of Biodiversity",
              "subject": "BIOL",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Writing for the Liberal Arts",
              "subject": "ENGL",
              "courseNumber": 1601,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Beginning Ceramics",
              "subject": "ARTS",
              "courseNumber": 1050,
              "credits": 3
            },
            "grade": "A"
          }
        ],
        "major1": null,
        "major2": null
      },
      {
        "firstName": "Baldwin",
        "lastName": "Hart",
        "dateOfBirth": "1985-02-19",
        "gender": "male",
        "email": "baldwinhart@eweville.com",
        "phone": "+1 (960) 415-2198",
        "address": "414 Anna Court, Coultervillle, Illinois, 701",
        "courses": [
          {
            "course": {
              "name": "Introduction to Digital Media Computation",
              "subject": "CSCI",
              "courseNumber": 1201,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Models of Computing Systems",
              "subject": "CSCI",
              "courseNumber": 3401,
              "credits": 5
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "PreCalculus I: Functions",
              "subject": "MATH",
              "courseNumber": 1012,
              "credits": 5
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Calculus III",
              "subject": "MATH",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Mathematical Perspectives",
              "subject": "MATH",
              "courseNumber": 2202,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Data Structures",
              "subject": "CSCI",
              "courseNumber": 2101,
              "credits": 5
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Theory: Quantum Computing",
              "subject": "CSCI",
              "courseNumber": 4557,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Beginning French I",
              "subject": "FREN",
              "courseNumber": 1001,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Beginning French II",
              "subject": "FREN",
              "courseNumber": 1002,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Intermediate French I",
              "subject": "FREN",
              "courseNumber": 2001,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Reading and Analysis of Texts",
              "subject": "FREN",
              "courseNumber": 3401,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Fundamentals of Genetics, Evolution, and Development",
              "subject": "BIOL",
              "courseNumber": 1101,
              "credits": 3
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Evolution of Biodiversity",
              "subject": "BIOL",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Writing for the Liberal Arts",
              "subject": "ENGL",
              "courseNumber": 1601,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Introduction to Film Studies",
              "subject": "ENGL",
              "courseNumber": 2015,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Beginning Ceramics",
              "subject": "ARTS",
              "courseNumber": 1050,
              "credits": 3
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Basic Studio Drawing I",
              "subject": "ARTS",
              "courseNumber": 1101,
              "credits": 2
            },
            "grade": "F"
          }
        ],
        "major1": "FRENCH",
        "major2": null
      },
      {
        "firstName": "Kathy",
        "lastName": "Cooper",
        "dateOfBirth": "1990-12-16",
        "gender": "female",
        "email": "kathycooper@eweville.com",
        "phone": "+1 (944) 448-3179",
        "address": "411 Hausman Street, Cutter, Marshall Islands, 7424",
        "courses": [
          {
            "course": {
              "name": "Models of Computing Systems",
              "subject": "CSCI",
              "courseNumber": 3401,
              "credits": 5
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Software Design and Development",
              "subject": "CSCI",
              "courseNumber": 3601,
              "credits": 5
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "PreCalculus I: Functions",
              "subject": "MATH",
              "courseNumber": 1012,
              "credits": 5
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Calculus I",
              "subject": "MATH",
              "courseNumber": 1101,
              "credits": 5
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "Mathematical Perspectives",
              "subject": "MATH",
              "courseNumber": 2202,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Data Structures",
              "subject": "CSCI",
              "courseNumber": 2101,
              "credits": 5
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "Theory: Quantum Computing",
              "subject": "CSCI",
              "courseNumber": 4557,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Beginning French I",
              "subject": "FREN",
              "courseNumber": 1001,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Beginning French II",
              "subject": "FREN",
              "courseNumber": 1002,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Intermediate French I",
              "subject": "FREN",
              "courseNumber": 2001,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Intermediate French II",
              "subject": "FREN",
              "courseNumber": 2002,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Fundamentals of Genetics, Evolution, and Development",
              "subject": "BIOL",
              "courseNumber": 1101,
              "credits": 3
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Evolution of Biodiversity",
              "subject": "BIOL",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Writing for the Liberal Arts",
              "subject": "ENGL",
              "courseNumber": 1601,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Introduction to Film Studies",
              "subject": "ENGL",
              "courseNumber": 2015,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Basic Studio Drawing I",
              "subject": "ARTS",
              "courseNumber": 1101,
              "credits": 2
            },
            "grade": "C"
          }
        ],
        "major1": "CSCI",
        "major2": null
      },
      {
        "firstName": "Hahn",
        "lastName": "Strickland",
        "dateOfBirth": "1990-10-09",
        "gender": "male",
        "email": "hahnstrickland@eweville.com",
        "phone": "+1 (979) 551-2938",
        "address": "140 Lancaster Avenue, Zortman, Delaware, 7713",
        "courses": [
          {
            "course": {
              "name": "Foundations of Computer Science",
              "subject": "CSCI",
              "courseNumber": 1302,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Software Design and Development",
              "subject": "CSCI",
              "courseNumber": 3601,
              "credits": 5
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "PreCalculus I: Functions",
              "subject": "MATH",
              "courseNumber": 1012,
              "credits": 5
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "PreCalculus II: Trigonometry",
              "subject": "MATH",
              "courseNumber": 1013,
              "credits": 2
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "Calculus I",
              "subject": "MATH",
              "courseNumber": 1101,
              "credits": 5
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Calculus II",
              "subject": "MATH",
              "courseNumber": 1102,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Calculus III",
              "subject": "MATH",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Mathematical Perspectives",
              "subject": "MATH",
              "courseNumber": 2202,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Programming and Languages: Human-Computer Interaction and Interface Design",
              "subject": "CSCI",
              "courseNumber": 4656,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Beginning French II",
              "subject": "FREN",
              "courseNumber": 1002,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Intermediate French I",
              "subject": "FREN",
              "courseNumber": 2001,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Intermediate French II",
              "subject": "FREN",
              "courseNumber": 2002,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Reading and Analysis of Texts",
              "subject": "FREN",
              "courseNumber": 3401,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Evolution of Biodiversity",
              "subject": "BIOL",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Writing for the Liberal Arts",
              "subject": "ENGL",
              "courseNumber": 1601,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Introduction to Film Studies",
              "subject": "ENGL",
              "courseNumber": 2015,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Basic Studio Drawing I",
              "subject": "ARTS",
              "courseNumber": 1101,
              "credits": 2
            },
            "grade": "B"
          }
        ],
        "major1": "STUDIO ART",
        "major2": "PSYCH"
      },
      {
        "firstName": "Kristi",
        "lastName": "Floyd",
        "dateOfBirth": "1990-08-10",
        "gender": "female",
        "email": "kristifloyd@eweville.com",
        "phone": "+1 (950) 462-3269",
        "address": "443 Atkins Avenue, Saranap, Tennessee, 9261",
        "courses": [
          {
            "course": {
              "name": "Introduction to Digital Media Computation",
              "subject": "CSCI",
              "courseNumber": 1201,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Foundations of Computer Science",
              "subject": "CSCI",
              "courseNumber": 1302,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Software Design and Development",
              "subject": "CSCI",
              "courseNumber": 3601,
              "credits": 5
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Calculus III",
              "subject": "MATH",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Linear Algebra",
              "subject": "MATH",
              "courseNumber": 2111,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Data Structures",
              "subject": "CSCI",
              "courseNumber": 2101,
              "credits": 5
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Theory: Quantum Computing",
              "subject": "CSCI",
              "courseNumber": 4557,
              "credits": 4
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "Beginning French II",
              "subject": "FREN",
              "courseNumber": 1002,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Reading and Analysis of Texts",
              "subject": "FREN",
              "courseNumber": 3401,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Writing for the Liberal Arts",
              "subject": "ENGL",
              "courseNumber": 1601,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Basic Studio Drawing I",
              "subject": "ARTS",
              "courseNumber": 1101,
              "credits": 2
            },
            "grade": "C"
          }
        ],
        "major1": "CSCI",
        "major2": "MATH"
      },
      {
        "firstName": "Ethel",
        "lastName": "Terry",
        "dateOfBirth": "1988-04-20",
        "gender": "female",
        "email": "ethelterry@eweville.com",
        "phone": "+1 (931) 470-3967",
        "address": "231 Lloyd Street, Delshire, Minnesota, 9088",
        "courses": [
          {
            "course": {
              "name": "Foundations of Computer Science",
              "subject": "CSCI",
              "courseNumber": 1302,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Models of Computing Systems",
              "subject": "CSCI",
              "courseNumber": 3401,
              "credits": 5
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "PreCalculus I: Functions",
              "subject": "MATH",
              "courseNumber": 1012,
              "credits": 5
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "Calculus II",
              "subject": "MATH",
              "courseNumber": 1102,
              "credits": 5
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Calculus III",
              "subject": "MATH",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Linear Algebra",
              "subject": "MATH",
              "courseNumber": 2111,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Programming and Languages: Human-Computer Interaction and Interface Design",
              "subject": "CSCI",
              "courseNumber": 4656,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Theory: Quantum Computing",
              "subject": "CSCI",
              "courseNumber": 4557,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Intermediate French II",
              "subject": "FREN",
              "courseNumber": 2002,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Reading and Analysis of Texts",
              "subject": "FREN",
              "courseNumber": 3401,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Fundamentals of Genetics, Evolution, and Development",
              "subject": "BIOL",
              "courseNumber": 1101,
              "credits": 3
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Evolution of Biodiversity",
              "subject": "BIOL",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Writing for the Liberal Arts",
              "subject": "ENGL",
              "courseNumber": 1601,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Beginning Ceramics",
              "subject": "ARTS",
              "courseNumber": 1050,
              "credits": 3
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Basic Studio Drawing I",
              "subject": "ARTS",
              "courseNumber": 1101,
              "credits": 2
            },
            "grade": "A"
          }
        ],
        "major1": "ENGLISH",
        "major2": null
      });
});
