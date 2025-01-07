import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  //Hidden Information
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const COLLECTIONS = {
  USERS: 'users',
  JOBS: 'jobs',
  APPLICATIONS: 'applications',
} as const;

export const ROLES = {
  ADMIN: 'admin',
  EMPLOYER: 'employer',
  STUDENT: 'student',
} as const;

export const JOB_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];
export type JobStatus = typeof JOB_STATUS[keyof typeof JOB_STATUS];
export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];

export interface UserDocument {
  uid: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  company?: string; 
}

export interface JobDocument {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary: string;
  type: string;
  employerId: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationDocument {
  id: string;
  jobId: string;
  studentId: string;
  employerId: string;
  status: ApplicationStatus;
  resume: string;
  coverLetter?: string;
  createdAt: string;
  updatedAt: string;
}
