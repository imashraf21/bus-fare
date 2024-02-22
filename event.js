// tooltip
const tooltipID = [];

function byClass(className) {
    return document.getElementsByClassName(className);
}

function getTooltipID() {
    for (const tooltip of byClass("tooltip")) {
        tooltipID.push(tooltip.attributes.id.nodeValue);
    }
}

getTooltipID();

//  isClassAvailable
function isClassAvailable(element, className) {
    if (element.classList.contains(className)) {
        return true;
    }

    return false;
}

// check tooltip
function tooltipStatus() {
    for (const tooltip of tooltipID) {
        if (byID(tooltip).querySelector('button').disabled) {
            if (!isClassAvailable(byID(tooltip), "tooltip")) {
                byID(tooltip).classList.add("tooltip");
            }
        }
        else {
            byID(tooltip).classList.remove("tooltip");
        }
    }
}

for (const tooltip of tooltipID) {
    byID(tooltip).addEventListener("mouseover", tooltipStatus);
}