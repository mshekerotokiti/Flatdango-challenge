
//assign a variable to the url
let url = 'http://localhost:3000/films/'

   

//assign variables to the DOM using query selectors and IDs
let poster = document.getElementById('poster')   
let film = document.getElementById('films')    
let title = document.getElementById('title')    
let button = document.getElementById('buy-ticket')
let showtime = document.getElementById('showtime')    
let filmItem = document.querySelector('.film-item')    
let tickets = document.getElementById('ticket-num') 
let runtime = document.getElementById('runtime')    
let buttonDiv = document.querySelector('.extra-content')  
let filmInfo = document.getElementById('film-info') 

//fetch the first movie for display
function fetchfirstMovie(){     
   fetch(url + 1)
     .then(res => res.json())
     .then(data =>  displayMovies(data))
     fetchMovies()
     }

     //display the movie details
function displayMovies(movie) {
   
  poster.src = movie.poster            
  title.innerHTML = movie.title         
  runtime.innerHTML = movie.runtime         
  filmInfo.innerHTML = movie.description    
  showtime.innerHTML = movie.showtime         
  tickets.innerText = movie.capacity - movie.tickets_sold     

}
//fetch movie data and returning the response
function fetchMovies() {                 
    fetch(url)
    .then((res) => res.json())            
    .then((data) => renderMovies(data))   
}

 //assign our fetched data to a new function which will render the data
function renderMovies(movie) {   
     movie.forEach((movie) => {              
      const li = document.createElement('li')

       film.appendChild(li)        

      li.className = "film-item"  

       li.innerHTML = movie.title  

       filmItem.innerText = ""    

       film.style.cursor = 'pointer'              
     
       //add event listener to the buy ticket button
       li.addEventListener('click', () => {            
        button.innerText = "Buy Ticket";       //button text to display buy ticket

        button.className = "ui purple button";      //changes color when button is clicked

            displayMovies(movie)                      
          })
    })
}

   //add a click event listener to the button to prevent default
       button.addEventListener("click", (e) => {     
        e.preventDefault();   

     //gets the number of tickets left after purchase                                   
        let ticketsRem = document.getElementById('ticket-num').innerText   

          //change the button text to "Sold Out" if tickets are zero
        if(parseInt(ticketsRem, 10) === 0){          
          button.innerText = "Sold Out"; 

           //add a class name to the button of 'sold-out'       
          button.className = 'sold-out'             
             
        }
        else{
          (ticketsRem > 0) ? document.getElementById('ticket-num').innerText -= 1 : 0 
        }
      }

       )

//loading the html before loading the javascript code
document.addEventListener('DOMContentLoad' , fetchfirstMovie())