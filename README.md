HANGMAN

- Variable Tries (number)
- Variale Liste an möglichen Wörtern (array of strings)
- Zufall: ein Wort aus Liste aller Wörter -> wordToGuess

- Layout:

  - Tries anzeigen: Entweder nur als Zahl ("Versuche: 6), oder Herzen (Emoji) oder Galgen
  - Wortanzeige (\_ \_ _ => A _ \_)
  - Danli: Key-Button Oleksandr: Key Down

  - Liste an bereits falsch geratenen Buchstaben

  - Wenn Buchstabe richtig getippt: Alle richtig getippten Buchstaben anzeigen
  - wenn alle Buchstaben richtig getippt: Spiel endet. "GEWONNEN" anzeigen

  - Wenn Buchstabe falsch getippt: Leben = Leben - 1, in Liste "falsch geratene Buchstaben" hinzufügen
  - Wenn Leben == 0: Spiele endet, "Du hast leider verloren. Das Wort war: XYZ"
