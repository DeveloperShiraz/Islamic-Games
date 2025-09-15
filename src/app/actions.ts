'use server';

import { revalidatePath } from 'next/cache';
import {
  addRegistration,
  getRegistrations,
  deleteRegistration,
  updateRegistration,
} from '@/lib/data';
import { SignUpSchema, type SignUpData } from '@/lib/types';

export async function registerUserAction(data: unknown) {
  const result = SignUpSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    await addRegistration(result.data);

    // In a real-world application, you would integrate with AWS SNS here.
    // Example:
    // await sendConfirmationEmail(result.data.email);
    // await sendWhatsappLinkSms(result.data.whatsappNumber, 'https://chat.whatsapp.com/your-group-link');
    console.log(
      `SIMULATING: Sending confirmation to ${result.data.email} and a WhatsApp link to ${result.data.whatsappNumber}`
    );

    revalidatePath('/admin');
    return { success: true };
  } catch (e) {
    return {
      success: false,
      errors: { _form: ['Something went wrong. Please try again.'] },
    };
  }
}

export async function getRegistrationsAction() {
  try {
    const data = await getRegistrations();
    return { success: true, data };
  } catch (e) {
    return {
      success: false,
      error: 'Failed to fetch registration data.',
    };
  }
}

export async function deleteRegistrationAction(email: string) {
  try {
    await deleteRegistration(email);
    revalidatePath('/admin');
    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: 'Failed to delete registration.',
    };
  }
}

export async function updateRegistrationAction(
  originalEmail: string,
  data: SignUpData
) {
  const result = SignUpSchema.safeParse(data);

  if (!result.success) {
    const { parentEmail, ...fieldErrors } = result.error.flatten().fieldErrors;
    if (parentEmail) {
      return { success: false, errors: { _form: parentEmail } };
    }
    return { success: false, errors: fieldErrors };
  }

  try {
    await updateRegistration(originalEmail, result.data);
    revalidatePath('/admin');
    return { success: true };
  } catch (e) {
    return {
      success: false,
      errors: { _form: ['Something went wrong. Please try again.'] },
    };
  }
}
