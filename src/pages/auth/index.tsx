import { Text, Card, Image, Stack, Loader, Button } from '@mantine/core';
import {
  createFileRoute,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { AuthService } from '@/services';
import { type UserData } from '@/types/user';
import { Notification } from '@/utils';
import { LOCALES } from '@/constants/locales';

const UserDetailComponent = () => {
  // extract data from router state
  const state = useRouterState({
    select: (s) => s.location.state?.userData,
  });
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

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
    return <Text className="text-center mt-8">{LOCALES.NO_USER_DATA_FOUND}</Text>;

  const {
    name,
    email: userEmail,
    mobile,
    emiratesIdName,
    emiratesIdNumber,
    idImages,
  } = userData.data;

  return (
    <div className="container mx-auto p-4">
      <Button
        onClick={() => navigate({ to: '/' })}
        variant="outline"
        className="mb-4"
      >
        {LOCALES.BACK_TO_REGISTRATION}
      </Button>
      <Card shadow="sm" p="md" className="mx-auto">
        <Stack>
          <Text size="md" fw={500}>
            {LOCALES.NAME}:
          </Text>
          <Text c="dimmed">{name}</Text>
          <Text size="md" fw={500}>
            {LOCALES.EMAIL}:
          </Text>
          <Text c="dimmed">{userEmail}</Text>
          <Text size="md" fw={500}>
            {LOCALES.PHONE}:
          </Text>
          <Text c="dimmed">{`+971 ${mobile}`}</Text>
        </Stack>
        {idImages && (
          <>
            <Text size="lg" fw={500} mt={15} mb={10}>
              {LOCALES.ID_INFORMATION}
            </Text>
            <Stack>
              <Text size="md" fw={500}>
                {LOCALES.EMIRATES_ID}:
              </Text>
              <Text c="dimmed">{emiratesIdNumber}</Text>
              <Text size="md" fw={500}>
                {LOCALES.FULL_NAME}:
              </Text>
              <Text c="dimmed">{emiratesIdName}</Text>
              <div>
                <div className="flex gap-4 mb-2">
                  <Text size="md" fw={500} className="flex-1 text-center">
                    {LOCALES.ID_FRONT}
                  </Text>
                  <Text size="md" fw={500} className="flex-1 text-center">
                    {LOCALES.ID_BACK}
                  </Text>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Image src={idImages.front.url} alt={idImages.front.name} />
                  </div>
                  <div className="flex-1">
                    <Image src={idImages.back.url} alt={idImages.back.name} />
                  </div>
                </div>
              </div>
            </Stack>
          </>
        )}
      </Card>
    </div>
  );
};

export const Route = createFileRoute('/auth/')({
  component: UserDetailComponent,
});