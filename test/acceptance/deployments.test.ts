import app from '../../src/app';
import supertest from 'supertest';
import { IDeploymentInput, IDeployment, DeploymentsModel } from '../../src/models/deploymentsModel';
import mongoose from 'mongoose';

const request = supertest(app);

const deploymentData: IDeploymentInput = {
  templateName: 'test',
  version: '1.0.0',
  url: 'http://someurl.com'
};

describe('Deployments controller', () => {
  afterAll(() => {
    mongoose.disconnect();
  });

  describe('POST /deployments', () => {
    describe('when created successfully', () => {
      it('should create a deployment', () => {
        return request
          .post('/deployments')
          .send(deploymentData)
          .expect(201)
          .expect(({ body }) => {
            expect(body._id).toBeTruthy();
            expect(body.deployedAt).toBeTruthy();
            expect(body).toMatchObject(deploymentData);
          });
      });
    });

    describe('when wrong data passed', () => {
      it('should return status 400', () => {
        return request
          .post('/deployments')
          .send({ some: 'any' })
          .expect(400)
          .expect(({ body }) => {
            expect(body.error).toBeTruthy();
          });
      });
    });
  });

  describe('GET /deployments', () => {
    let createdDeployment: IDeployment;

    beforeAll(async () => {
      const { body } = await request
        .post('/deployments')
        .send(deploymentData)
        .expect(201);

      createdDeployment = body;
    });

    it('should find created deployment', () => {
      return request
        .get('/deployments')
        .expect(200)
        .expect(({ body }) => {
          expect(body.length).toBeGreaterThanOrEqual(1);

          const latestCreatedDeployment = body.find(
            (item: IDeployment) => item._id === createdDeployment._id
          );

          expect(latestCreatedDeployment).toBeTruthy();
          expect(latestCreatedDeployment).toStrictEqual(createdDeployment);
        });
    });
  });

  describe('DELETE /deployments/:id', () => {
    let createdDeployment: IDeployment;

    beforeAll(async () => {
      const { body } = await request
        .post('/deployments')
        .send(deploymentData)
        .expect(201);

      createdDeployment = body;

      await request.delete(`/deployments/${createdDeployment._id}`).expect(204);
    });

    it('should not find removed deployment', async () => {
      const result = await DeploymentsModel.findById(createdDeployment._id);

      expect(result).toBeNull();
    });
  });
});
