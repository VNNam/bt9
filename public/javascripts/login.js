let user = document.cookie
  .split(';')
  .some((val) => val.trim().startsWith('user'));
let usrElem = document.getElementById('authenticated');
function loginElem() {
  usrElem.innerHTML = '';
  const linkElem = document.createElement('a');
  const href = document.createAttribute('href');
  href.value = '/users/login';
  linkElem.setAttributeNode(href);
  linkElem.appendChild(document.createTextNode('Login'));
  usrElem.appendChild(linkElem);
}

function logoutElem() {
  const btnLogout = document.createElement('button');
  btnLogout.appendChild(document.createTextNode('Logout'));
  btnLogout.addEventListener('click', () => {
    document.cookie = 'user=;max-age=0';
    document.cookie = 'token=;max-age=0';
    location.href = '/';
    usrElem.innerHTML = '';
    loginElem();
  });
  usrElem.appendChild(btnLogout);
}
if (user) {
  logoutElem();
} else {
  loginElem();
}
