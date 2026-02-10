export type PublishInfo = {
  version: string;
  timestamp: Date;
  namespace?: string;
  language?: string;
  checksum: string;
  totalKeys: number;
};
