from ..src.parse_requirements import parse


def test_other_requirements():
    assert parse('Concurrent enrolment in PHYSICS 390 is recommended') == \
        ['Concurrent enrolment recommended', 'PHYSICS 390']

    assert parse('To complete this course students must enrol in CHEM 254 A and B, or CHEM 254') == \
        ['To complete must enrol',
            ['or',
                ['and', 'CHEM 254A', 'CHEM 254B'],
                'CHEM 254'
             ]
         ]

    assert parse('To complete this course students must enrol in EXERSCI 309 A and B, or EXERSCI 309') == \
        ['To complete must enrol',
            ['or',
                ['and', 'EXERSCI 309A', 'EXERSCI 309B'],
                'EXERSCI 309'
             ]
         ]

    assert parse('To complete this course students must enrol in PSYCH 308 A and B, or PSYCH 308') == \
        ['To complete must enrol',
            ['or',
                ['and', 'PSYCH 308A', 'PSYCH 308B'],
                'PSYCH 308'
             ]
         ]

    assert parse('To complete this course students must enrol in SCISCHOL 100 A and B, or SCISCHOL 100') == \
        ['To complete must enrol',
            ['or',
                ['and', 'SCISCHOL 100A', 'SCISCHOL 100B'],
                'SCISCHOL 100'
             ]
         ]

    assert parse('To complete this course students must enrol in SCISCHOL 202 A and B, or SCISCHOL 202') == \
        ['To complete must enrol',
            ['or',
                ['and', 'SCISCHOL 202A', 'SCISCHOL 202B'],
                'SCISCHOL 202'
             ]
         ]

    assert parse('To complete this course students must enrol in SCISCHOL 302 A and B, or SCISCHOL 302') == \
        ['To complete must enrol',
            ['or',
                ['and', 'SCISCHOL 302A', 'SCISCHOL 302B'],
                'SCISCHOL 302'
             ]
         ]

    assert parse('No pre-requisites or restrictions') == \
        ''
