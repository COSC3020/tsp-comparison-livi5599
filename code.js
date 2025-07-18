function tsp_hk(distance_matrix) {
    let shortestPath = Infinity;

    // Try each city as the starting point
    for (let startCity = 0; startCity < distance_matrix.length; startCity++) {
        let visitedCities = new Set([startCity]);
        let pathLength = findShortestPath(distance_matrix, startCity, visitedCities);
        if (pathLength < shortestPath) {
            shortestPath = pathLength;
        }
    }

    // If no valid path was found, return 0
    if (shortestPath === Infinity) {
        return 0;
    }

    return shortestPath;
}

function findShortestPath(matrix, currentCity, visitedCities, memoization = {}) {
    // Create a unique key for memoization based on the current city and visited cities
    // Manually build the visited cities string

    // I had to convert from a set to an array since a set doesn't have the .join() function weirdly enough
    // Sort the nodes first before using them in the key
    visitedString = Array.from(visitedCities).sort((city1, city2) => city1 - city2).join(",");


    // Manually build the key string
    let key = currentCity + '|' + visitedString;



    // Return the memoized value if available
    if (memoization[key] !== undefined) {
        return memoization[key];
    }

    // Base case: if all cities are visited, return to the starting city (no more cost)
    if (visitedCities.size === matrix.length) {
        return 0;
    }

    let minPathLength = Infinity;

    // Explore each unvisited city
    for (let nextCity = 0; nextCity < matrix.length; nextCity++) {
        if (!visitedCities.has(nextCity) && matrix[currentCity][nextCity] !== 0) {
            visitedCities.add(nextCity);
            let pathLength = matrix[currentCity][nextCity] + findShortestPath(matrix, nextCity, visitedCities, memoization);
            minPathLength = Math.min(minPathLength, pathLength);
            visitedCities.delete(nextCity); // Backtrack
        }
    }

    // Memoize the result for the current state
    memoization[key] = minPathLength;
    return minPathLength;
}

//***Local search***
function tsp_ls(distance_matrix) {

    n = distance_matrix.length;

    if (n == 1) return 0;


    let currentRoute = [];
    for (i = 0; i < n; i++)
        currentRoute[i] = i;

    currentDistance = calculateDistance(currentRoute, 0, 0);
    possibleDistance = 0;


    termValue = 0;
    possibleRoute = [];
    while (termValue < n * 2) {

        // Pick two random numbers
        a = Math.floor(Math.random() * n);
        b = Math.floor(Math.random() * n);

        // Ensures the smaller is the first input
        if (a < b) {
            possibleRoute = swap(currentRoute, a, b);
            possibleDistance = calculateDistance(currentRoute, distance_matrix);
            if (possibleDistance > currentDistance) {
                termValue = 0;
                currentRoute = possibleRoute;
                currentDistance = possibleDistance;
            }
            else {
                termValue++;
            }
        }

        else if (a > b) {
            possibleRoute = swap(currentRoute, b, a);
            possibleDistance = calculateDistance(currentRoute, distance_matrix);
            if (possibleDistance > currentDistance) {
                termValue = 0;
                currentRoute = possibleRoute;
                currentDistance = possibleDistance;
            }
            else {
                termValue++;
            }
        }
    }

    return currentDistance;
}





function swap(route, i, k) {

    // First and third part dont change
    let route1 = route.slice(0, i);
    let route2 = route.slice(i, k + 1);
    let route3 = route.slice(k + 1)

    // Flip the middle
    route2 = route2.reverse();

    // Obscure JS functions for the win!!!
    return [...route1, ...route2, ...route3];
}

// I am VERY proud of this function, it works very well
function calculateDistance(route, distance_matrix) {
    let distance = 0;

    // Adds the first element to the end so the for loop can
    // act kinda circular
    route[route.length] = route[0];

    // Adds the distance between nodes on the path
    for (i = 0; i < distance_matrix.length; i++) {
        distance += distance_matrix[route[i]][route[i + 1]]
    }

    return distance;
}

