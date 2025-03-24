import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private config: ConfigService) {
    this.stripe = new Stripe(config.getOrThrow('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async createPaymentIntent(amount: number , currency: string = 'usd') {
    return await this.stripe.paymentIntents.create({
      amount: Number((amount * 100).toFixed(2)), // convert to cents
      currency,
    });
  }
  async verifyPaymentIntent(paymentIntentId: string) {
    return await this.stripe.paymentIntents.confirm(paymentIntentId);
  }
}