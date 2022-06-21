
class Citizen{
    constructor(first_name, last_name, age, gender, money, health, happiness, popularity, job, stats){
        this.first_name = first_name,
        this.last_name = last_name,
        this.age = age,
        this.gender = gender,
        this.money = money,
        this.health = health,
        this.happiness = happiness,
        this.popularity = popularity,
        this.job = job,
        this.stats = stats
    }
}



//citizen generation
male_first = ["Liam", "Noah", "Oliver", "Elijah", "James", "William", "Benjamin", "Lucas", "Henry", "Theodore"]
female_first = ["Olivia", "Emma", "Charlotte", "Amelia", "Ava", "Sophia", "Isabella", "Mia", "Evelyn", "Harper"]
last = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]
genders = ["male", "female"]
jobs = ["farmer", "lumberjack", "miner"]

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
        citizen_age = Math.floor(Math.random() * 60)
        citizen_money = 1000
        citizen_health = Math.floor(Math.random() * 100)
        citizen_happiness = Math.floor(Math.random() * 100)
        citizen_popularity = Math.floor(Math.random() * 100)
        citizen_job = jobs[Math.floor(Math.random() * jobs.length)]
        citizen_stats = {
            strength: Math.floor(Math.random() * 10),
            charisma: Math.floor(Math.random() * 10),
            perception: Math.floor(Math.random() * 10),
            intelligence: Math.floor(Math.random() * 10),
        }
        generated_result = new Citizen(citizen_first,citizen_last,citizen_age,citizen_gender,citizen_money,citizen_health,citizen_happiness,citizen_popularity, citizen_job, citizen_stats)
        population.push(generated_result)
    }
}





//intitial rendering
function launch(){
    generate(10)
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

function events(num){
    events_text = ""
    for (let i=0; i< num; i++){
        selected = population[Math.floor(Math.random() * population.length)]
        if (selected.job == "lumberjack"){
            events_text += selected.first_name +" "+selected.last_name+" chopped some logs.<br>"
        } 
    }
    document.getElementById("events").innerHTML=events_text;
}

function year(){
    //simulation of full year
    events(10)
    //age up
    for (let i = 0; i < population.length; i++){
        population[i].age += 1
    }
    render() //call render at end to show new results
}

//default options
document.getElementById("A").onclick = function() {year()};

window.onload = launch();