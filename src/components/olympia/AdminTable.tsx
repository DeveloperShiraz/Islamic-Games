import type { SignUpData } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AdminTableProps {
  data: SignUpData[];
}

export function AdminTable({ data }: AdminTableProps) {
  if (data.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-8">
        No registrations have been submitted yet.
      </p>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>A list of all Olympia registrations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Gender</TableHead>
            <TableHead className="font-semibold text-center">Age</TableHead>
            <TableHead className="font-semibold">WhatsApp</TableHead>
            <TableHead className="font-semibold">Sport</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Team Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((reg, index) => (
            <TableRow key={`${reg.email}-${index}`}>
              <TableCell className="font-medium">{reg.name}</TableCell>
              <TableCell>{reg.email}</TableCell>
              <TableCell>{reg.gender}</TableCell>
              <TableCell className="text-center">{reg.age}</TableCell>
              <TableCell>{reg.whatsappNumber}</TableCell>
              <TableCell>{reg.sport}</TableCell>
              <TableCell>{reg.participationType}</TableCell>
              <TableCell>{reg.teamName || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
