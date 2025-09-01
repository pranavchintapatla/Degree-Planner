from ..src.parse_requirements import parse


def test_prerequisites_with_points_from():
    assert parse("15 points from BIOSCI 106, CHEM 110, FOODSCI 100") == ['15', 'BIOSCI 106', 'CHEM 110', 'FOODSCI 100']

    assert parse("15 points from BIOSCI 107, EXERSCI 101, 103, MEDSCI 142, SPORTSCI 101, 103") == \
        ['15', 'BIOSCI 107', 'EXERSCI 101', 'EXERSCI 103', 'MEDSCI 142', 'SPORTSCI 101', 'SPORTSCI 103']

    assert parse("15 points from BIOSCI 202, 203, 205") == ['15', 'BIOSCI 202', 'BIOSCI 203', 'BIOSCI 205']

    assert parse("15 points from BIOSCI 206-208") == ['15', 'BIOSCI 206-208']

    assert parse("15 points from BIOSCI 207, 208") == ['15', 'BIOSCI 207', 'BIOSCI 208']

    assert parse("15 points from BIOSCI 209, ECON 211, STATS 201, 207, 208") == \
        ['15', 'BIOSCI 209', 'ECON 211', 'STATS 201', 'STATS 207', 'STATS 208']

    assert parse("15 points from CHEM 210, 220, 251, CHEMMAT 121") == \
        ['15', 'CHEM 210', 'CHEM 220', 'CHEM 251', 'CHEMMAT 121']

    assert parse("15 points from CHEM 210, 251") == ['15', 'CHEM 210', 'CHEM 251']

    assert parse("15 points from CHEM 220, 251, 253") == ['15', 'CHEM 220', 'CHEM 251', 'CHEM 253']

    assert parse("15 points from CHEM 230, 253") == ['15', 'CHEM 230', 'CHEM 253']

    assert parse("15 points from CHEM 240, 252") == ['15', 'CHEM 240', 'CHEM 252']

    assert parse("15 points from COMPSCI 105, 107, 130") == ['15', 'COMPSCI 105', 'COMPSCI 107', 'COMPSCI 130']

    assert parse("15 points from COMPSCI 120, MATHS 120, 150, 153") == \
        ['15', 'COMPSCI 120', 'MATHS 120', 'MATHS 150', 'MATHS 153']

    assert parse("15 points from EARTHSCI 103, 120") == ['15', 'EARTHSCI 103', 'EARTHSCI 120']

    assert parse("15 points from EARTHSCI 103, 120, GEOLOGY 103, and 15 points from GEOPHYS 213, PHYSICS 213, and 15 points from ENGSCI 211, MATHS 253, 260, PHYSICS 211") == \
        ['and',
            ['15', 'EARTHSCI 103', 'EARTHSCI 120', 'GEOLOGY 103'],
            ['15', 'GEOPHYS 213', 'PHYSICS 213'],
            ['15', 'ENGSCI 211', 'MATHS 253', 'MATHS 260', 'PHYSICS 211']
         ]

    assert parse("15 points from EARTHSCI 120, GEOG 101") == ['15', 'EARTHSCI 120', 'GEOG 101']

    assert parse("15 points from ENGGEN 121, PHYSICS 160, EXERSCI 203, SPORTSCI 203") == \
        ['15', 'ENGGEN 121', 'PHYSICS 160', 'EXERSCI 203', 'SPORTSCI 203']

    assert parse("15 points from ENGSCI 111, ENGGEN 150, STATS 125") == ['15', 'ENGSCI 111', 'ENGGEN 150', 'STATS 125']

    assert parse("15 points from ENVPHYS 100, PHYSICS 100, 102, 120, 121, 160, EARTHSCI 120 and 15 points from MATHS 108, 110, 120, 130, 199, STATS 101-120") == \
        ['and',
            ['15', 'ENVPHYS 100', 'PHYSICS 100', 'PHYSICS 102', 'PHYSICS 120', 'PHYSICS 121', 'PHYSICS 160', 'EARTHSCI 120'],
            ['15', 'MATHS 108', 'MATHS 110', 'MATHS 120', 'MATHS 130', 'MATHS 199', 'STATS 101-120']
         ]

    assert parse("15 points from EXERSCI 201, 205, MEDSCI 206, 309, 320, PSYCH 202, SPORTSCI 201") == \
        ['15', 'EXERSCI 201', 'EXERSCI 205', 'MEDSCI 206', 'MEDSCI 309', 'MEDSCI 320', 'PSYCH 202', 'SPORTSCI 201']

    assert parse("15 points from EXERSCI 201, MEDSCI 205, SPORTSCI 201") == \
        ['15', 'EXERSCI 201', 'MEDSCI 205', 'SPORTSCI 201']

    assert parse("15 points from EXERSCI 301, 303, 304") == ['15', 'EXERSCI 301', 'EXERSCI 303', 'EXERSCI 304']

    assert parse("15 points from FOODSCI 200, 201, 15 points from MATHS 108, 110") == \
        ['and',
            ['15', 'FOODSCI 200', 'FOODSCI 201'],
            ['15', 'MATHS 108', 'MATHS 110']
         ]

    assert parse("15 points from GISCI 241, 242, GEOG 317, 318") == \
        ['15', 'GISCI 241', 'GISCI 242', 'GEOG 317', 'GEOG 318']

    assert parse("15 points from PHYSICS 120, 121, 150, 160 and 15 points from ENGSCI 211, MATHS 130, 208, PHYSICS 211") == \
        ['and',
            ['15', 'PHYSICS 120', 'PHYSICS 121', 'PHYSICS 150', 'PHYSICS 160'],
            ['15', 'ENGSCI 211', 'MATHS 130', 'MATHS 208', 'PHYSICS 211']
         ]

    assert parse(
        "15 points from PHYSICS 120, 121, 160 and 15 points from ENGGEN 150, ENGSCI 111, MATHS 108, 110, 120, 130, 150") == \
        ['and',
            ['15', 'PHYSICS 120', 'PHYSICS 121', 'PHYSICS 160'],
            ['15', 'ENGGEN 150', 'ENGSCI 111', 'MATHS 108', 'MATHS 110', 'MATHS 120', 'MATHS 130', 'MATHS 150']
         ]

    assert parse("15 points from PHYSICS 121, 150 and 15 points from ENGSCI 211, MATHS 130, 208, PHYSICS 211") == \
        ['and',
            ['15', 'PHYSICS 121', 'PHYSICS 150'],
            ['15', 'ENGSCI 211', 'MATHS 130', 'MATHS 208', 'PHYSICS 211']
         ]

    assert parse("15 points from PHYSICS 201, 202, 203, 231, 240, 244, 251, 261") == \
        ['15', 'PHYSICS 201', 'PHYSICS 202', 'PHYSICS 203', 'PHYSICS 231',
            'PHYSICS 240', 'PHYSICS 244', 'PHYSICS 251', 'PHYSICS 261']

    assert parse("15 points from PHYSICS 201, 231 and 15 points from PHYSICS 211, MATHS 253, 260, ENGSCI 211") == \
        ['and',
            ['15', 'PHYSICS 201', 'PHYSICS 231'],
            ['15', 'PHYSICS 211', 'MATHS 253', 'MATHS 260', 'ENGSCI 211']
         ]

    assert parse("15 points from PHYSICS 201, 231, 15 points from PHYSICS 202, 261 and 15 points from PHYSICS 211, MATHS 253, 260, ENGSCI 211") == \
        ['and',
            ['15', 'PHYSICS 201', 'PHYSICS 231'],
            ['15', 'PHYSICS 202', 'PHYSICS 261'],
            ['15', 'PHYSICS 211', 'MATHS 253', 'MATHS 260', 'ENGSCI 211']
         ]

    assert parse(
        "15 points from PHYSICS 201, 231, 15 points from PHYSICS 203, 251 and 15 points from PHYSICS 211, MATHS 253, 260, ENGSCI 211") == \
        ['and',
            ['15', 'PHYSICS 201', 'PHYSICS 231'],
            ['15', 'PHYSICS 203', 'PHYSICS 251'],
            ['15', 'PHYSICS 211', 'MATHS 253', 'MATHS 260', 'ENGSCI 211']
         ]

    assert parse("15 points from PHYSICS 201, 231, and 15 points from GEOPHYS 213, PHYSICS 213, and 15 points from ENGSCI 211, MATHS 253, 260, PHYSICS 211") == \
        ['and',
            ['15', 'PHYSICS 201', 'PHYSICS 231'],
            ['15', 'GEOPHYS 213', 'PHYSICS 213'],
            ['15', 'ENGSCI 211', 'MATHS 253', 'MATHS 260', 'PHYSICS 211']
         ]

    assert parse("15 points from PHYSICS 202, 261 and 15 points from PHYSICS 211, MATHS 253, 260, ENGSCI 211") == \
        ['and',
            ['15', 'PHYSICS 202', 'PHYSICS 261'],
            ['15', 'PHYSICS 211', 'MATHS 253', 'MATHS 260', 'ENGSCI 211']
         ]

    assert parse("15 points from PHYSICS 203, 251 and 15 points from PHYSICS 211, MATHS 253, 260, ENGSCI 211") == \
        ['and',
            ['15', 'PHYSICS 203', 'PHYSICS 251'],
            ['15', 'PHYSICS 211', 'MATHS 253', 'MATHS 260', 'ENGSCI 211']
         ]

    assert parse("15 points from PHYSICS 240, 244 and 15 points from PHYSICS 211, MATHS 253, 260, ENGSCI 211") == \
        ['and',
            ['15', 'PHYSICS 240', 'PHYSICS 244'],
            ['15', 'PHYSICS 211', 'MATHS 253', 'MATHS 260', 'ENGSCI 211']
         ]

    assert parse("15 points from STATS 101-108, 191") == \
        ['15', 'STATS 101-108', 'STATS 191']

    assert parse("15 points from STATS 125, 210, 225 and 15 points from STATS 201, 207, 208, 220, BIOSCI 209") == \
        ['and',
            ['15', 'STATS 125', 'STATS 210', 'STATS 225'],
            ['15', 'STATS 201', 'STATS 207', 'STATS 208', 'STATS 220', 'BIOSCI 209']
         ]

    assert parse("15 points from STATS 201, 207, 208, 220, BIOSCI 209") == \
        ['15', 'STATS 201', 'STATS 207', 'STATS 208', 'STATS 220', 'BIOSCI 209']

    assert parse("15 points from STATS 201, 207, 208, BIOSCI 209") == \
        ['15', 'STATS 201', 'STATS 207', 'STATS 208', 'BIOSCI 209']

    assert parse("30 points from BIOSCI 101-109") == \
        ['30', 'BIOSCI 101-109']

    assert parse("30 points from BIOSCI 347-358, MEDSCI 300-320, MEDIMAGE 300, 302") == \
        ['30', 'BIOSCI 347-358', 'MEDSCI 300-320', 'MEDIMAGE 300', 'MEDIMAGE 302']

    assert parse("30 points from CHEM 251, 252, 253") == \
        ['30', 'CHEM 251', 'CHEM 252', 'CHEM 253']

    assert parse("30 points from CHEM 351, 360, ENVSCI 301") == \
        ['30', 'CHEM 351', 'CHEM 360', 'ENVSCI 301']

    assert parse("30 points from GEOPHYS 310, 311, 361") == \
        ['30', 'GEOPHYS 310', 'GEOPHYS 311', 'GEOPHYS 361']

    assert parse("30 points from PHYSICS 201, 202, 203, 231, 240, 244, 251, 261") == \
        ['30', 'PHYSICS 201', 'PHYSICS 202', 'PHYSICS 203', 'PHYSICS 231',
            'PHYSICS 240', 'PHYSICS 244', 'PHYSICS 251', 'PHYSICS 261']

    assert parse("45 points from CHEM 251, 252, 253, 260") == \
        ['45', 'CHEM 251', 'CHEM 252', 'CHEM 253', 'CHEM 260']


