

const submitButton = document.getElementById("form-submit");
const form = document.getElementsByTagName ("form");
const successMessage = document.getElementById("success-message");

const updateState = (message)=>{
    submitButton.innerHTML = message;
    };

const handleSuccess = ()=> {
    updateState("Sucess!");

setTimeout(()=> {
    //hide the form
    form [0].style.display = "none";
    //display sucess message
    successMessage.style.display = "block";

}, 1000 );
};

const handleError =()=>{
    updateState("something went wrong!");

    setTimeout(() => {
        updateState("Schedule a Call")
    }, 1500)
};
  



const submitForm = (event) => {
    //prevent form from refreshing
    event.preventDefault();

    //updating the state
    updateState("submitting...");

//process the form data
    const formData = new FormData (event.target);

    const formObject = {};

    formData.forEach ((value,key) => {
formObject [key] = value;

    });

    console.log(formObject);

    //create jason string
    const jsonString = JSON.stringify(formObject);
    console.log(jsonString);

    //submit to formspark

    fetch("https://submit-form.com/4iCxpSfX9", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: jsonString, 

      })
        .then(function (response) {
            if(response.ok){
                handleSuccess();
            }
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
          handleError();
        });

    
        
};