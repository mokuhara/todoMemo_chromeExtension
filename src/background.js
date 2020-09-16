// browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log('Hello from the background')
//   console.log(request, sender, sendResponse)
// })

import Repository from "../src/store/repository";

const countTodo = () => {
  let count = 0
  const repository = new Repository("todo");
  const todos = repository.getAll;
  todos.map((todo) => {
    if (!todo || !todo.dateRange || !todo.dateRange.start) return
    if (new Date(todo.dateRange.start) <= new Date()) {
      count++
    }
  });
  chrome.browserAction.setBadgeText({
    "text": String(count)
  })
  chrome.browserAction.setBadgeBackgroundColor({
    "color": "rgb(196, 47, 38)"
  })
}

var result = 0;
var kurikaesi = null;

// function abcd() {
//   result++;
//   chrome.browserAction.setBadgeText({
//     "text": String(result)
//   })
// }

kurikaesi = setInterval(countTodo, 1000);