def test_prerequisites_with_points_from_exceptions():
    assert parse("15 points from PHYSICS 120, 121, 150, 160, and either 15 points from ENGSCI 111, MATHS 108, 150, 153, or MATHS 120 and 130") == \
        ['and',
            ['15', 'PHYSICS 120', 'PHYSICS 121', 'PHYSICS 150', 'PHYSICS 160'],
            ['or',
                ['15', 'ENGSCI 111', 'MATHS 108', 'MATHS 150', 'MATHS 153'],
                ['and', 'MATHS 120', 'MATHS 130']
             ]
         ]

    assert parse(
        "15 points from MATHS 108, 150, 153, ENGSCI 111, ENGGEN 150, or MATHS 120 and MATHS 130, or B- or higher in MATHS 110") == \
        ['or',
            ['15', 'MATHS 108', 'MATHS 150', 'MATHS 153', 'ENGSCI 111', 'ENGGEN 150'],
            ['and', 'MATHS 120', 'MATHS 130'],
            ['B-', 'MATHS 110']
         ]

    assert parse("15 points from EARTHSCI 103, 120, GEOLOGY 103, and GEOPHYS 213 or PHYSICS 213 and MATHS 208 or equivalent") == \
        ['and',
            ['15', 'EARTHSCI 103', 'EARTHSCI 120', 'GEOLOGY 103'],
            ['or', 'GEOPHYS 213', 'PHYSICS 213'],
            ['or', 'MATHS 208', 'equivalent']
         ]

    assert parse("30 points from MEDSCI 100-320 or BSc courses") == \
        ['30', 'MEDSCI 100-320', 'BSc courses']


