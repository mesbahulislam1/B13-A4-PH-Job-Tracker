let interViewList = [];
let rejectList = [];
let currentStatus = "allBtn";

let total = document.getElementById("total");
let jobsCount = document.getElementById("jobsCount");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");

const allBtn = document.getElementById("allBtn");
const interviewBtn = document.getElementById("interviewBtn");
const rejectedBtn = document.getElementById("rejectedBtn");

const allCardSection = document.getElementById("allCard");
const mainContainer = document.querySelector("#main");
const filterSection = document.getElementById("filterSection");

function calculateCount() {
  total.innerText = allCardSection.children.length;
  jobsCount.innerText = allCardSection.children.length;
  interviewCount.innerText = interViewList.length;
  rejectedCount.innerText = rejectList.length;
}
calculateCount();

function btnClick(id) {
  allBtn.classList.remove("bg-[#3B82F6]", "text-white");
  interviewBtn.classList.remove("bg-[#3B82F6]", "text-white");
  rejectedBtn.classList.remove("bg-[#3B82F6]", "text-white");

  const selected = document.getElementById(id);
  selected.classList.add("bg-[#3B82F6]", "text-white");
  currentStatus = id;
  console.log(currentStatus);

  if (id == "interviewBtn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderInterview();
  } else if (id == "allBtn") {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
  } else if (id == "rejectedBtn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderReject();
  }
}

document.addEventListener("click", (event) => {
  
  if (event.target.closest(".deleteBtn")) {
    event.preventDefault();

    const card = event.target.closest(".shadow-md");
    if (!card) return;

    const jobTitle = card.querySelector("h2").innerText;


    interViewList = interViewList.filter((item) => item.jobTitle !== jobTitle);

    rejectList = rejectList.filter((item) => item.jobTitle !== jobTitle);


    card.remove();


    if (currentStatus === "interviewBtn") {
      renderInterview();
    } else if (currentStatus === "rejectedBtn") {
      renderReject();
    }

    calculateCount();
    return;
  }


  if (event.target.classList.contains("interviewBtn")) {
    const card = event.target.closest(".shadow-md");

    card.classList.add("border-l-5", "border-green-500");

    const statusEl = card.querySelector(".uppercase");


    statusEl.innerText = "Interview";

    statusEl.classList.remove(
      "bg-red-400/20",
      "text-red-700",
      "border-red-500",
    );

    statusEl.classList.add(
      "bg-green-400/10",
      "text-green-500",
      "border-green-500",
    );

    const cardInfo = {
      jobTitle: card.querySelector("h2").innerText,
      jobCatagory: card.querySelector("h3").innerText,
      jobSalary: card.querySelector("#jobSalary").innerText,
      jobsDetails: card.querySelector("#jobsDetails").innerText,
      status: "Interview",
    };

    // 👉 Interview list-এ add
    if (!interViewList.find((item) => item.jobTitle === cardInfo.jobTitle)) {
      interViewList.push(cardInfo);
    }

    // 👉 Reject list থেকে remove
    rejectList = rejectList.filter(
      (item) => item.jobTitle !== cardInfo.jobTitle,
    );

    // 👉 re-render
    if (currentStatus === "interviewBtn") {
      renderInterview();
    } else if (currentStatus === "rejectedBtn") {
      renderReject();
    }

    calculateCount();
  }
  if (event.target.classList.contains("rejectedBtn")) {
    const card = event.target.closest(".shadow-md");
    card.classList.add("border-l-5", "border-red-500");

    const statusEl = card.querySelector(".uppercase");
    statusEl.innerText = "Rejected";
    statusEl.classList.remove(
      "bg-green-400/10",
      "text-green-500",
      "border-green-500",
    );

    statusEl.classList.add("bg-red-400/20", "text-red-700", "border-red-500");

    const cardInfo = {
      jobTitle: card.querySelector("h2").innerText,
      jobCatagory: card.querySelector("h3").innerText,
      jobSalary: card.querySelector("#jobSalary").innerText,
      jobsDetails: card.querySelector("#jobsDetails").innerText,
    };

    if (!rejectList.find((item) => item.jobTitle === cardInfo.jobTitle)) {
      rejectList.push(cardInfo);
    }

    interViewList = interViewList.filter(
      (item) => item.jobTitle !== cardInfo.jobTitle,
    );

    if (currentStatus === "rejectedBtn") {
      renderReject();
    } else if (currentStatus === "interviewBtn") {
      
      renderInterview();
    }

    calculateCount();
  }
});
function toggleImageList(list) {
  if (list.length === 0) {
    filterSection.classList.remove("hidden");
    filterSection.innerHTML = `
    <div class=" text-center">
   <img src="./jobs.png" class="mx-auto" alt="">
   <h2 class="font-medium text-2xl">No jobs available</h2>
   <p class="font-medium">Check back for new job opportuinites</p>
  </div>
    `;
  }
}