const matrix_4 = [
    [0, 29, 20, 21],
    [29, 0, 15, 17],
    [20, 15, 0, 28],
    [21, 17, 28, 0]
];

const matrix_6 = [
    [0, 22, 29, 18, 35, 25],
    [22, 0, 19, 30, 20, 34],
    [29, 19, 0, 15, 28, 40],
    [18, 30, 15, 0, 26, 24],
    [35, 20, 28, 26, 0, 31],
    [25, 34, 40, 24, 31, 0]
];

const matrix_8 = [
    [0, 16, 22, 25, 18, 27, 33, 21],
    [16, 0, 14, 19, 23, 31, 28, 17],
    [22, 14, 0, 15, 26, 24, 19, 29],
    [25, 19, 15, 0, 17, 28, 23, 31],
    [18, 23, 26, 17, 0, 15, 29, 20],
    [27, 31, 24, 28, 15, 0, 12, 24],
    [33, 28, 19, 23, 29, 12, 0, 18],
    [21, 17, 29, 31, 20, 24, 18, 0]
];

const matrix_10 = [
    [0, 25, 30, 40, 20, 34, 50, 28, 39, 45],
    [25, 0, 26, 36, 15, 29, 48, 22, 33, 41],
    [30, 26, 0, 22, 18, 25, 37, 27, 20, 30],
    [40, 36, 22, 0, 29, 20, 35, 32, 26, 18],
    [20, 15, 18, 29, 0, 22, 45, 24, 28, 33],
    [34, 29, 25, 20, 22, 0, 30, 21, 25, 24],
    [50, 48, 37, 35, 45, 30, 0, 27, 30, 40],
    [28, 22, 27, 32, 24, 21, 27, 0, 19, 30],
    [39, 33, 20, 26, 28, 25, 30, 19, 0, 22],
    [45, 41, 30, 18, 33, 24, 40, 30, 22, 0]
];

const matrix_12 = [
    [0, 31, 23, 17, 45, 36, 28, 42, 30, 40, 33, 27],
    [31, 0, 19, 29, 32, 41, 35, 38, 25, 36, 40, 30],
    [23, 19, 0, 21, 26, 30, 22, 37, 29, 31, 34, 25],
    [17, 29, 21, 0, 35, 28, 26, 33, 24, 30, 29, 20],
    [45, 32, 26, 35, 0, 18, 39, 41, 36, 44, 30, 34],
    [36, 41, 30, 28, 18, 0, 27, 29, 32, 33, 25, 21],
    [28, 35, 22, 26, 39, 27, 0, 31, 23, 34, 28, 22],
    [42, 38, 37, 33, 41, 29, 31, 0, 26, 39, 35, 33],
    [30, 25, 29, 24, 36, 32, 23, 26, 0, 28, 31, 29],
    [40, 36, 31, 30, 44, 33, 34, 39, 28, 0, 37, 35],
    [33, 40, 34, 29, 30, 25, 28, 35, 31, 37, 0, 26],
    [27, 30, 25, 20, 34, 21, 22, 33, 29, 35, 26, 0]
];

const matrix_14 = [
    [0, 25, 30, 28, 45, 33, 40, 26, 34, 32, 38, 36, 27, 29],
    [25, 0, 20, 18, 36, 28, 32, 21, 25, 27, 29, 31, 23, 26],
    [30, 20, 0, 16, 38, 24, 29, 25, 22, 30, 27, 33, 19, 24],
    [28, 18, 16, 0, 35, 29, 27, 24, 20, 26, 25, 30, 21, 23],
    [45, 36, 38, 35, 0, 19, 22, 31, 28, 40, 33, 26, 38, 35],
    [33, 28, 24, 29, 19, 0, 17, 22, 25, 30, 20, 19, 26, 27],
    [40, 32, 29, 27, 22, 17, 0, 23, 21, 32, 24, 20, 25, 29],
    [26, 21, 25, 24, 31, 22, 23, 0, 19, 27, 25, 24, 20, 22],
    [34, 25, 22, 20, 28, 25, 21, 19, 0, 23, 22, 21, 23, 25],
    [32, 27, 30, 26, 40, 30, 32, 27, 23, 0, 28, 26, 29, 31],
    [38, 29, 27, 25, 33, 20, 24, 25, 22, 28, 0, 19, 27, 28],
    [36, 31, 33, 30, 26, 19, 20, 24, 21, 26, 19, 0, 28, 27],
    [27, 23, 19, 21, 38, 26, 25, 20, 23, 29, 27, 28, 0, 22],
    [29, 26, 24, 23, 35, 27, 29, 22, 25, 31, 28, 27, 22, 0]
];

