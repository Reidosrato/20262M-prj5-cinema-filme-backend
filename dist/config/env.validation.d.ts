declare class EnvironmentVariables {
    DATABASE_URL: string;
    PORT: number;
}
export declare function validateEnv(config: Record<string, unknown>): EnvironmentVariables;
export {};
