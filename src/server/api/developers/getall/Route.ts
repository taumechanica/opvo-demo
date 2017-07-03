import { Database } from '../../../data/abstract/Database';
import { HttpMethod, ReplyFn, Request, Route } from '../../abstract/Interface';

import { DevelopersGateway } from '../../../data/developers/Gateway';

export class GetAllDevelopersRoute implements Route {
    public method: HttpMethod;
    public path: string;

    private gateway: DevelopersGateway;

    public constructor(private db: Database) {
        this.method = 'GET';
        this.path = '/rest/developers';

        this.gateway = new DevelopersGateway(db);
    }

    public async handler(request: Request, reply: ReplyFn) {
        const developers = await this.gateway.getAll();

        return reply(developers);
    }
}
