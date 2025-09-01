import sys
import re
import json
from pprint import pprint


def add_course_name_to_numbers(string):
    string = string.replace('/', ', ')

    words = re.split(r'\s+', string)
    current_course = ''
    current_course_index = 0

    for i in range(len(words)):
        word = words[i]

        if re.search(r'[A-Z]{4,8}', word):
            current_course = word
            current_course_index = i
        elif i < len(words) - 1 and re.search(r'\d{3}', word) and re.search(r'points', words[i + 1]):
            continue
        elif i > current_course_index + 1 and re.search(r'\d{3}', word):
            words[i] = current_course + ' ' + word

    return ' '.join(words)


# ['and', ['and', 'COMPSCI 101', 'COMPSCI 130'], ['and', 'COMPSCI 110', 'COMPSCI 120']]
# ->
# ['and', 'COMPSCI 101', 'COMPSCI 130', 'COMPSCI 110', 'COMPSCI 120']
def simplify_array(arr, type=None):
    if not isinstance(arr, list):
        return arr

    new_arr = [arr[0]]

    if type:
        new_arr = []

    if arr[0] == 'or' or arr[0] == 'and':
        type = arr[0]
    else:
        type = None

    for i in range(1, len(arr)):
        if not isinstance(arr[i], list):
            new_arr.append(arr[i])
            continue

        if type == arr[i][0]:
            [new_arr.append(el) for el in simplify_array(arr[i], type)]
        else:
            new_arr.append(simplify_array(arr[i]))

    return new_arr


def create_rule_points_from(string):
    # '75 points, including at least 15 points from EARTHSCI 103, EARTHSCI 120'

    x = re.match(r'(\d\d points, including at least)', string)
    if x:
        arr = string.split('including at least ')
        return [x.group(1)] + [parse_points_from(arr[1])]

    points = re.match(r'(\d\d) points from', string).group(1)
    string_subjects = re.sub(r'(\d\d) points from', '', string).strip()
    # split by "or" for the exception "30 points from MEDSCI 100-320 or BSc courses"
    subjects = re.split(r', | or | and ', string_subjects)

    return [points] + subjects


def parse_points_from_mix(string):
    or_array = re.split(r'(?:, or| or) (?=\d\d points from|a B\+)', string)

    if len(or_array) == 1:
        or_array = re.split(r', or ', string)

    if len(or_array) > 1:
        parsed_or_array = []

        for rule in or_array:
            parsed_or_array.append(parse_prereq(rule))

        if len(parsed_or_array) == 1:
            return parsed_or_array[0]
        else:
            return ['or'] + parsed_or_array

    and_array = re.split(r'(?:, and| and|,|, and either|, including at least|. More than) (?=\d\d points from)', string)
    parsed_and_array = []

    if len(and_array) > 1:
        for rule in and_array:
            parsed_and_array.append(parse_prereq(rule))

        if len(parsed_and_array) == 1:
            return parsed_and_array[0]
        elif re.search(r'including at least', string):
            return parsed_and_array
        else:
            return ['and'] + parsed_and_array

    match = re.match(r'at least ([12]?\d[05]) points from (.*)', string)

    if match and match.group(1) and match.group(2):
        subjects = re.split(r', | or ', match.group(2))
        return [match.group(1)] + subjects

    return string


def parse_further_points_from(string):
    match = re.match(r'(?:a further )([12]?\d[05]) points from (.*)', string)

    if match and match.group(1) and match.group(2):
        subjects = re.split(r', | or ', match.group(2))

        return [match.group(1)] + subjects

    return string


def parse_points_from(string):
    # '15 points from ENGGEN 150, ENGSCI 111, STATS 125 with a B+ or higher'
    string = string.replace(' with a B+ or higher', '')
    # STATS 210 or 225, and 15 points from MATHS 208, 250 or equivalent
    if not re.search(' and ', string):
        string = string.replace(' or equivalent', ', equivalent')

    if re.search(r'^\d\d points from ([A-Z]{4,8} [1237]\d\dG?(, | or )?)+$', string):
        return create_rule_points_from(string)

    and_array = re.split(r'(?:, and| and|,|, and either) (?=\d\d points from)', string)
    parsed_and_array = []

    for rule in and_array:
        # There are 4 exceptions with additional separation with "or" and "and"
        if re.search(r' or (?!BSc courses)', rule):
            parsed_and_array.append(and_or_split(rule))
        else:
            parsed_and_array.append(create_rule_points_from(rule))

    if len(parsed_and_array) == 1:
        return parsed_and_array[0]
    else:
        return ['and'] + parsed_and_array


