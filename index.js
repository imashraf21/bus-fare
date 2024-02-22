let seatList = [];
let isSelect = true;

function byID(id) {
    return document.getElementById(id);
}

const totalSeats = byID("seats-left").innerHTML;

// Validate Phone Number
function validateNumber() {
    const phoneNo = byID("phone").value;

    if (phoneNo.length !== 11 || isNaN(phoneNo)) {
        return false;
    }
    return true;
}

// Enable/ Disable Next Button
function enableNext() {
    if (seatList.length >= 1 && validateNumber()) {
        byID("next-button").disabled = false;
    }
    else {
        byID("next-button").disabled = true;
    }
}

// Enable Next Button Event (Select Seat & then inputs number)
byID("phone").addEventListener("keyup", enableNext);

// Update Ticket Cost
function updateBookingInfo(parent, value) {
    const parentNode = byID(parent);

    const childNode = document.createElement('div');
    childNode.id = value;
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

// Enable/ Disable Coupon Input & Button
function enableCoupon() {
    if (seatList.length == 4) {
        byID("coupon-enable").disabled = false;
        byID("coupon-code").disabled = false;
    }
    else {
        byID("coupon-enable").disabled = true;
        byID("coupon-code").disabled = true;
    }
}

//  Seat Count
function setSeatCount() {
    // Set Seat Count
    byID("seats-booked").innerHTML = seatList.length;

    // Seats Left
    byID("seats-left").innerHTML = totalSeats - seatList.length;
}

// Total Cost, Grand Cost, Discounted Cost
function updateCost() {
    // Total Cost
    byID("total-cost").innerHTML = seatList.length * 550;

    // Grand Total
    byID("grand-cost").innerHTML = byID("total-cost").innerHTML;
}

function updateDiscount() {
    const totalCost = byID("total-cost").innerHTML;
    const totalDiscount = totalCost * (coupon === "NEW15" ? 0.15 : 0.20);
    byID("discounted-price").innerHTML = totalDiscount;

    byID("grand-cost").innerHTML = totalCost - totalDiscount;
}

// Bus Seat
function handleClick(button) {
    const seatNo = button.innerText;

    if (!isSelect) {
        alert("Changes after coupon not allowed.")
        return;
    }
    else if (seatList.includes(seatNo)) {
        seatList = seatList.filter(seat => seat !== seatNo);
        button.classList.remove('bg-cs-primary');
        button.classList.remove('text-white');
        byID(seatNo).remove();
    }
    else if (seatList.length < 4) {
        seatList.push(seatNo);
        button.classList.add('bg-cs-primary');
        button.classList.add('text-white');

        // Booking Info
        updateBookingInfo("booking-list", seatNo);
    }
    else {
        alert("You can only buy up to four tickets per purchase.")
    }

    // Update Seat Count
    setSeatCount();

    // Update Ticket Cost
    updateCost();

    // If the user provides phone number first & then selects a seat
    enableNext();

    // check coupon 
    enableCoupon();
}

// Validate Coupon
function handleCoupon() {
    const coupon = byID("coupon-code").value;

    if (coupon === 'NEW15' || coupon === 'Couple 20') {
        byID("coupon-container").classList.add("hidden");

        const discount = byID("discount");
        discount.classList.remove("hidden");
        discount.classList.add("flex");

        // After Discount, you can't modify seats anymore
        isSelect = false;

        updateDiscount();
    }
    else {
        alert("Invalid Coupon Code");
    }
}