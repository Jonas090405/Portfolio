// Quizdaten mit verschiedenen Kategorien und Fragen
let quizquestions = [
    {
      title: "Web-Programmierquiz",
      questions: [
        {
          question: "Was ist der Zweck von 'console.log' in JavaScript?",
          options: ["Ausgabe von Text auf der Konsole", "Änderung von HTML-Elementen", "Berechnung von Mathematik"],
          correctAnswer: 0,
          hint: "Wird häufig zur Fehlerdiagnose und Protokollierung verwendet."
        },
        {
          question: "Was bedeutet die Abkürzung 'DOM' in Bezug auf Webentwicklung?",
          options: ["Document Object Model", "Data Object Mode", "Digital Output Module"],
          correctAnswer: 0,
          hint: "Eine Programmierschnittstelle, die strukturierten Zugriff auf das Dokument ermöglicht."
        },
        {
          question: "Was bewirkt die 'flex' Eigenschaft in CSS?",
          options: ["Steuert die Größe von Bildern", "Definiert einen flexiblen Container", "Ändert die Schriftart"],
          correctAnswer: 1,
          hint: "Wird für das Erstellen von flexiblen Layouts verwendet."
        },
     {
          question: "Welche Funktion hat das Attribut 'src' in einem HTML-<script>-Tag?",
          options: ["Styling des Scripts", "Spezifikation des Quellcodes", "Angabe der Scriptquelle"],
          correctAnswer: 2,
          hint: "Es gibt an, wo das externe Skript gefunden werden kann."
  },
        {
          question: "Welche Funktion hat 'addEventListener' in JavaScript?",
          options: ["Ändert den Hintergrund", "Fügt einen Event-Handler hinzu", "Entfernt ein Element"],
          correctAnswer: 1,
          hint: "Ermöglicht das Hinzufügen von Ereignisbehandlern zu einem Element."
        }
      ]
    },
    {
      title: "Geografie-Quiz",
      questions: [
        {
          question: "Welcher Fluss ist der längste der Welt?",
          options: ["Amazonas", "Nil", "Jangtsekiang"],
          correctAnswer: 0,
          hint: "Durchquert den Regenwald in Südamerika."
        },
        {
          question: "In welchem Land befindet sich die Sahara-Wüste?",
          options: ["Ägypten", "Südafrika", "Algerien"],
          correctAnswer: 2,
          hint: "Das größte Land in Afrika."
        },
        {
          question: "Was ist die Hauptstadt von Australien?",
          options: ["Sydney", "Melbourne", "Canberra"],
          correctAnswer: 2,
          hint: "Nicht die bekannteste Stadt, aber die Hauptstadt."
        },
        {
          question: "Welcher Berg ist der höchste der Welt?",
          options: ["Mount Everest", "K2", "Matterhorn"],
          correctAnswer: 0,
          hint: "Teil des Himalaya-Gebirges."
        },
        {
          question: "In welchem Ozean liegt die Inselgruppe Hawaii?",
          options: ["Atlantik", "Indischer Ozean", "Pazifischer Ozean"],
          correctAnswer: 2,
          hint: "Ein US-Bundesstaat im Pazifik."
        }
      ]
    },
    {
      title: "Geschichtsquiz",
      questions: [
        {
          question: "Wann begann der Erste Weltkrieg?",
          options: ["1914", "1939", "1875"],
          correctAnswer: 0,
          hint: "Die 'Urkatastrophe' des 20. Jahrhunderts."
        },
        {
          question: "Wer war der erste Präsident der Vereinigten Staaten?",
          options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington"],
          correctAnswer: 2,
          hint: "Bekannt als 'Vater der Nation'."
        },
        {
          question: "Wann endete der Kalte Krieg?",
          options: ["1989", "1991", "1975"],
          correctAnswer: 1,
          hint: "Mit dem Zusammenbruch der Sowjetunion."
        },
        {
          question: "In welchem Jahr fiel die Berliner Mauer?",
          options: ["1989", "1991", "1975"],
          correctAnswer: 0,
          hint: "Symbol des Zusammenbruchs der DDR."
        },
        {
          question: "Welches Ereignis markiert das Ende des Römischen Reiches?",
          options: ["Fall von Konstantinopel", "Schlacht von Adrianopel", "Untergang von Rom"],
          correctAnswer: 2,
          hint: "Ein langwieriger Prozess, der im Jahr 476 n. Chr. endete."
        }
      ]
    }
  ];
  
  // Initialisierung der Quizvariablen
  let currentQuiz = 0;
  let currentQuestion = 0;
  
  function showSelection() {
  let quizSelection = document.getElementById("quiz-selection");
  quizSelection.style.display = "block";
  hintContainer.style.display = "none";
  hintContainer.textContent = "";
  submitButton.style.display = "block";
  
  
  // Leere den Inhalt der Frage- und Optionscontainer
  let questionContainer = document.getElementById("question-container");
  let optionsContainer = document.getElementById("options-container");
  questionContainer.innerHTML = "";
  optionsContainer.innerHTML = "";
  nextButton.style.display = "none";
  
  // Setze den Tipp-Button zurück
  let hintContainer = document.getElementById("hint-text");
  hintContainer.textContent = "";
  hintContainer.style.display = "none";
  }
  
  // Funktion zum Starten eines bestimmten Quiz
  function startQuiz(quizIndex) {
  currentQuiz = quizIndex - 1;
  currentQuestion = 0;
  hideSelection();
  showPage("quiz-page");
  displayQuestion();
  
  }
  
  // Funktion zum Anzeigen einer Quiz-Frage
  function displayQuestion() {
  let questionContainer = document.getElementById("question-container");
  let optionsContainer = document.getElementById("options-container");
  let nextButton = document.getElementById("next-question");
  
  // Setze den Tipp-Button zurück
  let hintContainer = document.getElementById("hint-text");
  hintContainer.textContent = "";
  hintContainer.style.display = "none";
  
  if (currentQuestion < quizquestions[currentQuiz].questions.length) {
    let currentQuestionData = quizquestions[currentQuiz].questions[currentQuestion];
    questionContainer.innerHTML = currentQuestionData.question;
    optionsContainer.innerHTML = "";
  
    currentQuestionData.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.innerHTML = option;
        button.onclick = function() {
            submitAnswer(index);
        };
        optionsContainer.appendChild(button);
    });
  
    nextButton.style.display = "none";
    
  }
          
  
  setTimeout(() => {
    questionContainer.classList.add("animating");
    startTypewriter();
  }, 25);
  }
  
  function startTypewriter() {
  
  }
  
  // Funktion zum Überprüfen und Verarbeiten einer gegebenen Antwort
  function submitAnswer(selectedAnswer) {
  let correctAnswer = quizquestions[currentQuiz].questions[currentQuestion].correctAnswer;
  let nextButton = document.getElementById("next-question");
  let questionContainer = document.getElementById("question-container");
  let optionsContainer = document.getElementById("options-container");
  
  // Überprüfe die Antwort und ändere die Hervorhebung der Optionen
  quizquestions[currentQuiz].questions[currentQuestion].options.forEach((option, index) => {
    let button = optionsContainer.children[index];
    button.disabled = true; // Deaktiviere alle Buttons, um weitere Klicks zu verhindern
    if (index === correctAnswer) {
      button.style.backgroundColor = "green"; // Hervorhebung der richtigen Antwort
    } else if (index === selectedAnswer) {
      button.style.backgroundColor = "red"; // Hervorhebung der falschen Antwort
    }
  });
  
  if (selectedAnswer === correctAnswer) {
    // Änderung hinzufügen, wenn die Antwort richtig ist
    questionContainer.innerHTML = "Richtig! Weiter zur nächsten Frage.";
    questionContainer.style.color = "green";
    nextButton.style.display = "block";
   
  } else {
    // Änderung hinzufügen, wenn die Antwort falsch ist
    questionContainer.innerHTML = "Falsche Antwort! Versuche es erneut oder quitIT!";
    questionContainer.style.color = "red";
    nextButton.style.display = "none"; // Verstecke den "Nächste Frage"-Button
  
    //Schleife die nach einer Verzögerung zur ursprünglichen Frage zurücksetzt
    setTimeout(() => {
      resetToOriginalQuestion();
    }, 3500); // Wartezeit vor der Zurücksetzung
  }
  }
  
  // Funktion zum Zurücksetzen auf die ursprüngliche Frage nach einer falschen Antwort
  function resetToOriginalQuestion() {
    let optionsContainer = document.getElementById("options-container");
  
    // Setze die Hervorhebung der Optionen zurück
    quizquestions[currentQuiz].questions[currentQuestion].options.forEach((option, index) => {
      let button = optionsContainer.children[index];
      button.disabled = false; // Aktiviere die Buttons wieder
      button.style.backgroundColor = ""; // Setze die Hintergrundfarbe zurück
    });
  
    // Setze den Frage-Text zurück
    let questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = quizquestions[currentQuiz].questions[currentQuestion].question;
  
    // Setze den "Weiter"-Button zurück
    let nextButton = document.getElementById("next-question");
    nextButton.style.display = "none";
  }
  
  
  function goToNextQuestion() {
    currentQuestion++;
    let nextButton = document.getElementById("next-question");
    let questionContainer = document.getElementById("question-container");
    if (currentQuestion < quizquestions[currentQuiz].questions.length) {
      displayQuestion();
      console.log("Frage angezeigt");
    } else {
  
      // Verstecke den Submit-Button und die Optionen, wenn das Quiz beendet ist
      questionContainer.innerHTML = "Du hast alle Fragen richtig beantwortet! Suche dir ein weiteres Quiz heraus und QuizIT!";
      questionContainer.style.color = "white";
      nextButton.style.display = "none";
      hintContainer.textContent = "";
  
      
  
      console.log("Quiz beendet");
      return "Quiz beendet";
    }
  }
  
  //Selection standardmäßig verstecken//
  function hideSelection() {
  let quizSelection = document.getElementById("quiz-selection");
  quizSelection.style.display = "none";
  }
  
  // Funktion zum Anzeigen einer bestimmten Seite (Quiz-Auswahl oder Quiz-Fragen)
  function showPage(pageId) {
  let pages = document.querySelectorAll('.page');
  pages.forEach(page => page.style.display = 'none');
  let currentPage = document.getElementById(pageId);
  currentPage.style.display = 'block';
  }
  
  //Funktion um Tipp anzeigen lassen//
  function getHint() {
  let currentQuestionData = quizquestions[currentQuiz].questions[currentQuestion];
  let hint = currentQuestionData.hint;
  
  //Zeige den Tipp-Text an
  let hintContainer = document.getElementById("hint-text");
  hintContainer.textContent = hint;
  hintContainer.style.display = "block";
  }
  
  //Footer Button zur About Seite//
  document.getElementById("footer").addEventListener("click", function() {
  window.location.href = "aboutme.html";
  });