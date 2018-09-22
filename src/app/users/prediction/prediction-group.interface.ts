
// ******************Interface Group Prediction Result**********************

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

export interface IDataGroupResult {
    results: Result[];
    gpaDT: number;
    gpaASSO: number;
}

export interface IGraphResult {
    SUB_NAME: string;
    graphDT: number[];
    graphASSO: number[];
}

export interface IPredictGroupsResult {
    data: IDataGroupResult[];
    graph: IGraphResult[];
}
