

(function ($) {
    "use strict";

    // Loader
    $(function () {
        var loader = function () {
            setTimeout(function () {
                if ($('#loader').length > 0) {
                    $('#loader').removeClass('show');
                }
            }, 1);
        };
        loader();
    });

    // Auto Init 
    M.AutoInit();

})(jQuery);

function register()
{
    var data={
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        password:document.getElementById('password').value
    }
    var xh = new XMLHttpRequest();
    xh.open("POST", "https://api-linking.herokuapp.com/users", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.send(JSON.stringify(data))
    xh.onload=function(){
        if(this.status==201)
        {
            alert('registered successfully! Login to continue')
            window.location.replace('signin.html')
        }
        else{
            alert('Failed! Try again')
            window.location.replace('signup.html')
        }
}
}

function login()
{
    var data=
    {
	"email":document.getElementById('email').value,
	"password":document.getElementById('password').value
    }
    var xh = new XMLHttpRequest();
    xh.open("POST", "https://api-linking.herokuapp.com/users/login", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.send(JSON.stringify(data))
    xh.onload=function(){
        if(this.status==200)
        {
            var data = JSON.parse(this.responseText)
            localStorage.setItem("JWT_Token", "JWT " + data.token)
            window.location.replace('index.html')
        }
        else{
            alert('Invalid login credentials')
            window.location.replace('signin.html')
        }
}
}

function getall()
{
    var jwt = localStorage.getItem('JWT_Token')
    console.log(jwt)
    var xh = new XMLHttpRequest();
    xh.open("GET", "https://api-linking.herokuapp.com/all/items", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt)
    xh.send()
    xh.onload=function(){
        if(this.status==200)
        {
            var data = JSON.parse(this.responseText)

            for(var i=0;i<data.payload.length;i++)
            {
                $('#allItems').append(`<li><span id="item">${data.payload[i].name}</span>&nbsp;&nbsp;&nbsp;&nbsp;<button class="waves-effect btn red" type="submit" id="delete${data.payload[i]._id}" name="${data.payload[i]._id}" onclick="deleteitem(this.name)">Remove</button></li>`)
            }
        }
        else if(this.status==400){
            alert('Error in getting items')
        }
        else if(this.status==401){
            alert('Please authenticate user')
        }
}
}

function newItem()
{
    var data={
        name:document.getElementById('name').value,
        description:document.getElementById('desc').value,
        qty:document.getElementById('qty').value
    }
    console.log(data)
    var jwt = localStorage.getItem('JWT_Token')
    var xh = new XMLHttpRequest();
    xh.open("POST", "https://api-linking.herokuapp.com/add/item", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt)
    xh.send(JSON.stringify(data))
    xh.onload=function(){
        if(this.status==201)
        {
            alert('Item added!')
            window.location.replace('index.html')
        }
        else{
            alert('Failed! Try again')
            window.location.replace('index.html')
        }
}
}

function deleteitem(id)
{
    var jwt = localStorage.getItem('JWT_Token')
    var xh = new XMLHttpRequest();
    xh.open("DELETE", `https://api-linking.herokuapp.com/delete/item/${id}`, true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt)
    xh.send()
    xh.onload=function(){
        if(this.status==200)
        {
            alert('Item deleted!')
            window.location.replace('index.html')
        }
        else{
            alert('Failed! Try again')
            window.location.replace('index.html')
        }
}
}
