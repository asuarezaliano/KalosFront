import * as yup from 'yup';

interface EnvVars {
  NEXT_BACKEND_URL: string;
}

const envsSchema = yup.object({
  NEXT_BACKEND_URL: yup.string().required(),
});

let envVars: EnvVars;

try {
  const validatedEnvs = envsSchema.validateSync(process.env, { abortEarly: false, stripUnknown: true });
  envVars = validatedEnvs as EnvVars;
} catch (error) {
  if (error instanceof yup.ValidationError) {
    throw new Error(`Config validation error: ${error.message}`);
  }
  throw error;
}

export const env = {
  NEXT_BACKEND_URL: envVars.NEXT_BACKEND_URL,
};
