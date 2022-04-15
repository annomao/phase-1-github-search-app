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
  ul.innerHTML=""
  let repoUl = document.querySelector("#repos-list")
  repoUl.innerHTML = ""
  users.forEach(user => {
    let li = document.createElement("li")
    let name = document.createElement("h2")
    name.innerText = user.login
    li.appendChild(name)

    let avatar = document.createElement("img")
    avatar.src = user.avatar_url
    li.appendChild(avatar)
    ul.appendChild(li)

    //repos event listener
    li.addEventListener("click",(event)=>{
      let repoUrl = user.repos_url
      fetch(repoUrl,{
        method: "GET",
        headers:{
          Accept: "application/vnd.github.v3+json"
        }
      })
      .then(res => res.json())
      .then(data => {
        displayRepos(data)
      })
    })
  });
}

function displayRepos(repoList){
  let repoUl = document.querySelector("#repos-list")
  repoUl.innerHTML = ""
  let h2 = document.createElement("h2")
  h2.innerText = "Repositories of clicked user"
  repoUl.appendChild(h2)
  repoList.forEach(repo => {
    let repoName = document.createElement("li")
    repoName.innerText = repo.name
    repoUl.appendChild(repoName)
  })
}