const matrix_16 = [
    [0, 30, 28, 24, 35, 40, 29, 33, 31, 36, 38, 41, 29, 34, 32, 30],
    [30, 0, 22, 25, 32, 36, 27, 35, 29, 34, 37, 39, 26, 30, 31, 28],
    [28, 22, 0, 20, 30, 27, 23, 29, 25, 33, 34, 36, 21, 24, 26, 22],
    [24, 25, 20, 0, 31, 28, 25, 32, 27, 30, 33, 35, 24, 27, 28, 25],
    [35, 32, 30, 31, 0, 26, 28, 34, 33, 39, 35, 38, 33, 30, 34, 32],
    [40, 36, 27, 28, 26, 0, 22, 29, 31, 37, 32, 35, 30, 28, 29, 27],
    [29, 27, 23, 25, 28, 22, 0, 24, 27, 31, 30, 33, 24, 26, 28, 23],
    [33, 35, 29, 32, 34, 29, 24, 0, 25, 28, 27, 31, 30, 32, 34, 28],
    [31, 29, 25, 27, 33, 31, 27, 25, 0, 26, 29, 32, 28, 29, 30, 26],
    [36, 34, 33, 30, 39, 37, 31, 28, 26, 0, 27, 29, 31, 33, 34, 30],
    [38, 37, 34, 33, 35, 32, 30, 27, 29, 27, 0, 24, 33, 35, 36, 31],
    [41, 39, 36, 35, 38, 35, 33, 31, 32, 29, 24, 0, 36, 38, 39, 34],
    [29, 26, 21, 24, 33, 30, 24, 30, 28, 31, 33, 36, 0, 27, 28, 24],
    [34, 30, 24, 27, 30, 28, 26, 32, 29, 33, 35, 38, 27, 0, 25, 23],
    [32, 31, 26, 28, 34, 29, 28, 34, 30, 34, 36, 39, 28, 25, 0, 26],
    [30, 28, 22, 25, 32, 27, 23, 28, 26, 30, 31, 34, 24, 23, 26, 0]
];

