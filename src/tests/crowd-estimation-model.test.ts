import React from 'react';
import CrowdEstimationModel, { CrowdEstimationData, ProgramCohort, CourseSchedule, Lecture } from '../model/crowd-estimation-model';
import { render } from '@testing-library/react';

// See following calendar:
// https://calendar.google.com/calendar?cid=NmxiNGw1ZGpiODM2bXE0MWNsN2FuOGJjbGdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ
const crowdEstimation = new CrowdEstimationData(
    [
        new ProgramCohort(
            'CMETE',
            'HT17',
            80,
            [
                new CourseSchedule(
                    'Course A',
                    'CA',
                    false,
                    [
                        new Lecture(
                            new Date(2020, 3, 1, 8),
                            new Date(2020, 3, 1, 10),
                            false
                        ),
                        new Lecture(
                            new Date(2020, 3, 3, 8),
                            new Date(2020, 3, 3, 10),
                            false
                        ),
                    ]
                ),
                new CourseSchedule(
                    'Course B',
                    'CB',
                    false,
                    [
                        new Lecture(
                            new Date(2020, 3, 1, 11),
                            new Date(2020, 3, 1, 12),
                            false
                        ),
                        new Lecture(
                            new Date(2020, 3, 3, 11),
                            new Date(2020, 3, 3, 12),
                            false
                        ),
                    ]
                ),
                new CourseSchedule(
                    'Course C',
                    'CC',
                    false,
                    [
                        new Lecture(
                            new Date(2020, 3, 1, 13),
                            new Date(2020, 3, 1, 15),
                            false
                        ),
                        new Lecture(
                            new Date(2020, 3, 3, 13),
                            new Date(2020, 3, 3, 15),
                            false
                        ),
                    ]
                ),
            ]
        ),
        new ProgramCohort(
            'CDATE',
            'HT18',
            180,
            [
                new CourseSchedule(
                    'Course A',
                    'CA',
                    false,
                    [
                        new Lecture(
                            new Date(2020, 3, 2, 8),
                            new Date(2020, 3, 2, 10),
                            false
                        ),
                        new Lecture(
                            new Date(2020, 3, 3, 8),
                            new Date(2020, 3, 3, 10),
                            false
                        ),
                    ]
                ),
                new CourseSchedule(
                    'Course B',
                    'CB',
                    false,
                    [
                        new Lecture(
                            new Date(2020, 3, 2, 11),
                            new Date(2020, 3, 2, 12),
                            false
                        ),
                        new Lecture(
                            new Date(2020, 3, 3, 11),
                            new Date(2020, 3, 3, 12),
                            false
                        ),
                    ]
                ),
                new CourseSchedule(
                    'Course C',
                    'CC',
                    false,
                    [
                        new Lecture(
                            new Date(2020, 3, 2, 13),
                            new Date(2020, 3, 2, 15),
                            false
                        ),
                        new Lecture(
                            new Date(2020, 3, 3, 13),
                            new Date(2020, 3, 3, 15),
                            false
                        ),
                    ]
                ),
            ]
        ),
    ],
    new Date(2020, 3, 1, 0, 0)
);

test('More people at lunch compared to free period', () => {
    expect(
        crowdEstimation.getCrowdedness(0, 12)
    ).toBeGreaterThan(
        crowdEstimation.getCrowdedness(0, 10)
    );
});

test('More people on free period compared to ongoing lecture', () => {
    expect(
        crowdEstimation.getCrowdedness(0, 10)
    ).toBeGreaterThan(
        crowdEstimation.getCrowdedness(0, 8)
    );

    expect(
        crowdEstimation.getCrowdedness(0, 10)
    ).toBeGreaterThan(
        crowdEstimation.getCrowdedness(0, 9)
    );
});

test('More people in bigger program than smaller program', () => {
    expect(
        crowdEstimation.getCrowdedness(1, 10)
    ).toBeGreaterThan(
        crowdEstimation.getCrowdedness(0, 10)
    );
});

test('Estimation of amount merged correctly', () => {
    expect(
        crowdEstimation.getCrowdedness(2, 10)
    ).toEqual(
        crowdEstimation.getCrowdedness(0, 10) +
        crowdEstimation.getCrowdedness(1, 10)
    );
});

test('Estimation of amount merged correctly', () => {
    expect(
        crowdEstimation.getCrowdedness(2, 10)
    ).toEqual(
        crowdEstimation.getCrowdedness(0, 10) +
        crowdEstimation.getCrowdedness(1, 10)
    );
});

test('API call', async () => {
    console.log(CrowdEstimationModel.getActiveYearCodes());
    console.log( await CrowdEstimationModel.estimateChapterCrowdedness(
        new Date(2020, 1, 23, 0, 0),
        [
            {
                averageAmount: 80,
                code: 'CMETE',
            },
        ],
    ));
}, 20000);
