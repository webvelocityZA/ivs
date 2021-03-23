export interface Vaccination {
        id: number;
        memberId: number;
        vaccinationSiteId: number;
        vaccinatorid: number;
        feedBack: string;
        repeatInoculatedOn: string;
        inoculatedOn: string;
        dosageRecieved: string;
        doseNumber: number;
        vaccinatedDate: string;
        createdOn?: string;
        createdby?: string;
        updatedOn?: string;
        updatedby?: string;
        deleted?: boolean;
        deletedOn?: string;
        deletedBy?: string;
}

export interface Vaccine {
    id: number;
    name: string;
    neppiCode: string;
    dosageRequired: number;
    createdOn?: string;
    createdby?: string;
    updatedOn?: string;
    updatedby?: string;
    deleted?: boolean;
    deletedOn?: string;
    deletedBy?: string;
}