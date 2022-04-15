document.addEventListener("DOMContentLoaded", getUser)

function getUser(){
  let form = document.querySelector("#github-form")
  form.addEventListener("submit",(event)=>{
    event.preventDefault()
    let search = form.querySelector("#search").value
    searchUrl = `https://api.github.com/search/users?q=${search}`
    fetch(searchUrl,{
      method: "GET",
      headers:{
        Accept: "application/vnd.github.v3+json"
      }
    })
    .then(res => res.json())
    .then(data => {
      users = data.items
      displayUser(users)
    })
    form.reset()
  })
//username, avatar and a link to their profile.
}
function displayUser(users){
  let ul = document.querySelector("#user-list")
  users.forEach(user => {
    let li = document.createElement("li")
    let name = document.createElement("h2")
    name.innerText = user.login
    li.appendChild(name)

    let avatar = document.createElement("img")
    avatar.src = user.avatar_url
    li.appendChild(avatar)
    ul.appendChild(li)
  });
}