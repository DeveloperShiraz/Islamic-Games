'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { registerUserAction } from '@/app/actions';
import { SignUpSchema, type SignUpData, sports } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SignUpForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      age: undefined,
      whatsappNumber: '',
      teamName: '',
      participationType: 'Individual',
    },
  });

  const participationType = form.watch('participationType');

  async function onSubmit(data: SignUpData) {
    setIsSubmitting(true);
    const result = await registerUserAction(data);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Registration Successful!',
        description:
          'We received your registration. Check your email and WhatsApp for details.',
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description:
          result.errors?._form?.[0] || 'Please check the form for errors.',
      });
    }
  }

  return (
    <Card className="w-full max-w-2xl shadow-2xl bg-card/80 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">
          Olympia Sign-Up
        </CardTitle>
        <CardDescription>
          Register for the Muslim Olympics. Fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 555-5555"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sport of Interest *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sports.map((sport) => (
                        <SelectItem key={sport} value={sport}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participationType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Participation *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Individual" />
                        </FormControl>
                        <FormLabel className="font-normal">Individual</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Team" />
                        </FormControl>
                        <FormLabel className="font-normal">Team</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {participationType === 'Team' && (
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your team's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register Now
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
