import type { SignUpData } from './types';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(
  process.cwd(),
  'src',
  'lib',
  'registrations.json'
);

async function readData(): Promise<SignUpData[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return empty array
      return [];
    }
    throw error;
  }
}

async function writeData(data: SignUpData[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function addRegistration(data: SignUpData): Promise<void> {
  const registrations = await readData();
  registrations.push(data);
  await writeData(registrations);
}

export async function getRegistrations(): Promise<SignUpData[]> {
  const registrations = await readData();
  return registrations;
}

export async function deleteRegistration(email: string): Promise<void> {
  const registrations = await readData();
  const updatedRegistrations = registrations.filter(
    (reg) => reg.email !== email
  );
  if (registrations.length === updatedRegistrations.length) {
    throw new Error('Registration not found.');
  }
  await writeData(updatedRegistrations);
}

export async function updateRegistration(
  originalEmail: string,
  updatedData: SignUpData
): Promise<void> {
  const registrations = await readData();
  const index = registrations.findIndex((reg) => reg.email === originalEmail);
  if (index === -1) {
    throw new Error('Registration not found.');
  }
  registrations[index] = updatedData;
  await writeData(registrations);
}
