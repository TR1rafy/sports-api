
const searchAllData = () =>{
    const importElement =document.getElementById('search-value');
    document.getElementById('single-player-details').innerHTML = "";
    document.getElementById("male").classList.add("d-none");
    document.getElementById("female").classList.add("d-none");
    const importValue = importElement.value;
    const url =` https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${importValue}`;
    // console.log(url)
   
     fetch(url)
    .then(res => res.json())
    .then(data => showPlayerData(data.player))
}


const showPlayerData =(players) =>{
  document.getElementById('search-value').value="";
    const container =document.getElementById('player-info');
    container.innerHTML="";
    
    players.forEach((player) =>{
     
       const {strThumb, strPlayer, strNationality, idPlayer }= player

       const div =document.createElement('div');
      
       div.classList.add('col');
       div.innerHTML =`
       
       <div class="card">
       <img src="${strThumb }"" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title"> ${strPlayer}</h5>
         <p class="card-text"> ${strNationality
         }</p>
       </div>
       <div class ="my-5 mx-3">
       <button onclick ="singlePlayer(${idPlayer})" type="button" class="btn btn-danger">details</button>
          <button  type="button" class="btn btn-primary">Light</button>
       </div>
     </div>
       
       
       
       `;
       container.appendChild(div);
    })
   
   
}
const singlePlayer = (id) =>{

  
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}

`
fetch(url)
.then(res => res.json())
.then( data => showSinglePlayerData (data.players[0]))

  

};

const showSinglePlayerData = (data) =>{
  console.log(data)
  const {strThumb, strPlayer, strDescriptionEN , strGender } = data;
  
  const container = document.getElementById('single-player-details');
  container.innerHTML=  "";
  const div = document.createElement('div');
  if(strGender === "Male"){
      const element = document.getElementById("male");

      element.classList.remove("d-none");
  }
  else{
    const element = document.getElementById("female");

    element.classList.remove("d-none");

  }
  div.innerHTML =`
  <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${strThumb}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${strPlayer}</h5>
        <p class="card-text">${strDescriptionEN.slice(0,100)+ "... "}</p>
        
      </div>
    </div>
  </div>
</div>
  
  `;
  container.appendChild(div);
}