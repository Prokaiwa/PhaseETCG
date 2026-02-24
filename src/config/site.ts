import settings from '../../content/settings/site.json';

export const siteConfig = {
  name: settings.siteName,
  tagline: settings.tagline,
  contactEmail: settings.contactEmail,
  paypalEmail: settings.paypalEmail,
  paypalCurrency: 'USD',
};
