let directionOfTravel;

function directionOfTravelFunction(direction) {
    if (!directionOfTravel) {
        directionOfTravel = document.createElement("div");
        directionOfTravel.classList.add("card");
        if (direction === "From Campus" || direction === "To Campus") {
            let heading = document.createElement("h1");
            heading.textContent = direction;
            heading.classList.add("from-to-heading")
            directionOfTravel.appendChild(heading);
            let formContainer = document.createElement("div");
            formContainer.classList.add("form-container");

            let form = document.createElement("form");

            let stationLabel = document.createElement("label");
            stationLabel.textContent = `${direction === "From Campus" ? "To" : "From"} Station:`;
            let stationDropdown = document.createElement("select");
            stationDropdown.name = "station";
            
            let stations = [
                "Panipuri Station",
                "Bhel Station",
                "Pavbhaji Station",
                "Dosa Station",
                "Vada Pav Station",
                "Samosa Station",
                "Poha Station",
                "Misal Station",
                "Upma Station",
                "Idli Station",
                "Dhokla Station",
            ];
            
            for (let station of stations) {
                let option = document.createElement("option");
                option.value = station;
                option.textContent = station;
                stationDropdown.appendChild(option);
            }
            
            stationLabel.appendChild(stationDropdown);

            let dateLabel = document.createElement("label");
            dateLabel.textContent = "Date of Departure:";
            let dateInput = document.createElement("input");
            dateInput.type = "date";
            dateInput.name = "departureDate";
            dateLabel.appendChild(dateInput);

            let timeLabel = document.createElement("label");
            timeLabel.textContent = "Time of Departure:";
            let timeInput = document.createElement("input");
            timeInput.type = "time";
            timeInput.name = "departureTime";
            timeLabel.appendChild(timeInput);

            let submitButton = document.createElement("button");
            submitButton.type = "button"; 
            submitButton.textContent = "Submit";

            form.appendChild(stationLabel);
            form.appendChild(dateLabel);
            form.appendChild(timeLabel);
            form.appendChild(submitButton);

            submitButton.onclick = function () {
                if(!stationDropdown.value || !dateInput.value || !timeInput.value) {
                    alert("Please fill all the fields");
                    return;
                }

                alert(`You have selected ${stationDropdown.value} on ${dateInput.value} at ${timeInput.value}`);
                fetch('/Add_Cabmate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        destination: direction === "From Campus" ? stationDropdown.value : "Campus",
                        // eg. 2021-10-10T12:00
                        datetime: `${dateInput.value}T${timeInput.value}`,
                        pickup: direction === "From Campus" ? "Campus" : stationDropdown.value,
                    })
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    alert("Failed to add cabmate");
                })
            }

            formContainer.appendChild(form);
            directionOfTravel.appendChild(formContainer);
        }
        let flexContainer = document.querySelector('.flex-container');
        flexContainer.appendChild(directionOfTravel);
        directionOfTravel.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    } else {
        directionOfTravel.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
}

let bookingDiv;
function createNewBookingDiv() {
    if (!bookingDiv) {
        bookingDiv = document.createElement("div");
        bookingDiv.classList.add("card");
        let img1 = document.createElement("img");
        let img2 = document.createElement("img");
        let label1 = "From Campus";
        let label2 = "To Campus";
        let wrapperDiv1 = document.createElement("div");
        let wrapperDiv2 = document.createElement("div");
        
        wrapperDiv1.classList.add("label");
        wrapperDiv2.classList.add("label");
        let heading1 = document.createElement("div");
        let heading2 = document.createElement("div");
        heading1.textContent = label1;
        heading2.textContent = label2;

        wrapperDiv1.classList.add("image-container");
        wrapperDiv2.classList.add("image-container");
        img1.src = "./../static/from-campus.svg";
        img2.src = "./../static/to-campus.svg";
        img1.classList.add("arrival-departure");
        img2.classList.add("arrival-departure");
        img1.onclick = function () {
            directionOfTravelFunction("From Campus")
        };
        img2.onclick = function () {
            directionOfTravelFunction("To Campus")
        };
        wrapperDiv1.appendChild(img1);
        wrapperDiv2.appendChild(img2);
        wrapperDiv1.appendChild(heading1);
        wrapperDiv2.appendChild(heading2);
        let containerDiv = document.createElement("div");
        containerDiv.classList.add("arrival-departure-container");
        containerDiv.appendChild(wrapperDiv1);
        containerDiv.appendChild(wrapperDiv2);
        bookingDiv.appendChild(containerDiv);
        let flexContainer = document.querySelector('.flex-container');
        flexContainer.appendChild(bookingDiv);
        bookingDiv.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    } else {
        bookingDiv.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
}