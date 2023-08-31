import { App } from './app';
import { ValidateEnv } from './utils/validateEnv';
import { FolderRoute } from './modules/Vfunctions/Routes';
import { AuthRoute } from './modules/Auth/Routes';

ValidateEnv();

const app = new App([new FolderRoute(), new AuthRoute]);
app.listen();
