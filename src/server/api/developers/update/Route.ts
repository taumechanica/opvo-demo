import { Injector } from 'injection-js';

import { HttpMethod, ReplyFn, Request, Route } from '../../abstract/Interface';
import { DevelopersGateway } from '../../../data/developers/Gateway';
import { Developer } from '../../../domain/Developer';

export class UpdateDeveloperRoute implements Route {
    public method: HttpMethod;
    public path: string;

    private gateway: DevelopersGateway;

    public constructor(private injector: Injector) {
        this.method = 'PUT';
        this.path = '/rest/developers/{DeveloperId}';

        this.gateway = injector.get(DevelopersGateway);
    }

    public async handler(request: Request, reply: ReplyFn) {
        const id = parseInt(request.params.DeveloperId);
        const developer = request.payload as Developer;
        if (id != developer.Id) return reply('').code(400);

        const changes = await this.gateway.update(developer);

        return reply('').code(!changes || changes.Count ? 204 : 404);
    }
}
