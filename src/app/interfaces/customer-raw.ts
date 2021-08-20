export enum Gender{
    MALE = 'Male',
    FEMALE = 'Female'
}

export enum Currency{
    USD = 'USD',
    EUR = 'EUR',
    ILS = 'ILS',
    GBP = 'GBP',
    ARS = 'ARS',
    PLN = 'PLN',
    PHP = 'PHP',
    THB = 'THB'
}

export interface CustomerRaw {
    id?:string;
    predict?:boolean;
    user_id?:string;
    generalData:{
        name:string;
        gender:string;
        email:string;
        salary:number;
        currency:Currency;
    };
    incomeData:{
        totalRelationship:number;
        inactiveMonth:number;
        numberOfContacts:number;
        totalRevolvingBal:number;
        totalTransChange:number;
        changeTransFromQ1ToQ4:number;
        totalTransCount:number;
        totalCtChangeQ1ToQ4:number;
        avgRatio:number;
    };
}
