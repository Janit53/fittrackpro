// Daily wellness overview
const wellnessData = [
    steps = {
        label: "Steps Taken",
        today: 6500,
        goal: 10000,
        id: "stepsValue",
        unit: ""
    },

    calories = {
        label: "Calories Burned",
        today: 820,
        goal: 2000,
        id: "calvalue",
        unit: "Kcal"
    },

    water = {
        label: "Water Intake",
        today: 2,
        goal: 7,
        id: "waterValue",
        unit: "L"
    }
]

// Activities
let activities = [
    { name: "Morning Run", duration: 30, calories: 180, time: "morning" },
    { name: "Cycling", duration: 45, calories: 260, time: "afternoon" }
];

// Meals
let mealPlan = {
    breakfast: ["Oatmeal", "Banana"],
    lunch: ["Grilled Chicken", "Salad"],
    dinner: ["Rice", "Paneer Curry"]
};

