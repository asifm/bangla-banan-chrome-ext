# Chrome extension: Bangla/Bengali spell-checker

It consumes API from https://bangla-banan.herokuapp.com, which is another project of mine. 
The code for that project is [here](https://github.com/asifm/bangla_spellchecker). 

The API it uses is simple. 

You send a request to the server for https://bangla-banan.herokuapp.com/api/[word], where [word] is the word you're interested in. The server sends a JSON response, with the following keys: 
- `err` (message; in case of error) 
- `correct` (`true` or `false`; whether the sent word is correct)
- `suggestions` (`array`; a list of suggested corrections)
- `numSuggestions` (`number`; number of suggested corrections)
- `origWord` (`string`; the word sent)
