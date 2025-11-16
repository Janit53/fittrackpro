// Run AFTER the DOM is ready
document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------------------
    // Load stored data or fallback to default values
    // ------------------------------------------------------
    const storedActivities = JSON.parse(localStorage.getItem("activities")) || activities;
    const storedWellness = JSON.parse(localStorage.getItem("wellnessData")) || wellnessData;
    const storedMeals = JSON.parse(localStorage.getItem("mealPlan")) || mealPlan;


    // ------------------------------------------------------
    // Calculate weekly calories burned (NO DATE NEEDED)
    // ------------------------------------------------------
    function getWeeklyCalories() {

        // Base dummy values
        const week = { Mon: 5, Tue: 10, Wed: 6, Thu: 100, Fri: 3, Sat: 0, Sun: 7 };

        // Add all activities to Monday (no date available)
        storedActivities.forEach(act => {
            week.Mon += act.calories;
        });

        return week;
    }


    // ------------------------------------------------------
    // Render Weekly Graph
    // ------------------------------------------------------
    function renderGraph() {
        const data = getWeeklyCalories();
        const container = document.getElementById("graphContainer");
        if (!container) return;

        container.innerHTML = ""; // Clear previous graph

        const maxCal = Math.max(...Object.values(data), 200);

        Object.entries(data).forEach(([day, value]) => {
            const percentage = (value / maxCal) * 100;

            const barWrapper = document.createElement("div");
            barWrapper.className = "flex flex-col items-center justify-end h-full";

            barWrapper.innerHTML = `
                <div class="bg-blue-600 w-10 rounded-t relative group" 
                     style="height:${percentage}%">

                    <span class="absolute bottom-full mb-2 px-2 py-1 bg-black text-white 
                                 text-xs rounded opacity-0 group-hover:opacity-100">
                        ${value} kcal
                    </span>
                </div>

                <p class="mt-2 font-semibold">${day}</p>
            `;

            container.appendChild(barWrapper);
        });
    }


    // ------------------------------------------------------
    // Download Summary (SAME BUTTON, NO CHANGE REQUIRED)
    // ------------------------------------------------------
    function downloadSummary() {
        const summary = {
            generatedAt: new Date().toISOString(),
            weeklyCalories: getWeeklyCalories(),
            activities: storedActivities,
            wellness: storedWellness,
            meals: storedMeals
        };

        const jsonString = JSON.stringify(summary, null, 2);

        // Create Blob
        const blob = new Blob([jsonString], { type: "application/json" });

        // Create downloadable URL
        const url = URL.createObjectURL(blob);

        // Create a temporary <a> element
        const a = document.createElement("a");
        a.href = url;
        a.download = "fittrack-summary.json"; // filename

        // Trigger download
        a.click();

        // Cleanup
        URL.revokeObjectURL(url);
    }



    // ------------------------------------------------------
    // Reset Dashboard — Custom Popup
    // ------------------------------------------------------
    const modal = document.getElementById("resetModal");

    document.getElementById("resetTrigger").onclick = () => {
        modal.classList.remove("hidden");
    };

    document.getElementById("cancelReset").onclick = () => {
        modal.classList.add("hidden");
    };

    document.getElementById("confirmReset").onclick = () => {
        localStorage.removeItem("activities");
        localStorage.removeItem("wellnessData");
        localStorage.removeItem("mealPlan");

        modal.classList.add("hidden");
        location.reload();
    };


    // ------------------------------------------------------
    // Attach events
    // ------------------------------------------------------
    document.getElementById("downloadBtn").onclick = downloadSummary;

    // ------------------------------------------------------
    // Render graph initially
    // ------------------------------------------------------
    renderGraph();

});
