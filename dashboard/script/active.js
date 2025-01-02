

$(function ( ) {



// active page


$('.side-nav').click((e) => {

let link = $(e.target)
if (link.parent().hasClass('line'))
{
    link = link.parent('li')
    
  let list =  Array.from( $('ul.list1').children());
    list.forEach(val =>{
            $(val).removeClass('active');
        })
   link.addClass('active');
}
})


//suport system
$('.support').click(() => {
  $('.support-system').slideToggle('slow')
})


//hover drop down
// setTimeout(()=>{

// $('.dropdown').hover((e) => {

//   // $(e.target).children('.dropdown-menu').slideToggle('slow')
  
//   $('.dropdown-menu').slideToggle('fast')
// })

// }, 500)


})