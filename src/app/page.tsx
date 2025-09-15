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
                  <p className="font-bold">Location:</p>
                  <p className="text-muted-foreground">
                    Bridgeland High School <br />
                    10707 Mason Rd, Cypress, TX 77433
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.433599238945!2d-95.68686102368945!3d29.99625792038407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640d90d7335e955%3A0x27a5d15a9143a758!2sBridgeland%20High%20School!5e0!3m2!1sen!2sus!4v1719595561530!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
