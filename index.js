// Select elements from HTML
const banner = document.querySelector('#banner');
const dogDetail = document.querySelector('#dog-detail');
const detailImg = dogDetail.querySelector('.detail-image');
const detailName = dogDetail.querySelector('.name');
const detailBreed = document.querySelector('#breed-display');
const detailWeight = document.querySelector('#weight-display');
const dogForm = document.querySelector('#new-dog');
const sortBySelect = document.querySelector('#sortBy');
const sortButton = document.querySelector('#sortButton');
const sortedBanner = document.querySelector('#sortedBanner');

// Fetch dog data from db.json
const fetchDogs = async () => {
  try {
    const response = await fetch('db.json');
    const data = await response.json();
    return data.dogs;
  } catch (error) {
    console.error("Error fetching dog data:", error);
  }
};

// Function to handle click event and display dog details
const handleClick = (dog) => {
  detailImg.src = dog.image;
  detailName.textContent = dog.breed;
  detailBreed.textContent = dog.breed;
  detailWeight.textContent = dog.weight;
};

// Function to create a new dog card and append to the banner
const createDogCard = (dog, container) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.innerHTML = `
    <div id="child-div" class="card">
        <img src="${dog.image}" alt="${dog.breed}" />
    </div>
  `;

  cardDiv.addEventListener('click', () => handleClick(dog));
  container.appendChild(cardDiv);
};

// Function to display all dogs
const displayDogs = (dogs) => {
  banner.innerHTML = ''; // Clear existing dogs
  dogs.forEach((dog) => createDogCard(dog, banner));
  if (dogs.length > 0) {
    handleClick(dogs[0]); // Display the first dog as default
  }
};

// Function to sort dogs by selected criteria (weight or age)
const sortDogs = (dogs, criteria) => {
  const sortedDogs = [...dogs]; // Copy dogs array to avoid mutating the original
  
  sortedDogs.sort((a, b) => {
    if (criteria === 'weight') {
      return parseFloat(a.weight.split('-')[0]) - parseFloat(b.weight.split('-')[0]); // Sort by weight (lower end of the range)
    } else if (criteria === 'age') {
      return parseFloat(a.lifespan.split('-')[0]) - parseFloat(b.lifespan.split('-')[0]); // Sort by lifespan (lower end of the range)
    }
    return 0;
  });

  return sortedDogs;
};

// Function to display sorted dogs
const displaySortedDogs = (dogs) => {
  sortedBanner.innerHTML = ''; // Clear existing dogs
  dogs.forEach((dog) => createDogCard(dog, sortedBanner));
};

// Function to handle the sorting form submission
const handleSortSubmit = () => {
  const sortBy = sortBySelect.value; // Get the selected sorting option
  const sortedDogs = sortDogs(dogs, sortBy); // Sort dogs based on selection
  displaySortedDogs(sortedDogs); // Display sorted dogs
};

// Initialize the app
const initializeApp = async () => {
  // Fetch and display dogs from db.json
  dogs = await fetchDogs();

  // Display dogs on page
  displayDogs(dogs);

  // Attach sort submit listener
  sortButton.addEventListener('click', handleSortSubmit);
};

// Start the application
initializeApp();
