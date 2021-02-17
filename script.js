var searchUsersUri = 'https://api.github.com/users';
var searchUri = 'https://api.github.com/search/users?q=';

var repository_search_url = "https://api.github.com/search/repositories?q=";


var itemList = document.getElementById('items');


var search = document.getElementById('search');
var search_btn = document.getElementById('search_btn');

search.addEventListener('keyup', searchGitHub);
search_btn.addEventListener('click', searchGitHubUsers);


async function searchGitHub(event) {
    var uname = document.getElementById('search').value;
    if (event.keyCode === 13) {
    let githubResponse = await fetch(searchUri+uname);
    let searchUsersData = await githubResponse.json();
    console.log( searchUsersData );
    }
  }

async function searchGitHubUsers(e) {
    var uname = document.getElementById('search').value;
    let githubResponse = await fetch(searchUri+uname);
    let searchUsersData = await githubResponse.json();
    console.log(searchUsersData);

    let githubResponseRepo = await fetch(repository_search_url+uname);
    let searchRepoData = await githubResponseRepo.json();
    console.log(searchRepoData);
    

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
            document.getElementById('content').innerHTML = '';
            searchUsersData.items.forEach(element => {
                console.log(element);
                var node = document.createElement("tr");
                var td = document.createElement("td");
        
                node.appendChild(td);
                td.className = "font-weight-bolder text-secondary p-3";
                var img = document.createElement("img");
                img.className = 'nav-img rounded';
                img.src = element.avatar_url;
                //td.appendChild(document.createTextNode(element.avatar_url));
                td.appendChild(img);
        
                var td1 = document.createElement("td");
                td1.className = "font-weight-bolder text-secondary";
                node.appendChild(td1);
                td1.appendChild(document.createTextNode(element.login));
                
                /*
                var td2 = document.createElement("td");
                node.appendChild(td2);
                td2.appendChild(document.createTextNode(element.email)); */
        
                document.getElementById("content").appendChild(node);                 
            });
        }
        

    }

    function displayRepos() {

        if (searchRepoData.total_count > 0) {
            document.getElementById('content').innerHTML = '';
            searchRepoData.items.forEach(element => {

                var node = document.createElement("tr");
                var td = document.createElement("td");
        
                node.appendChild(td);
                td.className = "font-weight-bolder text-secondary p-3";
                td.appendChild(document.createTextNode(element.full_name));
        
                var td1 = document.createElement("td");
                node.appendChild(td1);
                td1.appendChild(document.createTextNode(element.description));
                
                /*
                var td2 = document.createElement("td");
                node.appendChild(td2);
                td2.appendChild(document.createTextNode(element.email)); */
        
                document.getElementById("content").appendChild(node); 
            });
        }


        
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
