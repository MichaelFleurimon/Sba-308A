const apiUrl = `https://gutendex.com/books`;
const CardTemplate = document.getElementById("card-temp");
const CardConainer = document.getElementById("card-container");
const searchBar = document.getElementById("search-bar");
const likedList = document.getElementById("liked-list");

// Function to fetch book data from the API
async function getBookData(term) {
    try {
        const res = await fetch(`${apiUrl}?search=${term}`);
        if (!res.ok) {
            throw new Error("Where are the books?");
        }
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error("no books:", error);
    }
}

// Function to populate cards with book data
function populateCards(books) {
    CardConainer.innerText = ""; // Clear existing cards
    books.forEach(book => {
        const bookCard = CardTemplate.content.cloneNode(true);
        const img = bookCard.querySelector("img");
        const title = bookCard.querySelector(".book-title");

        img.src = book.formats["image/jpeg"] || "https://via.placeholder.com/150";
        img.alt = book.title;
        title.textContent = book.title;

        // Add click event to add to liked list
        bookCard.querySelector(".book-card").addEventListener("click", () => {
            addToLikedList(book.title);
        });

        CardConainer.appendChild(bookCard);
    });
}

// Function to add a book to the liked list
function addToLikedList(bookTitle) {
    const listItem = document.createElement("li");
    listItem.textContent = bookTitle;
    likedList.appendChild(listItem);
}

// Event listener for search bar input
searchBar.addEventListener("input", async (e) => {
    const userSearch = e.target.value.trim();
    if (userSearch.length > 2) {
        const books = await getBookData(userSearch);
        if (books) {
            populateCards(books);
        }
    } else {
        CardConainer.innerText = ""; // Clear the container for short or empty queries
    }
});
