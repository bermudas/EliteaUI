import { memo, useCallback } from 'react';

import { useLocation, useMatch, useNavigate } from 'react-router-dom';

import { SIDEBAR_TOUR_TARGET_IDS } from '@/[fsd]/features/interactive-tours/lib/constants';
import AgentStudioIcon from '@/assets/agent-studio-icon.svg?react';
import RouteDefinitions from '@/routes';

import SidebarButton from './SidebarButton';

const AgentsStudioButton = memo(() => {
  const isOnAgentStudio = useMatch({ path: RouteDefinitions.AgentHub });
  const navigate = useNavigate();
  const location = useLocation();

  const handleAgentStudioClick = useCallback(() => {
    if (isOnAgentStudio) {
      return;
    }

    // Navigate to Agent Studio page, preserving current location in state
    navigate(RouteDefinitions.AgentHub, {
      state: { from: location.pathname },
    });
  }, [isOnAgentStudio, navigate, location.pathname]);

  return (
    <SidebarButton
      icon={<AgentStudioIcon sx={styles.icon} />}
      label="Agent HUB"
      tooltip="Agent HUB"
      tourId={SIDEBAR_TOUR_TARGET_IDS.agentsStudio}
      onClick={handleAgentStudioClick}
      isActive={!!isOnAgentStudio}
    />
  );
});

AgentsStudioButton.displayName = 'AgentsStudioButton';

const styles = {
  icon: {
    fontSize: '1rem',
  },
};

export default AgentsStudioButton;
