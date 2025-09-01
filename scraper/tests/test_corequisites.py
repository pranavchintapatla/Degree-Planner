from ..src.parse_requirements import parse


def test_corequisites():

    assert parse('15 points from ENGSCI 211, MATHS 208, 250') == \
        ['15', 'ENGSCI 211', 'MATHS 208', 'MATHS 250']

    assert parse('15 points from MATHS 208, 250, ENGSCI 211 or equivalent') == \
        ['15', 'MATHS 208', 'MATHS 250', 'ENGSCI 211', 'equivalent']

    assert parse('ENGGEN 150 or ENGSCI 111 or MATHS 108 or 120 or 150 or 153') == \
        ['or', 'ENGGEN 150', 'ENGSCI 111', 'MATHS 108', 'MATHS 120', 'MATHS 150', 'MATHS 153']

    assert parse('EXERSCI 305') == \
        ['and', 'EXERSCI 305']

    assert parse('MATHS 108 or 110 or 120 or 130') == \
        ['or', 'MATHS 108', 'MATHS 110', 'MATHS 120', 'MATHS 130']

    assert parse('MATHS 250') == \
        ['and', 'MATHS 250']
