document.addEventListener('DOMContentLoaded', function () {

    let wordToCheck
    let reply

    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function (selection) {
        if (selection[0]) {
            document.getElementById("txtWordToCheck").value = selection[0]
        }
    })

    document.getElementById('txtWordToCheck').focus();

    let checkWord = document.getElementById("btnCheckWord");

    checkWord.addEventListener("click", getResult);

    // Execute getResult function when enter key is pressed
    document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            getResult()
        }
    })

    function getResult() {
        // Reset textbox focus and suggestions and result placeholders
        document.getElementById('suggestions').innerHTML = "";
        document.getElementById('result').innerText = "";
        document.getElementById('txtWordToCheck').focus();

        // Get value from the textbox
        wordToCheck = document.getElementById('txtWordToCheck').value;

        if (wordToCheck.length === 0) {
            // If empty wordToCheck value
            document.getElementById("result").innerText = 'উপরে লিখুন।';

        } else {
            // Check if English 
            let english = /^[A-Za-z0-9]*$/;
            if (english.test(wordToCheck[0])) {
                document.getElementById('result').innerText = 'বাংলাবর্ণে লিখুন।';

            } else {
                // Only if wordToCheck is not empty and not english, send the xhr
                let url = `https://bangla-banan.herokuapp.com/api/${wordToCheck}`;

                let xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        document.getElementById('txtWordToCheck').focus();
                        document.getElementById('suggestions').innerText = "";

                        reply = JSON.parse(xhr.responseText)
                        console.log(reply);

                        if (reply.err) {
                            document.getElementById('result').innerText = "কোথাও কোনো সমস্যা হয়েছে।"
                        } else if (reply.correct) {
                            document.getElementById('result').innerText = "অভিধানে আছে।"
                        } else if ((!reply.correct) && (reply.suggestions.length == 0)) {
                            document.getElementById('result').innerText = 'বাংলাবর্ণে লিখুন।'
                        } else if (reply.suggestions.length > 0) {
                            document.getElementById('result').innerText = "সম্ভবত ভুল।"
                            var suggestions = ""

                            for (word of reply.suggestions) {
                                suggestions += `<li>${word}</li>`
                            }
                            document.getElementById('suggestions').innerHTML = suggestions

                        }
                    }
                }
                xhr.send()
            }
        }
    }
    //   xhr.onloadend = function () {
    //     // If checkword button is clicked without any word in the textbox
    //     if (xhr.status == 404)
    //       document.getElementById("result").innerText = 'বাংলাবর্ণে লিখুন।'
    //   }
})