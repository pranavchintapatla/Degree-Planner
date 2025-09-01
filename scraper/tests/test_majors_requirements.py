from ..src.parse_requirements import parse


def test_majors_requirements():
    assert parse("15 points from ANTHRO 205-208, 235, 252") == \
        ['15', 'ANTHRO 205-208', 'ANTHRO 235', 'ANTHRO 252']

    assert parse("15 points from BIOSCI 106, 107") == \
        ['15', 'BIOSCI 106', 'BIOSCI 107']

    assert parse("15 points from BIOSCI 108, 109") == \
        ['15', 'BIOSCI 108', 'BIOSCI 109']

    assert parse("15 points from BIOSCI 201, 202, 203") == \
        ['15', 'BIOSCI 201', 'BIOSCI 202', 'BIOSCI 203']

    assert parse("15 points from BIOSCI 202, 203, 204, 206") == \
        ['15', 'BIOSCI 202', 'BIOSCI 203', 'BIOSCI 204', 'BIOSCI 206']

    assert parse("15 points from BIOSCI 204, 205, 207, 208") == \
        ['15', 'BIOSCI 204', 'BIOSCI 205', 'BIOSCI 207', 'BIOSCI 208']

    assert parse("15 points from BIOSCI 206, 208, GEOG 262, GISCI 241") == \
        ['15', 'BIOSCI 206', 'BIOSCI 208', 'GEOG 262', 'GISCI 241']

    assert parse("15 points from BIOSCI 206, 220, CHEM 260, EARTHSCI 261, 262, GEOG 205, 210, 250, 261, 262, GISCI 241, 242, MARINE 202") == \
        ['15', 'BIOSCI 206', 'BIOSCI 220', 'CHEM 260', 'EARTHSCI 261', 'EARTHSCI 262', 'GEOG 205',
            'GEOG 210', 'GEOG 250', 'GEOG 261', 'GEOG 262', 'GISCI 241', 'GISCI 242', 'MARINE 202']

    assert parse("15 points from BIOSCI 207, 208") == \
        ['15', 'BIOSCI 207', 'BIOSCI 208']

    assert parse("15 points from BIOSCI 220, COMPSCI 230, ENVSCI 203, STATS 201, 220, URBPLAN 203, 205") == \
        ['15', 'BIOSCI 220', 'COMPSCI 230', 'ENVSCI 203', 'STATS 201', 'STATS 220', 'URBPLAN 203', 'URBPLAN 205']

    assert parse("15 points from BIOSCI 220, ENVSCI 203, STATS 201") == \
        ['15', 'BIOSCI 220', 'ENVSCI 203', 'STATS 201']

    assert parse("15 points from BIOSCI 322, 324, 326, 347, 349, 353, 356") == \
        ['15', 'BIOSCI 322', 'BIOSCI 324', 'BIOSCI 326', 'BIOSCI 347', 'BIOSCI 349', 'BIOSCI 353', 'BIOSCI 356']

    assert parse("15 points from BIOSCI 324, 349") == \
        ['15', 'BIOSCI 324', 'BIOSCI 349']

    assert parse("15 points from BIOSCI 325, 334, 338, 347, MARINE 303") == \
        ['15', 'BIOSCI 325', 'BIOSCI 334', 'BIOSCI 338', 'BIOSCI 347', 'MARINE 303']

    assert parse("15 points from BIOSCI 326, 349, 351, 355, 356") == \
        ['15', 'BIOSCI 326', 'BIOSCI 349', 'BIOSCI 351', 'BIOSCI 355', 'BIOSCI 356']

    assert parse("15 points from BIOSCI 334, 338") == \
        ['15', 'BIOSCI 334', 'BIOSCI 338']

    assert parse("15 points from BIOSCI 394, CHEM 360, ENVCHG 300, ENVSCI 304, 390, GEOG 334, 352, GISCI 341, MARINE 302, 303") == \
        ['15', 'BIOSCI 394', 'CHEM 360', 'ENVCHG 300', 'ENVSCI 304',
            'ENVSCI 390', 'GEOG 334', 'GEOG 352', 'GISCI 341', 'MARINE 302', 'MARINE 303']

    assert parse("15 points from CHEM 110, 120") == \
        ['15', 'CHEM 110', 'CHEM 120']

    assert parse("15 points from CHEM 110, 120, 150") == \
        ['15', 'CHEM 110', 'CHEM 120', 'CHEM 150']

    assert parse("15 points from CHEM 110, 120, 150") == \
        ['15', 'CHEM 110', 'CHEM 120', 'CHEM 150']

    assert parse("15 points from CHEM 110, 120, 150") == \
        ['15', 'CHEM 110', 'CHEM 120', 'CHEM 150']

    assert parse("15 points from COMPSCI 130, LINGUIST 100, PHIL 105") == \
        ['15', 'COMPSCI 130', 'LINGUIST 100', 'PHIL 105']

    assert parse("15 points from COMPSCI 130, STATS 101, 108, URBPLAN 125") == \
        ['15', 'COMPSCI 130', 'STATS 101', 'STATS 108', 'URBPLAN 125']

    assert parse("15 points from COMPSCI 215, INFOSYS 221, INNOVENT 203, OPSMGT 258, SCIGEN 201") == \
        ['15', 'COMPSCI 215', 'INFOSYS 221', 'INNOVENT 203', 'OPSMGT 258', 'SCIGEN 201']

    assert parse("15 points from COMPSCI 220, LINGUIST 200, PHIL 216") == \
        ['15', 'COMPSCI 220', 'LINGUIST 200', 'PHIL 216']

    assert parse("15 points from COMPSCI 225, MATHS 254, 255") == \
        ['15', 'COMPSCI 225', 'MATHS 254', 'MATHS 255']

    assert parse("15 points from DATASCI 100, STATS 125, 150") == \
        ['15', 'DATASCI 100', 'STATS 125', 'STATS 150']

    assert parse("15 points from EARTHSCI 361, PHYSICS 332") == \
        ['15', 'EARTHSCI 361', 'PHYSICS 332']

    assert parse("15 points from ELECTENG 303, 331, MEDSCI 309, PHYSICS 331-335, 340, 356, 371, 390") == \
        ['15', 'ELECTENG 303', 'ELECTENG 331', 'MEDSCI 309', 'PHYSICS 331-335',
            'PHYSICS 340', 'PHYSICS 356', 'PHYSICS 371', 'PHYSICS 390']

    assert parse("15 points from ENVSCI 201, MARINE 202, STATS 201") == \
        ['15', 'ENVSCI 201', 'MARINE 202', 'STATS 201']

    assert parse("15 points from GEOG 101, 103") == \
        ['15', 'GEOG 101', 'GEOG 103']

    assert parse("15 points from GEOG 202, 205, 261, 262") == \
        ['15', 'GEOG 202', 'GEOG 205', 'GEOG 261', 'GEOG 262']

    assert parse("15 points from MATHS 108, 110, 130, PHYSICS 120") == \
        ['15', 'MATHS 108', 'MATHS 110', 'MATHS 130', 'PHYSICS 120']

    assert parse("15 points from MATHS 108-153") == \
        ['15', 'MATHS 108-153']

    assert parse("15 points from MATHS 315, 326, 328, 333, 340") == \
        ['15', 'MATHS 315', 'MATHS 326', 'MATHS 328', 'MATHS 333', 'MATHS 340']

    assert parse("15 points from MATHS 362, 363") == \
        ['15', 'MATHS 362', 'MATHS 363']

    assert parse("15 points from MEDSCI 201, 203, 204") == \
        ['15', 'MEDSCI 201', 'MEDSCI 203', 'MEDSCI 204']

    assert parse("15 points from MEDSCI 320, PHARMCOL 399") == \
        ['15', 'MEDSCI 320', 'PHARMCOL 399']

    assert parse("15 points from PHYSICS 120, 160") == \
        ['15', 'PHYSICS 120', 'PHYSICS 160']

    assert parse("15 points from STATS 100-125") == \
        ['15', 'STATS 100-125']

    assert parse("15 points from STATS 101, 108") == \
        ['15', 'STATS 101', 'STATS 108']

    assert parse("15 points from STATS 201, 208") == \
        ['15', 'STATS 201', 'STATS 208']

    assert parse("15 points from STATS 201, 208, 210, 225") == \
        ['15', 'STATS 201', 'STATS 208', 'STATS 210', 'STATS 225']

    assert parse("15 points from STATS 210, 225") == \
        ['15', 'STATS 210', 'STATS 225']

    assert parse("15 points from STATS 310, 325, 330, 380") == \
        ['15', 'STATS 310', 'STATS 325', 'STATS 330', 'STATS 380']

    assert parse("15 points from STATS 310, 325, 330, 380") == \
        ['15', 'STATS 310', 'STATS 325', 'STATS 330', 'STATS 380']

    assert parse("15 points from STATS 330, 380") == \
        ['15', 'STATS 330', 'STATS 380']

    assert parse("15 points: BIOSCI 220") == \
        ['15', 'BIOSCI 220']

    assert parse("15 points: BIOSCI 333") == \
        ['15', 'BIOSCI 333']

    assert parse("15 points: BIOSCI 394") == \
        ['15', 'BIOSCI 394']

    assert parse("15 points: CHEM 351") == \
        ['15', 'CHEM 351']

    assert parse("15 points: EARTHSCI 220") == \
        ['15', 'EARTHSCI 220']

    assert parse("15 points: EARTHSCI 320") == \
        ['15', 'EARTHSCI 320']

    assert parse("15 points: ENVPHYS 100") == \
        ['15', 'ENVPHYS 100']

    assert parse("15 points: ENVSCI 101") == \
        ['15', 'ENVSCI 101']

    assert parse("15 points: GEOG 250") == \
        ['15', 'GEOG 250']

    assert parse("15 points: INNOVENT 307") == \
        ['15', 'INNOVENT 307']

    assert parse("15 points: MARINE 202") == \
        ['15', 'MARINE 202']

    assert parse("15 points: MARINE 302") == \
        ['15', 'MARINE 302']

    assert parse("15 points: MATHS 250") == \
        ['15', 'MATHS 250']

    assert parse("15 points: PHIL 222") == \
        ['15', 'PHIL 222']

    assert parse("15 points: PHYSICS 121") == \
        ['15', 'PHYSICS 121']

    assert parse("15 points: PHYSICS 121") == \
        ['15', 'PHYSICS 121']

    assert parse("15 points: STATS 125") == \
        ['15', 'STATS 125']

    assert parse("30 points from ANTHRO 107-109") == \
        ['30', 'ANTHRO 107-109']

    assert parse("30 points from BIOSCI 203, MEDSCI 203, 205, 206") == \
        ['30', 'BIOSCI 203', 'MEDSCI 203', 'MEDSCI 205', 'MEDSCI 206']

    assert parse("30 points from BIOSCI 328, 333, 334, EARTHSCI 303, 360, GEOG 351, MARINE 303, 305, 306") == \
        ['30', 'BIOSCI 328', 'BIOSCI 333', 'BIOSCI 334', 'EARTHSCI 303',
            'EARTHSCI 360', 'GEOG 351', 'MARINE 303', 'MARINE 305', 'MARINE 306']

    assert parse("30 points from BIOSCI 340, 347, 348, MEDSCI 314") == \
        ['30', 'BIOSCI 340', 'BIOSCI 347', 'BIOSCI 348', 'MEDSCI 314']

    assert parse("30 points from CHEM 310, 320, 330, 340, 360, 380, 390") == \
        ['30', 'CHEM 310', 'CHEM 320', 'CHEM 330', 'CHEM 340', 'CHEM 360', 'CHEM 380', 'CHEM 390']

    assert parse("30 points from COMPSCI 320, 367, LINGUIST 300, LOGICOMP 301, MATHS 315, PHIL 306, 322, 323") == \
        ['30', 'COMPSCI 320', 'COMPSCI 367', 'LINGUIST 300', 'LOGICOMP 301', 'MATHS 315', 'PHIL 306', 'PHIL 322', 'PHIL 323']

    assert parse("30 points from EARTHSCI 202, 203, 208, 261, 262") == \
        ['30', 'EARTHSCI 202', 'EARTHSCI 203', 'EARTHSCI 208', 'EARTHSCI 261', 'EARTHSCI 262']

    assert parse("30 points from EARTHSCI 303-372, 390, GEOG 331, 332, 334, 351") == \
        ['30', 'EARTHSCI 303-372', 'EARTHSCI 390', 'GEOG 331', 'GEOG 332', 'GEOG 334', 'GEOG 351']

    assert parse("30 points from GEOG 342, GISCI 341, 343, 344") == \
        ['30', 'GEOG 342', 'GISCI 341', 'GISCI 343', 'GISCI 344']

    assert parse("30 points from MATHS 208, 250, STATS 201, 208, 210, 220, 225, 240, 255") == \
        ['30', 'MATHS 208', 'MATHS 250', 'STATS 201', 'STATS 208',
            'STATS 210', 'STATS 220', 'STATS 225', 'STATS 240', 'STATS 255']

    assert parse("30 points from MATHS 253, 254, 255, 260, 270") == \
        ['30', 'MATHS 253', 'MATHS 254', 'MATHS 255', 'MATHS 260', 'MATHS 270']

    assert parse("30 points from PHYSICS 331-335, 340, 356, 390") == \
        ['30', 'PHYSICS 331-335', 'PHYSICS 340', 'PHYSICS 356', 'PHYSICS 390']

    assert parse("30 points from STATS 220, 240, 255") == \
        ['30', 'STATS 220', 'STATS 240', 'STATS 255']

    assert parse("30 points from STATS 302, 326, 330, 331, 380, 383, MATHS 302") == \
        ['30', 'STATS 302', 'STATS 326', 'STATS 330', 'STATS 331', 'STATS 380', 'STATS 383', 'MATHS 302']

    assert parse("30 points: ANTHRO 200, 201") == \
        ['30', 'ANTHRO 200', 'ANTHRO 201']

    assert parse("30 points: BIOSCI 107, MEDSCI 142") == \
        ['30', 'BIOSCI 107', 'MEDSCI 142']

    assert parse("30 points: BIOSCI 204, 220") == \
        ['30', 'BIOSCI 204', 'BIOSCI 220']

    assert parse("30 points: BIOSCI 205, 220") == \
        ['30', 'BIOSCI 205', 'BIOSCI 220']

    assert parse("30 points: BIOSCI 206, 220") == \
        ['30', 'BIOSCI 206', 'BIOSCI 220']

    assert parse("30 points: BIOSCI 335, 337") == \
        ['30', 'BIOSCI 335', 'BIOSCI 337']

    assert parse("30 points: BIOSCI 347, 348") == \
        ['30', 'BIOSCI 347', 'BIOSCI 348']

    assert parse("30 points: BIOSCI 350, 353") == \
        ['30', 'BIOSCI 350', 'BIOSCI 353']

    assert parse("30 points: BIOSCI 351, 355") == \
        ['30', 'BIOSCI 351', 'BIOSCI 355']

    assert parse("30 points: CHEM 110, 120") == \
        ['30', 'CHEM 110', 'CHEM 120']

    assert parse("30 points: COMPSCI 120, PHIL 101") == \
        ['30', 'COMPSCI 120', 'PHIL 101']

    assert parse("30 points: COMPSCI 350, PHIL 315") == \
        ['30', 'COMPSCI 350', 'PHIL 315']

    assert parse("30 points: EARTHSCI 120, GEOG 101") == \
        ['30', 'EARTHSCI 120', 'GEOG 101']

    assert parse("30 points: ENVSCI 201, 203") == \
        ['30', 'ENVSCI 201', 'ENVSCI 203']

    assert parse("30 points: ENVSCI 301, 303") == \
        ['30', 'ENVSCI 301', 'ENVSCI 303']

    assert parse("30 points: GEOG 101, 102") == \
        ['30', 'GEOG 101', 'GEOG 102']

    assert parse("30 points: GISCI 241, 242") == \
        ['30', 'GISCI 241', 'GISCI 242']

    assert parse("30 points: INNOVENT 203, 204") == \
        ['30', 'INNOVENT 203', 'INNOVENT 204']

    assert parse("30 points: MARINE 100, STATS 101") == \
        ['30', 'MARINE 100', 'STATS 101']

    assert parse("30 points: MATHS 320, 332") == \
        ['30', 'MATHS 320', 'MATHS 332']

    assert parse("30 points: MATHS 340, 361") == \
        ['30', 'MATHS 340', 'MATHS 361']

    assert parse("30 points: MEDSCI 205, 206") == \
        ['30', 'MEDSCI 205', 'MEDSCI 206']

    assert parse("30 points: PSYCH 108, 109") == \
        ['30', 'PSYCH 108', 'PSYCH 109']

    assert parse("45 points from  EDUC 323, EXERSCI 307, PSYCH 300-326") == \
        ['45', 'EDUC 323', 'EXERSCI 307', 'PSYCH 300-326']

    assert parse("45 points from ANTHRO 306, 309, 317, 322, 337, 349, 352, 353, 365, 367, 372") == \
        ['45', 'ANTHRO 306', 'ANTHRO 309', 'ANTHRO 317', 'ANTHRO 322', 'ANTHRO 337',
            'ANTHRO 349', 'ANTHRO 352', 'ANTHRO 353', 'ANTHRO 365', 'ANTHRO 367', 'ANTHRO 372']

    assert parse("45 points from ANTHRO 349, BIOSCI 320-337, 347, 394-396, ENVSCI 301, GEOG 317-320, 330-332") == \
        ['45', 'ANTHRO 349', 'BIOSCI 320-337', 'BIOSCI 347', 'BIOSCI 394-396', 'ENVSCI 301', 'GEOG 317-320', 'GEOG 330-332']

    assert parse("45 points from BIOSCI 301-395, MARINE 303") == \
        ['45', 'BIOSCI 301-395', 'MARINE 303']

    assert parse("45 points from BIOSCI 324, 326, 347, 348") == \
        ['45', 'BIOSCI 324', 'BIOSCI 326', 'BIOSCI 347', 'BIOSCI 348']

    assert parse("45 points from BUSAN 300-302, 305, COMPSCI 345, INFOSYS 300, 302-306, 321, 341, OPSMGT 357") == \
        ['45', 'BUSAN 300-302', 'BUSAN 305', 'COMPSCI 345', 'INFOSYS 300',
            'INFOSYS 302-306', 'INFOSYS 321', 'INFOSYS 341', 'OPSMGT 357']

    assert parse("45 points from COMPSCI 300-379") == \
        ['45', 'COMPSCI 300-379']

    assert parse("45 points from COMPSCI 361, EARTHSCI 320, 361, ENVPHYS 300, 301, 370, GEOG 334, 335, GISCI 341, MARINE 302, MATHS 361-363, PHYSICS 331-334, 340") == \
        ['45', 'COMPSCI 361', 'EARTHSCI 320', 'EARTHSCI 361', 'ENVPHYS 300', 'ENVPHYS 301', 'ENVPHYS 370', 'GEOG 334',
            'GEOG 335', 'GISCI 341', 'MARINE 302', 'MATHS 361-363', 'PHYSICS 331-334', 'PHYSICS 340']

    assert parse("45 points from EXERSCI 201, 203, 205, 207") == \
        ['45', 'EXERSCI 201', 'EXERSCI 203', 'EXERSCI 205', 'EXERSCI 207']

    assert parse("45 points from EXERSCI 301, 303, 304, 305, 307") == \
        ['45', 'EXERSCI 301', 'EXERSCI 303', 'EXERSCI 304', 'EXERSCI 305', 'EXERSCI 307']

    assert parse("45 points from GEOG 302-390, GISCI 341-344") == \
        ['45', 'GEOG 302-390', 'GISCI 341-344']

    assert parse("45 points from MATHS 120, 130, 162, 199") == \
        ['45', 'MATHS 120', 'MATHS 130', 'MATHS 162', 'MATHS 199']

    assert parse("45 points from MATHS 250, 253, 254, 255") == \
        ['45', 'MATHS 250', 'MATHS 253', 'MATHS 254', 'MATHS 255']

    assert parse("45 points from MATHS 302-363") == \
        ['45', 'MATHS 302-363']

    assert parse("45 points from MEDSCI 309, 311, 312, 316, 317") == \
        ['45', 'MEDSCI 309', 'MEDSCI 311', 'MEDSCI 312', 'MEDSCI 316', 'MEDSCI 317']

    assert parse("45 points from PSYCH 200-209") == \
        ['45', 'PSYCH 200-209']

    assert parse("45 points from PSYCH 201, 202, 203") == \
        ['45', 'PSYCH 201', 'PSYCH 202', 'PSYCH 203']

    assert parse("45 points from PSYCH 303, 305, 306") == \
        ['45', 'PSYCH 303', 'PSYCH 305', 'PSYCH 306']

    assert parse("45 points: BIOSCI 201, 203, 220") == \
        ['45', 'BIOSCI 201', 'BIOSCI 203', 'BIOSCI 220']

    assert parse("45 points: BIOSCI 202, 210, 220") == \
        ['45', 'BIOSCI 202', 'BIOSCI 210', 'BIOSCI 220']

    assert parse("45 points: BIOSCI 206, 209, ENVSCI 201") == \
        ['45', 'BIOSCI 206', 'BIOSCI 209', 'ENVSCI 201']

    assert parse("45 points: BIOSCI 322, 355, 395") == \
        ['45', 'BIOSCI 322', 'BIOSCI 355', 'BIOSCI 395']

    assert parse("45 points: BIOSCI 324, 325, 326") == \
        ['45', 'BIOSCI 324', 'BIOSCI 325', 'BIOSCI 326']

    assert parse("45 points: BIOSCI 328, 333, 334") == \
        ['45', 'BIOSCI 328', 'BIOSCI 333', 'BIOSCI 334']

    assert parse("45 points: CHEM 251, 252, 253") == \
        ['45', 'CHEM 251', 'CHEM 252', 'CHEM 253']

    assert parse("45 points: COMPSCI 110, 120, 130") == \
        ['45', 'COMPSCI 110', 'COMPSCI 120', 'COMPSCI 130']

    assert parse("45 points: COMPSCI 210, 220, 230") == \
        ['45', 'COMPSCI 210', 'COMPSCI 220', 'COMPSCI 230']

    assert parse("45 points: ENVPHYS 200, 300, PHYSICS 201") == \
        ['45', 'ENVPHYS 200', 'ENVPHYS 300', 'PHYSICS 201']

    assert parse("45 points: EXERSCI 101, 103, 105") == \
        ['45', 'EXERSCI 101', 'EXERSCI 103', 'EXERSCI 105']

    assert parse("45 points: MATHS 120, 130, 250") == \
        ['45', 'MATHS 120', 'MATHS 130', 'MATHS 250']

    assert parse("45 points: MATHS 250, 260, 270") == \
        ['45', 'MATHS 250', 'MATHS 260', 'MATHS 270']

    assert parse("45 points: PHYSICS 201-203") == \
        ['45', 'PHYSICS 201-203']

    assert parse("60 points: BIOSCI 101, 108, 109, STATS 101") == \
        ['60', 'BIOSCI 101', 'BIOSCI 108', 'BIOSCI 109', 'STATS 101']

    assert parse("60 points: BIOSCI 207, 208, 210, 220") == \
        ['60', 'BIOSCI 207', 'BIOSCI 208', 'BIOSCI 210', 'BIOSCI 220']

    assert parse("75 points: BIOSCI 101, 106, 108, 109, STATS 101") == \
        ['75', 'BIOSCI 101', 'BIOSCI 106', 'BIOSCI 108', 'BIOSCI 109', 'STATS 101']

    assert parse("75 points: BIOSCI 203, 204, 220, INNOVENT 203, SCIGEN 201") == \
        ['75', 'BIOSCI 203', 'BIOSCI 204', 'BIOSCI 220', 'INNOVENT 203', 'SCIGEN 201']

    assert parse("75 points: CHEM 110, MEDSCI 142, 204, 318, 319") == \
        ['75', 'CHEM 110', 'MEDSCI 142', 'MEDSCI 204', 'MEDSCI 318', 'MEDSCI 319']

    assert parse("75 points: MEDSCI 309, PHYSICS 203, 333, 340, 390") == \
        ['75', 'MEDSCI 309', 'PHYSICS 203', 'PHYSICS 333', 'PHYSICS 340', 'PHYSICS 390']

    assert parse("90 points: EXERSCI 201, 203, 205, 206, 207, 271") == \
        ['90', 'EXERSCI 201', 'EXERSCI 203', 'EXERSCI 205', 'EXERSCI 206', 'EXERSCI 207', 'EXERSCI 271']

    assert parse("90 points: EXERSCI 301, 303, 305, 307, 371, 399") == \
        ['90', 'EXERSCI 301', 'EXERSCI 303', 'EXERSCI 305', 'EXERSCI 307', 'EXERSCI 371', 'EXERSCI 399']

    assert parse("90 points: MEDSCI 205, 206, PHYSICS 121, 201, 202, 244") == \
        ['90', 'MEDSCI 205', 'MEDSCI 206', 'PHYSICS 121', 'PHYSICS 201', 'PHYSICS 202', 'PHYSICS 244']

    assert parse("a further 15 points from DATASCI 100, STATS 101-150") == \
        ['15', 'DATASCI 100', 'STATS 101-150']

    assert parse("a further 15 points from GEOG 202, 205, 261, 262, GISCI 241, 242") == \
        ['15', 'GEOG 202', 'GEOG 205', 'GEOG 261', 'GEOG 262', 'GISCI 241', 'GISCI 242']

    assert parse("a further 30 points from BIOSCI 201-290") == \
        ['30', 'BIOSCI 201-290']

    assert parse("a further 30 points from COMPSCI 130, GEOG 101-140, STATS 101, URBPLAN 103") == \
        ['30', 'COMPSCI 130', 'GEOG 101-140', 'STATS 101', 'URBPLAN 103']

    assert parse("a further 30 points from STATS 301-389, ENGSCI 391") == \
        ['30', 'STATS 301-389', 'ENGSCI 391']

    assert parse("at least 15 points from BIOSCI 333, 394, 396, MARINE 303") == \
        ['15', 'BIOSCI 333', 'BIOSCI 394', 'BIOSCI 396', 'MARINE 303']


