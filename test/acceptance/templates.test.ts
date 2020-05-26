import app from '../../src/app';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { ITemplate, TemplatesModel } from '../../src/models/templates';

const request = supertest(app);

describe('Templates controller', () => {
  afterAll(() => {
    mongoose.disconnect();
  });

  describe('GET /templates', () => {
    const templateData = {
      name: Math.random().toString(),
      versions: ['1.0.0', '1.0.1', '1.1.0', '2.0.0']
    };

    let createdTemplate: ITemplate;

    beforeAll(async () => {
      createdTemplate = await TemplatesModel.create(templateData);
    });

    it('should find created deployment', () => {
      return request
        .get('/templates')
        .expect(200)
        .expect(({ body }) => {
          expect(body.length).toBeGreaterThanOrEqual(1);

          const latestCreatedDeployment = body.find(
            (item: ITemplate) => item._id === String(createdTemplate._id)
          );

          expect(latestCreatedDeployment).toBeTruthy();
          expect(latestCreatedDeployment).toMatchObject(templateData);
        });
    });
  });
});
