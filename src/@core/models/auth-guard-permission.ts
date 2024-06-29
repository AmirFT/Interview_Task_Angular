export interface AuthGuardPermission {
    permittedRoles?: string[];
    deniedRoles?: string[];
    //
    permittedClaims?: number[];
    deniedClaims?: number[];
    //
    permittedPanelTypes?: number[];
    deniedPanelTypes?: number[];
}
