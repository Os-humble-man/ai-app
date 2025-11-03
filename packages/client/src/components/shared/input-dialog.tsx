import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from '../ui/alert-dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';

interface InputDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   title: string;
   description: string;
   inputLabel: string;
   inputPlaceholder: string;
   onConfirm: (value: string) => void;
   confirmText?: string;
   cancelText?: string;
}

export const InputDialog = ({
   open,
   onOpenChange,
   title,
   description,
   inputLabel,
   inputPlaceholder,
   onConfirm,
   confirmText = 'Create',
   cancelText = 'Cancel',
}: InputDialogProps) => {
   const [value, setValue] = useState('');

   const handleConfirm = () => {
      if (value.trim()) {
         onConfirm(value.trim());
         setValue('');
         onOpenChange(false);
      }
   };

   const handleCancel = () => {
      setValue('');
      onOpenChange(false);
   };

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && value.trim()) {
         e.preventDefault();
         handleConfirm();
      }
   };

   return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>{title}</AlertDialogTitle>
               <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
               <Label htmlFor="input-value" className="text-sm font-medium">
                  {inputLabel}
               </Label>
               <Input
                  id="input-value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={inputPlaceholder}
                  className="mt-2"
                  autoFocus
               />
            </div>
            <AlertDialogFooter>
               <AlertDialogCancel onClick={handleCancel}>
                  {cancelText}
               </AlertDialogCancel>
               <AlertDialogAction
                  onClick={handleConfirm}
                  disabled={!value.trim()}
               >
                  {confirmText}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};
