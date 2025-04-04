import { Button, Card, Grid, Stack, Text, Loader } from '@mantine/core';
import { type FC } from 'react';

import { LOCALES } from '@/constants/locales';
import { type StepProps } from '@/types';

interface Step3Props extends StepProps {
  loading: boolean;
  onSubmitHandler: () => void;
}

export const Step3: FC<Step3Props> = ({
  form,
  onPrev,
  loading,
  onSubmitHandler,
}) => {
  const { getValues } = form;
  const { firstName, lastName, email, phoneNumber, idFrontData } = getValues();

  return (
    <Grid gutter="xl">
      <Grid.Col span={12}>
        <Text size="xl" mb={20}>
          {LOCALES.REVIEW_YOUR_INFORMATION}
        </Text>
        <Card shadow="sm" p="md" className="w-full mx-auto">
          <Stack>
            <Text size="md" fw={500}>
              {LOCALES.NAME}:
            </Text>
            <Text c="dimmed">{`${firstName} ${lastName}`}</Text>
            <Text size="md" fw={500}>
              {LOCALES.EMAIL}:
            </Text>
            <Text c="dimmed">{email}</Text>
            <Text size="md" fw={500}>
              {LOCALES.PHONE}:
            </Text>
            <Text c="dimmed">{`+971${phoneNumber}`}</Text>
            <Text size="md" fw={500}>
              {LOCALES.EMIRATES_ID}:
            </Text>
            <Text c="dimmed">{idFrontData.number}</Text>
            <Text size="md" fw={500}>
              {LOCALES.COMPLETE_NAME}:
            </Text>
            <Text c="dimmed">{idFrontData.name}</Text>
          </Stack>
        </Card>
      </Grid.Col>
      <Grid.Col span={6}>
        <Button fullWidth onClick={onPrev} disabled={loading}>
          {LOCALES.GO_BACK}
        </Button>
      </Grid.Col>
      <Grid.Col span={6}>
        <Button fullWidth onClick={onSubmitHandler} disabled={loading}>
          {loading ? <Loader size="sm" /> : `${LOCALES.SUBMIT}`}
        </Button>
      </Grid.Col>
    </Grid>
  );
};
