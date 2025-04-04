import {
  Text,
  Card,
  Image,
  Stack,
  Loader,
  Button,
  Group,
  Avatar,
  Box,
  LoadingOverlay,
  Grid,
} from '@mantine/core';
import {
  createFileRoute,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { LOCALES } from '@/constants/locales';
import { AuthService } from '@/services';
import { type UserData } from '@/types/user';
import { Notification } from '@/utils';

const UserDetailComponent = () => {
  const state = useRouterState({
    select: (s) => s.location.state?.userData,
  });
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [frontImageLoading, setFrontImageLoading] = useState(true);
  const [backImageLoading, setBackImageLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!state?.email || !state?.phoneNumber) return;
      try {
        const data = await AuthService.fetchUser(
          state.email,
          state.phoneNumber,
        );
        setUserData(data);
      } catch (error) {
        Notification.error({
          message:
            error instanceof Error
              ? error.message
              : LOCALES.FAILED_TO_FETCH_USER_DATA,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [state]);

  if (loading)
    return <Loader className="items-center content-center text-center" />;

  if (!userData)
    return (
      <Text className="text-center mt-8">{LOCALES.NO_USER_DATA_FOUND}</Text>
    );

  const {
    name,
    email: userEmail,
    mobile,
    emiratesIdName,
    emiratesIdNumber,
    idImages,
  } = userData.data;

  return (
    <Grid className="container w-full max-w-screen-xl flex flex-col gap-5 items-center justify-center py-10 px-4 sm:px-10">
      <Grid.Col>
        <Card shadow="sm" p="md" className="mx-auto mb-4">
          <Stack>
            <Group align="start">
              <Avatar radius="xl" color="blue">
                {name?.charAt(0).toUpperCase()}
              </Avatar>
              <Stack>
                <Text size="lg" fw={500}>
                  {name}
                </Text>
                <Text size="sm" c="dimmed">
                  {userEmail}
                </Text>
                <Text size="sm" c="dimmed">
                  {`+971 ${mobile}`}
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
                {emiratesIdNumber}
              </Text>
              <Text size="md" fw={500}>
                {LOCALES.COMPLETE_NAME}
              </Text>
              <Text size="sm" c="dimmed">
                {emiratesIdName}
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
                      fallbackSrc="https://placehold.co/300x200?text=Image Not Available"
                      src={idImages?.front?.url}
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
                      fallbackSrc="https://placehold.co/300x200?text=Image Not Available"
                      src={idImages?.back?.url}
                      alt={LOCALES.ID_BACK}
                      onLoad={() => setBackImageLoading(false)}
                    />
                  </Box>
                </Stack>
              </Group>{' '}
            </Stack>
          </Group>
        </Card>
      </Grid.Col>
      <Grid.Col>
        <Button
          fullWidth
          onClick={() => navigate({ to: '/' })}
          className="mb-4"
        >
          {LOCALES.BACK_TO_REGISTRATION}
        </Button>
      </Grid.Col>
    </Grid>
  );
};

export const Route = createFileRoute('/auth/')({
  component: UserDetailComponent,
});
