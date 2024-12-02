// Select the input field
const lifeSpanInput = document.getElementById('new-life-span');

// Listen for changes in the input
lifeSpanInput.addEventListener('input', () => {
    // Ensure value stays between 0 and 30
    if (lifeSpanInput.value < 0) {
        lifeSpanInput.value = 0;
    } else if (lifeSpanInput.value > 30) {
        lifeSpanInput.value = 30;
    }
});
