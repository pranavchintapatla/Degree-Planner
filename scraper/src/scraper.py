""" Scraper """

import json
import re
import os
from urllib.request import urlopen
from bs4 import BeautifulSoup
import urllib.parse as urlparse
from urllib.parse import urlencode
from parse_requirements import parse

year_objs = [
    {'name': '2023', 'query': '123'},
    {'name': '2022', 'query': '122'},
    {'name': '2021', 'query': '121'},
    {'name': '2020', 'query': '120'},
]

terms_objs = [
    {'name': 'SS', 'query': '0'},
    {'name': 'S1', 'query': '3'},
    {'name': 'S2', 'query': '5'},
]

stages = ['1', '2', '3']  # eg. 120, 220, 320


faculties = [
    {
        "id": "1200",
        "name": "Arts"
    },
    {
        "id": "1500",
        "name": "Business and Economics"
    },
    {
        "id": "1000",
        "name": "Creative Arts and Industries"
    },
    {
        "id": "3170",
        "name": "Education and Social Work"
    },
    {
        "id": "1600",
        "name": "Engineering"
    },
    {
        "id": "1900",
        "name": "Law"
    },
    {
        "id": "2000",
        "name": "Medical and Health Sciences"
    },
    {
        "id": "4000",
        "name": "Science"
    }
]


def get_courses_page_url(year='2022', term='0', stage='1', page=0, faculty_id=None):
    """ Get the URL for the courses page """

    url = 'https://courseoutline.auckland.ac.nz/dco/course/advanceSearch'

    params = {
        'termCodeYear': year,
        'termCodeTerm': term,
        'stage': stage,
        'pageNumber': page,
    }

    if faculty_id:
        params['facultyId'] = faculty_id

    url_parse = urlparse.urlparse(url)
    query = url_parse.query
    url_dict = dict(urlparse.parse_qsl(query))
    url_dict.update(params)
    url_new_query = urlparse.urlencode(url_dict)
    url_parse = url_parse._replace(query=url_new_query)
    new_url = urlparse.urlunparse(url_parse)

    return new_url


def courses_scraper():
    """ Scrape the courses from the courseoutline website """

    # Go through each year
    for year_obj in year_objs:
        print(f'\n⏳ Start scraping for year {year_obj["name"]}')

        gened_courses = []

        for faculty in faculties:
            print(f'  Faculty: {faculty["name"]}')
            courses = []

            for terms_obj in terms_objs:
                print(f'    Term: {terms_obj["name"]}')

                for stage in stages:
                    print(f'      Stage: {stage}')

                    page_url = get_courses_page_url(
                        year=year_obj['query'], term=terms_obj['query'], stage=stage, faculty_id=faculty['id'])
                    page = urlopen(page_url)
                    html = page.read().decode('utf-8')
                    soup = BeautifulSoup(html, 'html.parser')
                    pages = soup.find_all('a', 'page-index')
                    course_cards = soup.find_all('div', class_='course-card')

                    last_page_number = 1

                    if len(course_cards) == 0:
                        print(f'{page_url} - No courses found')
                        continue
                    if len(pages) > 0:
                        last_page_number = int(pages[-1].text)

                    # Go through all pages
                    for i in range(0, last_page_number):
                        page = urlopen(get_courses_page_url(year=year_obj['query'], term=terms_obj['query'],
                                                            stage=stage, page=i, faculty_id=faculty['id']) + '&pageNumber=' + str(i))
                        html_bytes = page.read()
                        html = html_bytes.decode('utf-8')
                        soup = BeautifulSoup(html, 'html.parser')

                        course_cards = soup.find_all('div', class_='course-card')

                        # Go through all course cards
                        for course_card in course_cards:
                            course = parse_course_card(course_card, year_obj['name'], terms_obj['name'])

                            if course and course['courseid'][-1] == 'G':
                                gened_courses.append(course)
                            elif course:
                                courses.append(course)

                        print(f'       - Page {i + 1} / {last_page_number} done.')
                        if i + 1 == last_page_number:
                            print()

            faculty_name = ('-').join(faculty['name'].lower().split(' '))
            file_name = f'{faculty_name}-{year_obj["name"]}.json'

            os.chdir(os.path.join(os.path.dirname(__file__), '../data/'))

            with open(file_name, 'w', encoding="UTF-8") as file:
                file.write(json.dumps(courses, indent=4))
                print(f'✅ Saved to {os.path.join(os.getcwd(), file_name)}\n')

        file_name = f'geneds-{year_obj["name"]}.json'
        os.chdir(os.path.join(os.path.dirname(__file__), '../data/'))

        with open(file_name, 'w', encoding="UTF-8") as file:
            file.write(json.dumps(gened_courses, indent=4))
            print(f'✅ Saved to {os.path.join(os.getcwd(), file_name)}\n')


