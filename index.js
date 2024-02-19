const seatList = [];

const totalSeats = document.getElementById("seatsLeft").innerHTML;

// Validate Phone Number & Enable Next Button
function validateNumber() {
    const phoneNo = document.getElementById("phone").value;
    
    if (phoneNo.length !== 11 || isNaN(phoneNo)) {
        return false;
    }
    return true;
}

function enableNext() {
    if (seatList.length >= 1 && validateNumber()) {
        document.getElementById("nextButton").disabled = false;
    }
    else {
        document.getElementById("nextButton").disabled = true;
    }
}

document.getElementById("phone").addEventListener("keyup", enableNext);

// Update Ticket Cost
function updateBookingInfo(parent, value) {
    const parentNode = document.getElementById(parent);

    const childNode = document.createElement('div');
    childNode.classList.add('flex');
    childNode.classList.add('justify-between');


    const p = document.createElement('p');
    p.innerText = value;
    childNode.appendChild(p);

    const p1 = document.createElement('p');
    p1.innerText = "Economy";
    childNode.appendChild(p1);

    const p2 = document.createElement('p');
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
        const innerText = button.innerText;

        seatList.push(innerText);

        button.classList.add('bg-cs-primary');
        button.classList.add('text-white');

        button.disabled = true;

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

        // If the user provides phone number first & then selects seat
        enableNext();
    }
    else {
        alert("You can only buy up to four tickets per purchase.")
    }
}

function handleCoupon() {
    const coupon = document.getElementById("couponCode").value;

    if (coupon === 'NEW15' || coupon === 'Couple 20') {
        document.getElementById("couponContainer").classList.add("hidden");

        const discount = document.getElementById("discount");
        discount.classList.remove("hidden");
        discount.classList.add("flex");

        const totalCost = document.getElementById("totalCost").innerHTML;
        const totalDiscount = totalCost * (coupon === "NEW15" ? 0.15 : 0.20);
        document.getElementById("discountedPrice").innerHTML = totalDiscount;

        document.getElementById("grandCost").innerHTML = totalCost - totalDiscount;
    }
    else {
        alert("Invalid Coupon Code");
    }
}

// Modal
function handleModal() {
    window.open('index.html', '_self');
}