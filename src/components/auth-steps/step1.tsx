import { Button, Grid, Text } from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';
import { type FC } from 'react';

import { Input } from '@/components';
import { AuthService } from '@/services';
import { type StepProps } from '@/types';
import { Notification } from '@/utils';
import { LOCALES } from '@/constants/locales';
import { AxiosError } from 'axios';

export const Step1: FC<StepProps> = ({ form, onNext }) => {
  const { control, trigger, getValues } = form;
  const navigate = useNavigate();
  const handleNext = async () => {
    const isValid = await trigger([
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
    ]);
    if (isValid) {
      const email = getValues('email');
      const phoneNumber = `${getValues('phoneNumber')}`;
      try {
        const response = await AuthService.fetchUser(email, phoneNumber);
        if (response.success) {
          Notification.error({ message: LOCALES.USER_ALREADY_EXISTS });
          navigate({
            to: '/auth',
            state: {
              userData: {
                email,
                phoneNumber,
              },
            },
          });
        } else {
          onNext();
        }
      } catch (error) {
        const {response} = error as AxiosError;
        if (response && response.status === 404) {
          onNext();
        } else {
          Notification.error({ message: LOCALES.FAILED_TO_CHECK_EMAIL });
        }
      }
    }
  };

  return (
    <Grid gutter="xl">
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Input
          name="firstName"
          control={control}
          withAsterisk
          label={LOCALES.FIRST_NAME}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Input
          name="lastName"
          control={control}
          withAsterisk
          label={LOCALES.LAST_NAME}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Input
          name="email"
          control={control}
          withAsterisk
          label={LOCALES.EMAIL}
          type="email"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Input
          name="phoneNumber"
          control={control}
          withAsterisk
          label={LOCALES.MOBILE}
          type="number"
          leftSection={
            <Text c="dimmed" size={'13px'}>
              +971
            </Text>
          }
        />
      </Grid.Col>
      <Grid.Col>
        <Button fullWidth onClick={handleNext}>
          {LOCALES.CONTINUE}
        </Button>
      </Grid.Col>
    </Grid>
  );
};