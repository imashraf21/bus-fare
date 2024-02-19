let seatList = [];

let totalSeats = document.getElementById("seatsLeft").innerHTML;

function updateBookingInfo(parent, value) {
    let parentNode = document.getElementById(parent);

    let childNode = document.createElement('div');
    childNode.classList.add('flex');
    childNode.classList.add('justify-between');


    let p = document.createElement('p');
    p.innerText = value;
    childNode.appendChild(p);

    let p1 = document.createElement('p');
    p1.innerText = "Economy";
    childNode.appendChild(p1);

    let p2 = document.createElement('p');
    p2.innerText = "550";
    childNode.appendChild(p2);

    parentNode.appendChild(childNode);
}

function enableCoupon() {
    if (seatList.length == 4) {
        document.getElementById("couponEnable").disabled = false;
        document.getElementById("couponCode").disabled = false;
    }
}

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

        // Booking Info
        updateBookingInfo("bookingList", innerText);

        // Total Cost
        document.getElementById("totalCost").innerHTML = seatList.length * 550;

        // Grand Total
        document.getElementById("grandCost").innerHTML = document.getElementById("totalCost").innerHTML;

        // check coupon 
        enableCoupon();
    }
    else {
        alert("You can only buy up to four tickets per purchase.")
    }
}