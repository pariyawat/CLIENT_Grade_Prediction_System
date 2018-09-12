export interface IGetSubjectPredict {
    SUB_CPE: string;
    SUB_ID: string;
    SUB_NAME: string;
    IS_ACTIVE: boolean;

}

export interface DT {
    Grade: string;
    Accuracy: string;
}

export interface ASSO {
    Grade: string;
    Confidence: string;
    Lift: string;
}

export interface IPredictResult {
    STD_ID: string;
    SUB_NAME: string;
    DT: DT;
    ASSO: ASSO;
}

export interface IStudenByGroup {
    STD_ID: string;
    STD_NAME: string;
    STD_GROUP: string;
    ACT_SUB: number;
}


