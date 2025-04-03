export const validateEmiratesId = (frontRaw: string, backRaw: string) => {
  let score = 0;
  let maxScore = 0;

  // Convert texts to lower case for case-insensitive matching.
  const frontLower = frontRaw.toLowerCase();
  const backLower = backRaw.toLowerCase();

  // --- Front Side Checks ---
  // 1. Look for "resident identity card"
  maxScore += 10;
  if (frontLower.includes('resident identity card')) {
    score += 10;
  }

  // 2. Look for "united arab emirates" or "emirates"
  maxScore += 10;
  if (
    frontLower.includes('united arab emirates') ||
    frontLower.includes('emirates')
  ) {
    score += 10;
  }

  // 3. Look for a valid ID number pattern (e.g. "784-1994-1098249-2")
  maxScore += 20;
  const idNumberRegex = /\b\d{3,}-\d{4,}-\d{6,}-\d+\b/;
  if (idNumberRegex.test(frontRaw)) {
    score += 20;
  }

  // 4. Check for "name"
  maxScore += 10;
  if (frontLower.includes('name')) {
    score += 10;
  }

  // 5. Check for "date of birth" or "dob"
  maxScore += 10;
  if (frontLower.includes('date of birth') || frontLower.includes('dob')) {
    score += 10;
  }

  // 6. Check for "nationality"
  maxScore += 10;
  if (frontLower.includes('nationality')) {
    score += 10;
  }

  // 7. Check for "issuing date"
  maxScore += 5;
  if (frontLower.includes('issuing date')) {
    score += 5;
  }

  // 8. Check for "expiry date"
  maxScore += 5;
  if (frontLower.includes('expiry date')) {
    score += 5;
  }

  // --- Back Side Checks ---
  // 9. Check for "card number"
  maxScore += 10;
  if (backLower.includes('card number')) {
    score += 10;
  }

  // 10. Look for a long alphanumeric sequence (MRZ-like or ILARE pattern)
  maxScore += 20;
  // This regex looks for a sequence of 15 or more uppercase letters, digits, or '<'
  const mrzRegex = /[A-Z0-9<]{15,}/;
  if (mrzRegex.test(backRaw)) {
    score += 20;
  }

  // 11. Check for keywords like "occupation", "family guarantor", or "family sponsor"
  maxScore += 10;
  if (
    backLower.includes('occupation') ||
    backLower.includes('family guarantor') ||
    backLower.includes('family sponsor')
  ) {
    score += 10;
  }

  // 12. Look for "issuing place"
  maxScore += 5;
  if (backLower.includes('issuing place')) {
    score += 5;
  }

  // Calculate confidence as a percentage of the total possible score.
  const confidence = (score / maxScore) * 100;

  // Define a threshold for what constitutes a valid Emirates ID.
  // You might need to adjust this threshold based on further testing.
  const valid = confidence >= 60;

  return { valid, confidence };
};

export const santinzeText = (text: string): string => {
  if (!text) return '';
  const firstPart = text.split('\n')[0];
  const cleaned = firstPart.replace(/[~`!@#$%^&*/?"':]/g, '');

  return cleaned
    .split(/\s+/)
    .filter((word) => word.length > 1)
    .join(' ');
};
