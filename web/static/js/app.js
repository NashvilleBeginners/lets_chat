// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

(function() {
  let $stage = document.getElementById('stage');
  if ($stage === null) {
    return;
  }

  const $msgContainer = document.getElementById('msg-container');
  const $input = document.getElementById('input');
  const $send = document.getElementById('send');
  let channel = socket.channel("rooms:lobby", {})

  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })

  $send.addEventListener("click", e => {
    let payload = {body: $input.value};
    channel.push('new_msg', payload)
           .receive('error', e => console.log(e))
    $input.value = ''
  })

  $input.addEventListener('keyup', e => {
    e.preventDefault();
    if (e.keyCode == 13) {
      let payload = {body: $input.value};
      channel.push('new_msg', payload)
            .receive('error', e => console.log(e))
      $input.value = ''
    }
  })

  channel.on("new_message", resp => {
    renderNewMessage($msgContainer, resp)
  })

  let renderNewMessage = function($el, {user, body}) {
    let template = document.createElement("div")
    template.innerHTML = `
               <div>
                  ${user}: ${body}
               </div>
             `
    $el.appendChild(template)
  }

}).call(this);