function renderInterview() {
  filterSection.innerHTML = "";

  if (interViewList.length === 0) {
    toggleImageList(interViewList);
    return;
  }
  for (let inte of interViewList) {
    const btnText = "Interview";
    let div = document.createElement("div");
    div.innerHTML = `
    <div
          class="job-card border-l-5 border-green-400 shadow-md my-5 p-7 rounded-md space-y-2"
        >
          <h2 class="text-[18px] text-[#002C5C] font-semibold">
            ${inte.jobTitle}
          </h2>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-[#64748B]">React Native Developer</h3>
              <p id="jobSalary" class="text-[#64748B] text-[14px]">
                <span>Remote</span> <span>Full-time</span> $130,000 - $175,000
              </p>
            </div>
            <a class="border p-3 rounded-full border-[#b2b7c0]" href="#"><img src="./Trash.png" alt=""/></a>
          </div>
          
          <button
            class=" py-2 px-4 uppercase font-medium bg-green-400/10 border border-green-500 text-green-500 rounded-md"
          >
            ${btnText}
          </button>

          <p id="jobsDetails" class="text-[#323B49]">
            Build cross-platform mobile applications using React Native. Work on
            products used by millions of users worldwide.
          </p>
          <div>
            <button class="border interviewBtn px-4 py-2 uppercase rounded-md border-[#10B981] text-[#10B981]">interview</button>

            <button  class="border rejectedBtn px-4 py-2 uppercase rounded-md border-[#EF4444] text-[#EF4444]">Rejected</button>
          </div>
        </div>
    `;
    filterSection.appendChild(div);
  }
}
function renderReject() {
  filterSection.innerHTML = "";

  if (rejectList.length === 0) {
    toggleImageList(rejectList);
    return;
  }
  for (let inte of rejectList) {
    const btnText = "Rejected";
    let div = document.createElement("div");
    div.innerHTML = `
    <div
          class="job-card border-red-500 border-l-5 shadow-md my-5 p-7 rounded-md space-y-2"
        >
          <h2 class="text-[18px] text-[#002C5C] font-semibold">
            ${inte.jobTitle}
          </h2>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-[#64748B]">React Native Developer</h3>
              <p id="jobSalary" class="text-[#64748B] text-[14px]">
                <span>Remote</span> <span>Full-time</span> $130,000 - $175,000
              </p>
            </div>
            <a class="border p-3 rounded-full border-[#b2b7c0]" href="#"><img src="./Trash.png" alt=""/></a>
          </div>

          
          <button
            class=" py-2 px-4 text-[#002C5C] uppercase font-medium bg-red-400/20 text-red-700 border rounded-md"
          >
            ${btnText}
          </button>
          <p id="jobsDetails" class="text-[#323B49]">
            Build cross-platform mobile applications using React Native. Work on
            products used by millions of users worldwide.
          </p>
          <div>
            <button class="border interviewBtn px-4 py-2 uppercase rounded-md border-[#10B981] text-[#10B981]">interview</button>

            <button  class="border rejectedBtn px-4 py-2 uppercase rounded-md border-[#EF4444] text-[#EF4444]">Rejected</button>
          </div>
        </div>
    `;
    filterSection.appendChild(div);
  }
}
