import { Injectable } from "@nestjs/common";

@Injectable()
export class EnvironmentService {
    constructor() {}
    getEnvironments(req: any, res: any) {
        try {
            const reactEnv = {} as { [key: string]: any };

            // Filter environment variables that start with the prefix REACT_
            const prefix = 'FRONTEND_APP_';
            Object.keys(process.env).forEach((key: string) => {
                if (key.startsWith(prefix)) {
                    reactEnv[key.substring(prefix.length)] = process.env[key];
                }
            });

            res.status(200).json(reactEnv);

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}