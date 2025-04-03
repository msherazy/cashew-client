import { serialize } from 'object-to-formdata';

import { ENDPOINTS } from '@/constants';
import { type AuthSchemaType } from '@/schema';
import { axios } from '@/utils';

const register = async (data: AuthSchemaType) => {
  const { idFront, idBack, ...rest } = data;
  const formData = serialize(
    { ...rest, front: idFront, back: idBack },
    { indices: false },
  );
  const res = await axios.post(ENDPOINTS.register, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

const fetchUser = async (email: string, phoneNumber: string) => {
  const params = new URLSearchParams({ email, phoneNumber });
  const res = await axios.get(`${ENDPOINTS.fetch}?${params.toString()}`);
  return res.data;
};

export const AuthService = {
  register,
  fetchUser,
};
