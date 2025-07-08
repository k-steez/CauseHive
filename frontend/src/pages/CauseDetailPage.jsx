import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Container, Section, Button, Card, Flex, Grid, Input } from '../theme/styled';
import Layout from '../components/layout/Layout';
import causeService from '../services/causeService';

const CauseHeader = styled(Section)`
  background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const CauseTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.h1.fontSize};
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: inherit;
  margin-bottom: 0;
`;

const OrganizerLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: underline;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: ${({ theme }) => theme.typography.small.fontWeight};
  background-color: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const StatsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 0;
    justify-content: flex-end;
  }
`;

const StatBox = styled.div`
  text-align: center;
  min-width: 80px;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.white};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  color: rgba(255, 255, 255, 0.8);
`;

const MainContent = styled(Section)`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const ContentGrid = styled(Grid)`
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 3fr 2fr;
  }
`;

const CauseImage = styled.img`
  width: 100%;
  height: 24rem;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const TabNavigation = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TabButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.gray[500]};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme, active }) => active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TabContent = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const DescriptionText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const UpdateItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;

const UpdateDate = styled.div`
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const UpdateTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.h4.fontSize};
  font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const UpdateText = styled.p`
  color: ${({ theme }) => theme.colors.gray[700]};
  line-height: 1.6;
`;

const CommentItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;

const CommentAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const CommentUser = styled.p`
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CommentText = styled.p`
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: 1.5;
`;

const Sidebar = styled.div`
  position: sticky;
  top: 6rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: relative;
    top: 0;
  }
`;

const DonationCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const DonationTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  height: 0.625rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.5s ease-in-out;
`;

const ProgressText = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DonationLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: ${({ theme }) => theme.typography.small.fontWeight};
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CurrencySymbol = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  pointer-events: none;
`;

const DonationInput = styled(Input)`
  width: 100%;
  padding-left: 1.75rem;
  padding-right: 0.75rem;
`;

const QuickAmountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DonateButton = styled(Button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.typography.bodyLg.fontSize};
`;

const OrganizerCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const OrganizerTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.h4.fontSize};
  font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const OrganizerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const OrganizerLogo = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const OrganizerDetails = styled.div`
  flex: 1;
`;

const OrganizerName = styled.p`
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const OrganizerBio = styled.p`
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  color: ${({ theme }) => theme.colors.gray[500]};
  line-height: 1.4;