const matrix_18 = [
  [0, 18, 29, 20, 34, 25, 34, 42, 34, 19, 25, 26, 30, 42, 29, 41, 32, 30],
  [18, 0, 18, 28, 22, 26, 22, 22, 28, 24, 22, 30, 31, 40, 23, 37, 24, 31],
  [29, 18, 0, 22, 37, 32, 31, 25, 35, 34, 34, 29, 27, 24, 35, 28, 28, 25],
  [20, 28, 22, 0, 27, 34, 19, 29, 35, 26, 27, 33, 35, 24, 27, 31, 25, 26],
  [34, 22, 37, 27, 0, 27, 22, 25, 24, 27, 19, 31, 34, 29, 31, 28, 25, 32],
  [25, 26, 32, 34, 27, 0, 30, 32, 38, 34, 23, 26, 25, 36, 31, 39, 34, 26],
  [34, 22, 31, 19, 22, 30, 0, 34, 26, 32, 27, 22, 30, 27, 38, 37, 32, 28],
  [42, 22, 25, 29, 25, 32, 34, 0, 37, 30, 32, 23, 34, 38, 25, 32, 32, 29],
  [34, 28, 35, 35, 24, 38, 26, 37, 0, 23, 30, 25, 36, 34, 40, 36, 33, 22],
  [19, 24, 34, 26, 27, 34, 32, 30, 23, 0, 34, 24, 26, 22, 24, 31, 24, 31],
  [25, 22, 34, 27, 19, 23, 27, 32, 30, 34, 0, 34, 34, 28, 31, 33, 35, 28],
  [26, 30, 29, 33, 31, 26, 22, 23, 25, 24, 34, 0, 31, 32, 28, 37, 32, 29],
  [30, 31, 27, 35, 34, 25, 30, 34, 36, 26, 34, 31, 0, 33, 36, 39, 34, 33],
  [42, 40, 24, 24, 29, 36, 27, 38, 34, 22, 28, 32, 33, 0, 30, 38, 25, 37],
  [29, 23, 35, 27, 31, 31, 38, 25, 40, 24, 31, 28, 36, 30, 0, 28, 39, 38],
  [41, 37, 28, 31, 28, 39, 37, 32, 36, 31, 33, 37, 39, 38, 28, 0, 24, 33],
  [32, 24, 28, 25, 25, 34, 32, 32, 33, 24, 35, 32, 34, 25, 39, 24, 0, 35],
  [30, 31, 25, 26, 32, 26, 28, 29, 22, 31, 28, 29, 33, 37, 38, 33, 35, 0]
];

const matrix_20 = [
  [0, 31, 36, 38, 25, 19, 24, 32, 38, 32, 34, 26, 27, 27, 36, 34, 38, 22, 30, 36],
  [31, 0, 32, 22, 38, 36, 39, 22, 37, 38, 31, 37, 28, 40, 23, 35, 28, 35, 25, 36],
  [36, 32, 0, 25, 28, 30, 31, 39, 22, 33, 37, 33, 32, 31, 33, 33, 39, 35, 27, 30],
  [38, 22, 25, 0, 33, 38, 27, 34, 31, 38, 29, 31, 40, 26, 38, 27, 30, 38, 31, 33],
  [25, 38, 28, 33, 0, 27, 38, 36, 22, 28, 32, 26, 32, 34, 35, 35, 27, 30, 31, 29],
  [19, 36, 30, 38, 27, 0, 33, 24, 31, 27, 26, 27, 32, 33, 37, 27, 38, 38, 34, 32],
  [24, 39, 31, 27, 38, 33, 0, 38, 33, 29, 31, 30, 32, 30, 36, 35, 28, 30, 31, 32],
  [32, 22, 39, 34, 36, 24, 38, 0, 31, 31, 30, 38, 32, 28, 26, 29, 36, 30, 25, 35],
  [38, 37, 22, 31, 22, 31, 33, 31, 0, 36, 25, 36, 33, 27, 38, 34, 37, 27, 39, 34],
  [32, 38, 33, 38, 28, 27, 29, 31, 36, 0, 33, 32, 30, 33, 35, 29, 28, 35, 37, 34],
  [34, 31, 37, 29, 32, 26, 31, 30, 25, 33, 0, 38, 31, 35, 38, 30, 34, 39, 35, 34],
  [26, 37, 33, 31, 26, 27, 30, 38, 36, 32, 38, 0, 33, 33, 34, 37, 33, 31, 29, 36],
  [27, 28, 32, 40, 32, 32, 32, 32, 33, 30, 31, 33, 0, 33, 34, 30, 38, 37, 29, 39],
  [27, 40, 31, 26, 34, 33, 30, 28, 27, 33, 35, 33, 33, 0, 32, 39, 28, 38, 34, 33],
  [36, 23, 33, 38, 35, 37, 36, 26, 38, 35, 38, 34, 34, 32, 0, 33, 32, 27, 29, 33],
  [34, 35, 33, 27, 35, 27, 35, 29, 34, 29, 30, 37, 30, 39, 33, 0, 35, 31, 34, 36],
  [38, 28, 39, 30, 27, 38, 28, 36, 37, 28, 34, 33, 38, 28, 32, 35, 0, 38, 35, 31],
  [22, 35, 35, 38, 30, 38, 30, 30, 27, 35, 39, 31, 37, 38, 27, 31, 38, 0, 29, 34],
  [30, 25, 27, 31, 31, 34, 31, 25, 39, 37, 35, 29, 29, 34, 29, 34, 35, 29, 0, 36],
  [36, 36, 30, 33, 29, 32, 32, 35, 34, 34, 34, 36, 39, 33, 33, 36, 31, 34, 36, 0]
];

