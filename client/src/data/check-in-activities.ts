import BookIcon from '../assets/icons/book.svg';
import EatIcon from '../assets/icons/eat.svg';
import QuestionIcon from '../assets/icons/question.svg';
import MeetingIcon from '../assets/icons/meeting.svg';

export type CheckInActivityIDs = 'food' | 'study' | 'other' | 'meeting';

export interface CheckInActivity {
    id: CheckInActivityIDs,
    title: string,
    logo: string
}

export const checkInActivities: CheckInActivity[] = [
    {
        id: 'food',
        title: 'Eating',
        logo: EatIcon
    },
    {
        id: 'study',
        title: 'Studying',
        logo: BookIcon
    },
    {
        id: 'other',
        title: 'Other',
        logo: QuestionIcon
    },
    {
        id: 'meeting',
        title: 'Meeting',
        logo: MeetingIcon
    },
]