def test_majors_requirements_with_or():
    assert parse("15 points from CHEM 110, PHYSICS 120 or 160") == \
        ['15', 'CHEM 110', 'PHYSICS 120', 'PHYSICS 160']

    assert parse("30 points: BUSAN 201, COMPSCI 230 or INFOSYS 220") == \
        ['30', 'BUSAN 201', 'COMPSCI 230', 'INFOSYS 220']

    assert parse("30 points: MATHS 108 or 110, 208") == \
        ['30', 'MATHS 108', 'MATHS 110', 'MATHS 208']

    assert parse("45 points: COMPSCI 101 or 130, INFOMGMT 192, INFOSYS 110") == \
        ['45', 'COMPSCI 101', 'COMPSCI 130', 'INFOMGMT 192', 'INFOSYS 110']

    assert parse("60 points: BIOSCI 101, 106, 107, CHEM 110 or 120") == \
        ['60', 'BIOSCI 101', 'BIOSCI 106', 'BIOSCI 107', 'CHEM 110', 'CHEM 120']

    assert parse("60 points: BIOSCI 350, 351, 349 or 356, 353 or 354") == \
        ['60', 'BIOSCI 350', 'BIOSCI 351', 'BIOSCI 349', 'BIOSCI 356', 'BIOSCI 353', 'BIOSCI 354']

    assert parse("75 points: BIOSCI 101, 104, ENVSCI 101, GEOG 101, STATS 101 or 108") == \
        ['75', 'BIOSCI 101', 'BIOSCI 104', 'ENVSCI 101', 'GEOG 101', 'STATS 101', 'STATS 108']

    assert parse("75 points: ELECTENG 209 or 331, 303, PHYSICS 333, 340, 390") == \
        ['75', 'ELECTENG 209', 'ELECTENG 331', 'ELECTENG 303', 'PHYSICS 333', 'PHYSICS 340', 'PHYSICS 390']

    assert parse("75 points: ELECTENG 210 or 292, PHYSICS 201-203, 244") == \
        ['75', 'ELECTENG 210', 'ELECTENG 292', 'PHYSICS 201-203', 'PHYSICS 244']

    assert parse("90 points: BIOSCI 201-204, SCIGEN 201, STATS 101, 108 or BIOSCI 209") == \
        ['90', 'BIOSCI 201-204', 'SCIGEN 201', 'STATS 101', 'STATS 108', 'BIOSCI 209']

    assert parse("a further 30 points from STATS 201-255, MATHS 208 or 250") == \
        ['30', 'STATS 201-255', 'MATHS 208', 'MATHS 250']


