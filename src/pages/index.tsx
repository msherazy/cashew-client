import { Stepper, useMantineTheme } from '@mantine/core';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Step1, Step2, Step3 } from '@/components';
import { LOCALES } from '@/constants';
import { AuthSchema } from '@/schema';
import { AuthService } from '@/services';
import { Notification } from '@/utils';

const RouteComponent = () => {
  const theme = useMantineTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [, startTransition] = useTransition();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: AuthSchema.initialValues,
    resolver: AuthSchema.resolver,
    mode: 'onChange',
  });

  //stepper resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < parseInt(theme.breakpoints.sm, 10));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme.breakpoints.sm]);

  const onSubmitHandler = form.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await AuthService.register(data);
      if (response.success) {
        startTransition(() => {
          navigate({ to: '/success' });
        });
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      Notification.error({ message });
    } finally {
      setLoading(false);
    }
  });

  const onNext = () => setActive((prev) => prev + 1);
  const onPrev = () => setActive((prev) => prev - 1);

  return (
    <form
      className="container w-full max-w-screen-xl flex flex-col gap-5 items-center justify-center py-10 px-4 sm:px-10"
      onSubmit={onSubmitHandler}
    >
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
        size="sm"
        className="w-full"
        orientation={isMobile ? 'vertical' : 'horizontal'}
      >
        <Stepper.Step
          label={LOCALES.STEPPER_STEP1_LABEL}
          description={LOCALES.STEPPER_STEP1_DESCRIPTION}
        >
          <Step1 form={form} onNext={onNext} onPrev={onPrev} />
        </Stepper.Step>
        <Stepper.Step
          label={LOCALES.STEPPER_STEP2_LABEL}
          description={LOCALES.STEPPER_STEP2_DESCRIPTION}
        >
          <Step2 form={form} onNext={onNext} onPrev={onPrev} />
        </Stepper.Step>
        <Stepper.Step
          label={LOCALES.STEPPER_STEP3_LABEL}
          description={LOCALES.STEPPER_STEP3_DESCRIPTION}
        >
          <Step3
            form={form}
            onNext={onNext}
            onPrev={onPrev}
            loading={loading}
            onSubmitHandler={onSubmitHandler}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    </form>
  );
};

export const Route = createFileRoute('/')({
  component: RouteComponent,
});
