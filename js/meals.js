function renderMeals() {
	const cont = document.getElementById("mealContainer");
	cont.innerHTML = "";

	Object.keys(mealPlan).forEach(meal => {
		cont.innerHTML += `
        <div class="bg-gray-300 p-6 rounded-xl shadow">
          <h2 class="text-2xl font-semibold capitalize mb-3">${meal}</h2>
          <ul>
            ${mealPlan[meal].map(m => `<li class="mb-1">${m}</li>`).join("")}
          </ul>
        </div>`;
	});
}
renderMeals();

function addmeals() {
	mealtime = document.getElementById("mealtime").value;
	mealitem = document.getElementById("mealitem").value;
	mealPlan[mealtime].push(mealitem);


	renderMeals()
	openModal()
}

function openModal() {
	document.getElementById("modal").classList.remove("hidden");
}
function closeModal() {
	document.getElementById("modal").classList.add("hidden");
}

