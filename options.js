// Saves options to chrome.storage
function save_options() {
  var authKey = document.getElementById('authKey').value;
  chrome.storage.sync.set({
    authKey: authKey
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    authKey: 'Not yet added',
    
  }, function(items) {
    document.getElementById('authKey').value = items.authKey;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);