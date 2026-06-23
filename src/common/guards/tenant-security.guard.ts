import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TenantSecurityGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const tenantHeader = request.headers['x-tenant-id'];
    
    // Assumes your passport-jwt strategy or auth middleware attaches the user to request.user
    const userJwtContext = request.user; 

    if (!userJwtContext || !userJwtContext.app_metadata) {
      throw new ForbiddenException('Authentication context missing.');
    }

    if (!tenantHeader || tenantHeader !== userJwtContext.app_metadata.tenant_id) {
      throw new ForbiddenException('Cross-Tenant security violation intercepted.');
    }

    return true;
  }
}