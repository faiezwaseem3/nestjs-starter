import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('create-intent')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('USER', 'ADMIN') // Both users and admins can make payments
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create payment intent' })
    @ApiBody({ type: CreatePaymentIntentDto })
    @ApiResponse({
        status: 201,
        description: 'Payment intent created successfully'
    })
    async createPaymentIntent(@Body() dto: CreatePaymentIntentDto) {
        return this.paymentService.createPaymentIntent(dto.amount, dto.currency);
    }

    @Post('confirm')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('USER', 'ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Confirm payment' })
    @ApiBody({ type: ConfirmPaymentDto })
    @ApiResponse({
        status: 200,
        description: 'Payment confirmed successfully'
    })
    async confirmPayment(@Body() dto: ConfirmPaymentDto) {
        return this.paymentService.verifyPaymentIntent(dto.paymentIntentId);
    }

}