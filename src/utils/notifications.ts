import { notifications } from '@mantine/notifications';
import { ulid } from 'ulid';

import { noop } from '@/utils/noop';

type NotificationProps = {
  id?: string;
  title?: string;
  message: string;
  className?: string;
  onClose?: () => void;
  onOpen?: () => void;
};

type NotificationType = 'success' | 'error' | 'info';

const notificationColors: Record<NotificationType, string> = {
  success: 'green',
  error: 'red',
  info: 'blue',
};

const defaultTitles: Record<NotificationType, string> = {
  success: 'Success',
  error: 'Error',
  info: 'Information',
};

const showNotification = (
  type: NotificationType,
  { id = ulid(), title, message, className, onClose = noop }: NotificationProps,
) => {
  notifications.show({
    id,
    title: title || defaultTitles[type],
    message,
    color: notificationColors[type],
    className,
    loading: false,
    onClose,
  });
};

export const Notification = {
  success: (props: NotificationProps) => showNotification('success', props),
  error: (props: NotificationProps) => showNotification('error', props),
  info: (props: NotificationProps) => showNotification('info', props),
};
