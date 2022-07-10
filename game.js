
class Citizen{
    constructor(id, first_name, last_name, gender, race, religion, health, happiness, xp, xpmax, level, equipment, age, alignment, money, inventory, occupation){
        this.id = id,
        this.first_name = first_name,
        this.last_name = last_name,
        this.gender = gender,
        this.race = race,
        this.religion = religion, 
        this.health = health,
        this.happiness = happiness,
        this.xp = xp,
        this.xpmax = xpmax,
        this.level = level,
        this.equipment = equipment,
        this.age = age,
        this.alignment = alignment,
        this.money = money,
        this.inventory = inventory,
        this.occupation = occupation
    }
}

let id = 0

//citizen generation
male_first = ["Liam", "Noah", "Oliver", "Elijah", "James", "William", "Benjamin", "Lucas", "Henry", "Theodore"]
female_first = ["Olivia", "Emma", "Charlotte", "Amelia", "Ava", "Sophia", "Isabella", "Mia", "Evelyn", "Harper"]
last = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]
genders = ["male", "female"]
races = ["caucasian", "african", "asian"]
religion = ["Christian", "Jew", "Muslim"]
occupations = ["miner", "lumberjack","construction worker","banker", "researcher", "doctor", "merchant","weaver","tavern keeper","farmer","potter","police", "executioner", "priest", "soldier", "cook", "hunter","blacksmith"] //not including royal cabinent or childhood stuff

population = []

function generate(number){
    for (let i = 0; i < number; i++){
        citizen_gender = genders[Math.floor(Math.random() * genders.length)]
        if (citizen_gender == "male"){
            citizen_first = male_first[Math.floor(Math.random() * male_first.length)]
        } else {
            citizen_first = female_first[Math.floor(Math.random() * female_first.length)]
        } 
        citizen_last = last[Math.floor(Math.random() * last.length)]
        citizen_race = races[Math.floor(Math.random() * races.length)]
        citizen_religion = religion[Math.floor(Math.random() * religion.length)]
        citizen_age = Math.floor(Math.random() * 65)
        citizen_health = 100 - citizen_age
        citizen_happiness = 50
        citizen_xp = 0
        citizen_xpmax = 100 
        citizen_level = 1
        citizen_equipment = {clothing: "", weapon: ""} 
        citizen_alignment = Math.floor(Math.random() * 10)
        citizen_money = 1000
        citizen_inventory = []
        
        if (citizen_age <= 5){
            citizen_occupation = "child"
        } else if (citizen_age <= 12){
            citizen_occupation = "student"
        } else {
            citizen_occupation = occupations[Math.floor(Math.random() * occupations.length)]
        }

        generated_result = new Citizen(id, citizen_first,citizen_last,citizen_gender,citizen_race,citizen_religion,citizen_health,citizen_happiness,citizen_xp,citizen_xpmax,citizen_level,citizen_equipment,citizen_age,citizen_alignment,citizen_money,citizen_inventory,citizen_occupation) //fill out
        id += 1
        population.push(generated_result)
    }
}





//intitial rendering
function launch(){
    //create initial pop
    generate(10)
    //decide starting cabinet
    population_text = ""
    for (let i = 0; i < population.length; i++){
        population_text += population[i].first_name + " "+population[i].last_name+", a "+population[i].age+" year old "+population[i].job+"<br>";
    }
    document.getElementById("population").innerHTML=population_text;
}

//continual rendering
function render(){
    population_text = ""
    for (let i = 0; i < population.length; i++){
        population_text += population[i].first_name + " "+population[i].last_name+", a "+population[i].age+" year old "+population[i].job+"<br>";
    }
    document.getElementById("population").innerHTML=population_text;
}

//events that run during the year check, NEEDS TO BE REVAMPED
function events(num){
    events_text = ""
    //birth
    //migration
    //fire
    //famine
    //plague
    //viking raid
    //war
    //holy war
    //rebellion
    //inquisition
    //genocide
    //random illness -- minor, major, severe
    //new research discovered
    //suicide if low happiness
    //occupation based tasks
    //crimes -- murder, mugging, assault, theft

    for (let i=0; i< num; i++){
        roll = Math.floor(Math.random() * 2)
        if (roll == 0){
            selected = population[Math.floor(Math.random() * population.length)]
            if (selected.job == "lumberjack"){
                logs_cut = 1 * selected.stats["strength"]
                selected.resources["logs"] += logs_cut
                events_text += selected.first_name +" "+selected.last_name+" chopped "+logs_cut+" logs.<br>"
        } 
        } else if (roll == 1){
            selected = population[Math.floor(Math.random() * population.length)]
            if (selected.job == "furnisher"){
                if (selected.resources["logs"] == 0){
                    selected2 = population[Math.floor(Math.random() * population.length)]
                    if (selected2.resources["logs"] > 0){
                        selected.money -= 10 // note, need money check in more advanced version -- also non-fixed price
                        selected.resources["logs"] += 1
                        selected2.resources["logs"] -= 1
                        events_text += selected.first_name+" "+selected.last_name+" traded money for logs with "+selected2.first_name+" "+selected2.last_name+"<br>"
                    }
                }
        }
    }
    document.getElementById("events").innerHTML=events_text;
}
}

function year(){
    //simulation of full year
    events(10)
    //age up
    for (let i = 0; i < population.length; i++){
        population[i].age += 1
    }
    //refill government
    //reduce health via aging
    //level ups
    //buy food or reduce health via starving
    //merchants change price
    //lower health due to no home
    //death check
    //check national religion and race
    render() //call render at end to show new results
}

//default options
document.getElementById("A").onclick = function() {year()};

window.onload = launch();

//buuldings
//house
//gallows
//pillory
//jail
//church
//primary school
//university
//apothecary
//hospital
//castle -- moat, underground passage, walls, mounted cannon


//items
//leather armor
//chainmail armor
//plate armor

//research
// army: archers -> crossbowmen -> cannoneers
// pikemen -> swordsmen -> knights
// cannon -> mortar -> artillery
// navy: caravan -> frigate -> battleship

//country -- king, queen, religion, nationality, resources, army, navy, population