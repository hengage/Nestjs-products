import { HttpMethods } from './constants';

export const CorsOptions = {
  origin: true, // Allow all origins since this is just a small testing application
  methods: Object.values(HttpMethods),
  preflightContinue: false,
  credentials: true,
  allowedHeaders: ['Content-Type, Accept', 'Authorization'],
};
