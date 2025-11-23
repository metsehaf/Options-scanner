// src/utils/getDynamicEnvs.ts

export type EnvMap = { [key: string]: string };

const getDynamicEnvs = async (): Promise<EnvMap> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8626"}/api/envs`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch envs: ${res.statusText}`);
    }

    const envs: EnvMap = await res.json();
    return envs;
  } catch (error) {
    console.error("[getDynamicEnvs] Failed to load environments:", error);
    throw error;
  }
};

export default getDynamicEnvs;
