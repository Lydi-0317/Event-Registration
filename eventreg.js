const form = document.getElementById('registrationForm');
const registrationTable = document.getElementById('registrationTable'); // Update element ID

let registrations = {}; // Object to store registrations by event

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const eventName = document.getElementById('eventName').value.trim(); // Trim leading/trailing spaces
  const userName = document.getElementById('userName').value.trim();

  if (!eventName || !userName) {
    alert('Please enter both event name and user name!');
    return;
  }

  if (!registrations[eventName]) {
    registrations[eventName] = []; // Create a new array for the event if it doesn't exist
  }
  registrations[eventName].push(userName); // Add user name to the event's registration list

  // Update the displayed registration list
  updateRegistrationList();

  alert(`User ${userName} has been registered for ${eventName} event!`);

  // Clear the form after successful registration
  form.reset();
});

function updateRegistrationList() {
  registrationTable.innerHTML = ""; 

  // Create a table element
  const table = document.createElement('table');
  table.classList.add('registration-table'); 

  // Create table header row
  const headerRow = document.createElement('tr');

  // Add event names as table headers (TH elements)
  for (const event in registrations) {
    const tableHeader = document.createElement('th');
    tableHeader.textContent = event;
    headerRow.appendChild(tableHeader);
  }

  // Add the header row to the table
  table.appendChild(headerRow);

  // Find the maximum number of users across all events
  let maxUsers = 0;
  for (const event in registrations) {
    maxUsers = Math.max(maxUsers, registrations[event].length);
  }

  // Loop through registered events
  for (let i = 0; i < maxUsers; i++) {
    const userRow = document.createElement('tr');

    // Loop through events again
    for (const event in registrations) {
      const userData = document.createElement('td');
      userData.classList.add('user-data'); 

      // Create an unordered list if the user is registered for the event
      if (registrations[event][i]) {
        const userList = document.createElement('ul');
        userList.classList.add('registrationList'); 

        const userItem = document.createElement('li');
        userItem.textContent = registrations[event][i];
        userList.appendChild(userItem);

        userData.appendChild(userList); // Add unordered list to table cell
      }

      userRow.appendChild(userData); // Append table cell to user row
    }
    // Add a spacer row 
    if (i < maxUsers - 1) {
      const spacerRow = document.createElement('tr');
      spacerRow.classList.add('spacer-row'); 
      table.appendChild(spacerRow);
    }
    // Add the user row to the table body
    table.appendChild(userRow);
  }

  // Append the entire table to the registration element
  registrationTable.appendChild(table);
}
