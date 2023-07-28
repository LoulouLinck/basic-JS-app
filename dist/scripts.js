let pokemonRepository=function(){let e=[];function t(t){"object"==typeof t&&"name"in t?e.push(t):console.log("Pokemon is not correct.")}function n(){return e}document.querySelector("#modal-container");let o=document.querySelector(".search-bar");function i(e){let t=document.querySelector(".pokemon-list"),n=document.createElement("li");n.classList.add("list-group-item"),n.classList.add("list-group-item-action");let o=document.createElement("button");o.innerText+=e.name,o.classList.add("pokeButton"),o.classList.add("btn"),o.classList.add("btn-light"),o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#exampleModal"),n.appendChild(o),t.appendChild(n),o.addEventListener("click",function(){r(e)})}function r(t){pokemonRepository.loadDetails(t).then(function(){(function t(n){let o=document.querySelector(".modal-body"),i=document.querySelector(".modal-title");document.querySelector(".modal-header"),document.querySelector(".modal-footer"),i.innerHTML="",o.innerHTML="",i.innerText=n.id+". "+n.name+"\n";let r=document.createElement("h1");r.textContent=n.name;let l=document.createElement("img");l.className="modal-img",l.style.width="50%",l.src=n.imageUrl;let a=document.createElement("p");a.textContent="Height: "+n.height;let s=document.createElement("p");s.textContent="Types: "+n.types[0],n.types.length>1&&(s.innerText+=", "+n.types[1]),i.appendChild(r),o.appendChild(l),o.appendChild(a),o.appendChild(s);document.querySelector(".previous-button").addEventListener("click",c);function d(){t(e[n.id])}function c(){t(e[n.id-2])}document.querySelector(".next-button").addEventListener("click",d),window.addEventListener("keydown",e=>{"ArrowRight"===e.key&&d()}),window.addEventListener("keydown",e=>{"ArrowLeft"===e.key&&c()})})(t),console.log(t)})}return o.addEventListener("input",t=>{let n=t.target.value.toLowerCase(),o=e.filter(e=>e.name.toLowerCase().includes(n));document.querySelector(".pokemon-list").innerHTML="",o.forEach(e=>{i(e)})}),{getAll:n,add:t,addListItem:i,loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){let n={name:e.name,detailsUrl:e.url};t(n),console.log(n)})}).catch(function(e){console.error(e)})},loadDetails:function e(t){return fetch(t.detailsUrl).then(function(e){return e.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.id=e.id,t.height=e.height/10,t.types=t.types=[];for(let n=0;n<e.types.length;n++)t.types[n]=e.types[n].type.name}).catch(function(e){console.error(e)})},showDetails:r}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});