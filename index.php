<?php 

    // Metavlites 
    $greeting = "Hello World!";
    $studentName = "Alex Mavrotheris";
    $currentYear = 2024;
    $isStudent = true; 
    $score = 85.5;   

    // output 
    echo "<h1>" .$greeting. "/<hi>";
    echo "<p>The current year is: " . $currentYear . "</p>";         // Display current year
    echo "<p>Are you a student? " . ($isStudent ? 'Yes' : 'No') . "</p>";  // Display yes/no based on boolean
    echo "<p>Your score is: " . $score . "</p>";   // Display score (float)

    // A simple calculation using variables
    $yearOfBirth = $currentYear - 23;  // Assume the student is 20 years old
    echo "<p>You were born in the year: " . $yearOfBirth . "</p>";  // Calculate and display year of birth

?>