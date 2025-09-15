'use client';

import { useState } from 'react';
import type { SignUpData } from '@/lib/types';
import { sports } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Edit, Check, X, Loader2 } from 'lucide-react';
import {
  deleteRegistrationAction,
  updateRegistrationAction,
} from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface AdminTableProps {
  data: SignUpData[];
}

export function AdminTable({ data }: AdminTableProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<SignUpData> | null>(null);

  if (data.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-8">
        No registrations have been submitted yet.
      </p>
    );
  }

  const handleEditClick = (reg: SignUpData) => {
    setEditingEmail(reg.email);
    setEditFormData({
      ...reg,
      age: Number(reg.age),
    });
  };

  const handleCancelClick = () => {
    setEditingEmail(null);
    setEditFormData(null);
  };

  const handleSaveClick = async (originalEmail: string) => {
    if (!editFormData) return;
    setIsSubmitting(true);
    
    const result = await updateRegistrationAction(originalEmail, editFormData as SignUpData);
    setIsSubmitting(false);

    if (result.success) {
      toast({ title: 'Success', description: 'Registration updated.' });
      handleCancelClick();
      router.refresh();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          result.errors?._form?.[0] || 'Failed to update registration.',
      });
    }
  };

  const handleDelete = async (email: string) => {
    setIsSubmitting(true);
    const result = await deleteRegistrationAction(email);
    setIsSubmitting(false);
    if (result.success) {
      toast({ title: 'Success', description: 'Registration deleted.' });
      router.refresh();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editFormData) return;
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'age' ? Number(value) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!editFormData) return;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const renderEditableCell = (
    name: keyof SignUpData,
    type: 'text' | 'number' | 'email' | 'tel'
  ) => (
    <Input
      type={type}
      name={name}
      value={(editFormData?.[name as keyof typeof editFormData] as string | number) ?? ''}
      onChange={handleInputChange}
      className="h-8"
    />
  );

  const renderSelectCell = (
    name: keyof SignUpData,
    options: readonly any[]
  ) => (
    <Select
      name={name}
      value={editFormData?.[name as keyof typeof editFormData] as string}
      onValueChange={(value) => handleSelectChange(name, value)}
    >
      <SelectTrigger className="h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>A list of all Olympia registrations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Parent Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Sport</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Team Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((reg) => {
            const isEditing = editingEmail === reg.email;
            return (
              <TableRow key={reg.email}>
                <TableCell>
                  {isEditing ? renderEditableCell('name', 'text') : reg.name}
                </TableCell>
                <TableCell>
                  {isEditing ? renderEditableCell('email', 'email') : reg.email}
                </TableCell>
                <TableCell>
                  {isEditing
                    ? renderEditableCell('parentEmail', 'email')
                    : reg.parentEmail || 'N/A'}
                </TableCell>
                <TableCell>
                  {isEditing
                    ? renderSelectCell('gender', ['Male', 'Female'])
                    : reg.gender}
                </TableCell>
                <TableCell>
                  {isEditing ? renderEditableCell('age', 'number') : reg.age}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <div className="flex gap-1">
                      <Input
                        type="text"
                        name="countryCode"
                        value={editFormData?.countryCode ?? ''}
                        onChange={handleInputChange}
                        className="h-8 w-1/4"
                      />
                      <Input
                        type="tel"
                        name="phoneNumber"
                        value={editFormData?.phoneNumber ?? ''}
                        onChange={handleInputChange}
                        className="h-8 w-3/4"
                      />
                    </div>
                  ) : (
                    reg.whatsappNumber
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? renderSelectCell('sport', sports) : reg.sport}
                </TableCell>
                <TableCell>
                  {isEditing
                    ? renderSelectCell('participationType', [
                        'Individual',
                        'Team',
                      ])
                    : reg.participationType}
                </TableCell>
                <TableCell>
                  {isEditing
                    ? renderEditableCell('teamName', 'text')
                    : reg.teamName || 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  {isEditing ? (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSaveClick(reg.email)}
                        disabled={isSubmitting}
                        className="text-green-600 hover:text-green-700"
                      >
                        {isSubmitting ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Check />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCancelClick}
                        disabled={isSubmitting}
                      >
                        <X />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(reg)}
                      >
                        <Edit />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the registration for {reg.name}
                              .
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(reg.email)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              {isSubmitting ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                'Delete'
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
