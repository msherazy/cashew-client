import { useCallback, useState } from 'react';
import Tesseract from 'tesseract.js';

interface OcrData {
  text: string;
  confidence?: number;
}

interface UseOCRResult {
  extractText: (file: File) => Promise<OcrData>;
  loading: boolean;
  error: Error | null;
  data: OcrData | null;
}

export const useOCR = (): UseOCRResult => {
  const [data, setData] = useState<OcrData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const extractText = useCallback(async (file: File): Promise<OcrData> => {
    setLoading(true);
    setError(null);
    try {
      const worker = await Tesseract.createWorker('eng');
      await worker.setParameters({
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
        oem: 1,
      });

      const result = await worker.recognize(file);
      await worker.terminate();

      const extractedData: OcrData = {
        text: result.data.text,
        confidence: result.data.confidence,
      };
      setData(extractedData);
      return extractedData;
    } catch (err) {
      const errorInstance = err instanceof Error ? err : new Error(String(err));
      setError(errorInstance);
      throw errorInstance;
    } finally {
      setLoading(false);
    }
  }, []);

  return { extractText, loading, error, data };
};
