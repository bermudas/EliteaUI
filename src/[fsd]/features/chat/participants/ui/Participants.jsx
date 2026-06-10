import { memo, useMemo } from 'react';

import { Box, IconButton, Typography } from '@mui/material';

import { CHAT_TOUR_TARGET_IDS } from '@/[fsd]/features/interactive-tours/lib/constants';
import { ContextBudgetUI } from '@/[fsd]/widgets/context-budget';
import DoubleLeftIcon from '@/components/Icons/DoubleLeftIcon';
import DoubleRightIcon from '@/components/Icons/DoubleRightIcon';
import useGetComponentWidth from '@/hooks/useGetComponentWidth';
import useIsSmallWindow from '@/hooks/useIsSmallWindow';
import { useTheme } from '@emotion/react';

import CollapsedPerticapantsList from './CollapsedParticipants/CollapsedPerticapantsList';

// TODO: M.Shamanskii - this page is still in progress

const Participants = memo(props => {
  const {
    disabledEdit,
    participants,
    collapsed,
    onCollapsed,
    activeParticipantId,
    onSelectParticipant,
    onDeleteParticipant,
    onUpdateParticipant,
    onEditParticipant,
    // onAddUsers,
    // onAddParticipants,
    disabledAdd,
    // disabledClear,
    editingToolkit,
    conversationId,
    // onShowAgentCreator,
    // onShowToolkitCreator,
    // onShowPipelineCreator,
    contextStrategy,
    setActiveConversation,
    conversationInstructions,
    persona,
    // selectedManager,
    // newConversationSelectedManager,
  } = props;
  const theme = useTheme();

  const { isSmallWindow } = useIsSmallWindow();
  const { componentRef } = useGetComponentWidth();
  // const { componentRef, componentWidth } = useGetComponentWidth();

  // const user = useSelector(state => state.user);

  // const selectedProjectId = useSelectedProjectId();
  // const isPrivateProject = selectedProjectId == user.personal_project_id;

  const { showTitle, showCollapsedParticipants, ExpandCollapseButton } = useMemo(
    () => ({
      showTitle: !collapsed || isSmallWindow,
      showCollapsedParticipants: collapsed && !isSmallWindow,
      ExpandCollapseButton: !isSmallWindow ? (collapsed ? DoubleLeftIcon : DoubleRightIcon) : null,
    }),
    [collapsed, isSmallWindow],
  );

  // const [agentQuery, setAgentQuery] = useState('');

  // const [pipelineQuery, setPipelineQuery] = useState('');

  // const [toolkitQuery, setToolkitQuery] = useState('');

  // const [mcpQuery, setMcpQuery] = useState('');
  // const [isUsersSectionHovered, setIsUsersSectionHovered] = useState(false);
  // Get dropdown data
  // const {
  //   agentMenuItems,
  //   isAgentsLoading,
  //   pipelineMenuItems,
  //   isPipelinesLoading,
  //   toolkitMenuItems,
  //   isToolkitsLoading,
  //   mcpMenuItems,
  //   isMCPsLoading,
  //   refreshAgents,
  //   refreshPipelines,
  //   refreshToolkits,
  //   refreshMCPs,
  //   onLoadMoreAgents,
  //   onLoadMorePipelines,
  //   onLoadMoreToolkits,
  //   onLoadMoreMCPs,
  // } = useDropdownData({
  //   agentQuery,
  //   pipelineQuery,
  //   toolkitQuery,
  //   mcpQuery,
  // });

  // const agentParticipants = useMemo(
  //   () =>
  //     participants
  //       .filter(
  //         participant =>
  //           (participant.entity_name === ChatParticipantType.Applications ||
  //             participant.entity_name === ChatParticipantType.Prompts ||
  //             participant.entity_name === ChatParticipantType.Datasources) &&
  //           participant.entity_settings?.agent_type !== 'pipeline' &&
  //           participant.agent_type !== 'pipeline',
  //       )
  //       .sort(),
  //   [participants],
  // );

  // const pipelineParticipants = useMemo(
  //   () =>
  //     participants
  //       .filter(
  //         participant =>
  //           (participant.entity_name === ChatParticipantType.Pipelines ||
  //             participant.entity_name === ChatParticipantType.Applications) &&
  //           (participant.entity_settings?.agent_type === 'pipeline' || participant.agent_type === 'pipeline'),
  //       )
  //       .sort(),
  //   [participants],
  // );

  // const toolkitParticipants = useMemo(
  //   () =>
  //     participants
  //       .filter(
  //         participant =>
  //           participant.entity_name === ChatParticipantType.Toolkits &&
  //           !participant.meta?.mcp &&
  //           participant.entity_settings.toolkit_type !== 'mcp',
  //       )
  //       .sort(),
  //   [participants],
  // );

  // const mcpParticipants = useMemo(
  //   () =>
  //     participants
  //       .filter(
  //         participant =>
  //           participant.entity_name === ChatParticipantType.Toolkits &&
  //           (participant.meta?.mcp || participant.entity_settings?.toolkit_type === 'mcp'),
  //       )
  //       .sort(),
  //   [participants],
  // );

  // const users = useMemo(
  //   () =>
  //     participants
  //       .filter(participant => participant.entity_name === ChatParticipantType.Users)
  //       .sort((a, b) => a.id - b.id),
  //   [participants],
  // );

  // const usersToDisplay = useMemo(() => {
  //   if (users.length === 0)
  //     return [
  //       {
  //         id: user.id,
  //         meta: {
  //           user_name: user.name,
  //           user_avatar: user.avatar,
  //         },
  //       },
  //     ];

  //   if (componentWidth <= 200) return users.slice(0, 3);

  //   return users.slice(0, 5);
  // }, [users, user.id, user.name, user.avatar, componentWidth]);

  // const createNewEntity = useCallback(
  //   type => () => {
  //     if (type === ParticipantEntityTypes.Agent && onShowAgentCreator) {
  //       // Use the in-chat editor for creating new agents
  //       onShowAgentCreator();
  //     } else if (type === ParticipantEntityTypes.Pipeline && onShowPipelineCreator) {
  //       // Use the in-chat editor for creating new pipelines
  //       onShowPipelineCreator();
  //     } else if (
  //       (type === ParticipantEntityTypes.Toolkit || type === ParticipantEntityTypes.MCP) &&
  //       onShowToolkitCreator
  //     ) {
  //       // Use the in-chat editor for creating new toolkits or mcps
  //       onShowToolkitCreator(type === ParticipantEntityTypes.MCP);
  //     } else {
  //       // Fallback to opening in new tab for other entity types or if creator is not available
  //       const baseUrl = `${window.location.protocol}//${window.location.host}`;
  //       const basename = getBasename();
  //       switch (type) {
  //         case ParticipantEntityTypes.Agent:
  //           window.open(`${baseUrl}${basename}/agents/create?viewMode=owner`, '_blank');
  //           break;
  //         case ParticipantEntityTypes.Toolkit:
  //           window.open(`${baseUrl}${basename}/toolkits/create?viewMode=owner`, '_blank');
  //           break;
  //         case ParticipantEntityTypes.MCP:
  //           window.open(`${baseUrl}${basename}/mcps/create?viewMode=owner`, '_blank');
  //           break;
  //         case ParticipantEntityTypes.Pipeline:
  //           window.open(`${baseUrl}${basename}/pipelines/create?viewMode=owner`, '_blank');
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   },
  //   [onShowAgentCreator, onShowToolkitCreator, onShowPipelineCreator],
  // );

  return (
    <Box
      ref={componentRef}
      sx={styles.mainContainer(collapsed)}
    >
      <Box
        sx={styles.contentContainer(collapsed, isSmallWindow)}
        data-tour={CHAT_TOUR_TARGET_IDS.participants}
      >
        <Box sx={styles.headerContainer(collapsed, isSmallWindow)}>
          {showTitle && (
            <Box sx={styles.titleContainer}>
              <Typography variant="subtitle">Participants</Typography>
            </Box>
          )}
          {Boolean(ExpandCollapseButton) && (
            <IconButton
              sx={styles.collapseButton}
              variant="elitea"
              color="tertiary"
              onClick={onCollapsed}
            >
              <ExpandCollapseButton
                fill={theme.palette.icon.fill.default}
                width={16}
              />
            </IconButton>
          )}
        </Box>

        <Box sx={styles.participantsContainer(collapsed, isSmallWindow)}>
          {
            showCollapsedParticipants ? (
              <CollapsedPerticapantsList
                participants={participants}
                onSelectParticipant={onSelectParticipant}
                onDeleteParticipant={onDeleteParticipant}
                disabledAdd={disabledAdd}
                disabledEdit={disabledEdit}
                activeParticipantId={activeParticipantId}
                onUpdateParticipant={onUpdateParticipant}
                onEditParticipant={onEditParticipant}
                editingToolkit={editingToolkit}
              />
            ) : (
              <Box>Expanded in progress...</Box>
            )
            // (
            //   <>
            //     <ParticipantsAccordion
            //       defaultExpanded
            //       title="Users"
            //       collapsed={false}
            //     >
            //       <Box
            //         sx={styles.usersSection}
            //         onMouseEnter={() => setIsUsersSectionHovered(true)}
            //         onMouseLeave={() => setIsUsersSectionHovered(false)}
            //       >
            //         <Box sx={styles.usersDisplayContainer}>
            //           {usersToDisplay.map((participant, index) => (
            //             <UserParticipantItem
            //               key={ChatParticipantType.Users + index}
            //               participant={participant}
            //               onClickItem={onSelectParticipant}
            //             />
            //           ))}
            //           <Typography
            //             variant="bodyMedium"
            //             color="text.primary"
            //             sx={styles.usersCountText}
            //           >
            //             {users.length > usersToDisplay.length ? `+${users.length - usersToDisplay.length}` : ''}
            //           </Typography>
            //         </Box>
            //         {!isPrivateProject && (
            //           <UsersParticipantDropdown
            //             showTrigger={isUsersSectionHovered}
            //             users={
            //               users.length > 0
            //                 ? users
            //                 : [
            //                     {
            //                       id: user.id,
            //                       meta: {
            //                         user_name: user.name,
            //                         user_avatar: user.avatar,
            //                       },
            //                     },
            //                   ]
            //             }
            //             width={componentWidth ? `${componentWidth}px` : '228px'}
            //             placement="bottom-start"
            //             slotProps={{
            //               IconButton: {
            //                 sx: {
            //                   padding: '6px',
            //                   '&:hover': {
            //                     backgroundColor: 'rgba(255, 255, 255, 0.1)',
            //                     '& > *': { color: theme.palette.icon.fill.secondary },
            //                     '& svg': { fill: theme.palette.icon.fill.secondary },
            //                     '& .MuiSvgIcon-root path': {
            //                       fill: `${theme.palette.icon.fill.secondary} !important`,
            //                     },
            //                   },
            //                 },
            //               },
            //               Paper: {
            //                 sx: styles.usersDropdownPaper,
            //               },
            //             }}
            //             onSelectUser={onSelectParticipant}
            //             onDeleteUser={onDeleteParticipant}
            //             onAddUsers={onAddUsers}
            //             disabledAdd={disabledAdd}
            //             currentUserId={user.id}
            //           />
            //         )}
            //       </Box>
            //     </ParticipantsAccordion>
            //   </>
            // )
          }
          {/* <ParticipantSection
            CollapsedIcon={ApplicationsIcon}
            AddIcon={AddAgentIcon}
            disabledEdit={disabledEdit}
            participants={agentParticipants}
            selectedManager={selectedManager}
            collapsed={collapsed}
            activeParticipantId={activeParticipantId}
            onSelectParticipant={onSelectParticipant}
            onDeleteParticipant={onDeleteParticipant}
            onUpdateParticipant={onUpdateParticipant}
            onEditParticipant={onEditParticipant}
            onAddParticipants={onAddParticipants}
            participantType={ChatParticipantType.Applications}
            entityItems={agentMenuItems}
            onCreateEntity={createNewEntity(ParticipantEntityTypes.Agent)}
            isLoading={isAgentsLoading}
            onRefresh={refreshAgents}
            entityType={ParticipantEntityTypes.Agent}
            onLoadMore={onLoadMoreAgents}
            query={agentQuery}
            setQuery={setAgentQuery}
          /> */}
          {/* <ParticipantSection
            CollapsedIcon={FlowIcon}
            AddIcon={AddPipelineIcon}
            disabledEdit={disabledEdit}
            participants={pipelineParticipants}
            selectedManager={selectedManager}
            collapsed={collapsed}
            activeParticipantId={activeParticipantId}
            onSelectParticipant={onSelectParticipant}
            onDeleteParticipant={onDeleteParticipant}
            onUpdateParticipant={onUpdateParticipant}
            onEditParticipant={onEditParticipant}
            onAddParticipants={onAddParticipants}
            participantType={ChatParticipantType.Pipelines}
            entityItems={pipelineMenuItems}
            onCreateEntity={createNewEntity(ParticipantEntityTypes.Pipeline)}
            isLoading={isPipelinesLoading}
            onRefresh={refreshPipelines}
            entityType={ParticipantEntityTypes.Pipeline}
            onLoadMore={onLoadMorePipelines}
            query={pipelineQuery}
            setQuery={setPipelineQuery}
          /> */}
          {/* <ParticipantSection
            CollapsedIcon={ToolIcon}
            AddIcon={AddToolIcon}
            disabledEdit={disabledEdit}
            participants={toolkitParticipants}
            selectedManager={selectedManager}
            newConversationSelectedManager={newConversationSelectedManager}
            collapsed={collapsed}
            activeParticipantId={activeParticipantId}
            onSelectParticipant={onSelectParticipant}
            onDeleteParticipant={onDeleteParticipant}
            onUpdateParticipant={onUpdateParticipant}
            onEditParticipant={onEditParticipant}
            onAddParticipants={onAddParticipants}
            participantType={ChatParticipantType.Toolkits}
            entityItems={toolkitMenuItems}
            onCreateEntity={createNewEntity(ParticipantEntityTypes.Toolkit)}
            isLoading={isToolkitsLoading}
            onRefresh={refreshToolkits}
            entityType={ParticipantEntityTypes.Toolkit}
            onLoadMore={onLoadMoreToolkits}
            editingToolkit={editingToolkit}
            query={toolkitQuery}
            setQuery={setToolkitQuery}
          /> */}
          {/* <ParticipantSection
            CollapsedIcon={MCPIcon}
            AddIcon={AddMCPIcon}
            disabledEdit={disabledEdit}
            participants={mcpParticipants}
            selectedManager={selectedManager}
            collapsed={collapsed}
            activeParticipantId={activeParticipantId}
            onSelectParticipant={onSelectParticipant}
            onDeleteParticipant={onDeleteParticipant}
            onUpdateParticipant={onUpdateParticipant}
            onEditParticipant={onEditParticipant}
            onAddParticipants={onAddParticipants}
            participantType={ChatParticipantType.Toolkits}
            entityItems={mcpMenuItems}
            onCreateEntity={createNewEntity(ParticipantEntityTypes.MCP)}
            isLoading={isMCPsLoading}
            onRefresh={refreshMCPs}
            entityType={ParticipantEntityTypes.MCP}
            onLoadMore={onLoadMoreMCPs}
            editingToolkit={editingToolkit}
            query={mcpQuery}
            setQuery={setMcpQuery}
          /> */}
        </Box>
      </Box>

      {conversationId && (
        <Box
          data-tour={CHAT_TOUR_TARGET_IDS.contextBudget}
          sx={{ width: '100%' }}
        >
          <ContextBudgetUI.ContextBudgetInfo
            conversationId={conversationId}
            collapsed={collapsed && !isSmallWindow}
            contextStrategy={contextStrategy}
            setActiveConversation={setActiveConversation}
            conversationInstructions={conversationInstructions}
            persona={persona}
          />
        </Box>
      )}
    </Box>
  );
});

