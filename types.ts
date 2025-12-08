export type Axis = 'IE' | 'PM' | 'TS' | 'ES';

export interface Option {
  label: string;
  value: string; // e.g., 'I', 'E', 'P', 'M'...
}

export interface Question {
  id: number;
  axis: Axis;
  question: string;
  options: [Option, Option];
}

export interface SecretMentor {
  name: string;
  role: string;
  comment: string;
}

export interface TypeDefinition {
  code: string; // e.g., 'IPTE'
  name: string;
  shortDesc: string;
  longDesc: string;
  signs: string[];
  actions: string[];
  ctaCopy: string;
  secretMentor: SecretMentor;
}

export type UserAnswers = Record<number, string>; // questionId -> value