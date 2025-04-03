import { useCallback, useState } from 'react';

import { COUNTRIES } from '@/constants';
import { parseDate, santinzeText } from '@/utils';

import { useOCR } from './useOCR';

// Updated interface for front-side data
export interface IdFrontData {
  raw: string;
  number: string;
  name: string;
  dateOfBirth: Date;
  nationality: string;
  // Optional additional fields
  sex?: string;
  issueDate?: string;
  expiryDate?: string;
  issuingAuthority?: string;
}

export interface UseIdFrontResult {
  extractIdFront: (file: File) => Promise<IdFrontData>;
  loading: boolean;
  error: Error | null;
  data: IdFrontData | null;
}

const transformIdFrontText = (text: string): IdFrontData => {
  const data: Partial<IdFrontData> = {};

  // Updated ID number extraction: exactly 3 digits, hyphen, 4 digits, hyphen, 7 digits, hyphen, 1 digit.
  const idNumberMatch = text.match(/\b\d{3}-\d{4}-\d{7}-\d\b/);
  data.number = idNumberMatch ? idNumberMatch[0].trim() : '';

  const nameMatch = text.match(/Name[:;]\s*([A-Za-z\s]+)/i);
  if (nameMatch) {
    data.name = santinzeText(nameMatch[1].trim());
  } else if (text.includes('<<')) {
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.includes('<<')) {
        const candidate = line.replace(/[^A-Za-z\s]/g, '');
        data.name = santinzeText(candidate.trim());
        break;
      }
    }
  }
  if (!data.name) {
    data.name = '';
  }

  const dobMatch = text.match(
    /(?:DOB|Date of Birth)[:]\s*(\d{1,2}\/\d{1,2}\/\d{4})/i,
  );
  data.dateOfBirth = dobMatch ? parseDate(dobMatch[1].trim()) : new Date();

  // Extract Nationality and validate using the COUNTRIES list.
  const nationalityMatch = text.match(/Nationality:\s*([A-Za-z\s]+)/i);
  if (nationalityMatch) {
    const nation = nationalityMatch[1].trim();
    const found = COUNTRIES.find((country) =>
      nation.toLowerCase().includes(country.toLowerCase()),
    );
    data.nationality = found ? found : nation;
  } else {
    data.nationality = '';
  }

  // Save the raw OCR text.
  data.raw = text;

  return data as IdFrontData;
};

export const useIdFront = (): UseIdFrontResult => {
  const { extractText, loading, error } = useOCR();
  const [data, setData] = useState<IdFrontData | null>(null);

  const extractIdFront = useCallback(
    async (file: File): Promise<IdFrontData> => {
      const ocrResult = await extractText(file);
      const transformedData = transformIdFrontText(ocrResult.text);
      setData(transformedData);
      return transformedData;
    },
    [extractText],
  );

  return { extractIdFront, loading, error, data };
};
