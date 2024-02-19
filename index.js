let seatList = [];

let totalSeats = document.getElementById("seatsLeft").innerHTML;

function handleClick(button) {
    if (seatList.length < 4) {
        let innerText = button.innerText;
        
        seatList.push(innerText);

        button.classList.add('bg-cs-primary');
        button.classList.add('text-white');

        button.disabled = true;
        console.log(seatList);

        // Set Seat Count
        document.getElementById("seatsBooked").innerHTML = seatList.length;

        // Seats Left
        document.getElementById("seatsLeft").innerHTML = totalSeats - seatList.length;
    }
    else {
        alert("You can only buy up to four tickets per purchase.")
    }
}