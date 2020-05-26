import { DeploymentsModel, IDeployment, IDeploymentInput } from '../models/deployments';

class DeploymentsService {
  async find(): Promise<IDeployment[]> {
    return DeploymentsModel.find();
  }

  async create(deployment: IDeploymentInput): Promise<IDeployment> {
    return DeploymentsModel.create(deployment);
  }

  async remove(_id: string): Promise<void> {
    await DeploymentsModel.deleteOne({ _id });
  }
}

export const deploymentsService = new DeploymentsService();
