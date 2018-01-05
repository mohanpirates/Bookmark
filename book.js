

var form = document.getElementById('myForm');

var emptyname = "<p>please enter website name</p>";

var emptyurl = "<p>please enter website url</p>";

var urlerror = "<p>invalid url</p>";



var error = "";

form.addEventListener('submit',saveBookmark);


function saveBookmark(e){
e.preventDefault();

var sitename = document.getElementById('siteName').value;

var siteURL = document.getElementById('siteURL').value;

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

var regex = new RegExp(expression);

// make bookmark object

var bookobj = {
  name: sitename,
  url: siteURL
}


//check if the input field is empty

if(sitename==""){

  error += emptyname;


}

if(siteURL == ""){
  error += emptyurl;
}else{
  if(!siteURL.match(regex)){

    error += urlerror;

  }
}




//check if there is any error!

if(error){

var errmsg = document.getElementById('err');

  errmsg.style.display = "block";
  errmsg.innerHTML =  error;

}else{

//if localStorage is empty then we insert data to localStorage

  if(localStorage.getItem('bookmarks')==null){


      console.log(localStorage.getItem('bookmarks'));

       var arr = [];

       arr.push(bookobj);



    localStorage.setItem('bookmarks',JSON.stringify(arr));

     fetchbookmarks();

  }else{

      //get data from local localStorage if it is not empty



      var arr = JSON.parse(localStorage.getItem('bookmarks'));



      arr.push(bookobj);

        localStorage.setItem('bookmarks',JSON.stringify(arr));

          fetchbookmarks();

  }

}
}

//fetch bookmarks

function fetchbookmarks(){

var arr = JSON.parse(localStorage.getItem('bookmarks'));

var showbookmarks = document.getElementById('showbookmarks');

showbookmarks.innerHTML = "";

for(var i=0;i<arr.length;i++){


      var name = arr[i].name;

      var url = arr[i].url;

        showbookmarks.innerHTML += "<div>"+"<h3>"+name+"<a class='btn btn-primary d-inline ml-3' target='_blank' href='"+url+"'>Visit</a><a href='#' class='btn btn-danger btn-sm ml-3' onclick='deleteBookmark(\""+url+"\")'>Delete</a></h3>"+"</div>";

}


}

function deleteBookmark(url){

   var arr = JSON.parse(localStorage.getItem('bookmarks'));

   for(var i=0;i<arr.length;i++){

        if(arr[i].url==url){

              arr.splice(i,1);

        }
   }

   localStorage.setItem('bookmarks',JSON.stringify(arr));

   fetchbookmarks();

}
