import { Text, Button } from '@mantine/core';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { CiCircleCheck } from "react-icons/ci";
import { LOCALES } from '@/constants/locales';

const SuccessComponent = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 sm:px-10 text-center">
      <CiCircleCheck size={100} color="green"/>
      <Text size="xl" mb={20}>
        {LOCALES.REGISTRATION_SUCCESSFUL}
      </Text>
      <Text size="md" mb={20}>
        {LOCALES.THANK_YOU_FOR_REGISTERING}
      </Text>
      <Button onClick={handleBackToHome}>{LOCALES.BACK_TO_REGISTRATION}</Button>
    </div>
  );
};

export const Route = createFileRoute('/success/')({
  component: SuccessComponent,
});