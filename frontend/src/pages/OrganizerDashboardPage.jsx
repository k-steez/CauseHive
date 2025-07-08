import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Container, Section, Button, Card, Grid, Flex } from '../theme/styled';
import { Trash2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import causeService from '../services/causeService';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '../global.css';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

const calculateProgress = (raised, goal) => {
  return Math.min(Math.round((raised / goal) * 100), 100);
};

const getStatusClass = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'draft':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const DashboardSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

const DashboardTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0;
`;

const WelcomeText = styled.p`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
`;

const StatsGrid = styled(Grid)`
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: center;
  }
`;

const FilterLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.gray[700]};
  white-space: nowrap;
`;

const FilterButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  overflow-x: auto;
`;

const FilterButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  white-space: nowrap;
`;

const CampaignList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CampaignCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.md};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const CampaignImage = styled.img`
  width: 8rem;
  height: 5rem;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-right: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    margin-right: 0;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const CampaignTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.h4.fontSize};
  font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const StatusBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.tiny.fontSize};
  font-weight: ${({ theme }) => theme.typography.tiny.fontWeight};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  height: 0.5rem;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.5s ease-in-out;
`;

const ProgressText = styled.p`
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing.md};
    justify-content: space-between;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto ${({ theme }) => theme.spacing.md} auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.red[50]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.red[200]};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const ErrorTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.red[800]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.red[600]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EmptyContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border: 2px dashed ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const ModalContent = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 24rem;
  width: 100%;
`;

const ModalTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const ModalText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const ModalActions = styled(Flex)`
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

const OrganizerDashboardPage = () => {
  const { currentUser } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchCampaigns = useCallback(async () => {
    if (currentUser) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await causeService.getOrganizerCampaigns(currentUser.id);
        setCampaigns(data);
      } catch (err) {
        console.error("Failed to fetch campaigns:", err);
        setError("We couldn't load your campaigns. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleDeleteClick = (campaign) => {
    setCampaignToDelete(campaign);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (campaignToDelete) {
      await causeService.deleteCause(campaignToDelete.id);
      setCampaigns(campaigns.filter(c => c.id !== campaignToDelete.id));
      setShowDeleteModal(false);
      setCampaignToDelete(null);
    }
  };

  const totalRaised = campaigns.reduce((sum, camp) => sum + camp.raised, 0);
  const totalDonors = campaigns.reduce((sum, camp) => sum + (camp.donors || 0), 0);

  const filteredCampaigns = campaigns.filter(campaign => {
    if (statusFilter === 'all') return true;
    return campaign.status === statusFilter;
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <LoadingContainer>
          <Spinner />
          <LoadingText>Loading Your Dashboard...</LoadingText>
        </LoadingContainer>
      );
    }

    if (error) {
      return (
        <ErrorContainer>
          <ErrorTitle>An Error Occurred</ErrorTitle>
          <ErrorText>{error}</ErrorText>
          <Button variant="primary" onClick={fetchCampaigns}>
            Try Again
          </Button>
        </ErrorContainer>
      );
    }

    if (campaigns.length === 0) {
      return (
        <EmptyContainer>
          <EmptyTitle>No Campaigns Yet</EmptyTitle>
          <EmptyText>It looks like you haven't created any campaigns. Get started now!</EmptyText>
          <Button as={Link} to="/start-campaign" variant="primary" size="lg">
            Create Your First Campaign
          </Button>
        </EmptyContainer>
      );
    }

    return (
      <>
        {/* Stats Cards */}
        <StatsGrid>
          <StatCard>
            <StatValue>{campaigns.length}</StatValue>
            <StatLabel>Total Campaigns</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{formatCurrency(totalRaised)}</StatValue>
            <StatLabel>Total Raised</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{totalDonors}</StatValue>
            <StatLabel>Total Donors</StatLabel>
          </StatCard>
        </StatsGrid>

        {/* Filter Controls */}
        <FilterContainer>
          <FilterLabel>Filter by status:</FilterLabel>
          <FilterButtonGroup>
            <FilterButton 
              variant={statusFilter === 'all' ? 'primary' : 'outline'} 
              onClick={() => setStatusFilter('all')}
            >
              All ({campaigns.length})
            </FilterButton>
            <FilterButton 
              variant={statusFilter === 'active' ? 'primary' : 'outline'} 
              onClick={() => setStatusFilter('active')}
            >
              Active ({campaigns.filter(c => c.status === 'active').length})
            </FilterButton>
            <FilterButton 
              variant={statusFilter === 'completed' ? 'primary' : 'outline'} 
              onClick={() => setStatusFilter('completed')}
            >
              Completed ({campaigns.filter(c => c.status === 'completed').length})
            </FilterButton>
            <FilterButton 
              variant={statusFilter === 'draft' ? 'primary' : 'outline'} 
              onClick={() => setStatusFilter('draft')}
            >
              Draft ({campaigns.filter(c => c.status === 'draft').length})
            </FilterButton>
          </FilterButtonGroup>
        </FilterContainer>

        {/* Campaigns List */}
        <CampaignList>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CampaignCard>
                  <Flex items="center" gap="1rem" flexDirection="row" flexWrap="wrap">
                    <CampaignImage src={campaign.image} alt={campaign.title} />
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <Flex justify="between" align="center">
                        <CampaignTitle>{campaign.title}</CampaignTitle>
                        <StatusBadge className={getStatusClass(campaign.status)}>
                          {campaign.status}
                        </StatusBadge>
                      </Flex>
                      <ProgressBarContainer>
                        <ProgressBar style={{ width: `${calculateProgress(campaign.raised, campaign.goal)}%` }} />
                      </ProgressBarContainer>
                      <ProgressText>
                        {formatCurrency(campaign.raised)} raised of {formatCurrency(campaign.goal)}
                      </ProgressText>
                    </div>
                    <ActionButtons>
                      <Button as={Link} to={`/causes/${campaign.id}`} variant="outline" size="sm">View</Button>
                      <Button as={Link} to={`/causes/${campaign.id}/edit`} variant="secondary" size="sm">Edit</Button>
                      <Button variant="danger-outline" size="sm" onClick={() => handleDeleteClick(campaign)}><Trash2 className="h-4 w-4" /></Button>
                    </ActionButtons>
                  </Flex>
                </CampaignCard>
              </motion.div>
            ))
          ) : (
            <EmptyContainer>
              <EmptyText>No campaigns match the selected filter.</EmptyText>
            </EmptyContainer>
          )}
        </CampaignList>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <Layout>
        <DashboardSection>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeaderContainer>
                <div>
                  <DashboardTitle>Organizer Dashboard</DashboardTitle>
                  {currentUser && <WelcomeText>Welcome back, {currentUser.name || 'Organizer'}!</WelcomeText>}
                </div>
                <Button as={Link} to="/start-campaign" variant="primary">
                  Create New Cause
                </Button>
              </HeaderContainer>

              {renderContent()}
            </motion.div>
          </Container>
        </DashboardSection>

        {showDeleteModal && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Confirm Deletion</ModalTitle>
              <ModalText>Are you sure you want to delete the campaign "{campaignToDelete?.title}"? This action cannot be undone.</ModalText>
              <ModalActions>
                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                <Button variant="danger" onClick={confirmDelete}>Delete</Button>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        )}
      </Layout>
    </>
  );
};

export default OrganizerDashboardPage;