def test_prerequisites_with_points_from_mix():
    assert parse("30 points at Stage I Psychology or 15 points from BIOSCI 101, 103") == \
        ['or',
            ['30:Stage I', 'Psychology'],
            ['15', 'BIOSCI 101', 'BIOSCI 103']
         ]

    assert parse("30 points at Stage III in Environmental Science or 15 points at Stage III in Environmental Science and 15 points from other Stage III courses included in the major") == \
        ['or',
            ['30:Stage III', 'Environmental Science'],
            ['and',
                ['15:Stage III', 'Environmental Science'],
                ['15:Stage III', 'courses included in the major']
             ]
         ]

    assert parse("30 points at Stage III in Geographic Information Science") == \
        ['30:Stage III', 'Geographic Information Science']

    assert parse("30 points at Stage III in Psychology and 15 points from STATS 100-125") == \
        ['and', ['30:Stage III', 'Psychology'], ['15', 'STATS 100-125']]

    assert parse("30 points at Stage III in Statistics") == \
        ['30:Stage III', 'Statistics']

    assert parse("30 points passed at Stage II") == \
        ['30:Stage II']

    assert parse("45 points at Stage II in Geography") == \
        ['45:Stage II', 'Geography']

    assert parse("45 points at Stage II in Psychology and 15 points from STATS 100-125") == \
        ['and',
            ['45:Stage II', 'Psychology'],
            ['15', 'STATS 100-125']
         ]

    assert parse(
        "45 points at Stage II in Psychology and 15 points from STATS 100-125, or 30 points at Stage II in Gender Studies") == \
        ['or',
            ['and',
                ['45:Stage II', 'Psychology'],
                ['15', 'STATS 100-125']
             ],
            ['30:Stage II', 'Gender Studies']
         ]

    assert parse(
        "45 points at Stage II in Psychology and 15 points from STATS 100-125, or 45 points at Stage II in Biological Sciences") == \
        ['or',
            ['and',
                ['45:Stage II', 'Psychology'],
                ['15', 'STATS 100-125']
             ],
            ['45:Stage II', 'Biological Sciences']
         ]

    assert parse("45 points at Stage II in Psychology and 15 points from STATS 100-125, or MEDSCI 206 or PHYSIOL 220") == \
        ['or',
            ['and',
                ['45:Stage II', 'Psychology'],
                ['15', 'STATS 100-125']
             ],
         'MEDSCI 206',
         'PHYSIOL 220'
         ]

    assert parse("75 points, including at least 15 points from EARTHSCI 103, 120") == \
        ['75', ['15', 'EARTHSCI 103', 'EARTHSCI 120']]

    assert parse(
        "B+ or higher in STATS 125 or B or higher in STATS 210 or 225 or 320, and 15 points from ENGSCI 211, MATHS 208, 250") == \
        ['and',
            ['or',
                ['B+', 'STATS 125'],
                ['B', ['or', 'STATS 210', 'STATS 225', 'STATS 320']]
             ],
            ['15', 'ENGSCI 211', 'MATHS 208', 'MATHS 250']
         ]

    assert parse("BIOSCI 101 and 15 points from BIOSCI 106-109") == \
        ['and',
            'BIOSCI 101',
            ['15', 'BIOSCI 106-109']
         ]

    assert parse("BIOSCI 101, 106 and 15 points from CHEM 110, 120") == \
        ['and',
            'BIOSCI 101',
            'BIOSCI 106',
            ['15', 'CHEM 110', 'CHEM 120']
         ]

    assert parse("BIOSCI 101, and 15 points from BIOSCI 106-109, MEDSCI 142, and 15 points from CHEM 110, 120, 150") == \
        ['and',
            'BIOSCI 101',
            ['15', 'BIOSCI 106-109', 'MEDSCI 142'],
            ['15', 'CHEM 110', 'CHEM 120', 'CHEM 150']
         ]

    assert parse("BIOSCI 106 and 15 points from BIOSCI 204, MEDSCI 202") == \
        ['and',
            'BIOSCI 106',
            ['15', 'BIOSCI 204', 'MEDSCI 202']
         ]

    assert parse("BIOSCI 108, 109 and 15 points from BIOSCI 206, 207, 208") == \
        ['and',
            'BIOSCI 108',
            'BIOSCI 109',
            ['15', 'BIOSCI 206', 'BIOSCI 207', 'BIOSCI 208']
         ]

    assert parse("BIOSCI 109, and 15 points from BIOSCI 101-108") == \
        ['and',
            'BIOSCI 109',
            ['15', 'BIOSCI 101-108']
         ]

    assert parse("CHEM 110, 120 and 15 points from MATHS 108, 110, 130, 150, PHYSICS 120") == \
        ['and',
            'CHEM 110',
            'CHEM 120',
            ['15', 'MATHS 108', 'MATHS 110', 'MATHS 130', 'MATHS 150', 'PHYSICS 120']
         ]

    assert parse("CHEM 110, 120, and 15 points from MATHS 108, 110, 120, 130, 150, 153, PHYSICS 120, 160, STATS 101, 108") == \
        ['and',
            'CHEM 110',
            'CHEM 120',
            ['15', 'MATHS 108', 'MATHS 110', 'MATHS 120', 'MATHS 130', 'MATHS 150',
                'MATHS 153', 'PHYSICS 120', 'PHYSICS 160', 'STATS 101', 'STATS 108']
         ]

    assert parse("CHEM 120 and 15 points from MATHS 108, 110, 120, 130, 150, 153, PHYSICS 120, 160, STATS 101, 108") == \
        ['and',
            'CHEM 120',
            ['15', 'MATHS 108', 'MATHS 110', 'MATHS 120', 'MATHS 130', 'MATHS 150',
                'MATHS 153', 'PHYSICS 120', 'PHYSICS 160', 'STATS 101', 'STATS 108']
         ]

    assert parse("CHEM 390 and 15 points from CHEM 310, 320, 330, 340, 351, 360, 380, 392") == \
        ['and',
            'CHEM 390',
            ['15', 'CHEM 310', 'CHEM 320', 'CHEM 330', 'CHEM 340', 'CHEM 351', 'CHEM 360', 'CHEM 380', 'CHEM 392']
         ]

    assert parse(
        "CIVIL 220 or EARTHSCI 201 or 220 or GEOLOGY 201, and 30 points from EARTHSCI 201-263, GEOG 260-263, GEOLOGY 202-205") == \
        ['and',
            ['or', 'CIVIL 220', 'EARTHSCI 201', 'EARTHSCI 220', 'GEOLOGY 201'],
            ['30', 'EARTHSCI 201-263', 'GEOG 260-263', 'GEOLOGY 202-205']
         ]

    assert parse("COMPSCI 110 and PHYSICS 140 and 15 points from COMPSCI 105, 107, 130") == \
        ['and',
            'COMPSCI 110',
            'PHYSICS 140',
            ['15', 'COMPSCI 105', 'COMPSCI 107', 'COMPSCI 130']
         ]

    assert parse("COMPSCI 110, and 15 points from COMPSCI 105, 107, 130") == \
        ['and',
            'COMPSCI 110',
            ['15', 'COMPSCI 105', 'COMPSCI 107', 'COMPSCI 130']
         ]

    assert parse("COMPSCI 120 and 15 points from COMPSCI 105, 107, 130") == \
        ['and',
            'COMPSCI 120',
            ['15', 'COMPSCI 105', 'COMPSCI 107', 'COMPSCI 130']
         ]

    assert parse("COMPSCI 220 and 15 points from COMPSCI 225, MATHS 254, 255") == \
        ['and',
            'COMPSCI 220',
            ['15', 'COMPSCI 225', 'MATHS 254', 'MATHS 255']
         ]

    assert parse("COMPSCI 220 or PHIL 222, and 15 points from COMPSCI 225, MATHS 254, 255") == \
        ['and',
            ['or', 'COMPSCI 220', 'PHIL 222'],
            ['15', 'COMPSCI 225', 'MATHS 254', 'MATHS 255']
         ]

    assert parse(
        "COMPSCI 220, and 15 points from DATASCI 100, STATS 101, 108, and 15 points from COMPSCI 225, MATHS 254, 255") == \
        ['and',
            'COMPSCI 220',
            ['15', 'DATASCI 100', 'STATS 101', 'STATS 108'],
            ['15', 'COMPSCI 225', 'MATHS 254', 'MATHS 255']
         ]

    assert parse("MATHS 120 and 130, or 15 points from ENGGEN 150, ENGSCI 111, MATHS 108, 110, 150, 153, and 15 points from COMPSCI 101, 105, 130, INFOSYS 110, 120, MATHS 162, 199") == \
        ['or',
            ['and', 'MATHS 120', 'MATHS 130'],
            ['and',
                ['15', 'ENGGEN 150', 'ENGSCI 111', 'MATHS 108', 'MATHS 110', 'MATHS 150', 'MATHS 153'],
                ['15', 'COMPSCI 101', 'COMPSCI 105', 'COMPSCI 130', 'INFOSYS 110', 'INFOSYS 120', 'MATHS 162', 'MATHS 199']
             ]
         ]

    assert parse("MATHS 120 and 130, or 15 points from ENGGEN 150, ENGSCI 111, MATHS 150, 153") == \
        ['or',
            ['and', 'MATHS 120', 'MATHS 130'],
            ['15', 'ENGGEN 150', 'ENGSCI 111', 'MATHS 150', 'MATHS 153']
         ]

    assert parse("MATHS 250, and 254 or 255, or a B+ or higher in COMPSCI 225 and 15 points from MATHS 250, 253") == \
        ['or',
            ['and', 'MATHS 250',
                ['or', 'MATHS 254', 'MATHS 255']
             ],
            ['and',
                ['B+', 'COMPSCI 225'],
                ['15', 'MATHS 250', 'MATHS 253']
             ]
         ]

    assert parse("STATS 210 or 225, and 15 points from MATHS 208, 250 or equivalent") == \
        ['and',
            ['or', 'STATS 210', 'STATS 225'],
            ['15', 'MATHS 208', 'MATHS 250', 'equivalent']
         ]

    assert parse("STATS 220, and STATS 210 or 225, and 15 points from BIOSCI 209, ECON 221, STATS 201, 207, 208") == \
        ['and',
            'STATS 220',
            ['or', 'STATS 210', 'STATS 225'],
            ['15', 'BIOSCI 209', 'ECON 221', 'STATS 201', 'STATS 207', 'STATS 208']
         ]


