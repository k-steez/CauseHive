import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button, Card, Input, Textarea, Select } from '../theme/styled';
import Layout from '../components/layout/Layout';
import causeService from '../services/causeService';
import Section from '../components/Section';

const categories = [
  { id: 'education', name: 'Education' },
  { id: 'environment', name: 'Environment' },
  { id: 'health', name: 'Health' },
  { id: 'animals', name: 'Animal Welfare' },
  { id: 'humanitarian', name: 'Humanitarian' },
  { id: 'community', name: 'Community' },
];

const FormSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const FormContainer = styled(Container)`
  max-width: 800px;
`;

const FormCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const FormTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: ${({ theme }) => theme.typography.small.fontWeight};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const FormInput = styled(Input)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
`;

const FormTextarea = styled(Textarea)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  resize: vertical;
`;

const FormSelect = styled(Select)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const UploadContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px dashed ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
`;

const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PreviewImage = styled.img`
  max-height: 12rem;
  width: auto;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const UploadIcon = styled.svg`
  height: 3rem;
  width: 3rem;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const UploadText = styled.div`
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  color: ${({ theme }) => theme.colors.gray[600]};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const UploadLink = styled.label`
  position: relative;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const UploadHint = styled.p`
  font-size: ${({ theme }) => theme.typography.tiny.fontSize};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const SubmitContainer = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.md};
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
`;

const CreateCausePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    category: 'education',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newCause = await causeService.createCause(formData);
      alert('Campaign created successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Error: Could not create campaign.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow p-4">
              <h1 className="fw-bold text-center mb-3" style={{ color: '#43a047' }}>Create a New Cause</h1>
              <p className="text-center text-muted mb-4">Share your story and inspire the world to give!</p>
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Cause Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Clean Water for Rural Villages"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell the story of your cause. Why is it important?"
                    required
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="goal" className="form-label">Fundraising Goal ($)</label>
                    <input
                      type="number"
                      id="goal"
                      name="goal"
                      className="form-control"
                      value={formData.goal}
                      onChange={handleChange}
                      placeholder="e.g., 10000"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                      id="category"
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Cover Image</label>
                  <div className="border rounded p-3 text-center bg-light">
                    {preview ? (
                      <img src={preview} alt="Preview" className="img-fluid rounded mb-2" style={{ maxHeight: 180 }} />
                    ) : (
                      <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80" alt="Upload Preview" className="img-fluid rounded mb-2" style={{ maxHeight: 120 }} />
                    )}
                    <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" />
                    <div className="form-text">PNG, JPG, GIF up to 10MB</div>
                  </div>
                </div>
                <div className="d-grid pt-2">
                  <button type="submit" className="btn btn-primary fw-bold py-2" disabled={isSubmitting} style={{ background: 'linear-gradient(90deg, #43a047 0%, #ff9800 100%)', border: 'none' }}>
                    {isSubmitting ? 'Creating...' : 'Create Campaign'}
                  </button>
                </div>
              </form>
              <div className="mt-4 text-center">
                <img src="https://images.unsplash.com/photo-1515168833906-d2a3b82b1e2e?auto=format&fit=facearea&w=400&q=80" alt="Inspire Giving" className="rounded shadow" style={{ maxHeight: 120 }} />
                <div className="small text-muted mt-2">Your story can change lives. Start your campaign today!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCausePage;
