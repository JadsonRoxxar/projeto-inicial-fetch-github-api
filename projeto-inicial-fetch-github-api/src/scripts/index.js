import { getUser } from "/src/scripts/services/user.js";
import { getRepositories } from "/src/scripts/services/repositories.js";

import { user } from "/src/scripts/objects/user.js"
import { screen } from "/src/scripts/objects/screen.js"


document.getElementById("btn-search").addEventListener("click", () => {
   const userName = document.getElementById("input-search").value;
   if(validateEmptyInput(userName)) return
   getUserProfile(userName);
});


document.getElementById("input-search").addEventListener("keyup", (e) => {
   const userName = e.target.value;
   const key = e.which || e.keyCode;
   const isEnterKEyPressed = key === 13;
   if(validateEmptyInput(userName)) return
   // site que mostra keyCode das teclas
   // https://www.toptal.com/developers/keycode

   if (isEnterKEyPressed) {
      getUserData(userName);
   }
});

function validateEmptyInput(userName){
   if(userName.length === 0){ 
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
   }

};


async function getUserData(userName) {

   const userResponse = await getUser(userName)

   if(userResponse.message = "Not found"){ 
      screen.renderNotFound()
      return
   }
   const repositoriesResponse = await getRepositories(userName)

   user.setInfo(userResponse)
   user.setRepositories(repositoriesResponse)
   console.log(user)

   screen.renderUser(user)

}