def parse_course_card(course_card: BeautifulSoup, year, term):
    """ Parse a course card and return a dict with the course info """
    courseid_el = course_card.find('h4', class_='course-code')  # COMPSCI 110

    if not courseid_el:
        return None

    courseid = courseid_el.text.strip()

    # Introduction to Computer Systems
    coursename_el = course_card.select_one('.course-title')
    coursename = coursename_el.text.strip() if coursename_el else ''

    # An introduction to the various layers that make up a modern computer system:
    # encoding of data and instructions, hardware, low-level programming,
    # operating systems, applications and communications.
    description_el = course_card.select_one('.course-prescription')
    description = description_el.text.strip() if description_el else ''

    subject_el = course_card.select_one('.subject-description-text')  # Computer Science
    subject = subject_el.text.strip() if subject_el else ''

    # Restriction: Cannot be taken with or after COMPSCI 210
    requirements_el = course_card.select_one('.requirement-description')
    requirements = requirements_el.text.strip() if requirements_el else ''

    url_el = course_card.select_one('.course-card-details').find('a', href=True)
    url = url_el['href'] if url_el else ''

    course = {
        'courseid': courseid,
        'coursename': coursename,
        'description': description,
        'subject': subject,
        'term': term,
        'year': year,
        'requirements': requirements,
        'url': url
    }

    course = add_parsed_requirements(course)

    return course


def add_parsed_requirements(obj):
    """ Add parsed requirements to the object """
    reqs = obj['requirements'].split('\n')

    for req in reqs:
        req = req.strip()

        if re.search('Prerequisite', req):
            # Prerequisite: A course or number of points you must have passed before you can enrol in a course.
            # If you haven’t successfully completed a prerequisite, you can’t enrol into this course online.
            obj['prerequisite_raw'] = req.replace('Prerequisite:', '').strip()
            obj['prerequisite'] = parse(obj['prerequisite_raw']) if obj['prerequisite_raw'] else ''
        elif re.search('Restriction', req):
            # Restriction: A course which is so similar to another that you cannot take them both.
            obj['restriction_raw'] = req.replace('Restriction:', '').strip()
            obj['restriction'] = parse(obj['restriction_raw']) if obj['restriction_raw'] else ''
        elif re.search('Corequisite', req):
            # Corequisite: A course you must take in the same semester as another course (unless you have previously passed the corequisite).
            obj['corequisite_raw'] = req.replace('Corequisite:', '').strip()
            obj['corequisite'] = parse(obj['corequisite_raw']) if obj['corequisite_raw'] else ''
        else:
            obj['other_requirements_raw'] = req
            obj['other_requirements'] = parse(obj['other_requirements_raw']) if obj['other_requirements_raw'] else ''

    return obj


