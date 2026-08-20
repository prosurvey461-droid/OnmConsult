import { WhatsAppSettings } from '../types';

export function formatWhatsAppPhone(phone: string): string {
  // Remove +, spaces, hyphens
  return phone.replace(/[^0-9]/g, '');
}

export function buildWhatsAppUrl(
  whatsappConfig: WhatsAppSettings | undefined, 
  data: {
    name?: string;
    email?: string;
    phone?: string;
    projectType?: string;
    subject?: string;
    message?: string;
  }
): string {
  const config = whatsappConfig || {
    enabled: true,
    phoneNumber: '9779805671898',
    recipientName: 'Bigyan',
    customIntro: 'Hello Bigyan!',
    autoOpenOnSubmit: true
  };

  const phone = formatWhatsAppPhone(config.phoneNumber || '9779805671898');
  const greeting = config.customIntro || `Hello ${config.recipientName || 'Bigyan'}!`;

  let textLines: string[] = [greeting, ''];

  if (data.name) textLines.push(`*Name:* ${data.name}`);
  if (data.email) textLines.push(`*Email:* ${data.email}`);
  if (data.phone) textLines.push(`*Phone:* ${data.phone}`);
  if (data.projectType) textLines.push(`*Project Type:* ${data.projectType}`);
  if (data.subject) textLines.push(`*Subject:* ${data.subject}`);
  if (data.message) textLines.push(`*Message:* ${data.message}`);

  const fullText = textLines.join('\n');
  const encodedText = encodeURIComponent(fullText);

  return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedText}&type=phone_number&app_absent=0`;
}
