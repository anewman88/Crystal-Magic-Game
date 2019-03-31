
  var DebugOn = false;    // Boolean - Debug flag

  /* Use the ready() function to wait for the DOM (document object model) to be loaded */
  $(document).ready(function() {
    if (DebugOn) { console.log ("Begin $(document).ready(function())"); }   

    // Global Variable Declarations
    var targetNum = 0;     // Integer - Target number player is trying to get to
    var targetMin = 19;    // Integer - Minimum value for targetNum
    var targetMax = 120;   // Integer - Maximum value for targetNum
    var crystalVal = 0     // Integer - temp holds a crystal number 
    var crystalMin = 1;    // Integer - Minimum value for a crystal
    var crystalMax = 12;   // Integer - Maximum value for a crystal
    var NumCrystals = 4;   // Integer - The number of crystals on the page with hidden numbers
    var RunningSum = 0;    // Integer - The current or running sum from the player's clicks
    var WinCount = 0;      // Integer - Number of games won
    var LoseCount = 0;     // Integer - Number of games lost
    var CrystalsActive = true; // Boolean - Flag if crystal buttons are active.
    
    //*************************************************************************
    // Program Main
    //*************************************************************************

    // Get the target number - use random number generator to get a number 
    // between targetMin and targetMax and display to screen
    targetNum = Math.floor(Math.random() * (targetMax-targetMin+1) + targetMin); 
    if (DebugOn) { console.log ("Target number is: " + targetNum ); }    

    // Initialize the text portion of the display
    $("#TargetNumP").text("Target Sum: " + targetNum);
    $("#RunningSumP").text("Current Sum: " + RunningSum);
    $("#NumWins").text("Number Wins: " + WinCount);
    $("#NumLosses").text("Number Losses: " + LoseCount);

    // Use a for loop to create crystal objects for every crystal image on the page.
    for (var i = 0; i < NumCrystals; i++) {

      // For each iteration, we will create an imageCrystal "empty" object (aka pointer)
      var imageCrystal = $("<img>");
          
      // First each crystal object will be given the class ".CrystalImageClass"
      // This will allow the CSS to take effect.
      imageCrystal.addClass("CrystalImageClass");

      // Each imageCrystal will be given a src link to the crystal image
      imageCrystal.attr("src", "assets/images/crystal-image"+(i+1)+".jpg");

      // Each imageCrystal will be given a data attribute called data-CrystalValue.
      // This data attribute will be set equal to the crystal value.
      // Randomly create the value for that crystal 
      crystalVal = Math.floor(Math.random() * (crystalMax-crystalMin+1) + crystalMin);
      if (DebugOn) { console.log ("Random crystal" + i + " is " + crystalVal ); }    
      imageCrystal.attr("data-CrystalValue", crystalVal); 

      // Lastly, each crystal image (with all it classes and attributes) will get 
      // added to the page.
      $("#CrystalsDIV").append(imageCrystal);
    }  // for loop

    //******************************************************************************/
    // Function for the Instructions Button
    $("#InstructBTN").on("click", function() {
       alert("Instructions:\n\nYou will be given a random 'Target Sum' at the beginning of the game. \n\nEach of the 4 crystals have been assigned a hidden value. Clicking a crystal will add its value to your 'Current Sum'.  \n\nYou win the game by exactly matching your Running Sum to the Target Sum.  \n\nClick the 'Reset' button to start your current game over.  Click the 'New Game' button to start a new game. \n\nCrystal jewelry designed by Scott McNealy of Maya Canyon Jewelry. Pictures used with permission.");
    });
 
    //******************************************************************************/
    // Function for the Reset Button. The current game is started over.
    $("#ResetBTN").on("click", function() {
      RunningSum = 0;
      $("#TargetNumP").text("Target Sum: " + targetNum);
      $("#RunningSumP").text("Current Sum: " + RunningSum);
      CrystalsActive = true;
    });

    //******************************************************************************/
    // Function for the Play Again Button. A new game is started by getting a new
    // target sum, assigning new values to the crystals, and updating the display.
    $("#PlayAgainBTN").on("click", function() {
      var crystalVal = [0,0,0,0];
      // Get a new targetNum and reset the RunningSum. Display both
      targetNum = Math.floor(Math.random() * (targetMax-targetMin+1) + targetMin); 
      RunningSum = 0;
      $("#TargetNumP").text("Target Sum: " + targetNum);
      $("#RunningSumP").text("Current Sum: " + RunningSum);

      // get new values for each of the crystals
      for (var i = 0; i < NumCrystals; i++) {
         crystalVal[i] = Math.floor(Math.random() * (crystalMax-crystalMin+1) + crystalMin);
         if (DebugOn) { console.log ("Random crystal" + i + " is " + crystalVal); }    
      }
         
      // Re-assign each of the crystal values  
      $(".CrystalImageClass").each(function(index) {
         $(this).attr("data-CrystalValue", crystalVal[index]);
         console.log("in .each func: " + $(this).attr("data-CrystalValue"))
      });
      CrystalsActive = true;
    });

    //******************************************************************************/
    // Function for the "on click" event when a crystal is clicked. This is one generic
    // function no matter what crystal is clicked, however it will use .this to determine
    // the data value for the particular crystal clicked  
    $(".CrystalImageClass").on("click", function() {

      /* only run the function if the crystal buttons are active */
      if (CrystalsActive === true) {
        // Determine the crystal's value from the data attribute using the $(this) keyword 
        // Use .attr("data-crystalvalue") to get the value out of the "data-crystalvalue" attribute.
        // Since attributes on HTML elements are strings, it must be converted to an integer 
        // before adding to the RunningSum 

        var crystalValue = ($(this).attr("data-crystalvalue"));
        crystalValue = parseInt(crystalValue);
        // Add the crystalValue to the global Running Sum counter.
        // Every click, from every crystal adds to the global counter.
        RunningSum += crystalValue;

        // Display the Running Sum   
        $("#RunningSumP").text("Current Sum: " + RunningSum);

        // Check if the player has matched the target number (aka is a winner)
        // Alert the player if they are a winner
        if (RunningSum === targetNum) {
          WinCount++;
          $("#NumWins").text("Number Wins: " + WinCount);
          CrystalsActive = false;
          alert("You win! \n\nClick 'Reset' to play this game again.\n\n Click 'New Game' to play a new game.");
        } 
        // Check if the player had gone over the target number (aka is a loser)
        // Alert the player if they have gone over the target number
        else if (RunningSum >= targetNum) { 
          LoseCount++;
          $("#NumLosses").text("Number Losses: " + LoseCount);
          CrystalsActive = false;
          alert("You lose!! \n\nClick 'Reset' to play this game again.\n\n Click 'New Game' to play a new game.");
        }

      }  /* If (CrystalsActive === true) */

    if (DebugOn) { console.log ("End $(.CrystalImageClass).on function"); }
  });  //$(".CrystalImageClass").on("click", function()

});  // $(document).ready(function())
