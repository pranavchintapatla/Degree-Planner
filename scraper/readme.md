## How it works

There are two steps in the scraper:

- ### 1) Scraping data

  The scraper is written in Python and uses the requests library to make HTTP requests to the course outline website. It then uses BeautifulSoup to parse the HTML and extract the data.

  Two UoA websites are used to scrape the data:

  - Scraping courses from: https://courseoutline.auckland.ac.nz/dco/course/advanceSearch

  - Scraping majors, specialisations and modules from: https://www.calendar.auckland.ac.nz/en/progreg/regulations-science/bsc.html

- ### 2) Parsing data into the machine-readable format

  The parser is written in Python and uses algorithms with many conditions and regular expressions for extracting logical parts of the raw requirements string and combining them into the machine-readable structure.

  E.g. from the requirements string for MATHS 208:

  ```json
  "Prerequisite: 15 points from MATHS 108, 150, 153, ENGSCI 111, ENGGEN 150, or MATHS 120 and MATHS 130, or B- or higher in MATHS 110\nRestriction: Cannot be taken, concurrently with, or after MATHS 250, 253"
  ```

  to the machine-readable format:

  ```json
  "prerequisite": [
      "or",
      [
        "15",
        "MATHS 108",
        "MATHS 150",
        "MATHS 153",
        "ENGSCI 111",
        "ENGGEN 150"
      ],
      [
        "and",
        "MATHS 120",
        "MATHS 130"
      ],
      [
        "B-",
        "MATHS 110"
      ]
    ],
    "restriction": [
      "Cannot be taken with or after",
      "MATHS 250",
      "MATHS 253"
    ]
  ```

## Installation

Install python 3.6 or higher on your system.
Install `virtualenv` if you don't have it already.

```bash
pip install virtualenv
```

Then install the python virtual environment and requirements:

```bash
virtualenv venv && source venv/bin/activate && pip install -r requirements.txt
```

## How to run the scraper

1. From the `/scraper` folder run the scraper:

```bash
python src/scraper.py
```

2. After the scraper is finished, make sure there are `data/majors.json`, `data/specialisations.json`, `data/modules.json` and files for each faculty and year `data/{faculty}-{year}.json`.

## Testing parser

The parser is tested using `pytest`. To run the tests, run `pytest -vv` from the root folder.
Each requirement case has a test in `/tests` folder.

```bash
pytest -vv
```
