import { Inject, Injectable } from 'injection-js';
import { number } from 'joi';

import { HttpMethod, ResponseTk, Request, Route } from '../Interface';
import { DevelopersGateway } from '../../data/DevelopersGateway';
import { ContractsGateway } from '../../data/ContractsGateway';

@Injectable()
export class DeleteContractRoute implements Route {
    public method: HttpMethod;
    public path: string;

    public constructor(
        @Inject(DevelopersGateway) private developersGateway: DevelopersGateway,
        @Inject(ContractsGateway) private contractsGateway: ContractsGateway
    ) {
        this.method = 'DELETE';
        this.path = '/rest/developers/{DeveloperId}/contracts/{ContractId}';
    }

    public config = {
        validate: {
            params: {
                DeveloperId: number().required().integer().min(1),
                ContractId: number().required().integer().min(1)
            }
        }
    };

    public async handler(request: Request, tk: ResponseTk) {
        const developerId = parseInt(request.params.DeveloperId);
        const developer = await this.developersGateway.getById(developerId);

        if (!developer) return tk.response('').code(404);

        const contractId = parseInt(request.params.ContractId);
        const contract = await this.contractsGateway.getById(developer, contractId);
        if (!contract) return tk.response('').code(404);

        await this.contractsGateway.delete(developer, contract);

        return tk.response('').code(204);
    }
}
