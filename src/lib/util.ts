import {differenceInYears} from 'date-fns';
// calculo la edad

export function calculateAge(dob: Date) {
    return differenceInYears(new Date(), dob);
}