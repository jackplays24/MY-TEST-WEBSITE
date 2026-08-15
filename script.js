"use strict";

document.addEventListener("DOMContentLoaded", function () {

```
const services = document.querySelectorAll(".choice");
const addons = document.querySelectorAll(".addon");

const totalDisplay = document.querySelector(".big-price");
const typeDisplay = document.querySelector(".project-type");
const baseDisplay = document.querySelector("#base-price");
const extrasDisplay = document.querySelector("#extras-price");
const selectedList = document.querySelector(".selected-list ul");

let basePrice = 0;
let serviceName = "";

/* ==========================================
   FORMAT MONEY
========================================== */

function money(amount) {
    return "$" + amount.toLocaleString("en-US");
}


/* ==========================================
   CALCULATE EVERYTHING
========================================== */

function calculate() {

    let extrasTotal = 0;

    addons.forEach(function (addon) {

        const checkbox = addon.querySelector("input");

        if (!checkbox) {
            return;
        }

        if (checkbox.checked) {

            const price =
                Number(checkbox.dataset.price);

            if (!Number.isNaN(price)) {
                extrasTotal += price;
            }
        }
    });


    const total = basePrice + extrasTotal;


    /* TOTAL */

    if (totalDisplay) {
        totalDisplay.textContent = money(total);
    }


    /* BASE PRICE */

    if (baseDisplay) {
        baseDisplay.textContent = money(basePrice);
    }


    /* EXTRAS PRICE */

    if (extrasDisplay) {
        extrasDisplay.textContent = money(extrasTotal);
    }


    /* SERVICE NAME */

    if (typeDisplay) {

        if (serviceName) {
            typeDisplay.textContent =
                serviceName.toUpperCase();
        } else {
            typeDisplay.textContent =
                "SELECT A SERVICE";
        }
    }


    updateSelectedList();
}


/* ==========================================
   UPDATE SELECTED ITEMS
========================================== */

function updateSelectedList() {

    if (!selectedList) {
        return;
    }

    selectedList.innerHTML = "";


    /* SERVICE */

    if (serviceName) {

        const item =
            document.createElement("li");

        item.textContent =
            serviceName +
            " — " +
            money(basePrice);

        selectedList.appendChild(item);
    }


    /* ADDONS */

    addons.forEach(function (addon) {

        const checkbox =
            addon.querySelector("input");

        const name =
            addon.querySelector("strong");

        if (!checkbox || !checkbox.checked) {
            return;
        }


        const price =
            Number(checkbox.dataset.price);


        const item =
            document.createElement("li");


        item.textContent =
            (name
                ? name.textContent.trim()
                : "Extra") +
            " — " +
            money(price);


        selectedList.appendChild(item);
    });


    /* NOTHING SELECTED */

    if (
        !serviceName &&
        !Array.from(addons).some(function (addon) {

            const checkbox =
                addon.querySelector("input");

            return checkbox && checkbox.checked;

        })
    ) {

        const item =
            document.createElement("li");

        item.textContent =
            "Nothing selected yet.";

        selectedList.appendChild(item);
    }
}


/* ==========================================
   SERVICE SELECTION
========================================== */

services.forEach(function (service) {

    const radio =
        service.querySelector("input");

    if (!radio) {
        return;
    }


    radio.addEventListener("change", function () {

        if (!radio.checked) {
            return;
        }


        /* Remove active class */

        services.forEach(function (other) {
            other.classList.remove("active");
        });


        /* Activate selected service */

        service.classList.add("active");


        /* Get price */

        basePrice =
            Number(radio.dataset.price);


        if (Number.isNaN(basePrice)) {
            basePrice = 0;
        }


        /* Get name */

        const name =
            service.querySelector("strong");


        if (name) {
            serviceName =
                name.textContent.trim();
        } else {
            serviceName = "Website";
        }


        calculate();

    });

});


/* ==========================================
   ADDON SELECTION
========================================== */

addons.forEach(function (addon) {

    const checkbox =
        addon.querySelector("input");

    if (!checkbox) {
        return;
    }


    checkbox.addEventListener("change", function () {

        /*
         The browser automatically changes
         checkbox.checked when the user clicks
         the label.

         We DON'T toggle it manually here.
        */


        if (checkbox.checked) {
            addon.classList.add("active");
        } else {
            addon.classList.remove("active");
        }


        calculate();

    });

});


/* ==========================================
   INITIAL CALCULATION
========================================== */

calculate();
```

});
