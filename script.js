// Fetch user data from the API
async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  return users;
}

// Display users in the list
function displayUsers(users) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = ''; // Clear existing list
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `
          <strong>Name:</strong> ${user.name}<br>
          <strong>Username:</strong> ${user.username}<br>
          <strong>Email:</strong> ${user.email}<br>
          <strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}<br>
          <strong>Phone:</strong> ${user.phone}<br>
          <strong>Website:</strong> ${user.website}<br>
          <strong>Company:</strong> ${user.company.name}
      `;
    userList.appendChild(li);
  });
}

// Sort users by a specific key
function sortUsers(users, key) {
  return users.sort((a, b) => a[key].localeCompare(b[key]));
}

// Filter users based on search input
function filterUsers(users, searchTerm) {
  return users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Initialize the application
async function init() {
  let users = await fetchUsers();
  displayUsers(users);

  // Add event listener for search
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', () => {
    const filteredUsers = filterUsers(users, searchInput.value);
    displayUsers(filteredUsers);
  });

  // Add event listener for sorting
  const sortSelect = document.getElementById('sort');
  sortSelect.addEventListener('change', () => {
    const sortedUsers = sortUsers(users, sortSelect.value);
    displayUsers(sortedUsers);
  });
}

// Call the init function when the page loads
window.onload = init;
