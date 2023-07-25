type SubjectType = {
  name: string;
  totalMark: string;
};

export type IExam = {
  examName: string;
  className: string;
  subjects: SubjectType[];
  examDate: string;
};

export type IFilter = {
  className?: string;
};
