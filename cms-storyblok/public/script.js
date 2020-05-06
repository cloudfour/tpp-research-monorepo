var renderBlocks = null
var components = {}

// Get the JSON of "home" from Storyblok
var loadStory = function() {
  // The url path of the browser can define which story/content entry you get form the api
  // In the root path of your website you receive the content entry with the slug "home"
  var path = window.location.pathname == '/' ? 'home' : window.location.pathname

  window.storyblok.get({slug: path, version: 'draft'}, function(data) {
    renderBlocks(data)
  })
}
loadStory()

// Listen to changes of the content
window.storyblok.on('change', function() { loadStory() })
window.storyblok.on('published', function() { loadStory() })

// Simple rendering engine
renderBlocks = function(data) {
  var blok = data.story.content
  var contentDiv = document.querySelector('.content')
  contentDiv.innerHTML = ''
  contentDiv.insertAdjacentHTML('beforeend', components[blok.component](blok))

  // Enter editmode after rendering
  window.storyblok.tryEditmode()
}

components = {
  page(blok) {
    return blok.body.map((column) => { return components[column.component](column) }).join('')
  },
  teaser(blok) {
    return `${blok._editable}
      <div class="teaser">${blok.headline}</div>`
  },
  grid(blok) {
    return `${blok._editable}
      <div class="grid">
        ${blok.columns.map((column) => { return components[column.component](column) }).join('')}
      </div>`
  },
  feature(blok) {
    return `${blok._editable}
      <div class="column feature">
        ${blok.name}
      </div>`
  }
}
