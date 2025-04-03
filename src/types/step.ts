import type { UseFormReturn } from 'react-hook-form';

import type { AuthSchemaType } from '@/schema';

export type StepProps = {
  form: UseFormReturn<AuthSchemaType>;
  onNext: () => void;
  onPrev: () => void;
};
