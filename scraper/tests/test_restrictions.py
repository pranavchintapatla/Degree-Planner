from ..src.parse_requirements import parse


def test_restrictions_one_subject():
    assert parse('BIOSCI 104') == ['and', 'BIOSCI 104']
    assert parse('ENGSCI 255') == ['and', 'ENGSCI 255']
    assert parse('ENVSCI 310') == ['and', 'ENVSCI 310']
    assert parse('FOODSCI 100') == ['and', 'FOODSCI 100']
    assert parse('FOODSCI 201') == ['and', 'FOODSCI 201']
    assert parse('FOODSCI 302') == ['and', 'FOODSCI 302']
    assert parse('GEOG 261') == ['and', 'GEOG 261']
    assert parse('GEOG 262') == ['and', 'GEOG 262']
    assert parse('GEOG 312') == ['and', 'GEOG 312']
    assert parse('GEOG 317') == ['and', 'GEOG 317']
    assert parse('GEOG 318') == ['and', 'GEOG 318']
    assert parse('GEOG 334') == ['and', 'GEOG 334']
    assert parse('GEOPHYS 213') == ['and', 'GEOPHYS 213']
    assert parse('GEOPHYS 330') == ['and', 'GEOPHYS 330']
    assert parse('GEOPHYS 331') == ['and', 'GEOPHYS 331']
    assert parse('MARINE 304') == ['and', 'MARINE 304']
    assert parse('MATHS 199') == ['and', 'MATHS 199']
    assert parse('MATHS 255') == ['and', 'MATHS 255']
    assert parse('MATHS 750') == ['and', 'MATHS 750']
    assert parse('PHYSICS 103') == ['and', 'PHYSICS 103']
    assert parse('PHYSICS 120') == ['and', 'PHYSICS 120']
    assert parse('PHYSICS 150') == ['and', 'PHYSICS 150']
    assert parse('PHYSICS 160') == ['and', 'PHYSICS 160']
    assert parse('PHYSICS 213') == ['and', 'PHYSICS 213']
    assert parse('PHYSICS 240') == ['and', 'PHYSICS 240']
    assert parse('PHYSICS 326') == ['and', 'PHYSICS 326']
    assert parse('PHYSICS 341') == ['and', 'PHYSICS 341']
    assert parse('PHYSICS 350') == ['and', 'PHYSICS 350']
    assert parse('PHYSICS 355') == ['and', 'PHYSICS 355']
    assert parse('PSYCH 316') == ['and', 'PSYCH 316']
    assert parse('PSYCH 362') == ['and', 'PSYCH 362']
    assert parse('SCISCHOL 101') == ['and', 'SCISCHOL 101']
    assert parse('SOFTENG 350') == ['and', 'SOFTENG 350']
    assert parse('SOFTENG 370') == ['and', 'SOFTENG 370']
    assert parse('SPORTSCI 101') == ['and', 'SPORTSCI 101']
    assert parse('SPORTSCI 103') == ['and', 'SPORTSCI 103']
    assert parse('SPORTSCI 201') == ['and', 'SPORTSCI 201']
    assert parse('SPORTSCI 203') == ['and', 'SPORTSCI 203']
    assert parse('SPORTSCI 206') == ['and', 'SPORTSCI 206']
    assert parse('SPORTSCI 301') == ['and', 'SPORTSCI 301']
    assert parse('SPORTSCI 303') == ['and', 'SPORTSCI 303']
    assert parse('SPORTSCI 305') == ['and', 'SPORTSCI 305']
    assert parse('SPORTSCI 309') == ['and', 'SPORTSCI 309']
    assert parse('STATS 210') == ['and', 'STATS 210']
    assert parse('STATS 340') == ['and', 'STATS 340']
    assert parse('STATS 710') == ['and', 'STATS 710']
    assert parse('STATS 721') == ['and', 'STATS 721']
    assert parse('STATS 722') == ['and', 'STATS 722']
    assert parse('STATS 727') == ['and', 'STATS 727']
    assert parse('STATS 732') == ['and', 'STATS 732']
    assert parse('STATS 765') == ['and', 'STATS 765']
    assert parse('STATS 767') == ['and', 'STATS 767']