def test_major_requirements_parse_for_backend():
    assert parse("30 points from ANTHRO 107-109 and 30 points: ANTHRO 200, 201 and 15 points from ANTHRO 205-208, 235, 252 and 45 points from ANTHRO 306, 309, 317, 322, 337, 349, 352, 353, 365, 367, 372") == \
        ['and',
            ['30', 'ANTHRO 107-109'],
            ['30', 'ANTHRO 200', 'ANTHRO 201'],
            ['15', 'ANTHRO 205-208', 'ANTHRO 235', 'ANTHRO 252'],
            ['45', 'ANTHRO 306', 'ANTHRO 309', 'ANTHRO 317', 'ANTHRO 322', 'ANTHRO 337',
                'ANTHRO 349', 'ANTHRO 352', 'ANTHRO 353', 'ANTHRO 365', 'ANTHRO 367', 'ANTHRO 372']
         ]

    assert parse("60 points: BIOSCI 101, 108, 109, STATS 101 and 15 points: BIOSCI 220 and a further 30 points from BIOSCI 201-290 and 45 points from BIOSCI 301-395, MARINE 303") == \
        ['and',
            ['60', 'BIOSCI 101', 'BIOSCI 108', 'BIOSCI 109', 'STATS 101'],
            ['15', 'BIOSCI 220'],
            ['30', 'BIOSCI 201-290'],
            ['45', 'BIOSCI 301-395', 'MARINE 303']
         ]

    assert parse("75 points: BIOSCI 101, 106, 108, 109, STATS 101 and 15 points from CHEM 110, 120 and 45 points: BIOSCI 201, 203, 220 and 30 points: BIOSCI 350, 353 and 15 points from BIOSCI 326, 349, 351, 355, 356") == \
        ['and',
            ['75', 'BIOSCI 101', 'BIOSCI 106', 'BIOSCI 108', 'BIOSCI 109', 'STATS 101'],
            ['15', 'CHEM 110', 'CHEM 120'],
            ['45', 'BIOSCI 201', 'BIOSCI 203', 'BIOSCI 220'],
            ['30', 'BIOSCI 350', 'BIOSCI 353'],
            ['15', 'BIOSCI 326', 'BIOSCI 349', 'BIOSCI 351', 'BIOSCI 355', 'BIOSCI 356']
         ]

    assert parse("60 points: BIOSCI 101, 108, 109, STATS 101 and 30 points: BIOSCI 206, 220 and 15 points from BIOSCI 204, 205, 207, 208 and 15 points from ENVSCI 201, MARINE 202, STATS 201 and 15 points: BIOSCI 333 and 15 points: BIOSCI 394 and 15 points from BIOSCI 325, 334, 338, 347, MARINE 303") == \
        ['and',
            ['60', 'BIOSCI 101', 'BIOSCI 108', 'BIOSCI 109', 'STATS 101'],
            ['30', 'BIOSCI 206', 'BIOSCI 220'],
            ['15', 'BIOSCI 204', 'BIOSCI 205', 'BIOSCI 207', 'BIOSCI 208'],
            ['15', 'ENVSCI 201', 'MARINE 202', 'STATS 201'],
            ['15', 'BIOSCI 333'],
            ['15', 'BIOSCI 394'],
            ['15', 'BIOSCI 325', 'BIOSCI 334', 'BIOSCI 338', 'BIOSCI 347', 'MARINE 303']
         ]

    assert parse("60 points: BIOSCI 101, 108, 109, STATS 101 and 45 points: BIOSCI 202, 210, 220 and 45 points: BIOSCI 322, 355, 395") == \
        ['and',
            ['60', 'BIOSCI 101', 'BIOSCI 108', 'BIOSCI 109', 'STATS 101'],
            ['45', 'BIOSCI 202', 'BIOSCI 210', 'BIOSCI 220'],
            ['45', 'BIOSCI 322', 'BIOSCI 355', 'BIOSCI 395']
         ]

    assert parse("60 points: BIOSCI 101, 108, 109, STATS 101 and 15 points from CHEM 110, 120, 150 and 45 points: BIOSCI 201, 202, 220 and 30 points: BIOSCI 351, 355 and 15 points from BIOSCI 322, 324, 326, 347, 349, 353, 356") == \
        ['and',
            ['60', 'BIOSCI 101', 'BIOSCI 108', 'BIOSCI 109', 'STATS 101'],
            ['15', 'CHEM 110', 'CHEM 120', 'CHEM 150'],
            ['45', 'BIOSCI 201', 'BIOSCI 202', 'BIOSCI 220'],
            ['30', 'BIOSCI 351', 'BIOSCI 355'],
            ['15', 'BIOSCI 322', 'BIOSCI 324', 'BIOSCI 326', 'BIOSCI 347', 'BIOSCI 349', 'BIOSCI 353', 'BIOSCI 356']
         ]

    assert parse("60 points: BIOSCI 101, 108, 109, STATS 101 and 30 points: BIOSCI 206, 220 and 15 points from BIOSCI 207, 208 and 45 points: BIOSCI 328, 333, 334") == \
        ['and',
            ['60', 'BIOSCI 101', 'BIOSCI 108', 'BIOSCI 109', 'STATS 101'],
            ['30', 'BIOSCI 206', 'BIOSCI 220'],
            ['15', 'BIOSCI 207', 'BIOSCI 208'],
            ['45', 'BIOSCI 328', 'BIOSCI 333', 'BIOSCI 334']
         ]

    assert parse("75 points: BIOSCI 101, 106, 108, 109, STATS 101 and 15 points from CHEM 110, 120, 150 and 15 points from BIOSCI 201, 202, 203 and 30 points: BIOSCI 204, 220 and 30 points: BIOSCI 347, 348 and 15 points from BIOSCI 324, 349") == \
        ['and',
            ['75', 'BIOSCI 101', 'BIOSCI 106', 'BIOSCI 108', 'BIOSCI 109', 'STATS 101'],
            ['15', 'CHEM 110', 'CHEM 120', 'CHEM 150'],
            ['15', 'BIOSCI 201', 'BIOSCI 202', 'BIOSCI 203'],
            ['30', 'BIOSCI 204', 'BIOSCI 220'],
            ['30', 'BIOSCI 347', 'BIOSCI 348'],
            ['15', 'BIOSCI 324', 'BIOSCI 349']
         ]

    assert parse("60 points: BIOSCI 101, 108, 109, STATS 101 and 30 points: BIOSCI 205, 220 and 15 points from BIOSCI 202, 203, 204, 206 and 45 points: BIOSCI 324, 325, 326") == \
        ['and',
            ['60', 'BIOSCI 101', 'BIOSCI 108', 'BIOSCI 109', 'STATS 101'],
            ['30', 'BIOSCI 205', 'BIOSCI 220'],
            ['15', 'BIOSCI 202', 'BIOSCI 203', 'BIOSCI 204', 'BIOSCI 206'],
            ['45', 'BIOSCI 324', 'BIOSCI 325', 'BIOSCI 326']
         ]

    assert parse("60 points: BIOSCI 101, 108, 109, STATS 101 and 60 points: BIOSCI 207, 208, 210, 220 and 30 points: BIOSCI 335, 337 and 15 points from BIOSCI 334, 338") == \
        ['and',
            ['60', 'BIOSCI 101', 'BIOSCI 108', 'BIOSCI 109', 'STATS 101'],
            ['60', 'BIOSCI 207', 'BIOSCI 208', 'BIOSCI 210', 'BIOSCI 220'],
            ['30', 'BIOSCI 335', 'BIOSCI 337'],
            ['15', 'BIOSCI 334', 'BIOSCI 338']
         ]

    assert parse("30 points: CHEM 110, 120 and 15 points from MATHS 108, 110, 130, PHYSICS 120 and 45 points: CHEM 251, 252, 253 and 15 points: CHEM 351 and 30 points from CHEM 310, 320, 330, 340, 360, 380, 390") == \
        ['and',
            ['30', 'CHEM 110', 'CHEM 120'],
            ['15', 'MATHS 108', 'MATHS 110', 'MATHS 130', 'PHYSICS 120'],
            ['45', 'CHEM 251', 'CHEM 252', 'CHEM 253'],
            ['15', 'CHEM 351'],
            ['30', 'CHEM 310', 'CHEM 320', 'CHEM 330', 'CHEM 340', 'CHEM 360', 'CHEM 380', 'CHEM 390']
         ]

    assert parse("45 points: COMPSCI 110, 120, 130 and 45 points: COMPSCI 210, 220, 230 and 45 points from COMPSCI 300-379") == \
        ['and',
            ['45', 'COMPSCI 110', 'COMPSCI 120', 'COMPSCI 130'],
            ['45', 'COMPSCI 210', 'COMPSCI 220', 'COMPSCI 230'],
            ['45', 'COMPSCI 300-379']
         ]

    assert parse("30 points: EARTHSCI 120, GEOG 101 and 15 points: EARTHSCI 220 and 30 points from EARTHSCI 202, 203, 208, 261, 262 and 15 points: EARTHSCI 320 and 30 points from EARTHSCI 303-372, 390, GEOG 331, 332, 334, 351") == \
        ['and',
            ['30', 'EARTHSCI 120', 'GEOG 101'],
            ['15', 'EARTHSCI 220'],
            ['30', 'EARTHSCI 202', 'EARTHSCI 203', 'EARTHSCI 208', 'EARTHSCI 261', 'EARTHSCI 262'],
            ['15', 'EARTHSCI 320'],
            ['30', 'EARTHSCI 303-372', 'EARTHSCI 390', 'GEOG 331', 'GEOG 332', 'GEOG 334', 'GEOG 351']
         ]

    assert parse("75 points: BIOSCI 101, 104, ENVSCI 101, GEOG 101, STATS 101 or 108 and 45 points: BIOSCI 206, 209, ENVSCI 201 and at least 15 points from BIOSCI 333, 394, 396, MARINE 303 and 45 points from ANTHRO 349, BIOSCI 320-337, 347, 394-396, ENVSCI 301, GEOG 317-320, 330-332") == \
        ['and',
            ['75', 'BIOSCI 101', 'BIOSCI 104', 'ENVSCI 101', 'GEOG 101', 'STATS 101', 'STATS 108'],
            ['45', 'BIOSCI 206', 'BIOSCI 209', 'ENVSCI 201'],
            ['15', 'BIOSCI 333', 'BIOSCI 394', 'BIOSCI 396', 'MARINE 303'],
            ['45', 'ANTHRO 349', 'BIOSCI 320-337', 'BIOSCI 347',
                'BIOSCI 394-396', 'ENVSCI 301', 'GEOG 317-320', 'GEOG 330-332']
         ]

    assert parse("15 points: ENVPHYS 100 and 15 points from PHYSICS 120, 160 and either 30 points: MATHS 108 or 110, 208 or 45 points: MATHS 120, 130, 250 and 45 points: ENVPHYS 200, 300, PHYSICS 201 and 15 points from EARTHSCI 361, PHYSICS 332 and 45 points from COMPSCI 361, EARTHSCI 320, 361, ENVPHYS 300, 301, 370, GEOG 334, 335, GISCI 341, MARINE 302, MATHS 361-363, PHYSICS 331-334, 340") == \
        ['and',
            ['15', 'ENVPHYS 100'],
            ['15', 'PHYSICS 120', 'PHYSICS 160'],
            ['or',
                ['30', 'MATHS 108', 'MATHS 110', 'MATHS 208'],
                ['45', 'MATHS 120', 'MATHS 130', 'MATHS 250']
             ],
            ['45', 'ENVPHYS 200', 'ENVPHYS 300', 'PHYSICS 201'],
            ['15', 'EARTHSCI 361', 'PHYSICS 332'],
            ['45', 'COMPSCI 361', 'EARTHSCI 320', 'EARTHSCI 361', 'ENVPHYS 300', 'ENVPHYS 301', 'ENVPHYS 370',
                'GEOG 334', 'GEOG 335', 'GISCI 341', 'MARINE 302', 'MATHS 361-363', 'PHYSICS 331-334', 'PHYSICS 340']
         ]

    assert parse("15 points: ENVSCI 101 and 15 points from STATS 101, 108 and 30 points: ENVSCI 201, 203 and 15 points from BIOSCI 206, 220, CHEM 260, EARTHSCI 261, 262, GEOG 205, 210, 250, 261, 262, GISCI 241, 242, MARINE 202 and 30 points: ENVSCI 301, 303 and 15 points from BIOSCI 394, CHEM 360, ENVCHG 300, ENVSCI 304, 390, GEOG 334, 352, GISCI 341, MARINE 302, 303") == \
        ['and',
            ['15', 'ENVSCI 101'],
            ['15', 'STATS 101', 'STATS 108'],
            ['30', 'ENVSCI 201', 'ENVSCI 203'],
            ['15', 'BIOSCI 206', 'BIOSCI 220', 'CHEM 260', 'EARTHSCI 261', 'EARTHSCI 262', 'GEOG 205',
                'GEOG 210', 'GEOG 250', 'GEOG 261', 'GEOG 262', 'GISCI 241', 'GISCI 242', 'MARINE 202'],
            ['30', 'ENVSCI 301', 'ENVSCI 303'],
            ['15', 'BIOSCI 394', 'CHEM 360', 'ENVCHG 300', 'ENVSCI 304', 'ENVSCI 390',
                'GEOG 334', 'GEOG 352', 'GISCI 341', 'MARINE 302', 'MARINE 303']
         ]

    assert parse("45 points: EXERSCI 101, 103, 105 and 45 points from EXERSCI 201, 203, 205, 207 and 45 points from EXERSCI 301, 303, 304, 305, 307") == \
        ['and',
            ['45', 'EXERSCI 101', 'EXERSCI 103', 'EXERSCI 105'],
            ['45', 'EXERSCI 201', 'EXERSCI 203', 'EXERSCI 205', 'EXERSCI 207'],
            ['45', 'EXERSCI 301', 'EXERSCI 303', 'EXERSCI 304', 'EXERSCI 305', 'EXERSCI 307']
         ]

    assert parse("45 points: EXERSCI 101, 103, 105 and 90 points: EXERSCI 201, 203, 205, 206, 207, 271 and 90 points: EXERSCI 301, 303, 305, 307, 371, 399") == \
        ['and',
            ['45', 'EXERSCI 101', 'EXERSCI 103', 'EXERSCI 105'],
            ['90', 'EXERSCI 201', 'EXERSCI 203', 'EXERSCI 205', 'EXERSCI 206', 'EXERSCI 207', 'EXERSCI 271'],
            ['90', 'EXERSCI 301', 'EXERSCI 303', 'EXERSCI 305', 'EXERSCI 307', 'EXERSCI 371', 'EXERSCI 399']
         ]

    assert parse("15 points from COMPSCI 130, STATS 101, 108, URBPLAN 125 and a further 30 points from COMPSCI 130, GEOG 101-140, STATS 101, URBPLAN 103 and 30 points: GISCI 241, 242 and 15 points from BIOSCI 220, COMPSCI 230, ENVSCI 203, STATS 201, 220, URBPLAN 203, 205 and 30 points from GEOG 342, GISCI 341, 343, 344 and a further 15 points from COMPSCI 313-373, GEOG 342, GISCI 341, 343, 390, SCIGEN 301, STATS 301-389") == \
        ['and',
            ['15', 'COMPSCI 130', 'STATS 101', 'STATS 108', 'URBPLAN 125'],
            ['30', 'COMPSCI 130', 'GEOG 101-140', 'STATS 101', 'URBPLAN 103'],
            ['30', 'GISCI 241', 'GISCI 242'],
            ['15', 'BIOSCI 220', 'COMPSCI 230', 'ENVSCI 203', 'STATS 201', 'STATS 220', 'URBPLAN 203', 'URBPLAN 205'],
            ['30', 'GEOG 342', 'GISCI 341', 'GISCI 343', 'GISCI 344'],
            ['15', 'COMPSCI 313-373',   'GEOG 342',    'GISCI 341',
                'GISCI 343',    'GISCI 390',    'SCIGEN 301',   'STATS 301-389']
         ]

    assert parse("30 points: GEOG 101, 102 and 15 points: GEOG 250 and 15 points from GEOG 202, 205, 261, 262 and a further 15 points from GEOG 202, 205, 261, 262, GISCI 241, 242 and 45 points from GEOG 302-390, GISCI 341-344") == \
        ['and',
            ['30', 'GEOG 101', 'GEOG 102'],
            ['15', 'GEOG 250'],
            ['15', 'GEOG 202', 'GEOG 205', 'GEOG 261', 'GEOG 262'],
            ['15', 'GEOG 202', 'GEOG 205', 'GEOG 261', 'GEOG 262', 'GISCI 241', 'GISCI 242'],
            ['45', 'GEOG 302-390', 'GISCI 341-344']
         ]

    assert parse("45 points: COMPSCI 101 or 130, INFOMGMT 192, INFOSYS 110 and 30 points: BUSAN 201, COMPSCI 230 or INFOSYS 220 and 15 points from COMPSCI 215, INFOSYS 221, INNOVENT 203, OPSMGT 258, SCIGEN 201 and 45 points from BUSAN 300-302, 305, COMPSCI 345, INFOSYS 300, 302-306, 321, 341, OPSMGT 357") == \
        ['and',
            ['45', 'COMPSCI 101', 'COMPSCI 130', 'INFOMGMT 192', 'INFOSYS 110'],
            ['30', 'BUSAN 201', 'COMPSCI 230', 'INFOSYS 220'],
            ['15', 'COMPSCI 215', 'INFOSYS 221', 'INNOVENT 203', 'OPSMGT 258', 'SCIGEN 201'],
            ['45', 'BUSAN 300-302', 'BUSAN 305', 'COMPSCI 345', 'INFOSYS 300',
                'INFOSYS 302-306', 'INFOSYS 321', 'INFOSYS 341', 'OPSMGT 357']
         ]

    assert parse("30 points: COMPSCI 120, PHIL 101 and 15 points from COMPSCI 130, LINGUIST 100, PHIL 105 and 15 points from COMPSCI 220, LINGUIST 200, PHIL 216 and 15 points from COMPSCI 225, MATHS 254, 255 and 15 points: PHIL 222 and 30 points: COMPSCI 350, PHIL 315 and 30 points from COMPSCI 320, 367, LINGUIST 300, LOGICOMP 301, MATHS 315, PHIL 306, 322, 323") == \
        ['and',
            ['30', 'COMPSCI 120', 'PHIL 101'],
            ['15', 'COMPSCI 130', 'LINGUIST 100', 'PHIL 105'],
            ['15', 'COMPSCI 220', 'LINGUIST 200', 'PHIL 216'],
            ['15', 'COMPSCI 225', 'MATHS 254', 'MATHS 255'],
            ['15', 'PHIL 222'],
            ['30', 'COMPSCI 350', 'PHIL 315'],
            ['30', 'COMPSCI 320', 'COMPSCI 367', 'LINGUIST 300',
                'LOGICOMP 301', 'MATHS 315', 'PHIL 306', 'PHIL 322', 'PHIL 323']
         ]

    assert parse("30 points: MARINE 100, STATS 101 and 15 points from BIOSCI 108, 109 and 15 points from GEOG 101, 103 and 15 points: MARINE 202 and 15 points from BIOSCI 220, ENVSCI 203, STATS 201 and 15 points from BIOSCI 206, 208, GEOG 262, GISCI 241 and 15 points: MARINE 302 and 30 points from BIOSCI 328, 333, 334, EARTHSCI 303, 360, GEOG 351, MARINE 303, 305, 306") == \
        ['and',
            ['30', 'MARINE 100', 'STATS 101'],
            ['15', 'BIOSCI 108', 'BIOSCI 109'],
            ['15', 'GEOG 101', 'GEOG 103'],
            ['15', 'MARINE 202'],
            ['15', 'BIOSCI 220', 'ENVSCI 203', 'STATS 201'],
            ['15', 'BIOSCI 206', 'BIOSCI 208', 'GEOG 262', 'GISCI 241'],
            ['15', 'MARINE 302'],
            ['30', 'BIOSCI 328', 'BIOSCI 333', 'BIOSCI 334', 'EARTHSCI 303',
                'EARTHSCI 360', 'GEOG 351', 'MARINE 303', 'MARINE 305', 'MARINE 306']
         ]

    assert parse("45 points from MATHS 120, 130, 162, 199 and 15 points: MATHS 250 and 30 points from MATHS 253, 254, 255, 260, 270 and 45 points from MATHS 302-363") == \
        ['and',
            ['45', 'MATHS 120', 'MATHS 130', 'MATHS 162', 'MATHS 199'],
            ['15', 'MATHS 250'],
            ['30', 'MATHS 253', 'MATHS 254', 'MATHS 255', 'MATHS 260', 'MATHS 270'],
            ['45', 'MATHS 302-363']
         ]

    assert parse("45 points from MATHS 120, 130, 162, 199 and 45 points: MATHS 250, 260, 270 and 30 points: MATHS 340, 361 and 15 points from MATHS 362, 363") == \
        ['and',
            ['45', 'MATHS 120', 'MATHS 130', 'MATHS 162', 'MATHS 199'],
            ['45', 'MATHS 250', 'MATHS 260', 'MATHS 270'],
            ['30', 'MATHS 340', 'MATHS 361'],
            ['15', 'MATHS 362', 'MATHS 363']
         ]

    assert parse("45 points from MATHS 120, 130, 162, 199 and 45 points from MATHS 250, 253, 254, 255 and 30 points: MATHS 320, 332 and 15 points from MATHS 315, 326, 328, 333, 340") == \
        ['and',
            ['45', 'MATHS 120', 'MATHS 130', 'MATHS 162', 'MATHS 199'],
            ['45', 'MATHS 250', 'MATHS 253', 'MATHS 254', 'MATHS 255'],
            ['30', 'MATHS 320', 'MATHS 332'],
            ['15', 'MATHS 315', 'MATHS 326', 'MATHS 328', 'MATHS 333', 'MATHS 340']
         ]

    assert parse("75 points: CHEM 110, MEDSCI 142, 204, 318, 319 and 15 points from BIOSCI 106, 107 and 30 points from BIOSCI 203, MEDSCI 203, 205, 206 and 15 points from MEDSCI 320, PHARMCOL 399") == \
        ['and',
            ['75', 'CHEM 110', 'MEDSCI 142', 'MEDSCI 204', 'MEDSCI 318', 'MEDSCI 319'],
            ['15', 'BIOSCI 106', 'BIOSCI 107'],
            ['30', 'BIOSCI 203', 'MEDSCI 203', 'MEDSCI 205', 'MEDSCI 206'],
            ['15', 'MEDSCI 320', 'PHARMCOL 399']
         ]

    assert parse("15 points from PHYSICS 120, 160 and 15 points: PHYSICS 121 and either 30 points: MATHS 108 or 110, 208 or 45 points: MATHS 120, 130, 250 and 45 points: PHYSICS 201-203 and 15 points from ELECTENG 303, 331, MEDSCI 309, PHYSICS 331-335, 340, 356, 371, 390 and 30 points from PHYSICS 331-335, 340, 356, 390") == \
        ['and',
            ['15', 'PHYSICS 120', 'PHYSICS 160'],
            ['15', 'PHYSICS 121'],
            ['or',
                ['30', 'MATHS 108', 'MATHS 110', 'MATHS 208'],
                ['45', 'MATHS 120', 'MATHS 130', 'MATHS 250']
             ],
            ['45', 'PHYSICS 201-203'],
            ['15', 'ELECTENG 303', 'ELECTENG 331', 'MEDSCI 309', 'PHYSICS 331-335',
                'PHYSICS 340', 'PHYSICS 356', 'PHYSICS 371', 'PHYSICS 390'],
            ['30', 'PHYSICS 331-335', 'PHYSICS 340', 'PHYSICS 356', 'PHYSICS 390']
         ]

    assert parse("15 points from PHYSICS 120, 160 and 30 points: BIOSCI 107, MEDSCI 142 and 90 points: MEDSCI 205, 206, PHYSICS 121, 201, 202, 244 and either 30 points: MATHS 108 or 110, 208 or 45 points: MATHS 120, 130, 250 and 75 points: MEDSCI 309, PHYSICS 203, 333, 340, 390") == \
        ['and',
            ['15', 'PHYSICS 120', 'PHYSICS 160'],
            ['30', 'BIOSCI 107', 'MEDSCI 142'],
            ['90', 'MEDSCI 205', 'MEDSCI 206', 'PHYSICS 121', 'PHYSICS 201', 'PHYSICS 202', 'PHYSICS 244'],
            ['or',
                ['30', 'MATHS 108', 'MATHS 110', 'MATHS 208'],
                ['45', 'MATHS 120', 'MATHS 130', 'MATHS 250']
             ],
            ['75', 'MEDSCI 309', 'PHYSICS 203', 'PHYSICS 333', 'PHYSICS 340', 'PHYSICS 390']
         ]

    assert parse("15 points from PHYSICS 120, 160 and 15 points: PHYSICS 121 and either 30 points: MATHS 108 or 110, 208 or 45 points: MATHS 120, 130, 250 and 75 points: ELECTENG 210 or 292, PHYSICS 201-203, 244 and 75 points: ELECTENG 209 or 331, 303, PHYSICS 333, 340, 390") == \
        ['and',
            ['15', 'PHYSICS 120', 'PHYSICS 160'],
            ['15', 'PHYSICS 121'],
            ['or',
                ['30', 'MATHS 108', 'MATHS 110', 'MATHS 208'],
                ['45', 'MATHS 120', 'MATHS 130', 'MATHS 250']
             ],
            ['75', 'ELECTENG 210', 'ELECTENG 292', 'PHYSICS 201-203', 'PHYSICS 244'],
            ['75', 'ELECTENG 209', 'ELECTENG 331', 'ELECTENG 303', 'PHYSICS 333', 'PHYSICS 340', 'PHYSICS 390']
         ]

    assert parse("30 points: BIOSCI 107, MEDSCI 142 and 15 points from CHEM 110, PHYSICS 120 or 160 and 30 points: MEDSCI 205, 206 and 15 points from MEDSCI 201, 203, 204 and 45 points from MEDSCI 309, 311, 312, 316, 317") == \
        ['and',
            ['30', 'BIOSCI 107', 'MEDSCI 142'],
            ['15', 'CHEM 110', 'PHYSICS 120', 'PHYSICS 160'],
            ['30', 'MEDSCI 205', 'MEDSCI 206'],
            ['15', 'MEDSCI 201', 'MEDSCI 203', 'MEDSCI 204'],
            ['45', 'MEDSCI 309', 'MEDSCI 311', 'MEDSCI 312', 'MEDSCI 316', 'MEDSCI 317']
         ]

    assert parse("30 points: PSYCH 108, 109 and 15 points from STATS 100-125 and 45 points from PSYCH 200-209 and 45 points from  EDUC 323, EXERSCI 307, PSYCH 300-326") == \
        ['and',
            ['30', 'PSYCH 108', 'PSYCH 109'],
            ['15', 'STATS 100-125'],
            ['45', 'PSYCH 200-209'],
            ['45', 'EDUC 323', 'EXERSCI 307', 'PSYCH 300-326']
         ]

    assert parse("30 points: PSYCH 108, 109 and 15 points from STATS 100-125 and 45 points from PSYCH 201, 202, 203 and 45 points from PSYCH 303, 305, 306") == \
        ['and',
            ['30', 'PSYCH 108', 'PSYCH 109'],
            ['15', 'STATS 100-125'],
            ['45', 'PSYCH 201', 'PSYCH 202', 'PSYCH 203'],
            ['45', 'PSYCH 303', 'PSYCH 305', 'PSYCH 306']
         ]

    assert parse("15 points from STATS 101-125 and a further 15 points from DATASCI 100, STATS 101-150 and 15 points from STATS 201, 208, 210, 225 and a further 30 points from STATS 201-255, MATHS 208 or 250 and 15 points from STATS 310, 325, 330, 380 and a further 30 points from STATS 301-389, ENGSCI 391") == \
        ['and',
            ['15', 'STATS 101-125'],
            ['15', 'DATASCI 100', 'STATS 101-150'],
            ['15', 'STATS 201', 'STATS 208', 'STATS 210', 'STATS 225'],
            ['30', 'STATS 201-255', 'MATHS 208', 'MATHS 250'],
            ['15', 'STATS 310', 'STATS 325', 'STATS 330', 'STATS 380'],
            ['30', 'STATS 301-389', 'ENGSCI 391']
         ]

    assert parse("15 points from STATS 101, 108 and 15 points from DATASCI 100, STATS 125, 150 and 15 points from STATS 201, 208 and 30 points from STATS 220, 240, 255 and 15 points from STATS 330, 380 and 30 points from STATS 302, 326, 330, 331, 380, 383, MATHS 302") == \
        ['and',
            ['15', 'STATS 101', 'STATS 108'],
            ['15', 'DATASCI 100', 'STATS 125', 'STATS 150'],
            ['15', 'STATS 201', 'STATS 208'],
            ['30', 'STATS 220', 'STATS 240', 'STATS 255'],
            ['15', 'STATS 330', 'STATS 380'],
            ['30', 'STATS 302', 'STATS 326', 'STATS 330', 'STATS 331', 'STATS 380', 'STATS 383', 'MATHS 302']
         ]

    assert parse("15 points from STATS 101, 108 and 15 points: STATS 125 and 15 points from MATHS 108-153 and 15 points from STATS 210, 225 and 30 points from MATHS 208, 250, STATS 201, 208, 210, 220, 225, 240, 255 and 15 points from STATS 310, 325, 330, 380 and a further 30 points from STATS 301-389, ENGSCI 391") == \
        ['and',
            ['15', 'STATS 101', 'STATS 108'],
            ['15', 'STATS 125'],
            ['15', 'MATHS 108-153'],
            ['15', 'STATS 210', 'STATS 225'],
            ['30', 'MATHS 208', 'MATHS 250', 'STATS 201', 'STATS 208',
                'STATS 210', 'STATS 220', 'STATS 225', 'STATS 240', 'STATS 255'],
            ['15', 'STATS 310', 'STATS 325', 'STATS 330', 'STATS 380'],
            ['30', 'STATS 301-389', 'ENGSCI 391']
         ]
