import type { SignUpData } from './types';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'registrations.json');

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
