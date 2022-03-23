// javascript for index.html

const container = document.querySelector('.blogs')
const searchForm = document.querySelector('.search')

const renderPosts = async (term) => {
  let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc'

  if(term){
    uri += `&q=${term}`
  }

  // get data form json and put to posts
  const res = await fetch(uri)
  const posts = await res.json()

  let template = ''
  posts.forEach(post => {
    template += `
      <div class="post">
        <h2>${post.title}</h2>
        <p><small>${post.likes} likes </small></p>
        <p>${post.body.slice(0, 100)}</p>
        <a href="/details.html?id=${post.id}">read more...</a>
      </div>
    `
  });
  container.innerHTML = template
}

searchForm.addEventListener('input', (e) => {
  e.preventDefault()
  renderPosts(searchForm.term.value.trim())
})

window.addEventListener('DOMContentLoaded', (e) => renderPosts())