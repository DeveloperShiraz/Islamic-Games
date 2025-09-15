import { getRegistrationsAction } from '@/app/actions';
import { AdminTable } from '@/components/olympia/AdminTable';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileWarning } from 'lucide-react';
import { PasswordProtect } from '@/components/olympia/PasswordProtect';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const { data, error } = await getRegistrationsAction();

  return (
    <PasswordProtect>
      <main className="container mx-auto py-24">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline">
              Admin Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive">
                <FileWarning className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {data && <AdminTable data={data} />}
          </CardContent>
        </Card>
      </main>
    </PasswordProtect>
  );
}
