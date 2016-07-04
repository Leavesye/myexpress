window.onload = function () {
  var show = document.getElementById('show');
  show.addEventListener('click', (event) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/show');
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send('name=11&age=22');
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
      }
    }
  })
}

