import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin("./i18n/config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};

export default withPayload(withNextIntl(nextConfig));
