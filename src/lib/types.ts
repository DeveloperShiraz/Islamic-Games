import { z } from 'zod';

export const sports = [
  '5k Run',
  'Archery',
  'Badminton',
  'Basketball',
  'Cricket',
  'Fitness Course',
  'Flag Football',
  'Kids Sports',
  'Martial Arts',
  'Pickleball',
  'Soccer',
  'Table Tennis',
  'Tennis',
  'Track Running',
  'Volleyball',
] as const;

export const SignUpSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    gender: z.enum(['Male', 'Female'], {
      required_error: 'Please select a gender.',
    }),
    age: z.coerce
      .number({ required_error: 'Age is required.' })
      .positive()
      .min(5, { message: 'You must be at least 5 years old.' })
      .max(100, { message: 'Please enter a valid age.' }),
    parentEmail: z.string().email().optional().or(z.literal('')),
    countryCode: z.string().min(1, 'Country code is required.'),
    phoneNumber: z
      .string()
      .min(10, { message: 'Please enter a valid phone number.' }),
    whatsappNumber: z.string().optional(),
    sport: z.enum(sports, { required_error: 'Please select a sport.' }),
    participationType: z.enum(['Individual', 'Team'], {
      required_error: 'Please select a participation type.',
    }),
    teamName: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    whatsappNumber: `${data.countryCode}${data.phoneNumber}`,
  }))
  .refine(
    (data) => {
      if (data.age < 18) {
        return (
          !!data.parentEmail &&
          z.string().email().safeParse(data.parentEmail).success
        );
      }
      return true;
    },
    {
      message: "Parent's email is required for participants under 18.",
      path: ['parentEmail'],
    }
  )
  .refine(
    (data) => {
      if (data.participationType === 'Team') {
        return !!data.teamName && data.teamName.length > 1;
      }
      return true;
    },
    {
      message: 'Team name is required for team participation.',
      path: ['teamName'],
    }
  );

export type SignUpData = z.infer<typeof SignUpSchema>;