def parse_points_at_stage(string):
    # At least 45 points at Stage I -> 45 points at Stage I
    string = re.sub(r'At least ', '', string)
    string = re.sub(r'at least ', '', string)
    string = re.sub(r'Any ', '', string)

    # FOODSCI 303 or 310 and a further 30 points at Stage III in Food Science and Nutrition
    string = re.sub(r'a further ', '', string)
    # 15 points at Stage II or III in Exercise Sciences and Departmental approval
    if re.search('and Departmental approval', string):
        rules = re.split(r' and (?=Departmental approval)', string)
        result = ['and']

        for rule in rules:
            result.append(parse_prereq(rule))

        return result

    or_array = re.split(r'(?: or |, or )(?=\d\d points at Stage)', string)

    if len(or_array) > 1:
        parsed_or_array = ['or']

        for rule in or_array:
            parsed_or_array.append(parse_prereq(rule))

        return parsed_or_array

    and_array = re.split(
        r'(?:;| and)? (?=\d\d points (?:passed at|at|from other) Stage)|(?: and) (?=[A-Z]{4,8} \d{3})', string)

    if len(and_array) > 1:
        parsed_and_array = ['and']

        for rule in and_array:
            parsed_and_array.append(parse_prereq(rule))

        return parsed_and_array

    or_array2 = re.split(r'(?: or )(?=[A-Z]{4,8} \d{3})', string)

    if len(or_array2) > 1 and not re.search(r', including', string):
        parsed_or_array2 = ['or']

        for rule in or_array2:
            parsed_or_array2.append(parse_prereq(rule))

        return parsed_or_array2

    match = re.match(
        r'(\d\d) points (?:passed at|at|from other) (Stage I{1,3}(?: or I{2,3})?)(?: in either| in|, including)?( .*)?', string)

    if match:
        rule = '{}:{}'.format(match.group(1), match.group(2))  # e.g. "30:Stage II"

        rules = []

        if match.group(3):
            rules = re.split(r', or |, | or ', match.group(3).strip())

        return [rule] + rules
    else:
        return string


def parse_points(string):
    match = re.match(r'^(?:Any )?(\d{1,3}) points(: .*)?', string)

    if match:
        if match.group(2):
            subjects = match.group(2).replace(': ', '')
            return [match.group(1)] + re.split(r', | or ', subjects)
        return match.group(1)

    return string


def parse_grade(string):
    string = string.strip()
    or_rules = string.split(', or ')

    if len(or_rules) == 1:
        or_rules = re.split(r' or ?(?=(?:a )?[ABC](?:\+|\-)? )', string)

    if len(or_rules) > 1:
        result = ['or']
        for or_rule in or_rules:
            result.append(parse_prereq(or_rule))
        return result

    and_rules = re.split(r'(?: and )(?=a [ABC]\+|\-)', string)

    if len(and_rules) > 1:
        result = ['and']
        for and_rule in and_rules:
            result.append(parse_prereq(and_rule))
        return result
    match = re.match(r'(?:a |at least )?([ABC](?:\+|\-)?)(?: or higher)? in(?: either)? (.*)', string)
    if match:
        return [match.group(1), parse_prereq(match.group(2))]

    return string


def parse_concurrent_enrolment(string):
    string = string.replace('either ', '')
    rules = string.split(' in ')
    return ['Concurrent enrolment', parse_prereq(rules[1])]


def parse_concurrent_enrolment_recommended(string):
    match = re.match(r'Concurrent enrolment in (.*?) is recommended', string)

    if match and match.group(1):
        return ['Concurrent enrolment recommended', parse_prereq(match.group(1))]

    return string


def parse_gpa(string):
    rules = re.split(r'(?<=\d\.\d)(?: or higher)? and ', string)

    if len(rules) > 1:
        result = ['and']
        for rule in rules:
            result.append(parse_prereq(rule))
        return result

    match = re.match(r'.*?GPA of (\d\.\d)', string)
    if match:
        return 'GPA:' + match.group(1)
    return string


def parse_points_passed(string):
    match = re.search(r'(?:a further|a minimum of) ([12]?\d[05]) points passed', string)
    if match:
        return match.group(1)
    return string


