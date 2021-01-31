//DATA
let movies = [{
    name: "The Matrix",
    rating: 7.5,
    category: "Action"
  },
  {
    name: "Focus",
    rating: 6.9,
    category: "Comedy"
  },
  {
    name: "The Lazarus Effect",
    rating: 6.4,
    category: "Thriller"
  },
  {
    name: "Everly",
    rating: 5.0,
    category: "Action"
  },
  {
    name: "Maps to the Stars",
    rating: 7.5,
    category: "Drama"
  },
]

//HTML REFERENCES
const category_list = document.getElementById("category_list");
const searchBar = document.getElementById("searchBar");

//DICTIONARY
let dict = {};

//search bar functionality
//deep copy of dictionary will cost O(n)
//filtering cost O(n)
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  //O(n) filtering
  let dictCopy = JSON.parse(JSON.stringify(dict))
  for (const key in dictCopy) {
    const filteredMovies = dict[key].filter((movie) => {
      return (movie.name.toLowerCase().includes(searchString));
    });
    dictCopy[key] = filteredMovies;
  }
  try {
    display_Categories(dictCopy);
    display_Movies(dictCopy);
  } catch (err) {
    console.error(err);
  }
})

//initializes dictionary with movie data
//should only be called once
//O(n) cost, dictionary is pre-loaded
function populateDict(d, arr) {
  for (const movie of arr) {
    if (movie.category in dict) {
      d[movie.category].push(movie);
    } else {
      d[movie.category] = [movie];
    }
  }
}

//writes to HTML to display categories
//≤ O(n) work
const display_Categories = (d => {
  const htmlString = Object.keys(d).map((category) => {
      return `<h2>${category} (${d[category].length})</h2><ul id = ${category} class = "category"></ul>`;
    })
    .join('');
  category_list.innerHTML = htmlString;
})

//given a rating, will return a string of stars that represents rating
//O(1) work since at most rating = 10
function generateStarString(num) {
  const white_count = Math.round(num / 2);
  const black_count = (5 - white_count);
  const whiteStar = "&#9733";
  const blackStar = "&#9734";
  const output = whiteStar.repeat(white_count) + blackStar.repeat(black_count);
  return output;
}

//writes to HTML to display movies
//O(n) work
const display_Movies = (d => {
  for (const category of Object.keys(d)) {
    const htmlString = d[category].map((movie) => {
        return `<li>
      				${generateStarString(movie.rating)}
     					<br>
      				<a href = "https://www.imdb.com/find?q=${movie.name}">${movie.name}</a>
              </li>`;
      })
      .join('');
    document.getElementById(category).innerHTML = htmlString;
  }
})

//Initialize webpage
try {
  populateDict(dict, movies);
  display_Categories(dict);
  display_Movies(dict);
} catch (err) {
  console.error(err);
}
