const form = document.querySelector("#form");
const fBill = document.querySelector("#f_bill");
const billContainer = document.querySelector("#billContainer");
const fBillWarn = document.querySelector("#f_bill--warn");
const errorMessage = "Can't be zero";
const tipPct = document.querySelectorAll(".tip-percentage");
const fPeerCount = document.querySelector("#f_peerCount");
const peerContainer = document.querySelector("#peerCountContainer");
const fPeerWarn = document.querySelector("#f_peerCount--warn");
const resetBtn = document.querySelector("#reset_btn");
const tipXperson = document.querySelector("#tipXperson");
const totalXperson = document.querySelector("#totalXperson");
const fCustom = document.querySelector("#f_custom");
const fSelect = document.querySelector("#f_select");

let fBill_value;
let tipPctValue;
let fPeerCount_value;
let tipAmountPct;
let tipAmount;
let total;

fBill.addEventListener("keyup", () => {
  fBill.value == 0
    ? displayError(billContainer, fBillWarn)
    : ((fBill_value = fBill.value), clearError(billContainer, fBillWarn));

  if (tipPctValue && fPeerCount_value) {
    calc();
  }
});

for (let i = 0; i < tipPct.length; i++) {
  tipPct[i].addEventListener("click", () => {
    fCustom.value
      ? ((fCustom.value = ""), fSelect.classList.remove("warning"))
      : fSelect.classList.remove("warning");

    tipPctValue = tipPct[i].value;
    if (fBill_value && fPeerCount_value) {
      calc();
    }
    selectCustomValue(tipPct[i]);
  });
}

fCustom.addEventListener("click", () => {
  getCustomValue();
});

const selectCustomValue = (tipPctButton) => {
  fCustom.addEventListener("click", () => {
    tipPctButton.checked = false;
    getCustomValue();
  });
};

const getCustomValue = () => {
  fCustom.addEventListener("keyup", () => {
    if (fCustom.value == 0) {
      fSelect.classList.add("warning");
    } else {
      tipPctValue = fCustom.value;
      if (fSelect.classList.contains("warning")) {
        fSelect.classList.remove("warning");
      }
    }

    if (fBill_value && fPeerCount_value) {
      calc();
    }
  });
};

fPeerCount.addEventListener("keyup", () => {
  if (fPeerCount.value == 0) {
    displayError(peerContainer, fPeerWarn);
  } else {
    clearError(peerContainer, fPeerWarn);
    fPeerCount_value = fPeerCount.value;

    if (fBill_value && tipPctValue) {
      calc();
    }
  }
});

const displayError = (parent, child) => {
  parent.classList.add("warning");
  child.textContent = errorMessage;
};

const clearError = (parent, child) => {
  if (parent.classList.contains("warning")) {
    parent.classList.remove("warning");
    child.textContent = "";
  }
};

const calc = () => {
  tipAmountPct = (fBill_value * tipPctValue) / 100;
  tipAmount = tipAmountPct / fPeerCount_value;
  total = fBill_value / fPeerCount_value;
  tipXperson.textContent = `$${tipAmount.toFixed(2)}`;
  totalXperson.textContent = `$${(total + tipAmount).toFixed(2)}`;
};

const RESET = () => {
  form.addEventListener("change", () => {
    resetBtn.classList.add("active");
    resetBtn.addEventListener("click", () => {
      form.reset();
      clearForm();
    });
  });
};

const clearForm = () => {
  resetBtn.classList.remove("active");
  clearError(billContainer, fBillWarn);
  clearError(peerContainer, fPeerWarn);
  tipXperson.textContent = "$0.00";
  totalXperson.textContent = "$0.00";
  fBill_value = "";
  tipPctValue = "";
  fPeerCount_value = "";
};

RESET();
