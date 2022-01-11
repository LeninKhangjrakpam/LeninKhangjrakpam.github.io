const total_q = 7;     //this value need to be change according to the number of total question

function score(user_response)        //function for counting correct answer from user_response
{
  let score = 0;
  for (let key in user_response){
    if (user_response[key] == 'correct'){
      score++;
    }
  }
  return score;
}
function set_backgroundto_normal(val){
  let options = document.querySelectorAll('.q'+val);
  for (let option of options){
    option.style.backgroundColor = 'palegreen';
  }
}
$(document).ready(function(){
  let correct_responses = [];
  let incorrect_responses = [];
  let user_response = {}
  for(let indx = 1; indx <= total_q; indx++){
    user_response[indx] = 'no response'
  }
  correct_responses = document.querySelectorAll('button.correct');
  incorrect_responses = document.querySelectorAll('button.incorrect');
  $('.result').hide();     //hide the result section when the page is loaded
  
  //changing background for multiple choice
  for (let correct_response of correct_responses)
  {
    correct_response.addEventListener('click', function(){
      user_response[correct_response.value] = 'correct';
      set_backgroundto_normal(correct_response.value);
      correct_response.style.backgroundColor = 'orange';
    });
  }
  for (let incorrect_response of incorrect_responses){
    incorrect_response.addEventListener('click', function(){
      user_response[incorrect_response.value] = 'incorrect';
      set_backgroundto_normal(incorrect_response.value);
      incorrect_response.style.backgroundColor = 'orange';
    });
  }
    

  //submit function
  $('.submit_btn').click(function(){

    //checking ans for q6
    if (document.querySelector('.q6').value.toUpperCase().trim() == 'STEPHEN HAWKING'){
      user_response[6] = 'correct';
    }
    else if(document.querySelector('.q6').value == ''){
      user_response[6] = 'no response';
    }
    else{
      user_response[6] = 'incorrect';
    }
    //checking ans for q7
    if (document.querySelector('.q7').value == 'is is a s'){
      user_response[7] = 'correct';
    }
    else if(document.querySelector('.q7').value == ''){
      user_response[7] = 'no response';
    }
    else{
      user_response[7] = 'incorrect';
    }

    $('.result').show('fast');    //show the result section when submit button is click
    $('.score').text(score(user_response)+' / '+total_q); 
    $('meter').val(score(user_response));
    
    //displaying user response
    $("p.response").empty();
    for(let j = 1; j<= total_q; j++)
    {
      $('p.response').append('<p><b><span class="Qs"> Question '+j+' : </span><span class="dtl">'+user_response[j]+'</span></b></p>');
    }
  });
});
