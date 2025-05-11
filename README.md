# CTD Pre-Work: Art Explorer

A web project that uses the Art Institute of Chicago API to display random artworks or let users search by title, artist, or keyword.

## Author
Martin Rysan

## Features

- Toggle between two pages: Random Art and Art Finder 
- View random artworks with title, description, and image
- Search for art by title, artist, or keyword
- Responsive layout and basic styling
- Error handling for search functionality


## Installation

Clone this repository to your local machine:

```bash
git clone https://github.com/mrysan/art-explorer
cd art-explorer
```


## How To Run

This is a static website, so no installation is needed to run

### On Mac:
open index.html

### On Windows (Command Prompt or PowerShell):
start index.html

### On Windows (Git Bash or WSL):
explorer.exe index.html

Alternatively, you can open index.html manually by double-clicking it or using your browser’s “File > Open File” option.


## How to Use

You can switch between the two views at any time using the top buttons.

### Random Art
- Click **"Random Art"** to switch to the Random Art view.
- Click **"Surprise Me with Random Art"** to view a randomly selected artwork.
- The artwork's title, description, and image will be displayed.

### Art Finder 
- Click **"Art Finder"** to switch to the search view.
- Enter a title, artist, or keyword ("Mona Lisa", "Picasso", "cat").
- Click **"Search"** to view matching artwork.
- If no matches are found, an error message will appear.


## Endpoints Used 
- Random Art page uses the search by ID endpoint: GET /artworks/{id}
- Art Finder page uses the search by query endpoint: GET /artworks/search
- documentation: https://api.artic.edu/docs/#collections