def test_restrictions_two_subject():
    assert parse('EARTHSCI 301, GEOG 330') == ['and', 'EARTHSCI 301', 'GEOG 330']
    assert parse('BIOINF 301, BIOSCI 354') == ['and', 'BIOINF 301', 'BIOSCI 354']
    assert parse('COMPSCI 105, 107') == ['and', 'COMPSCI 105', 'COMPSCI 107']
    assert parse('EARTHSCI 304, 305') == ['and', 'EARTHSCI 304', 'EARTHSCI 305']
    assert parse('EARTHSCI 361, GEOLOGY 361') == ['and', 'EARTHSCI 361', 'GEOLOGY 361']
    assert parse('EARTHSCI 399, PHYSICS 399') == ['and', 'EARTHSCI 399', 'PHYSICS 399']
    assert parse('EXERSCI 204, SPORTSCI 204') == ['and', 'EXERSCI 204', 'SPORTSCI 204']
    assert parse('EXERSCI 207, SPORTSCI 304') == ['and', 'EXERSCI 207', 'SPORTSCI 304']
    assert parse('EXERSCI 304, SPORTSCI 304') == ['and', 'EXERSCI 304', 'SPORTSCI 304']
    assert parse('FOODSCI 303, 304') == ['and', 'FOODSCI 303', 'FOODSCI 304']
    assert parse('GEOG 140, GISCI 140') == ['and', 'GEOG 140', 'GISCI 140']
    assert parse('GEOG 331, 332') == ['and', 'GEOG 331', 'GEOG 332']
    assert parse('GEOLOGY 361, GEOPHYS 361') == ['and', 'GEOLOGY 361', 'GEOPHYS 361']
    assert parse('PHYSICS 107, 107G') == ['and', 'PHYSICS 107', 'PHYSICS 107G']
    assert parse('PHYSICS 219, 243') == ['and', 'PHYSICS 219', 'PHYSICS 243']
    assert parse('PHYSICS 230, 231') == ['and', 'PHYSICS 230', 'PHYSICS 231']
    assert parse('PHYSICS 250, 251') == ['and', 'PHYSICS 250', 'PHYSICS 251']
    assert parse('PHYSICS 260, 261') == ['and', 'PHYSICS 260', 'PHYSICS 261']
    assert parse('PHYSICS 315, 325') == ['and', 'PHYSICS 315', 'PHYSICS 325']
    assert parse('PHYSICS 315, 354') == ['and', 'PHYSICS 315', 'PHYSICS 354']
    assert parse('SOFTENG 363, COMPSYS 304') == ['and', 'SOFTENG 363', 'COMPSYS 304']
    assert parse('SPORTSCI 105, 205') == ['and', 'SPORTSCI 105', 'SPORTSCI 205']


def test_restrictions_multiple_subjects():
    assert parse('BIOSCI 107, EXERSCI 101, 105, SPORTSCI 100G, 101, 105, MEDSCI 142') == \
        ['and', 'BIOSCI 107', 'EXERSCI 101', 'EXERSCI 105', 'SPORTSCI 100G', 'SPORTSCI 101', 'SPORTSCI 105', 'MEDSCI 142']

    assert parse('ENGGEN 150, ENGSCI 111, MATHS 120, 130, 150, 153, 208, 250') == \
        ['and', 'ENGGEN 150', 'ENGSCI 111', 'MATHS 120', 'MATHS 130', 'MATHS 150', 'MATHS 153', 'MATHS 208', 'MATHS 250']

    assert parse('STATS 101, 102, 107, 191') == \
        ['and', 'STATS 101', 'STATS 102', 'STATS 107', 'STATS 191']

    assert parse('STATS 102, 107, 108, 191') == \
        ['and', 'STATS 102', 'STATS 107', 'STATS 108', 'STATS 191']

    assert parse('STATS 201, 207, BIOSCI 209') == \
        ['and', 'STATS 201', 'STATS 207', 'BIOSCI 209']

    assert parse('STATS 207, 208, BIOSCI 209') == \
        ['and', 'STATS 207', 'STATS 208', 'BIOSCI 209']

    assert parse('ENGEN 150, ENGSCI 111, MATHS 150, 153, 208, 250. More than 15 points from MATHS 120 and 130') == \
        ['and',
            'ENGEN 150',
            'ENGSCI 111',
            'MATHS 150',
            'MATHS 153',
            'MATHS 208',
            'MATHS 250',
            ['15', 'MATHS 120', 'MATHS 130']
         ]


def test_restrictions_cannot_be_taken_with_or_after():
    assert parse('Cannot be taken with or after COMPSCI 105, 107, 130, 210-220, 230-289, 313-399') == \
        ['Cannot be taken with or after', 'COMPSCI 105', 'COMPSCI 107',
            'COMPSCI 130', 'COMPSCI 210-220', 'COMPSCI 230-289', 'COMPSCI 313-399']

    assert parse('Cannot be taken with or after COMPSCI 210') == \
        ['Cannot be taken with or after', 'COMPSCI 210']

    assert parse('Cannot be taken with or after COMPSCI 210, 220, 230') == \
        ['Cannot be taken with or after', 'COMPSCI 210', 'COMPSCI 220', 'COMPSCI 230']

    assert parse('Cannot be taken with, or after, COMPSCI 225, MATHS 254, 255') == \
        ['Cannot be taken with or after', 'COMPSCI 225', 'MATHS 254', 'MATHS 255']

    assert parse('Cannot be taken, concurrently with, or after MATHS 250, 253') == \
        ['Cannot be taken with or after', 'MATHS 250', 'MATHS 253']


def test_restrictions_other():
    assert parse('May not be taken with, or after passing, any other Statistics course') == \
        ['May not be taken with or after', 'Statistics']

    assert parse('MATHS 190 may not be taken after any Mathematics course at Stage III') == \
        ['May not be taken after', 'Mathematics:Stage III']

    assert parse('Cannot be taken at the same time as any other chemistry course, or after any successfully completed chemistry course, other than CHEM 100/CHEM 100G') == \
        ['Cannot be taken with or after',
            'Chemistry',
            ['Exceptions', 'CHEM 100', 'CHEM 100G']
         ]

    assert parse('MATHS 102 may not be taken concurrently with any other Mathematics course, except MATHS 190 and may not be taken after ENGSCI 111 or any Mathematics course at Stage I or above, except MATHS 190/190G') == \
        ['and',
            ['May not be taken concurrently with', 'Mathematics', ['Exceptions', 'MATHS 190']],
            ['or',
                ['May not be taken after', 'ENGSCI 111'],
                ['May not be taken after',
                    'Mathematics',
                    ['Exceptions', 'MATHS 190', 'MATHS 190G']
                 ]
             ]
         ]
