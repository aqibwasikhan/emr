import { UseFormSetError } from 'react-hook-form';


export function setApiErrors(
  errors: Record<string, string> | undefined,
  setError: UseFormSetError<any>
) {
  if (!errors || typeof errors !== 'object') return;

  Object.entries(errors).forEach(([field, message]) => {
    setError(field, {
      type: 'server',
      message,
    });
  });
}

