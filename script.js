var searchUsersUri = 'https://api.github.com/users';
var searchUri = 'https://api.github.com/search/users?q=';

var repository_search_url = "https://api.github.com/search/repositories?q=";




var itemList = document.getElementById('items');

var userCount = document.getElementById('user_count');


var search = document.getElementById('search');
var search_btn = document.getElementById('search_btn');

search.addEventListener('keyup', searchGitHub);
search_btn.addEventListener('click', searchGitHubUsers);


//async 
function searchGitHub(event) {

    if (event.keyCode === 13) {

    searchGitHubUsers();

    }
  }

async function searchGitHubUsers(e) {

    var uname = document.getElementById('search').value;
    if (uname == '') uname = 'test';

    let githubResponse = await fetch(searchUri+uname+'&per_page=10');
    let searchUsersData = await githubResponse.json();
    //console.log(searchUsersData);

    let githubResponseRepo = await fetch(repository_search_url+uname);
    let searchRepoData = await githubResponseRepo.json();
    //console.log(searchRepoData);
    
    //var newItem = document.getElementById('item').value;
    var newItem1 = 'Users # '
    var newItem2 = 'Repositories # '


    // Create new li element
    var li = document.createElement('li');
    li.className = 'list-group-item font-weight-bolder text-info';
    li.id = 'repo'
    li.appendChild(document.createTextNode(newItem2 + searchRepoData.total_count));
    itemList.appendChild(li);

    li = document.createElement('li');
    li.className = 'list-group-item font-weight-bolder text-info';
    li.id = 'users'
    li.appendChild(document.createTextNode(newItem1 + searchUsersData.total_count));
    itemList.appendChild(li);


    let repo = document.getElementById('repo');
    let users = document.getElementById('users');
    repo.addEventListener('click', displayRepos);
    users.addEventListener('click', displayUsers);

    function displayUsers() {

        if (searchUsersData.total_count > 0) {
            document.getElementById('userprofile').innerHTML = '';
            document.getElementById('user_count').innerHTML = '<h4>' + searchUsersData.total_count + ' users</h4>';
            searchUsersData.items.forEach(element => {
                console.log(element);

                //userInfo(element.url);
                userInfoCard(element.url);

            });
        }
        

    }

    function displayRepos() {

        if (searchRepoData.total_count > 0) {
            document.getElementById('userprofile').innerHTML = '';
            document.getElementById('user_count').innerHTML = '<h4>' + searchRepoData.total_count + ' repository results</h4>';


            searchRepoData.items.forEach(element => {

                var node = document.createElement("tr");
                var td = document.createElement("td");
        
                node.appendChild(td);
                td.className = "font-weight-bolder text-secondary p-3";
                td.appendChild(document.createTextNode(element.full_name));
                
                if (element.description != null) {
                var td1 = document.createElement("td");
                node.appendChild(td1);
                td1.appendChild(document.createTextNode(element.description));
                }
                
                /*
                var td2 = document.createElement("td");
                node.appendChild(td2);
                td2.appendChild(document.createTextNode(element.email)); */
        
                document.getElementById("userprofile").appendChild(node); 
            });
        }


        
    }

    


    async function userInfoCard(url){
        //console.log('userURL ' + url);
        let userInfoResponse = await fetch(url);
        let userProfile = await userInfoResponse.json();
        console.log(userProfile);

        var divnode = document.createElement("div");
        divnode.className = "card";
        var divnode1 = document.createElement("div");
        divnode1.className = "card-body";
        
        divnode.appendChild(divnode1);

        var img = document.createElement("img");
        img.className = 'nav-img rounded-circle';
        img.src = userProfile.avatar_url;
        divnode1.appendChild(img);

        var a = document.createElement('a');
        a.className = "card-link card-title font-weight-bold m-3";
        if (userProfile.name != null)
        a.appendChild(document.createTextNode(userProfile.name));
        else
        a1.appendChild(document.createTextNode(userProfile.login));
        divnode1.appendChild(a);

        var a1 = document.createElement('a');
        a1.className = "card-link card-title font-weight-bold";
        a1.appendChild(document.createTextNode(userProfile.login));
        divnode1.appendChild(a);

        var button = document.createElement('button');
        button.className = "btn border-0 bg-secondary text-white btn-dark btn-sm ml-5 span-block float-right";
        button.appendChild(document.createTextNode('Follow'));
        divnode1.appendChild(button);


        var p = document.createElement('p');
        p.className = "card-text";
        if (userProfile.bio != null)
        p.appendChild(document.createTextNode(userProfile.bio));
        divnode1.appendChild(p);

        var h6 = document.createElement('h6');
        h6.className = "card-subtitle mb-2 text-muted";
        if (userProfile.location != null)
        h6.appendChild(document.createTextNode(userProfile.location));
        divnode1.appendChild(h6);        


        document.getElementById('userprofile').appendChild(divnode);





/* 

        <div class="card">
        <div class="card-body">
          <a href="#" class="card-link card-title font-weight-bold">user name</a> 
          <a href="#" class="card-link font-weight-bold">login id</a>
          <button class="btn border-0 bg-secondary text-white btn-dark btn-sm ml-5">Follow </button>
          <p class="card-text">description </p>
          <h6 class="card-subtitle mb-2 text-muted">location</h6>
        </div>
      </div> 

 */

    }




/*     let githubResponse = await fetch(searchUsersUri);
    let searchData = await githubResponse.json();
    console.log( searchData ); */

  }











// var form = document.getElementById('addForm');
// var itemList = document.getElementById('items');
// var filter = document.getElementById('filter');


// // Form submit event
// form.addEventListener('submit', addItem);
// // Delete event
// itemList.addEventListener('click', removeItem);
// // Filter event
// filter.addEventListener('keyup', filterItems);
