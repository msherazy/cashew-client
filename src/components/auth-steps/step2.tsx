import { Button, Grid, Text, Group } from '@mantine/core';
import { type FileWithPath } from '@mantine/dropzone';
import { type FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FaCircleInfo } from "react-icons/fa6";

import { Dropzone } from '@/components';
import { useIdBack, useIdFront } from '@/hooks';
import { type StepProps } from '@/types';
import { Notification, validateEmiratesId } from '@/utils';
import { LOCALES } from '@/constants/locales';

export const Step2: FC<StepProps> = ({ form, onNext, onPrev }) => {
  const {
    extractIdFront,
    data: frontData,
    loading: frontLoading,
  } = useIdFront();
  const { extractIdBack, data: backData, loading: backLoading } = useIdBack();
  const { trigger, getValues } = form;

  // Initialize file states from form state (or default to null)
  const [frontFile, setFrontFile] = useState<FileWithPath | null>(() => {
    return getValues('idFront') as FileWithPath | null;
  });
  const [backFile, setBackFile] = useState<FileWithPath | null>(() => {
    return getValues('idBack') as FileWithPath | null;
  });

  // Memoize the arrays so they don't trigger unnecessary re-renders
  const memoizedFrontFiles = useMemo(
    () => (frontFile ? [frontFile] : []),
    [frontFile],
  );
  const memoizedBackFiles = useMemo(
    () => (backFile ? [backFile] : []),
    [backFile],
  );

  // Save OCR data in form state if available
  useEffect(() => {
    if (frontData) {
      form.setValue('idFrontData', frontData, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [frontData, form]);

  useEffect(() => {
    if (backData) {
      form.setValue('idBackData', backData, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [backData, form]);

  // Fallback to form state if the OCR hooks return null after remounting.
  // This way, the persistent OCR data is available even if the hooks reinitialize.
  const effectiveFrontData = frontData || getValues('idFrontData');
  const effectiveBackData = backData || getValues('idBackData');

  const handleFrontFilesChange = useCallback(
    async (files: FileWithPath[]) => {
      if (files.length > 0) {
        const file = files[0];
        // Avoid re-triggering OCR if the same file is already stored
        if (
          frontFile &&
          file.name === frontFile.name &&
          file.size === frontFile.size
        ) {
          return;
        }
        // Persist the file for preview and form state
        setFrontFile(file);
        form.setValue('idFront', file, {
          shouldDirty: true,
          shouldValidate: true,
        });
        try {
          await extractIdFront(file);
        } catch (err) {
          console.error('Front OCR error:', err);
        }
      }
    },
    [extractIdFront, form, frontFile],
  );

  const handleBackFilesChange = useCallback(
    async (files: FileWithPath[]) => {
      if (files.length > 0) {
        const file = files[0];
        // Avoid re-triggering OCR if the same file is already stored
        if (
          backFile &&
          file.name === backFile.name &&
          file.size === backFile.size
        ) {
          return;
        }
        // Persist the file for preview and form state
        setBackFile(file);
        form.setValue('idBack', file, {
          shouldDirty: true,
          shouldValidate: true,
        });
        try {
          await extractIdBack(file);
        } catch (err) {
          console.error('Back OCR error:', err);
        }
      }
    },
    [extractIdBack, form, backFile],
  );

  const handleNext = async () => {

    // Check if both front and back files are uploaded
    if (!frontFile || !backFile) {
      Notification.error({
        message: LOCALES.NEED_TO_UPLOAD_DOCUMENT,
      });
      return;
    }


    // Validate both OCR data and file fields
    const isValid = await trigger([
      'idFrontData',
      'idBackData',
      'idFront',
      'idBack',
    ]);
    const frontNumber = effectiveFrontData?.number
      ? effectiveFrontData.number.replace(/-/g, '')
      : '';

    // Confidence is the rating we give to the extracted data from Ids
    const { valid } = validateEmiratesId(
      effectiveFrontData.raw,
      effectiveBackData.raw,
    );

    if (!valid) {
      Notification.error({
        message: `${LOCALES.ID_VERIFICATION_FAILED}`,
      });
      return;
    }
    const isSameId =
      frontNumber && effectiveBackData?.raw
        ? effectiveBackData.raw.includes(frontNumber)
        : false;
    if (!isValid) {
      Notification.error({
        message: LOCALES.ID_VERIFICATION_FAILED_TRY_AGAIN,
      });
      return;
    }

    if (!isSameId) {
      Notification.error({
        message: LOCALES.DIFFERENT_IDS,
      });
      return;
    }
    onNext();
  };

  return (
    <Grid gutter="xl">
      <Grid.Col span={12}>
        <Group align="center" mt={'xl'}>
          <FaCircleInfo size={16} />
          <Text size={'xs'} className="text-left">
            {LOCALES.EID_DOCUMENT_REQUIREMENT_MESSAGE}
          </Text>
        </Group>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Dropzone
          label={LOCALES.UPLOAD_FRONTSIDE}
          onFilesChange={handleFrontFilesChange}
          isLoading={frontLoading}
          initialFiles={memoizedFrontFiles}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Dropzone
          label={LOCALES.UPLOAD_BACKSIDE}
          onFilesChange={handleBackFilesChange}
          isLoading={backLoading}
          initialFiles={memoizedBackFiles}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Button fullWidth onClick={onPrev}>
          {LOCALES.GO_BACK}
        </Button>
      </Grid.Col>
      <Grid.Col span={6}>
        <Button fullWidth onClick={handleNext}>
          {LOCALES.CONTINUE}
        </Button>
      </Grid.Col>
    </Grid>
  );
};