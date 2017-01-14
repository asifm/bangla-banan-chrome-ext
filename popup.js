document.addEventListener('DOMContentLoaded', function () {

  var sendWord = document.getElementById("sendWord")

  sendWord.addEventListener("click", function () {

    var wordToCheck = document.getElementById('wordToCheck').value
    var url = `https://bangla-banan.herokuapp.com/api/${wordToCheck}`

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true)

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        document.getElementById('correct').innerText = ""
        document.getElementById('wrong').innerText = ""
        document.getElementById('suggestions').innerText = ""
        document.getElementById('error').innerText = ""
        document.getElementById('wordToCheck').focus()

        reply = JSON.parse(xhr.responseText)
        console.log(reply);

        if (reply.err) {
          document.getElementById('error').innerText = "কোথাও কোনো সমস্যা হয়েছে।"
        } else if (reply.correct) {
          document.getElementById('correct').innerText = "সম্ভবত ঠিক।"
        } else if ((!reply.correct) && (reply.suggestions.length == 0)) {
          document.getElementById('error').innerText = "বাংলায় লিখুন।"
        } else if (reply.suggestions.length > 0) {
          document.getElementById('wrong').innerText = "সম্ভবত ভুল।"
          var suggestions = ""

          for (word of reply.suggestions) {
            suggestions += `<li>${word}</li>`
          }
          document.getElementById('suggestions').innerHTML = suggestions

        }
      }
    }

    xhr.send()

    xhr.onloadend = function () {
      if (xhr.status == 404)
        document.getElementById("error").innerText = 'উঁহু। আবার লিখুন।'
    }

  })
})