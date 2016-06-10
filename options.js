// Saves options to chrome.storage
function save_options() {
  var authKey = document.getElementById('authKey').value;
  chrome.storage.sync.set({
    authKey: authKey
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.className = "alert alert-success";
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
      status.className = '';
    }, 1750);
  });
}

// Restores text box state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value 'Not yet added'
  chrome.storage.sync.get({
    authKey: 'Not yet added',
    
  }, function(items) {
    document.getElementById('authKey').value = items.authKey;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);