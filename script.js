document.addEventListener('DOMContentLoaded', function(){
    let image = document.querySelector('.img_change')
    image.addEventListener('mouseover',function(){
      image.src = 'cs50_cat.jpg';
    });
    image.addEventListener('mouseout', function(){
      image.src = 'cs50_duck.jpg';
    });
    document.querySelector('.time_format').innerHTML = Date();
});