// JSONPlaceholder interfaces
export interface JSONPlaceholderResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Trainer Form Data interface (definida aquí directamente)
export interface TrainerFormData {
  nombre: string;
  edad: number;
  biografia?: string;
}

// Submission interfaces
export interface LastSubmission {
  formData: TrainerFormData;
  apiResponse: JSONPlaceholderResponse;
}

export interface SubmissionState {
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  lastSubmission: LastSubmission | null;
}

