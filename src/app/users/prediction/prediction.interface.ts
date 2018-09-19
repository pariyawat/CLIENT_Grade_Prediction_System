export interface IGetSubjectPredict {
    SUB_CPE: string;
    SUB_ID: string;
    SUB_NAME: string;
    IS_ACTIVE: boolean;

}
export interface IStudenByGroup {
    STD_ID: string;
    STD_NAME: string;
    STD_GROUP: string;
    ACT_SUB: number;
}

export interface DT {
    Grade: string;
    Accuracy: number;
}

export interface ASSO {
    Grade: string;
    Confidence: number;
}

export interface Result {
    STD_ID: string;
    SUB_NAME: string;
    CREDIT: number;
    DT: DT;
    ASSO: ASSO;
}

export interface IPredictResult {
    result: Result[];
    gpaDT: number;
    gpaASSO: number;
}
