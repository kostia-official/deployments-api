import { TemplatesModel, ITemplate } from '../models/templates';

class TemplatesService {
  async find(): Promise<ITemplate[]> {
    return TemplatesModel.find();
  }
}

export const templatesService = new TemplatesService();
