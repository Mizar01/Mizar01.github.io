

$(function(){
    setup();
});

function setup() {

    let squareDim = 5;
    let letters = getLetters(squareDim);

    // Create a square table with the letters

    var table = $("<table>").appendTo("#board-container");

    for (var i = 0; i < squareDim; i++) {
        var row = $("<tr>").appendTo(table);
        for (var j = 0; j < squareDim; j++) {
            var cell = $("<td>").appendTo(row).addClass("sq" + squareDim);
            cell.text(letters[i * squareDim + j]);
        }
    }

    startTimer();

}

function startTimer() {
    // Show a timer that starts at three minutes and counts down to zero

    var timer = $("<div>").appendTo("#timer-container");

    var time = 3 * 60;
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;

    var timerInterval = setInterval(function() {
        if (seconds == 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        if (minutes == 0 && seconds <= 30) {
            $("#timer-container").css("background-color", "red");
        }

        if (minutes <= 0 && seconds <= 0) {
            clearInterval(timerInterval);
            $("#timer-container").css("background-color", "black").css*("color", "white");
        }

        timer.text((minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds);

    }, 1000);

}

function getLetters(squareDim = 5) {
    // Get a squareDim power 2 number of random alphabet letters for italian

    var letters = [];
    var alphabetProbabilities = {
        "A": 11.74,
        "B": 0.92,
        "C": 4.50,
        "D": 3.73,
        "E": 11.79,
        "F": 1.03,
        "G": 1.62,
        "H": 1.54,
        "I": 11.28,
        "L": 6.51,
        "M": 2.51,
        "N": 6.88,
        "O": 9.83,
        "P": 3.01,
        "Qu": 0.51,
        "R": 6.37,
        "S": 4.98,
        "T": 5.62,
        "U": 3.01,
        "V": 2.10,
        "Z": 1.11
    };

    // Get a random letter based on the probabilities

    var alphabet = Object.keys(alphabetProbabilities);
    var alphabetProbabilitiesSum = 0;
    for (var i = 0; i < alphabet.length; i++) {
        alphabetProbabilitiesSum += alphabetProbabilities[alphabet[i]];
    }

    for (var i = 0; i < squareDim * squareDim; i++) {
        var random = Math.random() * alphabetProbabilitiesSum;
        var sum = 0;
        for (var j = 0; j < alphabet.length; j++) {
            sum += alphabetProbabilities[alphabet[j]];
            if (random <= sum) {
                letters.push(alphabet[j]);
                break;
            }
        }
    }

    return shuffleArray(letters);

}

function shuffleArray(arr) {
    // Shuffle an array

    for (var i = 0; i < arr.length; i++) {
        var random = Math.floor(Math.random() * arr.length);
        var temp = arr[i];
        arr[i] = arr[random];
        arr[random] = temp;
    }

    return arr;
}