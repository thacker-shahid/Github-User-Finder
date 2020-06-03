let username = document.querySelector("#username");
username.addEventListener('keyup', (e) => {
  let userText = e.target.value;
  console.log(userText);
  if (userText != '') {
    getUser(userText)
      .then(data => {

        if (data.pr.message === 'Not Found') {
          showAlert();
        }
        else {
          showProfile(data.pr);
          showRepos(data.rr);
        }
      });
  }
  else {
    clearProfile();
  }
});


async function getUser(user) {
  let profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=6de6cced65057b1d97ea&client_secret=3de278716b598d6f988324300fe6f2a8150399f4`);
  let repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=10&sort=created: asc&client_id=6de6cced65057b1d97ea&client_secret=3de278716b598d6f988324300fe6f2a8150399f4`);
  let pr = await profileResponse.json();
  let rr = await repoResponse.json();

  return { pr, rr };
}

function showProfile(user) {
  let NoNotes = document.querySelector(".NoNotes");
  NoNotes.style.display = "none";

  let output = document.querySelector("#output");
  output.innerHTML = `
<div class="row">
    <div class="col-lg-3 col-md-3  text-center">
      <img src="${user.avatar_url}" class="img-fluid mb-2" alt="Error404">
      <a href="${user.html_url}" target= "_blank" class="btn m-2 btn-block mb-4" style="color: white; background-color: #FF5C83">View Profile</a>
    </div>

    <div class="col-lg-9 col-md-9 ">
      <span class="badge badge-primary">Public repos:${user.public_repos}</span>
      <span class="badge badge-secondary">Public Gists:${user.public_gists}</span>
      <span class="badge badge-success">Followers:${user.followers}</span>
      <span class="badge badge-danger">Following:${user.following}</span>
      <br><br>
      <ul class="list-group">
        <li class="list-group-item"><strong>Location:</strong>  ${user.location}</li>
        <li class="list-group-item"><strong>Website/Blog:</strong>  ${user.blog}</li>
        <li class="list-group-item"><strong>Member Since:</strong>  ${user.created_at}</li>
        <li class="list-group-item"><strong>Profile Updated at:</strong>  ${user.updated_at}</li>
      </ul>
    </div>
  </div>
</div>
<br>
<div class="card-header mt-3">
       <h4>Public Repositories</h4>
</div>
<div id="repos"></div>
`;
}

function showRepos(user) {
  let Output = '';
  user.forEach(function (i) {
    Output += `
  <ul class="list-group mt-3 mb-2">
    <li class="list-group-item">
      <div class="row">

        <div class="col-4">
          <a href="${i.html_url}" class="text-center mt-3">${i.name}</a>
        </div>

        <div class="col-8">
          <span class="badge badge-success">Stars:${i.stargazers_count}</span>
          <span class="badge badge-secondary">Watchers:${i.watchers_count}</span>
          <span class="badge badge-danger">Forks:${i.forks_count}</span>
        </div>
      </div>
    </li>
  </ul>
</div>`;
  });
  document.getElementById('repos').innerHTML = Output;
}


function showAlert() {
  clearAlert();

  const searchContainer = document.querySelector('.searchContainer');
  let search = document.querySelector(".search");

  const div = document.createElement('div');
  div.className = "container text-center";
  div.innerHTML = `
     <div class="alert alert-danger alert-dismissible fade show" role="alert">
         <strong>User not found!</strong>
     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
     </button>
    </div>`;
  searchContainer.insertBefore(div, search);
  setTimeout(() => {
    clearAlert();
  }, 3000);
}

function clearAlert() {
  const currentAlert = document.querySelector('.alert');
  if (currentAlert) {
    currentAlert.remove();
  }
}

function clearProfile() {
  let output = document.querySelector("#output");
  output.innerHTML = '';
}
