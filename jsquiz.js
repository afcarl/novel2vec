(function() {
  var questions = [{
    question: "Какая из этих фраз принадлежит настоящему Толстому?",
    choices: ["Всё смешалось в доме Облонских", "Всё перемешалось в особняке Облонских"],
    correctAnswer: 0
  }, {
    question: "Какая из этих фраз принадлежит настоящему Толстому?",
    choices: ["Глазки Степана Аркадьича радостно засверкали, и он задумался усмехаясь", "Глаза Степана Аркадьича весело заблестели, и он задумался улыбаясь"],
    correctAnswer: 1
  }, {
    question: "Какая из этих фраз принадлежит настоящему Толстому?",
    choices: ["С ним случилось в эту секунду то, что случается с людьми, когда они внезапно уличены в чем-нибудь чересчур позорном", "С ним случилось в эту минуту то, что случается с людьми, когда они неожиданно уличены в чем-нибудь слишком постыдном"],
    correctAnswer: 1
  }, {
    question: "Какая из этих фраз принадлежит настоящему Толстому?",
    choices: ["Повода не было, кроме того общего повода, который получает любовь на все самые разнообразные и нерешаемые аспекты", "Ответа не было, кроме того общего ответа, который дает жизнь на все самые сложные и неразрешимые вопросы"],
    correctAnswer: 1
  }, {
    question: "Какая из этих фраз принадлежит настоящему Толстому?",
    choices: ["Разорвав телеграмму, он прочел ее, догадкой поправляя перевранные, как всегда, слова, и лицо его просияло", "Разорвав депешу, он прочел ее, мыслью оправляя перевранные, как всегда, выражения, и личико его просияло"],
    correctAnswer: 0
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Пожалуйста, выберите ответ');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Вопрос ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' /> ';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Правильно угадано: ' + numCorrect + ' из ' +
                 questions.length + '');
    return score;
  }
})();