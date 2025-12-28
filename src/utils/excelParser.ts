// @ts-ignore: no type declarations available for 'xlsx'
import * as XLSX from 'xlsx';
import { ParsedCustomer } from './csvParser';

export function parseExcel(file: File): Promise<ParsedCustomer[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          reject(new Error('Excel file is empty'));
          return;
        }

        const firstRow = jsonData[0];
        const headers = Object.keys(firstRow).map(h => h.toLowerCase());

        const firstNameKey = Object.keys(firstRow).find(key =>
          key.toLowerCase().includes('first') && key.toLowerCase().includes('name')
        );
        const phoneKey = Object.keys(firstRow).find(key =>
          key.toLowerCase().includes('phone')
        );
        const pointsKey = Object.keys(firstRow).find(key =>
          key.toLowerCase().includes('point')
        );

        if (!firstNameKey || !phoneKey || !pointsKey) {
          reject(new Error('Excel must contain columns: First Name, Phone, and Points'));
          return;
        }

        const customers: ParsedCustomer[] = jsonData
          .map(row => {
            const firstName = String(row[firstNameKey] || '').trim();
            const phone = String(row[phoneKey] || '').trim();
            const points = parseInt(String(row[pointsKey] || '0')) || 0;

            if (firstName && phone) {
              return {
                first_name: firstName,
                phone: phone,
                points: points,
              };
            }
            return null;
          })
          .filter((customer): customer is ParsedCustomer => customer !== null);

        resolve(customers);
      } catch (error: any) {
        reject(new Error(`Failed to parse Excel file: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsBinaryString(file);
  });
}
