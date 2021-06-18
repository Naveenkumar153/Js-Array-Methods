const main              = document.getElementById('main');
const add_user          = document.getElementById('add-user');
const double            = document.getElementById('double');
const show_millionaires = document.getElementById('show-millionaires');
const sort              = document.getElementById('sort');
const calculate_wealth  = document.getElementById('calculate-wealth');

let data = [];

// generate the random user
getRandomUsers();
getRandomUsers();
getRandomUsers();

async function getRandomUsers(){
    const userapi = await fetch('https://randomuser.me/api')
    const datas   = await userapi.json();
    const user    = datas.results[0];

    // information required
    const newUsers = {
        name : `${user.name.title} ${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 100000),
    }

     addData(newUsers);
}

// sort to the millionres
function sortMillionaires(){
    data = data.sort( (a,b) => b.money - a.money)
    upDateDom()
};

// show millionaires
function showMillionaires(){
   data = data.filter((item) => {
        return item.money > 1000000
    });
    upDateDom();
}

// calculate the total wealth

function calculateWealth(){
    const totalWeatlh = data.reduce((prevValue,CurtValue) => prevValue += CurtValue.money,0);
    
    const element = document.createElement('div');
    element.innerHTML = `<h3>Total Wealth: ${formatMoney(totalWeatlh)}</h3>`;
    main.appendChild(element);
    return totalWeatlh
}


// double the money
function doubleTheMoney(){
    data = data.map(double => {
        return {...double,money:double.money * 2}
    });
    upDateDom();
}

// push the newUsers in data container 
function addData(obj){
    data.push(obj)
    upDateDom();
}



// add the users in dom thourgh forEach Method
function upDateDom(provideData = data){
    // clear main
    main.innerHTML = '<h2><strong>Person</strong> Wealth </h2>'

    provideData.forEach((person,idx)=>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${idx}. ${person.name}</strong> ${formatMoney(person.money)}`;
        main.appendChild(element)
    });
}

// format number to currency
function formatMoney(number){
   return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
// add users
add_user.addEventListener('click',getRandomUsers);
double.addEventListener('click',doubleTheMoney);
sort.addEventListener('click',sortMillionaires);
show_millionaires.addEventListener('click',showMillionaires);  
calculate_wealth.addEventListener('click',calculateWealth);  

