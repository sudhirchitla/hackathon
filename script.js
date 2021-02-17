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
    var newItem2 = 'Repos # '

    // Create new li element
    var li = document.createElement('li');
    li.className = 'list-group-item';

    li.appendChild(document.createTextNode(newItem1 + searchUsersData.total_count));
    
    // Append li to list
    itemList.appendChild(li);

    li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem2 + searchRepoData.total_count));
    itemList.appendChild(li);


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
