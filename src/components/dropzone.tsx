import { Box, Image, LoadingOverlay, Text } from '@mantine/core';
import {
  Dropzone as MDropzone,
  type FileWithPath,
  IMAGE_MIME_TYPE,
} from '@mantine/dropzone';
import { type FC, useEffect, useState } from 'react';

import { noop } from '@/utils';

interface DropzoneProps {
  onFilesChange?: (files: FileWithPath[]) => void;
  accept?: string[];
  maxSize?: number;
  label?: string;
  disabled?: boolean;
  multiple?: boolean;
  initialFiles?: FileWithPath[];
  isLoading?: boolean;
}

export const Dropzone: FC<DropzoneProps> = ({
  onFilesChange = noop,
  accept = IMAGE_MIME_TYPE,
  maxSize = 5 * 1024 ** 2,
  label = 'Upload file(s)',
  disabled = false,
  isLoading = false,
  multiple = false,
  initialFiles = [],
}) => {
  const [files, setFiles] = useState<FileWithPath[]>(initialFiles);

  // Update local state when initialFiles changes
  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Box key={index} pos="relative">
        <Image
          src={imageUrl}
          alt={`Preview ${index}`}
          onLoad={() => URL.revokeObjectURL(imageUrl)}
          fit="contain"
          h={200}
          w="fit-content"
        />
        <LoadingOverlay
          visible={isLoading}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      </Box>
    );
  });

  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  return (
    <Box>
      <MDropzone
        onDrop={(droppedFiles) => setFiles(droppedFiles)}
        accept={accept}
        maxSize={maxSize}
        // Only use the external "disabled" prop here; let users update file even if one is already selected.
        disabled={disabled}
        multiple={multiple}
      >
        {files.length > 0 ? (
          <div className="flex items-center justify-center gap-2 w-full">
            {previews}
          </div>
        ) : (
          <Text ta="center">{label}</Text>
        )}
      </MDropzone>
    </Box>
  );
};
