import { useCallback, useState } from 'react';

import { ID_ISSUING_PLACES } from '@/constants';
import { santinzeText } from '@/utils';

import { useOCR } from './useOCR';

export interface EIDBackData {
  raw: string;
  cardNumber?: string;
  occupation?: string;
  sponsor?: string;
  issuingPlace?: string | null;
  name?: string;
  idDetails?: string;
}

export interface UseIdBackResult {
  extractIdBack: (file: File) => Promise<EIDBackData>;
  loading: boolean;
  error: Error | null;
  data: EIDBackData | null;
}

const transformIdBackText = (text: string): EIDBackData => {
  const data: EIDBackData = { raw: text };

  // Extract occupation directly from the raw text and sanitize it.
  const occMatch = text.match(/Occupation:\s*([^\n]+)/i);
  if (occMatch) {
    data.occupation = santinzeText(occMatch[1].trim());
  }

  // Extract sponsor using a regex that captures various sponsor-related labels.
  // This regex now allows optional whitespace between the label and the colon.
  const sponsorMatch = text.match(
    /((?:Family Guarantor|Family Sponsor|Employer|Guarantor|Sponsor)\s*:\s*[^\n]+)/i,
  );
  if (sponsorMatch) {
    data.sponsor = santinzeText(sponsorMatch[1].trim());
  }

  const issuingPlaceMatch = text.match(/Issuing Place:\s*([^\n]+)/i);
  if (issuingPlaceMatch) {
    const place = issuingPlaceMatch[1].trim();
    const foundPlace = ID_ISSUING_PLACES.find((ip) =>
      place.toLowerCase().includes(ip.toLowerCase()),
    );
    data.issuingPlace = foundPlace ? foundPlace : place;
  } else {
    data.issuingPlace = null;
  }

  // Extract Card Number: expecting a sequence of exactly 9 digits.
  const cardNumberMatch = text.match(/Card Number.*?(\d{9})/is);
  if (cardNumberMatch) {
    data.cardNumber = cardNumberMatch[1].trim();
  }

  return data;
};

export const useIdBack = (): UseIdBackResult => {
  const { extractText, loading, error } = useOCR();
  const [data, setData] = useState<EIDBackData | null>(null);

  const extractIdBack = useCallback(
    async (file: File): Promise<EIDBackData> => {
      const ocrResult = await extractText(file);
      const extractedData = transformIdBackText(ocrResult.text);
      setData(extractedData);
      return extractedData;
    },
    [extractText],
  );

  return { extractIdBack, loading, error, data };
};
