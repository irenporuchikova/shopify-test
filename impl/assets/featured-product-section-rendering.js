function handleResponse() {
  JSON.parse(this.responseText);
}

const request = new XMLHttpRequest();

request.addEventListener('load', handleResponse);
request.open('GET', '/?section_id=featured-section', true);
request.send();