Participants.displayName = 'Participants';

/**
 * Styling definitions for the Participants component.
 * Uses Material-UI's sx prop pattern with theme-aware functions.
 *
 * @type MuiSx
 */
const styles = {
  mainContainer: collapsed => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: collapsed ? 'flex-end' : 'flex-start',
    width: '100%',
    height: '100%',
    gap: '12px',
  }),

  contentContainer: (collapsed, isSmallWindow) => ({
    height: '100%',
    position: 'relative',
    width: collapsed && !isSmallWindow ? '3.25rem' : '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: collapsed && !isSmallWindow ? 'center' : 'flex-start',
    overflowY: 'scroll',
  }),

  headerContainer: (collapsed, isSmallWindow) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: collapsed && !isSmallWindow ? 'center' : 'space-between',
    height: '32px',
    alignItems: 'center',
    width: '100%',
  }),

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    gap: '16px',
  },

  collapseButton: {
    marginLeft: '0px',
  },

  participantsContainer: (collapsed, isSmallWindow) => ({
    marginTop: '8px',
    gap: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: !collapsed || isSmallWindow ? 'flex-start' : 'center',
    overflowY: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    maxHeight: `calc(100% - 40px)`,
    paddingBottom: !collapsed || isSmallWindow ? '32px' : '20px',
    paddingTop: !collapsed || isSmallWindow ? '0px' : '8px',
    width: '100%',
  }),

  collapsedUsersContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  usersDropdownIconButton: {
    borderRadius: '8px',
  },

  usersSection: ({ palette }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '40px',
    background: palette.background.participant.default,
    '&:hover': {
      background: palette.background.tabButton.hover,
    },
    padding: '6px 12px',
    borderRadius: '8px',
  }),

  usersDisplayContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  usersCountText: {
    marginLeft: '4px',
  },

  usersDropdownPaper: {
    marginTop: '8px',
    marginLeft: '0px',
  },

  collapsedClearButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  collapsedClearButton: ({ palette }) => ({
    padding: '6px',
    backgroundColor: palette.background.button?.secondary,
    borderRadius: '28px',
    '&:hover': {
      backgroundColor: palette.background.button?.secondaryHover,
    },
  }),

  clearIcon: ({ palette }) => ({
    fontSize: '16px',
    color: palette.icon.fill.secondary,
  }),
};

export default Participants;
