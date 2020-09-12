console.log("Hello welcome to BHK!");


const loading = document.querySelector("img");
const center = document.querySelector(".center")
const form = document.querySelector("form");
const select_location =  document.querySelector("#idLocation");
const select_bath = document.querySelector("#idBath");
const select_bhk = document.querySelector("#idBhk");
const get_loction_button = document.getElementById("#get_button")

const API_URL = "http://127.0.0.1:5000/get_all_data";
const API_URL_POST ="http://127.0.0.1:5000/predict_house_price"


retriveAllData();



form.addEventListener('submit',(event) => {
    event.preventDefault();
    console.log('Submit pressed!');
    
    // create form request
    const house_details = createFormRequest();
    //console.log(house_details);

    // function for validate the form result

    // function to send data 
    sendRequest(house_details);
}); 


function createFormRequest(){
    const formData = new FormData(form);
    const locaiton = formData.get("location");
    const total_sqft = formData.get("total_sqft");
    const bath = formData.get("bath");
    const bhk = formData.get("bhk");

    formData.append("location",location);
    formData.append("total_sqft", total_sqft);
    formData.append("bhk", bhk);
    formData.append("bath", bath);


    return formData;
}

function sendRequest(house_details){
    form.style.display = "none";
    loading.style.display = "";
    
    var requestOptions = {
      method: 'POST',
      body: house_details,
      redirect: 'follow'
    };
    
    fetch(API_URL_POST, requestOptions)
      .then(response => response.json())
      .then(result => {
            console.log(result);
            var h2 = document.createElement('h2');
            h2.textContent = result["estimated_price"] + " lakh";
            center.appendChild(h2);
            // var button = document.createElement('button');
            // button.textContent = "reload";
            
            // center.appendChild(button);
        })
      .catch(error => console.log('error', error));
    
    loading.style.display = "none";
}


function retriveAllData(){
    loading.style.display = "";
    form.style.display = "none";
    fetch(API_URL)
    .then((response) => {
        if(response.ok)
            return response.json();
        else
            throw new Error("Can't reach server!");
    })
        .then(data => {
            
            // 1
            var l_list = data['location'];
            for(const l of l_list){
                // console.log(l); 
                var option = document.createElement("option");
                option.value = l;
                option.text = l ;
                select_location.appendChild(option);
            }

            // 2
            var mn = data['bath'][0];
            var mx = data['bath'][1];
            for(var i = mn ; i <= mx ; ++i){
                var option = document.createElement("option");
                option.value = i;
                option.text = i;
                select_bath.appendChild(option);
            }

            // 3
            var mn = data['bhk'][0];
            var mx = data['bhk'][1];
            for(var i = mn ; i <= mx ;  ++i){
                var option = document.createElement("option");
                option.value = i;
                option.text = i;
                select_bhk.appendChild(option);
            }
            loading.style.display = "none";
            form.style.display = "";  
        }).catch( (error) => {
            console.log(error);
        } );
          
    
} // function end