`;

const cause = {
  title: 'Clean Water for All',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  description: 'Help us build wells and provide clean water to rural communities. Your donation will go directly to materials, labor, and community training.',
  raised: 4200,
  goal: 10000,
  donors: 128,
  updates: [
    { date: '2025-07-01', text: 'First well completed in Village A!' },
    { date: '2025-06-15', text: 'Project launched and first donations received.' },
  ],
};

const CauseDetailPage = () => {
  const { id } = useParams();
  const [cause, setCause] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState(50);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchCause = async () => {
      setIsLoading(true);
      const data = await causeService.getCause(id);
      setCause(data);
      setIsLoading(false);
      window.scrollTo(0, 0);
    };
    fetchCause();
  }, [id]);

  const calculateProgress = (raised, goal) => {
    if (!goal) return 0;
    return Math.min(Math.round((raised / goal) * 100), 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Layout>
        <Container className="text-center py-20">
          <h2 className="text-2xl">Loading cause...</h2>
        </Container>
      </Layout>
    );
  }

  if (!cause) {
    return (
      <Layout>
        <Container className="text-center py-20">
          <h2 className="text-2xl">Cause Not Found</h2>
          <p className="text-gray-600 mt-4">Sorry, we couldn't find the cause you're looking for.</p>
          <Button as={Link} to="/causes" variant="primary" className="mt-6">
            Back to All Causes
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Cause Header */}
      <CauseHeader>
        <Container>
          <HeaderContent>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CauseTitle>{cause.title}</CauseTitle>
              <p>
                by <OrganizerLink to="/organizer/1">{cause.organizer.name}</OrganizerLink>
              </p>
              <CategoryBadge>{cause.category}</CategoryBadge>
            </motion.div>
            <StatsWrapper>
              <StatBox>
                <StatValue>{formatCurrency(cause.raised)}</StatValue>
                <StatLabel>raised of {formatCurrency(cause.goal)}</StatLabel>
              </StatBox>
              <StatBox>
                <StatValue>{cause.donors}</StatValue>
                <StatLabel>donors</StatLabel>
              </StatBox>
              <StatBox>
                <StatValue>{cause.daysLeft}</StatValue>
                <StatLabel>days left</StatLabel>
              </StatBox>
            </StatsWrapper>
          </HeaderContent>
        </Container>
      </CauseHeader>

      {/* Main Content */}
      <MainContent>
        <Container>
          <ContentGrid>
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CauseImage src={cause.image} alt={cause.title} />
              </Card>

              {/* Tabbed Content */}
              <TabNavigation>
                <TabButton 
                  active={activeTab === 'description'} 
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </TabButton>
                <TabButton 
                  active={activeTab === 'updates'} 
                  onClick={() => setActiveTab('updates')}
                >
                  Updates
                </TabButton>
                <TabButton 
                  active={activeTab === 'comments'} 
                  onClick={() => setActiveTab('comments')}
                >
                  Comments
                </TabButton>
              </TabNavigation>

              <TabContent>
                {activeTab === 'description' && (
                  <DescriptionText>{cause.description}</DescriptionText>
                )}
                {activeTab === 'updates' && (
                  <div>
                    {cause.updates.map(update => (
                      <UpdateItem key={update.id}>
                        <UpdateDate>{update.date}</UpdateDate>
                        <UpdateTitle>{update.title}</UpdateTitle>
                        <UpdateText>{update.content}</UpdateText>
                      </UpdateItem>
                    ))}
                  </div>
                )}
                {activeTab === 'comments' && (
                  <div>
                    {cause.comments.map(comment => (
                      <CommentItem key={comment.id}>
                        <Flex>
                          <CommentAvatar src={comment.avatar} alt={comment.user} />
                          <div>
                            <CommentUser>{comment.user}</CommentUser>
                            <CommentText>{comment.text}</CommentText>
                          </div>
                        </Flex>
                      </CommentItem>
                    ))}
                  </div>
                )}
              </TabContent>
            </motion.div>

            {/* Right Column (Sidebar) */}
            <Sidebar>
              <DonationCard>
                <DonationTitle>Donate Now</DonationTitle>
                
                {/* Progress Bar */}
                <ProgressBarContainer>
                  <ProgressBar style={{ width: `${calculateProgress(cause.raised, cause.goal)}%` }} />
                </ProgressBarContainer>
                <ProgressText>
                  <span>{calculateProgress(cause.raised, cause.goal)}%</span> of goal raised
                </ProgressText>

                {/* Donation Form */}
                <form>
                  <div>
                    <DonationLabel htmlFor="donation">Enter amount</DonationLabel>
                    <InputWrapper>
                      <CurrencySymbol>$</CurrencySymbol>
                      <DonationInput 
                        type="number"
                        id="donation"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                    </InputWrapper>
                  </div>
                  <QuickAmountGrid>
                    {[25, 50, 100].map(amount => (
                      <Button 
                        key={amount}
                        type="button"
                        variant={donationAmount === amount ? 'primary' : 'outline'}
                        onClick={() => setDonationAmount(amount)}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </QuickAmountGrid>
                  <DonateButton type="submit" variant="primary">
                    Donate {formatCurrency(donationAmount)}
                  </DonateButton>
                </form>
              </DonationCard>

              {/* Organizer Card */}
              <OrganizerCard>
                <OrganizerTitle>Organizer</OrganizerTitle>
                <OrganizerInfo>
                  <OrganizerLogo src={cause.organizer.logo} alt={cause.organizer.name} />
                  <OrganizerDetails>
                    <OrganizerName>{cause.organizer.name}</OrganizerName>
                    <OrganizerBio>{cause.organizer.bio}</OrganizerBio>
                  </OrganizerDetails>
                </OrganizerInfo>
              </OrganizerCard>
            </Sidebar>
          </ContentGrid>
        </Container>
      </MainContent>
    </Layout>
  );
};

export default CauseDetailPage;
