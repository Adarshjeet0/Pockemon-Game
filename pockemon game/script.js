const fightbtn = document.getElementById("fight");
const p1Name = document.getElementById("p1_name");
const p1Score = document.getElementById("p1_score");
const p2Name = document.getElementById("p2_name");
const p2Score = document.getElementById("p2_score");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
let score1 = 0;
let score2 = 0;
//set name of players 
fightbtn.addEventListener('click', async ()=>{
    p1Name.textContent = "John";
    p2Name.textContent = "Smith";
    let obj1 = await getdetail();
    // console.log(obj1);
    let obj2 = await getdetail();
    // console.log(obj2);
    display(obj1, obj2, score1, score2);
    // display2(Obj2);
});

async function getdetail(){
    try {
        let rand = Math.floor(Math.random()*1025 + 1);
        let request = await fetch(`https://pokeapi.co/api/v2/pokemon/${rand}/`);
        let data = await request.json();
        console.log(data);

        const imgSrc = data.sprites.front_shiny;
        const experience = data.base_experience;
        const creatureName = data.name;
        const abilityArr = data.abilities;
        const abilityName = abilityArr.map(element => element.ability.name);

        console.log(abilityName);
        console.log(creatureName);
        console.log(experience);
        console.log(imgSrc);

        return {abilityName, creatureName, experience, imgSrc};
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function display(obj1, obj2){
    console.log(obj1);
    console.log(obj2);
    const cardImg1 = card1.querySelector("#img");
    const cardImg2 = card2.querySelector("#img");
    cardImg1.innerHTML = "";
    cardImg2.innerHTML = "";

    const { abilityName: abilityName1, creatureName: creatureName1, experience: experience1, imgSrc: imgSrc1 } = obj1;
    const { abilityName: abilityName2, creatureName: creatureName2, experience: experience2, imgSrc: imgSrc2 } = obj2;

    card1.querySelector("#name").textContent = creatureName1;
    card2.querySelector("#name").textContent = creatureName2;

    card1.querySelector("#experience").textContent = experience1;
    card2.querySelector("#experience").textContent = experience2;

    const listEl1 = card1.querySelector("#abilities");
    listEl1.innerHTML = "";
    abilityName1.forEach((event)=>{
        let liEl1 = document.createElement("li");
        liEl1.textContent = event;
        listEl1.appendChild(liEl1);
    });

    const listEl2 = card2.querySelector("#abilities");
    listEl2.innerHTML = "";
    abilityName2.forEach((event)=>{
        let liEl2 = document.createElement("li");
        liEl2.textContent = event;
        listEl2.appendChild(liEl2);
    });
    if(experience1 > experience2){
        score1++;
    }else{
        score2++;
    }
    p1Score.textContent = `Score: ${score1}`;
    p2Score.textContent = `Score: ${score2}`;
    let imgEl1 = document.createElement("img"); 
    let imgEl2 = document.createElement("img"); 
    imgEl1.src = imgSrc1; 
    imgEl2.src = imgSrc2; 
    cardImg1.appendChild(imgEl1);
    cardImg2.appendChild(imgEl2);


}

// getdetail().then(data => console.log(data));

console.log(getdetail().then((event) =>{
    console.log(event);
}));