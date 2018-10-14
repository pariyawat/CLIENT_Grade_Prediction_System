
// ******************Interface Group Prediction Result**********************
export interface IPredictGroupsResult {
  gpaASSO: number;
  gpaDT: number;
  results: IResult[];
}

export interface IResult {
  ASSO: IASSO;
  CREDIT: number;
  DT: IDT;
  STD_ID: string;
  STD_NAME: string;
  SUB_CPE: string;
  SUB_NAME: string;
}

export interface IDT {
  Accuracy: number;
  Grade: string;
}

export interface IASSO {
  Confidence: number;
  Grade: string;
}
