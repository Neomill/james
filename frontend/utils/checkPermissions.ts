const checkPermissions = (
  permittedPermissions: Array<string>,
  authRoles: any
) => {
  const found = authRoles?.some((role: any) =>
    role.permissions?.some((permission: any) =>
      permittedPermissions.includes(permission.name)
    )
  );

  return authRoles && found;
};

export default checkPermissions;
