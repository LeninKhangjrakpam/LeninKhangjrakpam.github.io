let angle = 0;
function status_spinnner()
{
  document.querySelector('.status').style.visibility = 'visible';
  try{
    eval(document.querySelector('.res').innerHTML);
    document.querySelector('.spinner-border').style.color = 'green';
  }
  catch(err){
    document.querySelector('.spinner-border').style.color = 'red';
  }
}
function rgb_fn()   //function to get random number in the range of [0, 255]
{
  let rgb = Math.floor(Math.random() * 256);
  return rgb;
}
function change()   //function to change the body_background randomly
{
  let r = rgb_fn(), g = rgb_fn(), b = rgb_fn();
  angle = (angle + 30) % 361;
  document.querySelector('.display-value').innerHTML = 'rgb('+r + ',' + g + ',' +b + ')';
  document.querySelector('body').style.backgroundColor = 'rgb('+r+ ',' +g+ ','+ b + ')';
  document.querySelector('.calct').style.backgroundColor = 'rgb('+r+ ',' +g+ ','+ b + ')';
  document.querySelector('.mode').style.transform = 'rotate('+angle+'deg)';
  
  let map = document.querySelectorAll('button');
  for(let count = 0; count < map.length; count++)
  {
    map[count].style.color = 'rgb('+r+ ',' +g+ ','+ b + ')';  
  }
}

//function for blinking cursor
function blink() 
{
  let cursor = document.querySelector('.cursor');
  if (cursor.style.visibility == 'hidden')
  {
    cursor.style.visibility = 'visible';
  }
  else
  {
    cursor.style.visibility = 'hidden';
  }
}
window.setInterval(blink, 600);  //blink the cursor every 600ms or call blink function every 600ms

document.addEventListener('DOMContentLoaded', function(){
  let calc_key = document.querySelectorAll('button');
  let key_log = [];
  let expression, deg_to_rad, rad_to_deg;
  document.querySelector('.status').style.visibility = 'hidden';
  for(let i = 0; i < calc_key.length; i++)
  {
    if (calc_key[i].id != 'mode_rand' && calc_key[i].id != 'ans')
    {
      calc_key[i].addEventListener('mousedown', function(){
        calc_key[i].style.color = 'lightgreen';
      });
      calc_key[i].addEventListener('mouseup', function(){
        calc_key[i].style.color = 'white';
      });
    }

    
    calc_key[i].addEventListener('click', function(){
      if (calc_key[i].name != 'special_key')
      {   
        if (calc_key[i].name == 'constant_symbol')
        {
          switch (calc_key[i].value)
          {
            case 'pi':
              key_log.push(Math.PI);                   //pi button function
              break;
            case 'E':
              key_log.push(Math.E);                     //E button function
              break;
            case 'left_shift':                         //left-shift button function
              key_log.push('<<');
              break;
            case 'right_shift':                          //right-shift button function
              key_log.push('>>');
              break;
            case 'exponent':                           //exponent button function
              key_log.push('Math.pow(');
              break;
            case 'squareroot':                         //squareroot button function
              key_log.push('Math.sqrt(');
              break;
            case 'log':                               //natural log button function
              key_log.push('Math.log(');
              break;
            case 'log10':                              //log base10 button function
              key_log.push('Math.log10(');
              break;
            case 'log2':                               //log base2 button function
              key_log.push('Math.log2(');
              break;
            case 'sin':                                 //sin button function
              deg_to_rad = 'Math.sin(0.0175*';
              key_log.push(deg_to_rad);
              break;
            case 'cos':                                //cos button function
              deg_to_rad = 'Math.cos(0.0175*';
              key_log.push(deg_to_rad);
              break;
            case 'tan':                                //tan button function
              deg_to_rad = 'Math.tan(0.0175*';
              key_log.push(deg_to_rad);
              break;
            case 'sin_i':                              //sin inverse button function
              rad_to_deg = 'Math.asin(';
              key_log.push(rad_to_deg);
              break;
            case 'cos_i':                              //cos inverse button function
              rad_to_deg = 'Math.acos(';
              key_log.push(rad_to_deg);
              break;
            case 'tan_i':                              //tan inverse button function
              rad_to_deg = 'Math.atan(';
              key_log.push(rad_to_deg);
              break;
            
            default:                                 //digits, paranthesis, commas
              key_log.push(calc_key[i].value);
              break;
          }

          expression = key_log.join('');
          document.querySelector('.display-value').innerHTML = expression;
          document.querySelector('.res').innerHTML = expression;
          status_spinnner();
        }
      }
    });
  }
  
  //equal button function
  document.querySelector('#ans').addEventListener('click', function()
  {
    try
    {
      document.querySelector('.display-value').innerHTML = eval(expression);
      document.querySelector('.display').style.borderLeft = '5px solid green';
      document.querySelector('.rad_to_deg').innerHTML = eval(expression)+' rad = '+ eval(expression)*(180/Math.PI) +' deg';
    }
    catch(err)
    {
      document.querySelector('.display-value').innerHTML = err.message;
      document.querySelector('.display').style.borderLeft = '5px solid red';
    }
    document.querySelector('.res').innerHTML = expression;
    
  });
  
  //reset button function
  document.querySelector('.clr').addEventListener('click', function(){ 
    key_log.splice(0, key_log.length);  //delete array value
    expression = '';
    document.querySelector('.display-value').innerHTML = '';
    document.querySelector('.display').style.borderLeft = 'none';
    document.querySelector('.res').innerHTML = expression;
    document.querySelector('.rad_to_deg').innerHTML = 'Radian'
    document.querySelector('.status').style.visibility = 'hidden';
  });
  
  //delete button function
  document.querySelector('.del').addEventListener('click', function(){
    expression = expression.slice(0, expression.length - 1);        //extracting substring from a string for removing the last character
    key_log.splice(0, key_log.length)                               //delete the whole elememt in the list
    key_log.push(expression);                                       //add expression to list after deleting the last character
    document.querySelector('.display-value').innerHTML = expression;
    document.querySelector('.res').innerHTML = expression;
    status_spinnner();
  });
 
  //party button function
  let mode = 'OFF', id;
  document.querySelector('#mode_rand').addEventListener('click', function(){
    if (mode == 'OFF')  //execute if mode is OFF
    {
      mode = 'ON';
      id = window.setInterval(change, 200);   //200ms
    }
    else if (mode == 'ON')  //execute if mode is ON
    {
      mode = 'OFF';
      window.clearInterval(id);
      document.querySelector('body').style.backgroundColor = 'black';
      document.querySelector('.calct').style.backgroundColor = 'black';
      document.querySelector('.mode').style.transform = 'rotate(0deg)';
      let map = document.querySelectorAll('button');
      for(let count = 0; count < map.length; count++)
      { 
        if (map[count].id == 'mode_rand')
        {
          map[count].style.color = 'rgb(147, 24, 230)';
        }
        else{
          map[count].style.color = 'white';
        }
      }
    }  
  });

});