def test_prerequisites_points_at_stage():
    assert parse("15 points at Stage I in Computer Science or Statistics") == \
        ['15:Stage I', 'Computer Science', 'Statistics']

    assert parse("15 points at Stage I in Earth Sciences") == \
        ['15:Stage I', 'Earth Sciences']

    assert parse("15 points at Stage II in Earth Sciences, Environmental Physics, Geophysics") == \
        ['15:Stage II', 'Earth Sciences', 'Environmental Physics', 'Geophysics']

    assert parse("15 points at Stage II in Statistics or BIOSCI 209; 15 points at Stage II in Mathematics") == \
        ['and',
            ['or',
                ['15:Stage II', 'Statistics'],
                'BIOSCI 209'
             ],
            ['15:Stage II', 'Mathematics']
         ]

    assert parse("15 points at Stage II or III in Exercise Sciences and Departmental approval") == \
        ['and',
            ['15:Stage II or III', 'Exercise Sciences'],
            'Departmental approval'
         ]

    assert parse("30 points at Stage I Psychology") == \
        ['30:Stage I', 'Psychology']

    assert parse("30 points at Stage I in Psychology") == \
        ['30:Stage I', 'Psychology']

    assert parse("30 points at Stage II") == \
        ['30:Stage II']

    assert parse("30 points at Stage III in Biological Sciences") == \
        ['30:Stage III', 'Biological Sciences']

    assert parse("30 points at Stage III in Computer Science and COMPSCI 210, 220, 230") == \
        ['and',
            ['30:Stage III', 'Computer Science'],
            'COMPSCI 210',
            'COMPSCI 220',
            'COMPSCI 230'
         ]

    assert parse("30 points at Stage III in Data Science") == \
        ['30:Stage III', 'Data Science']

    assert parse("30 points at Stage III in Earth Sciences") == \
        ['30:Stage III', 'Earth Sciences']

    assert parse("45 points at Stage II, including EARTHSCI 262 or GEOG 262, or equivalent") == \
        ['45:Stage II', 'EARTHSCI 262', 'GEOG 262', 'equivalent']

    assert parse("45 points passed at Stage I or II") == \
        ['45:Stage I or II']

    assert parse("45 points passed at Stage II or III") == \
        ['45:Stage II or III']


