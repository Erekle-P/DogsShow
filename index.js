// Select elements from HTML
const banner = document.querySelector('#banner');
const dogDetail = document.querySelector('#dog-detail');
const detailImg = dogDetail.querySelector('.detail-image');
const detailBreed = dogDetail.querySelector('#breed-display');
const detailWeight = dogDetail.querySelector('#weight-display');
const detailLifespan = dogDetail.querySelector('#lifespan-display');
const detailCoat = dogDetail.querySelector('#coat-display');
const detailSize = dogDetail.querySelector('#size-display');
const sortBySelect = document.querySelector('#sortBy');
const sortButton = document.querySelector('#sortButton');
const sortedBanner = document.querySelector('#sortedBanner');

// Fetch dog data from local server
const fetchDogs = async () => {
  try {
    const response = await fetch('http://localhost:3000/dogs');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dog data:", error);
    return [];
  }
};

// Function to handle click event and display dog details
const handleClick = (dog) => {
  detailImg.src = dog.image || '';
  detailBreed.textContent = dog.breed || 'Unknown';
  detailWeight.textContent = dog.weight || 'Unknown';
  detailLifespan.textContent = dog.lifespan || 'Unknown';
  detailCoat.textContent = dog.coat_type || 'Unknown';
  detailSize.textContent = dog.size || 'Unknown';
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

// Function to create a sorted dog card
const createSortedDogCard = (dog) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('sorted-card');
  cardDiv.innerHTML = `
    <img src="${dog.image}" alt="${dog.breed}" />
    <h4>${dog.breed}</h4>
  `;
  return cardDiv;
};

// Function to display sorted dogs
const displaySortedDogs = (dogs) => {
  sortedBanner.innerHTML = ''; // Clear existing dogs
  dogs.forEach((dog) => {
    const sortedCard = createSortedDogCard(dog);
    sortedBanner.appendChild(sortedCard);
  });
};

// Function to sort dogs by selected criteria (weight or age)
const sortDogs = (dogs, criteria) => {
    const sortedDogs = [...dogs]; // Create a copy of the array to avoid mutating the original.
    
    sortedDogs.sort((a, b) => {
      if (criteria === 'weight') {
        // Extract numerical weight from the string and compare
        return parseFloat(a.weight) - parseFloat(b.weight);
      } else if (criteria === 'age') {
        // Extract numerical lifespan from the string and compare
        return parseFloat(a.lifespan) - parseFloat(b.lifespan);
      }
      return 0; // If no valid criteria, do not change the order.
    });
    
    return sortedDogs; // Return the sorted array.
  };

// Function to handle the sorting form submission
const handleSortSubmit = (dogs) => {
  const sortBy = sortBySelect.value;
  const sortedDogs = sortDogs(dogs, sortBy);
  displaySortedDogs(sortedDogs);
};

// Initialize the app
const initializeApp = async () => {
  const dogs = await fetchDogs();
  displayDogs(dogs);
  sortButton.addEventListener('click', () => handleSortSubmit(dogs));
};

// Start the application
initializeApp();
