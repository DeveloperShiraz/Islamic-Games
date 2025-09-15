import { SignUpForm } from '@/components/olympia/SignUpForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <main className="container mx-auto py-24 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <SignUpForm />
        </div>
        <div className="flex flex-col gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary">
                Event Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg">
              <div className="flex items-center gap-4">
                <Calendar className="h-6 w-6 text-accent" />
                <p>
                  <span className="font-bold">Dates:</span> September 27-28,
                  2025
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-accent" />
                <p>
                  <span className="font-bold">Timings:</span> 9:00 AM - 7:00 PM
                </p>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-accent mt-1" />
                <div>
                  <p className="font-bold">Location: (Click the address below to open in Google Maps).</p>
                  <a
                    href="https://maps.app.goo.gl/EGQ2iX7CZDbWZ7CW8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary hover:underline"
                  >
                    Bridgeland High School <br />
                    10707 Mason Rd, Cypress, TX 77433
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