def test_prerequisites_other():
    assert parse("45 points: EXERSCI 101, 103, 105") == \
        ['45', 'EXERSCI 101', 'EXERSCI 103', 'EXERSCI 105']

    assert parse("60 points") == \
        ['60']

    assert parse("60 points passed") == \
        ['60']

    assert parse("Any 120 points passed") == \
        ['120']

    assert parse("Any 180 points") == \
        ['180']

    assert parse("Any 30 points at Stage II in Earth Sciences or Biological Sciences, plus an understanding equivalent to EARTHSCI 202 will be assumed") == \
        ['30:Stage II', 'Earth Sciences', 'Biological Sciences',
            'plus an understanding equivalent to EARTHSCI 202 will be assumed']

    assert parse("At least 45 points at Stage I") == \
        ['45:Stage I']

    assert parse("B+ or higher in COMPSCI 225 or MATHS 254 or 255 or PHIL 222") == \
        ['B+',
            ['or', 'COMPSCI 225', 'MATHS 254', 'MATHS 255', 'PHIL 222']
         ]

    assert parse("B+ or higher in ENGGEN 150 or ENGSCI 111 or STATS 125, or a B+ or higher in MATHS 120 and 130") == \
        ['or',
            ['B+', ['or', 'ENGGEN 150', 'ENGSCI 111', 'STATS 125']],
            ['B+', ['and', 'MATHS 120', 'MATHS 130']]
         ]

    assert parse("BIOSCI 101, 108") == \
        ['and', 'BIOSCI 101', 'BIOSCI 108']

    assert parse("BIOSCI 108, 109 and STATS 101 or 108") == \
        ['and',
            'BIOSCI 108',
            'BIOSCI 109',
            ['or', 'STATS 101', 'STATS 108']
         ]

    assert parse("BIOSCI 108, and BIOSCI 101 or 109") == \
        ['and', 'BIOSCI 108', ['or', 'BIOSCI 101', 'BIOSCI 109']]

    assert parse("BIOSCI 108, and BIOSCI 205 or 206") == \
        ['and', 'BIOSCI 108', ['or', 'BIOSCI 205', 'BIOSCI 206']]

    assert parse("BIOSCI 109 or GEOG 101") == \
        ['or', 'BIOSCI 109', 'GEOG 101']

    assert parse("BIOSCI 201") == \
        ['and', 'BIOSCI 201']

    assert parse("BIOSCI 201 and either BIOSCI 204 or MEDSCI 202") == \
        ['and', 'BIOSCI 201', ['or', 'BIOSCI 204', 'MEDSCI 202']]

    assert parse("BIOSCI 201, 202") == \
        ['and', 'BIOSCI 201', 'BIOSCI 202']

    assert parse("BIOSCI 201, 203") == \
        ['and', 'BIOSCI 201', 'BIOSCI 203']

    assert parse("BIOSCI 202") == \
        ['and', 'BIOSCI 202']

    assert parse("BIOSCI 203") == \
        ['and', 'BIOSCI 203']

    assert parse("BIOSCI 204 or 205") == \
        ['or', 'BIOSCI 204', 'BIOSCI 205']

    assert parse("BIOSCI 204 or MEDSCI 202") == \
        ['or', 'BIOSCI 204', 'MEDSCI 202']

    assert parse("BIOSCI 206 and 220, or 104 and 30 points at Stage II in either Biological Sciences or Geography") == \
        ['or',
            ['and', 'BIOSCI 206', 'BIOSCI 220'],
            ['and',
                'BIOSCI 104',
                ['30:Stage II', 'Biological Sciences', 'Geography']
             ]
         ]

    assert parse("BIOSCI 206 or MARINE 202 or 30 points at Stage II in BSc courses") == \
        ['or',
            'BIOSCI 206',
            'MARINE 202',
            ['30:Stage II', 'BSc courses']
         ]

    assert parse("BIOSCI 207 or 208") == \
        ['or', 'BIOSCI 207', 'BIOSCI 208']

    assert parse("BIOSCI 209 or 220, and 207 or 208") == \
        ['and', ['or', 'BIOSCI 209', 'BIOSCI 220'], ['or', 'BIOSCI 207', 'BIOSCI 208']]

    assert parse("BIOSCI 210") == \
        ['and', 'BIOSCI 210']

    assert parse("BIOSCI 220, and BIOSCI 206 or MARINE 202") == \
        ['and',
            'BIOSCI 220',
            ['or',
                'BIOSCI 206',
                'MARINE 202'
             ]
         ]

    assert parse("CHEM 110") == \
        ['and', 'CHEM 110']

    assert parse("CHEM 110 and a further 150 points passed") == \
        ['and', 'CHEM 110', '150']

    assert parse("CHEM 110 and a minimum of 165 points passed") == \
        ['and', 'CHEM 110', '165']

    assert parse("CHEM 260") == \
        ['and', 'CHEM 260']

    assert parse("COMPSCI 210, 215") == \
        ['and', 'COMPSCI 210', 'COMPSCI 215']

    assert parse("COMPSCI 210, 215, PHYSICS 140") == \
        ['and', 'COMPSCI 210', 'COMPSCI 215', 'PHYSICS 140']

    assert parse("COMPSCI 210, 230") == \
        ['and', 'COMPSCI 210', 'COMPSCI 230']

    assert parse("COMPSCI 230 and 15 points at Stage II in Computer Science") == \
        ['and',
            'COMPSCI 230',
            ['15:Stage II', 'Computer Science']
         ]

    assert parse("COMPSCI 230 or SOFTENG 206") == \
        ['or', 'COMPSCI 230', 'SOFTENG 206']

    assert parse("COMPSCI 230, 235") == \
        ['and', 'COMPSCI 230', 'COMPSCI 235']

    assert parse("Departmental approval") == \
        ['Departmental approval']

    assert parse("EARTHSCI 220") == \
        ['and', 'EARTHSCI 220']

    assert parse("ENGSCI 211 or STATS 201 or 208, or a B+ or higher in either MATHS 108 or 120 or 130 or 150 or 153 or 162 or 199 or STATS 101 or 108, or a concurrent enrolment in either ENGSCI 211 or STATS 201 or 208") == \
        ['or',
            'ENGSCI 211',
            'STATS 201',
            'STATS 208',
            ['B+',
                ['or',   'MATHS 108',   'MATHS 120',   'MATHS 130',   'MATHS 150',
                    'MATHS 153',   'MATHS 162',   'MATHS 199',   'STATS 101',   'STATS 108']
             ],
            ['Concurrent enrolment', ['or', 'ENGSCI 211', 'STATS 201', 'STATS 208']]
         ]

    assert parse("ENVSCI 201 or equivalent") == \
        ['or', 'ENVSCI 201', 'equivalent']

    assert parse("EXERSCI 204 or SPORTSCI 204, or 45 points passed at Stage II or III") == \
        ['or',
            'EXERSCI 204',
            'SPORTSCI 204',
            ['45:Stage II or III']
         ]

    assert parse("Either CHEM 110 and 120, or at least B- in CHEM 110 or 120") == \
        ['or',
            ['and', 'CHEM 110', 'CHEM 120'],
            ['B-', ['or', 'CHEM 110', 'CHEM 120']]
         ]

    assert parse("FOODSCI 100, 200 and STATS 101 or 108") == \
        ['and',
            'FOODSCI 100',
            'FOODSCI 200',
            ['or', 'STATS 101', 'STATS 108']
         ]

    assert parse("FOODSCI 200 or 201") == \
        ['or', 'FOODSCI 200', 'FOODSCI 201']

    assert parse("FOODSCI 202") == \
        ['and', 'FOODSCI 202']

    assert parse("FOODSCI 303 or 310 and a further 30 points at Stage III in Food Science and Nutrition") == \
        ['and',
            ['or', 'FOODSCI 303', 'FOODSCI 310'],
            ['30:Stage III', 'Food Science and Nutrition']
         ]

    assert parse("GEOG 101") == \
        ['and', 'GEOG 101']

    assert parse("GEOG 250 and 30 points at Stage III in Geography") == \
        ['and', 'GEOG 250', ['30:Stage III', 'Geography']]

    assert parse("GISCI 241") == \
        ['and', 'GISCI 241']

    assert parse("GPA of 5.0 or higher and COMPSCI 289 and 30 points at Stage II in Computer Science") == \
        ['and',
            'GPA:5.0',
            'COMPSCI 289',
            ['30:Stage II', 'Computer Science']
         ]

    assert parse("MARINE 100 or 30 points at Stage I in BSc courses") == \
        ['or',
            'MARINE 100',
            ['30:Stage I', 'BSc courses']
         ]

    assert parse("MARINE 202 and 30 points at Stage III in BSc courses") == \
        ['and',
            'MARINE 202',
            ['30:Stage III', 'BSc courses']
         ]

    assert parse("MARINE 202 or 30 points at Stage II in BSc courses") == \
        ['or',
            'MARINE 202',
            ['30:Stage II', 'BSc courses']
         ]

    assert parse("MATHS 102 or at least 13 credits in Mathematics at NCEA Level 3 or D in CIE A2 Mathematics or C in CIE AS Mathematics or 3 out of 7 in IB Mathematics") == \
        ['or',
            'MATHS 102',
            'at least 13 credits in Mathematics at NCEA Level 3',
            ['D', 'CIE A2 Mathematics'],
            ['C', 'CIE AS Mathematics'],
            '3 out of 7 in IB Mathematics'
         ]

    assert parse("MATHS 208 or 250 or ENGSCI 211 or a concurrent enrolment in MATHS 250") == \
        ['or',
            'MATHS 208',
            'MATHS 250',
            'ENGSCI 211',
            ['Concurrent enrolment', 'MATHS 250']
         ]

    assert parse("MATHS 250") == \
        ['and', 'MATHS 250']

    assert parse("MATHS 250 and 254 or 255") == \
        ['and',
            'MATHS 250',
            ['or', 'MATHS 254', 'MATHS 255']
         ]

    assert parse("MATHS 250 and 30 points at Stage III in Mathematics") == \
        ['and',
            'MATHS 250',
            ['30:Stage III', 'Mathematics']
         ]

    assert parse("MATHS 250, 260") == \
        ['and', 'MATHS 250', 'MATHS 260']

    assert parse("MATHS 250, and MATHS 254 or 255") == \
        ['and', 'MATHS 250', ['or', 'MATHS 254', 'MATHS 255']]

    assert parse("MATHS 254 or 255, or MATHS 250 and a B+ or higher in COMPSCI 225") == \
        ['or',
            'MATHS 254',
            'MATHS 255',
            ['and', 'MATHS 250', ['B+', 'COMPSCI 225']]
         ]

    assert parse("MATHS 260 and 270") == \
        ['and', 'MATHS 260', 'MATHS 270']

    assert parse("MATHS 332 and Departmental approval") == \
        ['and', 'MATHS 332', 'Departmental approval']

    assert parse("MATHS 332 or a B or higher in MATHS 254") == \
        ['or', 'MATHS 332', ['B', 'MATHS 254']]

    assert parse("Minimum GPA of 5.0 and COMPSCI 110, 120, 130") == \
        ['and', 'GPA:5.0', 'COMPSCI 110', 'COMPSCI 120', 'COMPSCI 130']

    assert parse("Programme Coordinator approval") == \
        ['Programme Coordinator approval']

    assert parse("Programme Director approval") == \
        ['Programme Director approval']

    assert parse("STATS 101 or 108") == \
        ['or', 'STATS 101', 'STATS 108']

    assert parse("STATS 201, 207, or 208 or BIOSCI 209; and STATS 220 or COMPSCI 101") == \
        ['and',
            ['or', 'STATS 201', 'STATS 207', 'STATS 208', 'BIOSCI 209'],
            ['or', 'STATS 220', 'COMPSCI 101']
         ]

    assert parse("STATS 225") == \
        ['and', 'STATS 225']

    assert parse("MATHS 250, 260") == \
        ['and', 'MATHS 250', 'MATHS 260']

    assert parse("MKTG 151 with a B grade or higher") == \
        ['B', 'MKTG 151']

    assert parse("B- or higher in LAW  121") == \
        ['B-', 'LAW 121']

    assert parse("MATHS 254 or 255, or MATHS 250 and a B+ or higher in COMPSCI 225, or a B+ or higher in both COMPSCI 225 and MATHS 208") == \
        ['or',
            'MATHS 254',
            'MATHS 255',
            ['and',
                'MATHS 250',
                ['B+', 'COMPSCI 225']
             ],
            ['B+',
                ['and',
                    'COMPSCI 225',
                    'MATHS 208'
                 ]
             ]
         ]

    assert parse("BUSINESS 101 and at least a Merit average across 16 credits in NCEA Level 3 Business Studies or a B grade or higher in CIE Business Studies") == \
        ['or',
            ['and',
                'BUSINESS 101',
                'at least a Merit average across 16 credits in NCEA Level 3 Business Studies'
             ],
            ['B', 'CIE Business Studies']
         ]
