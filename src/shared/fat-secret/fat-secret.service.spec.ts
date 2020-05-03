import { Test, TestingModule } from '@nestjs/testing';
import { FatSecretService } from './fat-secret.service';

describe('FatSecretService', () => {
  let service: FatSecretService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FatSecretService],
    }).compile();

    service = module.get<FatSecretService>(FatSecretService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
