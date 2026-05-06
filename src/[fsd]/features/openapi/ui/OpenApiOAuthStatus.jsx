import { memo, useCallback, useMemo, useState } from 'react';

import { useFormikContext } from 'formik';

import { Box, Button, Typography } from '@mui/material';

import { McpAuthHelpers } from '@/[fsd]/features/mcp/lib/helpers';
import { useConfigOAuthModal, useMcpTokenChange } from '@/[fsd]/features/mcp/lib/hooks';
import { McpAuthModal, McpLogoutModal } from '@/[fsd]/features/mcp/ui';
import { useOpenApiCheckConnection } from '@/[fsd]/features/openapi/lib/hooks/useOpenApiCheckConnection.hooks';
import { useResolvedOpenApiConfig } from '@/[fsd]/features/openapi/lib/hooks/useResolvedOpenApiConfig.hooks';
import OnlineIcon from '@/assets/online-icon.svg?react';
import { useSelectedProjectId } from '@/hooks/useSelectedProject';
import useToast from '@/hooks/useToast';

const OpenApiOAuthStatus = memo(() => {
  const { values } = useFormikContext();
  const projectId = useSelectedProjectId();
  const { toastSuccess } = useToast();

  const directSettings = values?.settings || {};
  const openApiConfigRef = directSettings.openapi_configuration;

  // Resolve credential reference (toolkit form with saved credential) — returns nulls when no ref
  const {
    openApiConfig,
    oauthEndpoint: resolvedEndpoint,
    tokenKey: resolvedTokenKey,
  } = useResolvedOpenApiConfig(openApiConfigRef, projectId);

  // Determine whether we're in reference mode or direct-settings mode
  const isReferenceMode = !!openApiConfigRef?.elitea_title;

  // Final derived values: prefer resolved (reference mode) over direct settings
  const oauthEndpoint = isReferenceMode ? resolvedEndpoint : (directSettings.oauth_discovery_endpoint ?? '');

  const tokenKey = isReferenceMode ? resolvedTokenKey : oauthEndpoint;

  // Settings to pass to check_connection — use resolved config when referencing a credential
  const effectiveSettings = isReferenceMode ? openApiConfig : directSettings;

  const isDelegated = !!oauthEndpoint;

  const { isLoggedIn: isOAuthLoggedIn } = useMcpTokenChange({ serverUrl: tokenKey });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const credentials = isReferenceMode
    ? {
        client_id: openApiConfig?.client_id,
        client_secret: openApiConfig?.client_secret,
        scopes: openApiConfig?.scope,
      }
    : {
        client_id: directSettings.client_id,
        client_secret: directSettings.client_secret,
        scopes: directSettings.scope,
      };

  const configOAuth = useConfigOAuthModal({ credentials });

  const authModalProps = useMemo(() => configOAuth.getModalProps(), [configOAuth]);

  const { runCheck, isRunning } = useOpenApiCheckConnection({
    projectId,
    settings: effectiveSettings,
  });

  const onLogin = useCallback(() => {
    runCheck(configOAuth.handleConfigAuthRequired, tokenKey);
  }, [runCheck, configOAuth.handleConfigAuthRequired, tokenKey]);

  const onLogout = useCallback(() => setShowLogoutModal(true), []);

  const onConfirmLogout = useCallback(() => {
    McpAuthHelpers.logout(tokenKey);
    setShowLogoutModal(false);
    toastSuccess('You have successfully logged out!');
  }, [tokenKey, toastSuccess]);

  const onCloseLogoutModal = useCallback(() => setShowLogoutModal(false), []);

  // In reference mode: wait for the credential to resolve before rendering
  if (isReferenceMode && !openApiConfig) return null;

  const styles = getStyles(isOAuthLoggedIn);

  return (
    <>
      <Box sx={styles.loginStatusContainer(isDelegated)}>
        <Box sx={styles.statusContent}>
          <OnlineIcon style={styles.statusIconOnline} />
          <Typography
            variant="bodySmall"
            sx={styles.loginStatusText}
          >
            {isOAuthLoggedIn ? 'Connected!' : 'Not Connected'}
          </Typography>
        </Box>
        <Button
          onClick={isOAuthLoggedIn ? onLogout : onLogin}
          disabled={isRunning}
          variant="secondary"
        >
          {isOAuthLoggedIn ? 'Logout' : isRunning ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
      <McpAuthModal {...authModalProps} />
      <McpLogoutModal
        serverUrl={tokenKey}
        open={showLogoutModal}
        onClose={onCloseLogoutModal}
        onConfirm={onConfirmLogout}
      />
    </>
  );
});

/** @type {MuiSx} */
const getStyles = isLoggedIn => ({
  statusIconOnline: {
    width: '.875rem',
    height: '.875rem',
  },
  statusContent: ({ palette }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: isLoggedIn ? palette.icon.fill.success : palette.icon.fill.attention,
  }),
  loginStatusText: ({ palette }) => ({
    color: isLoggedIn ? palette.text.mcp.loginSuccess : palette.text.mcp.logout,
  }),
  loginStatusContainer:
    isDelegated =>
    ({ palette }) => ({
      display: isDelegated ? 'flex' : 'none',
      marginTop: '1rem',
      height: '2.75rem',
      width: '100%',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
      padding: '.5rem .5rem .5rem 1rem',
      borderRadius: '2.345rem',
      backgroundColor: isLoggedIn ? palette.background.mcp.loginSuccess : palette.background.mcp.logout,
      border: `0.0625rem solid ${isLoggedIn ? palette.border.mcp.loginSuccess : palette.border.mcp.logout}`,
      justifyContent: 'space-between',
    }),
});

OpenApiOAuthStatus.displayName = 'OpenApiOAuthStatus';

export default OpenApiOAuthStatus;
