export interface eligibilityQuestion {
  key: string;
  label: string;
  type:
    | "text"
    | "number"
    | "textarea"
    | "radio"
    | "checkbox"
    | "select"
    | "date"
    | "email";
  required: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface EligibilityStep {
  key: string;
  label: string;
  questions: eligibilityQuestion[];
}

export interface FormAnswer {
  [questionKey: string]: string | number | string[] | Date;
}
export interface EligibilityFormData {
  [stepKey: string]: FormAnswer;
}
