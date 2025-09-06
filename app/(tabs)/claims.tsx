import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface Claim {
  id: string;
  date: string;
  provider: string;
  service: string;
  amount: number;
  status: 'approved' | 'denied' | 'pending' | 'appealed';
  description: string;
}

export default function ClaimsScreen() {
  const colorScheme = useColorScheme();
  const [claims] = useState<Claim[]>([
    {
      id: 'C001',
      date: '2024-01-15',
      provider: 'Dr. Sarah Johnson',
      service: 'Annual Physical',
      amount: 250,
      status: 'approved',
      description: 'Routine annual checkup and blood work'
    },
    {
      id: 'C002',
      date: '2024-01-20',
      provider: 'City Radiology',
      service: 'MRI Lumbar Spine',
      amount: 1200,
      status: 'denied',
      description: 'MRI for lower back pain - denied for lack of pre-authorization'
    },
    {
      id: 'C003',
      date: '2024-02-01',
      provider: 'Dr. Michael Chen',
      service: 'Specialist Consultation',
      amount: 180,
      status: 'pending',
      description: 'Cardiology consultation for chest pain'
    },
    {
      id: 'C004',
      date: '2024-02-10',
      provider: 'Mental Health Center',
      service: 'Therapy Session',
      amount: 120,
      status: 'approved',
      description: 'Individual therapy session'
    }
  ]);

  const [showAppealForm, setShowAppealForm] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [appealReason, setAppealReason] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#4CAF50';
      case 'denied': return '#F44336';
      case 'pending': return '#FF9800';
      case 'appealed': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return 'checkmark.circle.fill';
      case 'denied': return 'xmark.circle.fill';
      case 'pending': return 'clock.fill';
      case 'appealed': return 'arrow.clockwise.circle.fill';
      default: return 'questionmark.circle.fill';
    }
  };

  const handleAppealClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setShowAppealForm(true);
  };

  const submitAppeal = () => {
    if (!appealReason.trim()) {
      Alert.alert('Error', 'Please provide a reason for the appeal');
      return;
    }

    // Simulate appeal submission
    Alert.alert(
      'Appeal Submitted',
      `Your appeal for claim ${selectedClaim?.id} has been submitted. You will receive a response within 30 days.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowAppealForm(false);
            setAppealReason('');
            setSelectedClaim(null);
          }
        }
      ]
    );
  };

  const generateAppealLetter = () => {
    if (!selectedClaim) return;

    const letter = `
Dear Claims Department,

I am writing to appeal the denial of my claim ${selectedClaim.id} dated ${selectedClaim.date}.

Claim Details:
- Provider: ${selectedClaim.provider}
- Service: ${selectedClaim.service}
- Amount: $${selectedClaim.amount}
- Description: ${selectedClaim.description}

Reason for Appeal:
${appealReason}

I believe this claim should be covered under my policy and request a review of this decision.

Thank you for your consideration.

Sincerely,
[Your Name]
[Member ID: ABC123456789]
[Date: ${new Date().toLocaleDateString()}]
    `;

    Alert.alert('Appeal Letter Generated', letter, [
      { text: 'Copy to Clipboard', onPress: () => {/* Copy logic */} },
      { text: 'Email to Provider', onPress: () => {/* Email logic */} },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Claims & Appeals</ThemedText>
        <ThemedText style={styles.subtitle}>
          Track your claims and manage appeals
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <ThemedView style={styles.statCard}>
          <ThemedText style={styles.statNumber}>{claims.length}</ThemedText>
          <ThemedText style={styles.statLabel}>Total Claims</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statCard}>
          <ThemedText style={styles.statNumber}>
            {claims.filter(c => c.status === 'approved').length}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Approved</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statCard}>
          <ThemedText style={styles.statNumber}>
            {claims.filter(c => c.status === 'denied').length}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Denied</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.claimsContainer}>
        <ThemedText type="subtitle" style={styles.claimsTitle}>
          Recent Claims
        </ThemedText>
        
        {claims.map((claim) => (
          <ThemedView key={claim.id} style={styles.claimCard}>
            <ThemedView style={styles.claimHeader}>
              <ThemedView style={styles.claimInfo}>
                <ThemedText type="defaultSemiBold" style={styles.claimId}>
                  Claim #{claim.id}
                </ThemedText>
                <ThemedText style={styles.claimDate}>{claim.date}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.statusContainer}>
                <IconSymbol 
                  name={getStatusIcon(claim.status)} 
                  size={20} 
                  color={getStatusColor(claim.status)} 
                />
                <ThemedText style={[styles.statusText, { color: getStatusColor(claim.status) }]}>
                  {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.claimDetails}>
              <ThemedText style={styles.providerText}>{claim.provider}</ThemedText>
              <ThemedText style={styles.serviceText}>{claim.service}</ThemedText>
              <ThemedText style={styles.amountText}>${claim.amount}</ThemedText>
            </ThemedView>

            <ThemedText style={styles.descriptionText}>{claim.description}</ThemedText>

            {claim.status === 'denied' && (
              <TouchableOpacity 
                style={styles.appealButton}
                onPress={() => handleAppealClaim(claim)}
              >
                <IconSymbol name="arrow.clockwise" size={16} color="white" />
                <ThemedText style={styles.appealButtonText}>Appeal This Claim</ThemedText>
              </TouchableOpacity>
            )}
          </ThemedView>
        ))}
      </ThemedView>

      {showAppealForm && selectedClaim && (
        <ThemedView style={styles.appealForm}>
          <ThemedText type="subtitle" style={styles.appealFormTitle}>
            Appeal Claim #{selectedClaim.id}
          </ThemedText>
          
          <ThemedText style={styles.appealFormSubtitle}>
            Why do you believe this claim should be approved?
          </ThemedText>
          
          <TextInput
            style={[
              styles.appealTextInput,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                color: Colors[colorScheme ?? 'light'].text,
                borderColor: Colors[colorScheme ?? 'light'].tabIconDefault
              }
            ]}
            placeholder="Explain why this claim should be covered..."
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={appealReason}
            onChangeText={setAppealReason}
            multiline
            numberOfLines={4}
          />
          
          <ThemedView style={styles.appealButtons}>
            <TouchableOpacity 
              style={styles.generateLetterButton}
              onPress={generateAppealLetter}
            >
              <IconSymbol name="doc.text.fill" size={16} color="white" />
              <ThemedText style={styles.buttonText}>Generate Appeal Letter</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.submitAppealButton}
              onPress={submitAppeal}
            >
              <IconSymbol name="paperplane.fill" size={16} color="white" />
              <ThemedText style={styles.buttonText}>Submit Appeal</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => setShowAppealForm(false)}
          >
            <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  claimsContainer: {
    marginBottom: 24,
  },
  claimsTitle: {
    marginBottom: 16,
  },
  claimCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  claimInfo: {
    flex: 1,
  },
  claimId: {
    fontSize: 16,
  },
  claimDate: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  claimDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  providerText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 2,
  },
  serviceText: {
    fontSize: 14,
    flex: 2,
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  descriptionText: {
    fontSize: 12,
    opacity: 0.7,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  appealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
  },
  appealButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  appealForm: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  appealFormTitle: {
    marginBottom: 8,
  },
  appealFormSubtitle: {
    marginBottom: 12,
    opacity: 0.7,
  },
  appealTextInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  appealButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  generateLetterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  submitAppealButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    alignItems: 'center',
    padding: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
  },
});
