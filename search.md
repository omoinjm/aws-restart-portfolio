---
layout: default
title: Home
---

## 🔍 Search the Wiki

<input type="text" id="search-input" placeholder="Type to search labs, projects..." style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc;">
<ul id="results-container" style="list-style: none; padding-left: 0;"></ul>

<script src="https://unpkg.com/simple-jekyll-search@latest/dest/simple-jekyll-search.min.js"></script>

<script>
window.simpleJekyllSearch = new SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '{{ "/search.json" | relative_url }}',
  searchResultTemplate: '<li><a href="{url}">📄 {title}</a></li>',
  noResultsText: 'No results found',
  limit: 10,
  fuzzy: false
})
</script>
