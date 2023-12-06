/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    // Initialize the result object with SearchTerm
    // and an empty array for Results
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };
   
    // Iterate over each book in the scannedTextObj array
    scannedTextObj.forEach(book => {
      // Iterate over the content of each book
      book.Content.forEach(content => {
        // Check if the 'Text' field of the content includes the searchTerm
        /*if (content.Text.includes(searchTerm)) {
          // If the searchTerm is found, push an object containing the ISBN,
          // page, and line number to the Results array in the result object
          console.log("Match found in text:", content.Text);
          result.Results.push({
            "ISBN": book.ISBN,
            "Page": content.Page,
            "Line": content.Line
          })
        }*/
         // Using a regular expression to ensure whole word matching
         // RegExp.test() is used to perform the case-sensitive search
         const regex = new RegExp(`\\b${searchTerm}\\b`);
         if (regex.test(content.Text)) {
          result.Results.push({
            "ISBN": book.ISBN,
            "Page": content.Page,
            "Line": content.Line
          })
         }
      })
    })

   // Return the result object after completing the search
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}


/*====================================================================================
1. Positive Test
A test case to ensure the function correctly finds and returns matches.
*/
const positiveTestBooks = [
    {
        "Title": "Mysterious Island",
        "ISBN": "9780001112222",
        "Content": [
            {"Page": 15, "Line": 5, "Text": "The island was lush and verdant."},
            {"Page": 16, "Line": 3, "Text": "They found a mysterious cave on the north side."}
        ]
    }
];

const positiveTestExpectedOutput = {
    "SearchTerm": "mysterious",
    "Results": [
        {"ISBN": "9780001112222", "Page": 16, "Line": 3}
    ]
};

const positiveTestResult = findSearchTermInBooks("mysterious", positiveTestBooks);
if (JSON.stringify(positiveTestExpectedOutput) === JSON.stringify(positiveTestResult)) {
    console.log("PASS: Positive Test");
} else {
    console.log("FAIL: Positive Test");
    console.log("Expected:", positiveTestExpectedOutput);
    console.log("Received:", positiveTestResult);
}



/*====================================================================================
2. Negative Test
A test case to verify that no matches are returned when the search term is not present.
*/
const negativeTestBooks = [
    {
        "Title": "Journey to the Center of the Earth",
        "ISBN": "9780003334444",
        "Content": [
            {"Page": 10, "Line": 2, "Text": "They prepared for their journey at dawn."},
            {"Page": 11, "Line": 1, "Text": "The cave was dark and silent."}
        ]
    }
];

const negativeTestResult = findSearchTermInBooks("ocean", negativeTestBooks);
if (negativeTestResult.Results.length === 0) {
    console.log("PASS: Negative Test");
} else {
    console.log("FAIL: Negative Test");
    console.log("Expected 0 results for 'ocean'");
    console.log("Received:", negativeTestResult.Results.length, "results");
}



/*====================================================================================
3. Case-sensitive Test
A test case to ensure the function respects case sensitivity.
*/
const caseSensitiveTestBooks = [
    {
        "Title": "War of the Worlds",
        "ISBN": "9780005556666",
        "Content": [
            {"Page": 5, "Line": 4, "Text": "The Martian vessels landed in the night."},
            {"Page": 6, "Line": 1, "Text": "Their technology was the far superior to ours."}
        ]
    }
];

const caseSensitiveTestExpectedOutput = {
    "SearchTerm": "The",
    "Results": [
        {"ISBN": "9780005556666", "Page": 5, "Line": 4}
    ]
};

const caseSensitiveTestResult = findSearchTermInBooks("The", caseSensitiveTestBooks);
if (JSON.stringify(caseSensitiveTestExpectedOutput) === JSON.stringify(caseSensitiveTestResult)) {
    console.log("PASS: Case-sensitive Test");
} else {
    console.log("FAIL: Case-sensitive Test");
    console.log("Expected:", caseSensitiveTestExpectedOutput);
    console.log("Received:", caseSensitiveTestResult);
}


