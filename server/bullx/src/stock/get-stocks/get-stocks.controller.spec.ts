import { Test, TestingModule } from '@nestjs/testing';
import { GetStocksController } from './get-stocks.controller';

describe('GetStocksController', () => {
  let controller: GetStocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetStocksController],
    }).compile();

    controller = module.get<GetStocksController>(GetStocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