def parse_section(section: BeautifulSoup):
    """ Parse a section and return a dict with the section info """

    result = {}
    title = section.select_one('[class^="schedule-h"]')

    if title and title.text.strip() in ['Biotechnology', 'Major must include:']:
        return None

    if title:
        result['title'] = title.text.strip()

    note = section.select_one('[class^="schedule-note"]')
    if note:
        result['note'] = note.text.strip()

    reqs_elements = section.select('[class^="schedule-bullet"]')
    result['requirements'] = ['and']
    result_or = None
    raw_requirements = ['and']
    raw_requirements_or = None
    has_or = False

    for req_element in reqs_elements:
        rule = req_element.text.strip()
        rule = rule.replace('\u2013', '-')

        if rule in ['or the following pathway:', 'or one of the following pathways:']:
            continue

        if rule == 'either':
            result_or = ['or']
            raw_requirements_or = ['or']
            has_or = True
            continue

        if 'schedule-bullet-indent' in req_element['class'] and result_or:
            result_or.append(parse(rule))
            raw_requirements_or.append(rule)
            has_or = False
            continue

        if 'schedule-bullet-aeo' in req_element['class'] and rule == 'or':
            continue

        if 'schedule-bullet-aeo-indent' in req_element['class']:
            continue

        if title.text.strip() == 'Data Science' and result_or and has_or:
            result_or.append(parse(rule))
            raw_requirements_or.append(rule)
            continue

        if result_or and len(result_or) > 1:
            result['requirements'].append(result_or)
            raw_requirements.append(raw_requirements_or)
        else:
            raw_requirements.append(rule)
            result['requirements'].append(parse(rule))

        result_or = None

    result['requirements_raw'] = ' and '.join(
        ['either ' + ' or '.join(i[1:]) if isinstance(i, list) else i for i in raw_requirements[1:]])

    return result


def majors_specs_modules_scraper(type='majors'):
    """ Scrape the majors from the calendar website """

    print('\n⏳ Start scraping Majors')
    print('...')

    url = 'https://www.calendar.auckland.ac.nz/en/progreg/regulations-science/bsc.html'
    context_manager = urlopen(url)
    html = context_manager.read().decode('utf-8')
    context_manager.close()

    soup = BeautifulSoup(html, 'html.parser')

    regulation_schedules = soup.find_all('div', 'regulationSchedule')

    # Regulation Schedule:
    #
    # Courses available for the BSc:
    # Capstone courses available:
    # BSc majors:
    # BSc specialisations:
    # Modules available:

    title_by_type = {
        'majors': 'BSc majors:',
        'specialisations': 'BSc specialisations:',
        'modules': 'Modules available:',
    }

    result = []

    for s in regulation_schedules:
        title = s.find('h2', 'schedule-h2')

        if not title or title.text.strip() != title_by_type[type]:
            continue

        container = s.select_one('div#regs > .par.parsys')

        if not container:
            continue

        sections = container.find_all('div', 'section', recursive=False)

        for section in sections:
            if 'regulationSubject' in section['class']:
                obj = parse_section(section)
                if not obj:
                    continue
                obj['paths'] = []
                result.append(obj)

            if 'regulationSubSchedule' in section['class']:
                obj = parse_section(section)
                if not obj:
                    continue
                result[-1]['paths'].append(obj)

    os.chdir(os.path.join(os.path.dirname(__file__), '../data/'))

    file_name = f'{type}.json'
    with open(file_name, 'w', encoding="UTF-8") as file:
        file.write(json.dumps(result, indent=4))
        print(f'✅ Saved to {os.path.join(os.getcwd(),file_name)}')


def main():
    """ Main function; Entry point """

    # 1) Scrape BCs majors to data/majors.json
    majors_specs_modules_scraper('majors')

    # 2) Scrape BCs specialisations to data/specialisations.json
    majors_specs_modules_scraper('specialisations')

    # 3) Scrape BCs modules to data/modules.json
    majors_specs_modules_scraper('modules')

    # 4) Scrape courses to data/{faculty}-{yyyy}.json
    courses_scraper()


main()