def parse_cannot_be_taken_with_or_after(string):
    string = re.sub(r'Cannot be taken(, concurrently)? with,? or after,? ', '', string)

    # Exception:
    # Cannot be taken at the same time as any other chemistry course, or after any successfully completed chemistry course, other than CHEM 100/CHEM 100G
    match = re.search(r'Cannot be taken at the same time as any other (.*?) course, or after any successfully completed (.*?) course, other than ([A-Z]{4,8} [1237]\d\dG?), ([A-Z]{4,8} [1237]\d\dG?)', string)
    if match:
        if len(match.groups()) < 4:
            return string
        course = match.group(1)[0].upper() + match.group(1)[1:]
        exceptions = ['Exceptions', match.group(3), match.group(4)]
        return ['Cannot be taken with or after', course, exceptions]

    result = ['Cannot be taken with or after']
    subjects = re.split(r', ', string)

    for subject in subjects:
        result.append(subject)

    return result


def parse_may_not_be_taken_with_or_after(string):
    # May not be taken with, or after passing, any other Statistics course
    string = re.sub(r'May not be taken with, or after passing, any other ', '', string)

    result = ['May not be taken with or after']
    match = re.match(r'(.*?) course', string)

    if match:
        result.append(match.group(1))

    return result


def parse_may_not_be_taken_after(string):
    # MATHS 190 may not be taken after any Mathematics course at Stage III
    string = re.sub(r'([A-Z]{4,8} [1237]\d\d )?may not be taken after any ', '', string)

    result = ['May not be taken after']
    match = re.match(r'(.*?) course at (Stage I{1,3})', string)

    if match and match.group(1) and match.group(2):
        result.append(match.group(1) + ':' + match.group(2))

    return result


def parse_may_not_be_taken_after_mix(string):
    # MATHS 102 may not be taken concurrently with any other Mathematics course, except MATHS 190 \
    # and may not be taken after ENGSCI 111 or any Mathematics course at Stage I or above, except MATHS 190/190G
    and_array = re.split(r' and (?=may not be taken after)', string)
    result = ['and']

    match1 = re.match(
        r'[A-Z]{4,8} [1237]\d\d may not be taken concurrently with any other (.*?) course, except ([A-Z]{4,8} [1237]\d\d)', and_array[0])
    if match1 and match1.group(1) and match1.group(2):
        result.append(['May not be taken concurrently with', match1.group(1), ['Exceptions', match1.group(2)]])

    match2 = re.match(
        r'may not be taken after ([A-Z]{4,8} [1237]\d\dG?) or any (.*?) course at Stage I or above, except ([A-Z]{4,8} [1237]\d\dG?), ([A-Z]{4,8} [1237]\d\dG?)', and_array[1])
    if match2 and match2.group(1) and match2.group(2) and match2.group(3) and match2.group(4):
        or_result = ['or']
        or_result.append(['May not be taken after', match2[1]])
        or_result.append(['May not be taken after', match2[2], ['Exceptions', match2[3], match2[4]]])
        result.append(or_result)
    return result


def parse_must_enrol_in(string):
    # To complete this course students must enrol in CHEM 254 A and B, or CHEM 254
    match = re.match(
        r'To complete this course students must enrol in ([A-Z]{4,8} [1237]\d\d) A and B, or ([A-Z]{4,8} [1237]\d\d)', string)

    if match and len(match.groups()) == 2 and match.group(1) == match.group(2):
        subject = match.group(1)

        return ['To complete must enrol',
                ['or',
                 ['and', '{}A'.format(subject), '{}B'.format(subject)],
                 subject
                 ]
                ]

    return string


