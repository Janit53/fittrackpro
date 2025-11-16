function renderActivities() {
    const list = document.getElementById("activityList");
    list.innerHTML = "";

    activities.forEach((a, i) => {
        list.innerHTML += `
          <div class="p-4 bg-white shadow rounded-xl">
            <p class="text-xl font-semibold">${a.name}</p>
            <p>${a.duration} mins · ${a.calories} kcal</p>
          </div>`;
    });
}
renderActivities();

function addActivity() {
    const name = document.getElementById("actName").value;
    const duration = document.getElementById("actDuration").value;
    const calories = document.getElementById("actCalories").value;

    if (!name || !duration || !calories) {
        alert("Please fill all fields.");
        return;
    }

    activities.push({
        name,
        duration: parseInt(duration),
        calories: parseInt(calories)
    });

    renderActivities();
    openModal();
}

function openModal() {
    document.getElementById("modal").classList.remove("hidden");
}
function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}
