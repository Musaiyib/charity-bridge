export interface Donation {
    image: string;
    title: string;
    tag: string;
    about: string;
    type: string;
    gender: string;
    totalDonatedAmount: number;
    amountNeeded: number;
    reasonForSeekingDonation: string;
    daysLeft: number;
    donationAreas: string[];
}
export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    totalDonated: number;
    totalPeopleHelped: number;
    email: string;
    password: string;
}