setInterval(() => {
    document.getElementById("clock").innerHTML =
        new Date().toLocaleTimeString();
}, 1000);


function progressBar() {

    wellnessData.forEach((element) => {

        let maxPercent = Math.ceil((element.today / element.goal) * 100);
        console.log(maxPercent)

        let activitycard = `
            <div class="p-6 bg-white rounded-xl shadow text-center flex flex-col items-center">
                <h2 class="text-xl font-semibold">${element.label}</h2>
                <div id="${element.id}" class="text-3xl font-bold mt-4">${element.today}${element.unit}</div>
                <div class="circle mt-2 flex items-center justify-center relative" id="circle-${element.id}"><span class="circletext absolute">${maxPercent}%</span></div>
                <div class="font-bold">${maxPercent}% achieved </div>
            </div>
        `;

        let dailyWellnessTabs = document.getElementsByClassName("dailyWellnessTabs")[0];
        dailyWellnessTabs.insertAdjacentHTML("beforeend", activitycard);



        let circle = document.getElementById(`circle-${element.id}`);
        let p = 0;
        let speed = 20;

        const progress = setInterval(() => {
            p++;
            circle.style.setProperty("--p", p);

            if (p >= maxPercent) clearInterval(progress);

        }, speed);
    });
}

progressBar()