const matrix_21 = [
  [0, 36, 44, 28, 39, 41, 45, 30, 22, 25, 41, 47, 23, 37, 38, 30, 48, 36, 42, 31, 27],
  [36, 0, 22, 40, 31, 38, 26, 41, 30, 47, 39, 44, 32, 20, 28, 34, 26, 35, 29, 24, 33],
  [44, 22, 0, 36, 34, 27, 35, 44, 39, 48, 24, 41, 34, 26, 42, 33, 21, 28, 37, 40, 31],
  [28, 40, 36, 0, 26, 38, 40, 23, 35, 29, 36, 32, 39, 34, 24, 47, 42, 27, 29, 38, 33],
  [39, 31, 34, 26, 0, 33, 30, 41, 28, 43, 31, 30, 37, 25, 36, 39, 44, 41, 25, 40, 36],
  [41, 38, 27, 38, 33, 0, 32, 40, 48, 37, 29, 22, 36, 43, 35, 45, 24, 42, 38, 28, 31],
  [45, 26, 35, 40, 30, 32, 0, 47, 36, 42, 33, 29, 43, 35, 44, 38, 30, 34, 31, 33, 40],
  [30, 41, 44, 23, 41, 40, 47, 0, 34, 31, 38, 35, 42, 39, 26, 29, 45, 43, 37, 34, 28],
  [22, 30, 39, 35, 28, 48, 36, 34, 0, 39, 37, 45, 25, 36, 40, 33, 47, 28, 44, 29, 26],
  [25, 47, 48, 29, 43, 37, 42, 31, 39, 0, 41, 39, 31, 40, 45, 38, 36, 46, 35, 41, 30],
  [41, 39, 24, 36, 31, 29, 33, 38, 37, 41, 0, 40, 30, 34, 43, 25, 28, 32, 36, 44, 27],
  [47, 44, 41, 32, 30, 22, 29, 35, 45, 39, 40, 0, 41, 39, 48, 33, 27, 37, 32, 40, 35],
  [23, 32, 34, 39, 37, 36, 43, 42, 25, 31, 30, 41, 0, 30, 38, 36, 46, 24, 40, 35, 29],
  [37, 20, 26, 34, 25, 43, 35, 39, 36, 40, 34, 39, 30, 0, 31, 40, 33, 38, 30, 27, 25],
  [38, 28, 42, 24, 36, 35, 44, 26, 40, 45, 43, 48, 38, 31, 0, 44, 46, 39, 35, 34, 30],
  [30, 34, 33, 47, 39, 45, 38, 29, 33, 38, 25, 33, 36, 40, 44, 0, 31, 35, 37, 40, 29],
  [48, 26, 21, 42, 44, 24, 30, 45, 47, 36, 28, 27, 46, 33, 46, 31, 0, 39, 42, 30, 41],
  [36, 35, 28, 27, 41, 42, 34, 43, 28, 46, 32, 37, 24, 38, 39, 35, 39, 0, 34, 33, 36],
  [42, 29, 37, 29, 25, 38, 31, 37, 44, 35, 36, 32, 40, 30, 35, 37, 42, 34, 0, 39, 28],
  [31, 24, 40, 38, 40, 28, 33, 34, 29, 41, 44, 40, 35, 27, 34, 40, 30, 33, 39, 0, 36],
  [27, 33, 31, 33, 36, 31, 40, 28, 26, 30, 27, 35, 29, 25, 30, 29, 41, 36, 28, 36, 0]
];

