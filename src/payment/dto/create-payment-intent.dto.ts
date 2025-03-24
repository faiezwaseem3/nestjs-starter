import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string = 'usd';
}