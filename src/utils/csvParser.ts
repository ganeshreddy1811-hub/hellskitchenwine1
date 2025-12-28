export interface ParsedCustomer {
  first_name: string;
  phone: string;
  points: number;
}

export function parseCSV(csvText: string): ParsedCustomer[] {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const firstNameIndex = headers.findIndex(h => h.includes('first') && h.includes('name'));
  const phoneIndex = headers.findIndex(h => h.includes('phone'));
  const pointsIndex = headers.findIndex(h => h.includes('point'));

  if (firstNameIndex === -1 || phoneIndex === -1 || pointsIndex === -1) {
    throw new Error('CSV must contain columns: First Name, Phone, and Points');
  }

  const customers: ParsedCustomer[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map(v => v.trim());

    const firstName = values[firstNameIndex];
    const phone = values[phoneIndex];
    const points = parseInt(values[pointsIndex]) || 0;

    if (firstName && phone) {
      customers.push({
        first_name: firstName,
        phone: phone,
        points: points,
      });
    }
  }

  return customers;
}