const matrix_22 = [
  [0, 31, 40, 38, 25, 19, 24, 32, 38, 32, 34, 26, 27, 27, 36, 34, 38, 22, 30, 36, 39, 32],
  [31, 0, 32, 22, 38, 36, 39, 22, 37, 38, 31, 37, 28, 40, 23, 35, 28, 35, 25, 36, 30, 32],
  [40, 32, 0, 25, 28, 30, 31, 39, 22, 33, 37, 33, 32, 31, 33, 33, 39, 35, 27, 30, 28, 34],
  [38, 22, 25, 0, 33, 38, 27, 34, 31, 38, 29, 31, 40, 26, 38, 27, 30, 38, 31, 33, 29, 35],
  [25, 38, 28, 33, 0, 27, 38, 36, 22, 28, 32, 26, 32, 34, 35, 35, 27, 30, 31, 29, 37, 32],
  [19, 36, 30, 38, 27, 0, 33, 24, 31, 27, 26, 27, 32, 33, 37, 27, 38, 38, 34, 32, 36, 30],
  [24, 39, 31, 27, 38, 33, 0, 38, 33, 29, 31, 30, 32, 30, 36, 35, 28, 30, 31, 32, 35, 29],
  [32, 22, 39, 34, 36, 24, 38, 0, 31, 31, 30, 38, 32, 28, 26, 29, 36, 30, 25, 35, 40, 32],
  [38, 37, 22, 31, 22, 31, 33, 31, 0, 36, 25, 36, 33, 27, 38, 34, 37, 27, 39, 34, 34, 29],
  [32, 38, 33, 38, 28, 27, 29, 30, 25, 33, 0, 38, 31, 35, 38, 30, 34, 39, 35, 34, 35, 32],
  [34, 31, 37, 29, 32, 26, 31, 30, 36, 33, 38, 0, 33, 33, 34, 37, 33, 31, 29, 36, 30, 39],
  [26, 37, 33, 31, 26, 27, 30, 38, 36, 32, 38, 33, 0, 33, 34, 37, 39, 31, 28, 39, 31, 40],
  [27, 28, 32, 40, 32, 32, 32, 32, 33, 30, 31, 33, 33, 0, 32, 39, 34, 38, 35, 33, 32, 34],
  [36, 23, 33, 38, 35, 37, 36, 26, 38, 35, 38, 34, 34, 32, 0, 33, 32, 27, 29, 33, 36, 33],
  [34, 35, 33, 27, 35, 27, 35, 29, 34, 29, 30, 37, 37, 39, 33, 0, 35, 31, 34, 36, 38, 37],
  [38, 28, 39, 30, 27, 38, 28, 36, 37, 28, 34, 33, 39, 34, 32, 35, 0, 38, 35, 31, 38, 34],
  [22, 35, 35, 38, 30, 38, 30, 30, 27, 35, 39, 31, 31, 38, 27, 31, 38, 0, 29, 34, 37, 32],
  [30, 25, 27, 31, 31, 34, 31, 25, 39, 37, 35, 29, 29, 34, 29, 34, 35, 29, 0, 36, 32, 40],
  [36, 36, 30, 33, 29, 32, 32, 35, 34, 34, 34, 36, 39, 33, 33, 36, 31, 34, 36, 0, 39, 35],
  [39, 30, 34, 32, 37, 36, 35, 40, 34, 35, 35, 30, 31, 32, 36, 38, 38, 37, 32, 39, 0, 33],
  [32, 32, 34, 35, 32, 30, 29, 32, 29, 32, 32, 39, 40, 34, 33, 37, 34, 32, 40, 35, 33, 0]
];

const { performance } = require('perf_hooks');
const start = performance.now();
const result = tsp_hk(matrix_21);
const end = performance.now();

console.log("Result:", result);
console.log("Time:", (end-start).toFixed(2), "ms");