/*====================================================================================
4.  Multiple Matches in a Single Book
Testing for multiple occurrences of a searchTerm in one book.
*/
const multipleMatchesTestBooks = [
    {
        "Title": "Echoes of the Mountains",
        "ISBN": "1234567890123",
        "Content": [
            {"Page": 32, "Line": 1, "Text": "The echo resounded through the valley."},
            {"Page": 33, "Line": 2, "Text": "Each echo seemed to tell a different story."},
            {"Page": 34, "Line": 3, "Text": "They listened to the echo of their footsteps."}
        ]
    }
];

const multipleMatchesTestExpectedOutput = {
    "SearchTerm": "echo",
    "Results": [
        {"ISBN": "1234567890123", "Page": 32, "Line": 1},
        {"ISBN": "1234567890123", "Page": 33, "Line": 2},
        {"ISBN": "1234567890123", "Page": 34, "Line": 3}
    ]
};

const multipleMatchesTestResult = findSearchTermInBooks("echo", multipleMatchesTestBooks);
if (JSON.stringify(multipleMatchesTestExpectedOutput) === JSON.stringify(multipleMatchesTestResult)) {
    console.log("PASS: Multiple Matches in a Single Book");
} else {
    console.log("FAIL: Multiple Matches in a Single Book");
    console.log("Expected:", multipleMatchesTestExpectedOutput);
    console.log("Received:", multipleMatchesTestResult);
}



/*====================================================================================
5.  Matches Across Multiple Books
Testing for multiple occurrences of a searchTerm in different books.
*/
const crossBookTestBooks = [
    {
        "Title": "The Sun and The Moon",
        "ISBN": "1122334455667",
        "Content": [{"Page": 22, "Line": 1, "Text": "The Sun is a star at the center of our solar system."}]
    },
    {
        "Title": "Stars and Planets",
        "ISBN": "2233445566778",
        "Content": [{"Page": 18, "Line": 2, "Text": "Planets orbit stars in the vastness of space."}]
    }
];

const crossBookTestExpectedOutput = {
    "SearchTerm": "stars",
    "Results": [
        {"ISBN": "2233445566778", "Page": 18, "Line": 2}
    ]
};

const crossBookTestResult = findSearchTermInBooks("stars", crossBookTestBooks);
if (JSON.stringify(crossBookTestExpectedOutput) === JSON.stringify(crossBookTestResult)) {
    console.log("PASS: Matches Across Multiple Books");
} else {
    console.log("FAIL: Matches Across Multiple Books");
    console.log("Expected:", crossBookTestExpectedOutput);
    console.log("Received:", crossBookTestResult);
}



/*====================================================================================
6.  Empty Content Array
Testing how the function handles a book with no content.
*/
const emptyContentTestBooks = [
    {
        "Title": "The Silent Forest",
        "ISBN": "3344556677889",
        "Content": []
    }
];

const emptyContentTestExpectedOutput = {
    "SearchTerm": "silent",
    "Results": []
};

const emptyContentTestResult = findSearchTermInBooks("silent", emptyContentTestBooks);
if (JSON.stringify(emptyContentTestExpectedOutput) === JSON.stringify(emptyContentTestResult)) {
    console.log("PASS: Empty Content Array");
} else {
    console.log("FAIL: Empty Content Array");
    console.log("Expected:", emptyContentTestExpectedOutput);
    console.log("Received:", emptyContentTestResult);
}


/*====================================================================================
7.  Special Characters in Search Term
Testing for terms that contain special characters.
*/
const specialCharTestBooks = [
    {
        "Title": "Questions & Answers",
        "ISBN": "4455667788990",
        "Content": [
            {"Page": 5, "Line": 1, "Text": "What is the meaning of life, the universe, & everything?"}
        ]
    }
];

const specialCharTestExpectedOutput = {
    "SearchTerm": "&",
    "Results": [
        {"ISBN": "4455667788990", "Page": 5, "Line": 1}
    ]
};

const specialCharTestResult = findSearchTermInBooks("&", specialCharTestBooks);
if (JSON.stringify(specialCharTestExpectedOutput) === JSON.stringify(specialCharTestResult)) {
    console.log("PASS: Special Characters in Search Term");
} else {
    console.log("FAIL: Special Characters in Search Term");
    console.log("Expected:", specialCharTestExpectedOutput);
    console.log("Received:", specialCharTestResult);
}

