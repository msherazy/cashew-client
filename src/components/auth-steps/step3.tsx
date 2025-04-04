import {
  Button,
  Card,
  Grid,
  Stack,
  Text,
  Loader,
  Group,
  Avatar,
  Box,
  LoadingOverlay,
  Image,
} from '@mantine/core';
import { type FC, useState } from 'react';

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
  const [frontImageLoading, setFrontImageLoading] = useState(true);
  const [backImageLoading, setBackImageLoading] = useState(true);
  const { getValues } = form;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    idFrontData,
    idFront,
    idBack,
  } = getValues();

  console.log('Data: ', getValues());

  return (
    <Grid gutter="xl">
      <Grid.Col span={12}>
        <Text size="xl" mb={20}>
          {LOCALES.REVIEW_YOUR_INFORMATION}
        </Text>

        <Card shadow="sm" p="md" className="mx-auto mb-4">
          <Stack>
            <Group align="start">
              <Avatar radius="xl" color="blue">
                {firstName?.charAt(0).toUpperCase()}
              </Avatar>
              <Stack>
                <Text size="lg" fw={500}>
                  {`${firstName} ${lastName}`}
                </Text>
                <Text size="sm" c="dimmed">
                  {email}
                </Text>
                <Text size="sm" c="dimmed">
                  {`+971${phoneNumber}`}
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Card>

        <Card shadow="sm" p="md" className="mx-auto">
          <Text size="lg" fw={500} mb="md">
            {LOCALES.ID_INFORMATION}
          </Text>
          <Group align="start">
            <Stack gap="xs" className="flex-1">
              <Text size="md" fw={500}>
                {LOCALES.EMIRATES_ID}
              </Text>
              <Text size="sm" c="dimmed">
                {idFrontData.number}
              </Text>
              <Text size="md" fw={500}>
                {LOCALES.COMPLETE_NAME}
              </Text>
              <Text size="sm" c="dimmed">
                {idFrontData.name}
              </Text>
              <Group>
                <Stack>
                  <Text size="sm" fw={500}>
                    {LOCALES.ID_FRONT}
                  </Text>
                  <Box pos="relative">
                    <LoadingOverlay
                      visible={frontImageLoading}
                      zIndex={1000}
                      overlayProps={{ radius: 'sm', blur: 2 }}
                    />
                    <Image
                      radius="md"
                      h={200}
                      w="100%"
                      fit="contain"
                      fallbackSrc="https://placehold.co/text=Image Not Available"
                      src={
                        idFront instanceof File
                          ? URL.createObjectURL(idFront)
                          : idFront
                      }
                      alt={LOCALES.ID_FRONT}
                      onLoad={() => setFrontImageLoading(false)}
                    />
                  </Box>
                </Stack>
                <Stack>
                  <Text size="sm" fw={500}>
                    {LOCALES.ID_BACK}
                  </Text>
                  <Box pos="relative">
                    <LoadingOverlay
                      visible={backImageLoading}
                      zIndex={1000}
                      overlayProps={{ radius: 'sm', blur: 2 }}
                    />
                    <Image
                      radius="md"
                      h={200}
                      w="100%"
                      fit="contain"
                      fallbackSrc="https://placehold.co/180x200?text=Image Not Available"
                      src={
                        idBack instanceof File
                          ? URL.createObjectURL(idBack)
                          : idBack
                      }
                      alt={LOCALES.ID_BACK}
                      onLoad={() => setBackImageLoading(false)}
                    />
                  </Box>
                </Stack>
              </Group>
            </Stack>
          </Group>
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
