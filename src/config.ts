interface Config {
  listen: {
    address: string;
    port: number;
  };
  bringg: {
    apiUrl: string;
    credentials: {
      companyId: string;
      companyName: string;
      token: string;
      secret: string;
    };
  };
}

/**
 * Central Perk application configuration
 */
export const config: Config = {
  listen: {
    address: process.env.LISTEN_ADDRESS || '0.0.0.0',
    port: Number(process.env.LISTEN_PORT) || 8080,
  },
  bringg: {
    apiUrl: process.env.BRINGG_API_URL!,
    credentials: {
      companyId: process.env.BRINGG_API_COMPANY_ID!,
      companyName: process.env.BRINGG_API_COMPANY_NAME!,
      token: process.env.BRINGG_API_TOKEN!,
      secret: process.env.BRINGG_API_SECRET!,
    },
  },
};