def and_or_split(string):
    string = string.strip()
    if not re.search(r' or | and |, ', string):
        return string

    string = string.replace('Either ', '')  # Either CHEM 110 and 120, or at least B- in CHEM 110 or 120
    # 45 points at Stage II, including EARTHSCI 262 or GEOG 262, or equivalent
    string = string.replace(', or equivalent', ' or equivalent')

    # Exception: STATS 201, 207, or 208 or BIOSCI 209; and STATS 220 or COMPSCI 101
    if re.search(r'^((, or |, | or )?(?! and )[A-Z]{4,8} [1237]\d\d)*$', string) and re.search(' or ', string):
        string = re.sub(r', or |, ', ' or ', string)

    # ;and split
    and_rules = string.strip().split('; and ')
    result = ['and']

    if len(and_rules) > 1:
        for and_rule in and_rules:
            result.append(parse_prereq(and_rule))
        return result

    # or split
    or_rules = string.strip().split(', or ')
    result = ['or']

    if len(or_rules) > 1:
        for or_rule in or_rules:
            result.append(parse_prereq(or_rule))
        return result

    # and split
    and_rules = re.split(r' and (?:either )?(?!Nutrition)|, and ', string)
    result2 = ['and']

    if len(and_rules) > 1:
        for and_rule in and_rules:
            result2.append(parse_prereq(and_rule))

        return result2

    # or split 2
    or_rules2 = re.split(r' or (?!higher)', string)
    result3 = ['or']

    if len(or_rules2) > 1:
        for or_rule2 in or_rules2:
            result3.append(parse_prereq(or_rule2))
        return result3

    # do NOT split comma "," if there is a rule.
    comma_rules = [string] if re.search(r'^\d\d points from', string) else string.strip().split(',')
    result4 = ['and']

    for comma_rule in comma_rules:

        if len(comma_rules) > 1:
            result4.append(parse_prereq(comma_rule.strip()))
        else:
            result4 = parse_prereq(comma_rule.strip())

    return result4


counter = 0
same_string_check = ''
string_counter = 0


def parse_prereq(string):
    # global counter
    # counter += 1
    # if counter > 600:
    #     print('Error: Too many loops')

    # Loop detection
    global same_string_check
    global string_counter
    if same_string_check == string:
        string_counter += 1
        if string_counter > 20:
            print('Error: same string')
    else:
        string_counter = 0
    same_string_check = string

    if re.search(r'^a further \d\d points from [A-Z]{4,8}', string):
        return parse_further_points_from(string)
    if re.search(r'^\d\d points from [A-Z]{4,8}', string):
        return parse_points_from(string)
    if re.search(r'.+\d\d points from [A-Z]{4,8}', string):
        return parse_points_from_mix(string)
    if re.search(r'^([Aa]t least |a further |Any )?\d\d points (passed at|at|from other) Stage I{1,3}', string):
        return parse_points_at_stage(string)
    if re.search(r'^(Any )?\d{1,3} points', string):
        return parse_points(string)
    if re.search(r'[ABC](\+|\-)?( or higher)? in(?! CIE)', string):
        return parse_grade(string)
    if re.search(r'^a concurrent enrolment in', string):
        return parse_concurrent_enrolment(string)
    if re.search(r'(Mimimum |a )?(GPA|Grade Point Average) of \d\.\d( or higher)?', string):
        return parse_gpa(string)
    if re.search(r'^(a further|a minimum of) [12]?\d[05] points passed', string):
        return parse_points_passed(string)
    if re.search(r'Cannot be taken(, concurrently)? with,? or after,?|Cannot be taken at the same time.*?, or after', string):
        return parse_cannot_be_taken_with_or_after(string)
    if re.search(r'May not be taken with, or after passing, any other', string):
        return parse_may_not_be_taken_with_or_after(string)
    if re.search(r'may not be taken after any', string):
        return parse_may_not_be_taken_after(string)
    if re.search(r'and may not be taken after', string):
        return parse_may_not_be_taken_after_mix(string)
    if re.search(r'Concurrent enrolment in .*? is recommended', string):
        return parse_concurrent_enrolment_recommended(string)
    if re.search(r'To complete this course students must enrol in ', string):
        return parse_must_enrol_in(string)

    return and_or_split(string)


def check_exceptions(string):
    return string in ['No pre-requisites or restrictions']


def wrap_with_array(prereq):
    if isinstance(prereq, str):
        if re.search(r'^[A-Z]{4,8} [1237]\d\dG?$', prereq):
            return ['and', prereq]
        else:
            return [prereq]
    return prereq


def parse(string):
    if check_exceptions(string):
        return ''
    prereq = add_course_name_to_numbers(string)
    parsed_prereq = parse_prereq(prereq)
    parsed_prereq = wrap_with_array(parsed_prereq)
    return simplify_array(parsed_prereq)





old_req = sys.argv[0]
#old_req = "BIOSCI 108, 109 and STATS 101 or 108"
new_req = parse(old_req)
print(new_req)



    


