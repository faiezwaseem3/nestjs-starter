import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminController {
  
  @Get('dashboard')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin dashboard' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns admin dashboard data' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Admin access required' 
  })
  getDashboard() {
    return { 
      message: 'Welcome to the Admin Dashboard',
      stats: {
        users: 42,
        revenue: 12500,
        activities: 237
      }
    };
  }

  @Get('users')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns list of all users' 
  })
  getAllUsers() {
    // In a real app, you would fetch users from database
    return {
      users: [
        { id: 1, email: 'admin@example.com', role: 'ADMIN' },
        { id: 2, email: 'user1@example.com', role: 'USER' },
        { id: 3, email: 'user2@example.com', role: 'USER' }
      ]
    };
  }
}