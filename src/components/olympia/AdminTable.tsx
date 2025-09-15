'use client';

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
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';

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

  const handleEdit = (email: string) => {
    // In a real app, this would open a modal or navigate to an edit page.
    alert(`Editing user with email: ${email}`);
  };

  const handleDelete = (email: string) => {
    // In a real app, you would show a confirmation dialog before deleting.
    alert(`Deleting user with email: ${email}`);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>A list of all Olympia registrations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Parent Email</TableHead>
            <TableHead className="font-semibold">Gender</TableHead>
            <TableHead className="font-semibold text-center">Age</TableHead>
            <TableHead className="font-semibold">WhatsApp</TableHead>
            <TableHead className="font-semibold">Sport</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Team Name</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((reg, index) => (
            <TableRow key={`${reg.email}-${index}`}>
              <TableCell className="font-medium">{reg.name}</TableCell>
              <TableCell>{reg.email}</TableCell>
              <TableCell>{reg.parentEmail || 'N/A'}</TableCell>
              <TableCell>{reg.gender}</TableCell>
              <TableCell className="text-center">{reg.age}</TableCell>
              <TableCell>{reg.whatsappNumber}</TableCell>
              <TableCell>{reg.sport}</TableCell>
              <TableCell>{reg.participationType}</TableCell>
              <TableCell>{reg.teamName || 'N/A'}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(reg.email)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(reg.email)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
