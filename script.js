
//variables to html
const parent = document.querySelector('#parent')
const imageDiv = document.querySelector("#currentImg")
const teamNameID = document.querySelector("#teamName")
const battingID = document.querySelector("#batting")
const pitchingID = document.querySelector("#pitching")

//array of names of teams
const shortNames = ['poop', 'bal', 'bos', 'laa', 'chw', 'cle', 'det', 'kc', 'mil', 'min', 'nyy', 'oak', 'sea', 'tex', 'tor', 
                    'atl', 'chc', 'cin', 'hou', 'lad', 'wsh', 'nym', 'phi', 'pit', 'stl', 'sd', 'sf', 'col', 'mia', 'ari', 'tb']

//loop to create the divs and the images as a child of the div
for (let i = 1; i <= 30; i++) {
    const newDiv = document.createElement('div')
    const newButt = document.createElement('img')
    newDiv.id = 'team'+i
    newDiv.className = 'teamdiv'
    newButt.setAttribute("src", `https://a.espncdn.com/i/teamlogos/mlb/500/${shortNames[i]}.png`)
    newButt.id = i
    newButt.className = 'teambutt'
    parent.appendChild(newDiv)
    let parentDiv = document.querySelector(`#team${i}`)
    parentDiv.appendChild(newButt)   
}

//array of img of teams
let teamDivArray = document.querySelectorAll('.teambutt')

//event listener for each team

$(document).ready(function(){
    //team info
    $(".teambutt").click(async (evt) =>{
        let clicked = evt.target
        let currentID = clicked.id
        let mlbApi = `http://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/seasons/2023/teams/${currentID}?lang=en&region=us`
        let response = await axios.get(mlbApi)

        //variables to collect response data
        const logoPNG = response.data.logos[2].href
        const teamName = response.data.displayName
        let teamColor = response.data.color
        teamColor = '#' + teamColor
        console.log(teamColor)

        //sending info to html
        parent.style.display = "none"
        imageDiv.innerHTML = `<img src=${logoPNG}>`
        teamNameID.innerText = teamName
        //change something to team color

    }); 
    //team stats
    $(".teambutt").click(async (evt) =>{
        let clicked = evt.target
        let currentID = clicked.id
        let mlbStats = `http://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/seasons/2023/types/2/teams/${currentID}/statistics?lang=en&region=us`
        let response = await axios.get(mlbStats)
    
        //variables to collect response data
        const batting  = response.data.splits.categories[0].summary
        const pitching = response.data.splits.categories[1].summary

        //sending info to html
        battingID.innerText = batting
        pitchingID.innerText = pitching

    }); 
});

    //pick a new team
    $("#reset").click( (evt) =>{
        parent.style.display = "grid"
        imageDiv.innerHTML = ``
        teamNameID.innerText = ""
        battingID.innerText = ""
        pitchingID.innerText = ""
    });    