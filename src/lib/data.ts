import type { SignUpData } from './types';

// In a real application, this would be a database.
// For this example, we use an in-memory array.
const registrations: SignUpData[] = [];

export async function addRegistration(data: SignUpData): Promise<void> {
  // Simulate async operation
  await new Promise((res) => setTimeout(res, 500));
  registrations.push(data);
}

export async function getRegistrations(): Promise<SignUpData[]> {
  // Simulate async operation
  await new Promise((res) => setTimeout(res, 500));
  return registrations;
}
