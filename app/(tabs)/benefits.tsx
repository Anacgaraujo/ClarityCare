import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface BenefitProgress {
  name: string;
  used: number;
  total: number;
  unit: string;
  color: string;
}

export default function BenefitsScreen() {
  const colorScheme = useColorScheme();
  const [benefits] = useState<BenefitProgress[]>([
    {
      name: 'Annual Deductible',
      used: 1600,
      total: 2000,
      unit: '$',
      color: '#FF6B6B'
    },
    {
      name: 'Out-of-Pocket Max',
      used: 3200,
      total: 5000,
      unit: '$',
      color: '#4ECDC4'
    },
    {
      name: 'Primary Care Visits',
      used: 3,
      total: 12,
      unit: 'visits',
      color: '#45B7D1'
    },
    {
      name: 'Specialist Visits',
      used: 1,
      total: 8,
      unit: 'visits',
      color: '#96CEB4'
    },
    {
      name: 'Mental Health Sessions',
      used: 0,
      total: 20,
      unit: 'sessions',
      color: '#FFEAA7'
    },
    {
      name: 'Prescription Coverage',
      used: 450,
      total: 1000,
      unit: '$',
      color: '#DDA0DD'
    }
  ]);

  const getProgressPercentage = (used: number, total: number) => {
    return Math.min((used / total) * 100, 100);
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return '#F44336';
    if (percentage >= 75) return '#FF9800';
    return '#4CAF50';
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Benefits Tracker</ThemedText>
        <ThemedText style={styles.subtitle}>
          Track your insurance benefits and spending
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.summaryCard}>
        <ThemedText type="subtitle" style={styles.summaryTitle}>
          Plan Summary
        </ThemedText>
        <ThemedView style={styles.summaryRow}>
          <ThemedText style={styles.summaryLabel}>Plan Type:</ThemedText>
          <ThemedText style={styles.summaryValue}>BCBS PPO</ThemedText>
        </ThemedView>
        <ThemedView style={styles.summaryRow}>
          <ThemedText style={styles.summaryLabel}>Member ID:</ThemedText>
          <ThemedText style={styles.summaryValue}>ABC123456789</ThemedText>
        </ThemedView>
        <ThemedView style={styles.summaryRow}>
          <ThemedText style={styles.summaryLabel}>Plan Year:</ThemedText>
          <ThemedText style={styles.summaryValue}>2024</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.benefitsContainer}>
        <ThemedText type="subtitle" style={styles.benefitsTitle}>
          Your Benefits
        </ThemedText>
        
        {benefits.map((benefit, index) => {
          const percentage = getProgressPercentage(benefit.used, benefit.total);
          const statusColor = getStatusColor(percentage);
          
          return (
            <ThemedView key={index} style={styles.benefitCard}>
              <ThemedView style={styles.benefitHeader}>
                <ThemedText type="defaultSemiBold" style={styles.benefitName}>
                  {benefit.name}
                </ThemedText>
                <ThemedText style={[styles.benefitStatus, { color: statusColor }]}>
                  {benefit.used}{benefit.unit} / {benefit.total}{benefit.unit}
                </ThemedText>
              </ThemedView>
              
              <ThemedView style={styles.progressContainer}>
                <ThemedView style={styles.progressBar}>
                  <ThemedView 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${percentage}%`,
                        backgroundColor: benefit.color
                      }
                    ]} 
                  />
                </ThemedView>
                <ThemedText style={styles.progressText}>
                  {percentage.toFixed(0)}% used
                </ThemedText>
              </ThemedView>

              {percentage >= 90 && (
                <ThemedView style={styles.warningBox}>
                  <IconSymbol name="exclamationmark.triangle.fill" size={16} color="#FF9800" />
                  <ThemedText style={styles.warningText}>
                    {percentage >= 100 ? 'Limit reached!' : 'Approaching limit'}
                  </ThemedText>
                </ThemedView>
              )}
            </ThemedView>
          );
        })}
      </ThemedView>

      <ThemedView style={styles.quickActions}>
        <ThemedText type="subtitle" style={styles.actionsTitle}>
          Quick Actions
        </ThemedText>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="camera.fill" size={20} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={styles.actionText}>Upload Receipt</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="doc.text.fill" size={20} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={styles.actionText}>View Claims History</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="location.fill" size={20} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={styles.actionText}>Find In-Network Providers</ThemedText>
        </TouchableOpacity>
      </ThemedView>
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
  summaryCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    opacity: 0.7,
  },
  summaryValue: {
    fontWeight: '600',
  },
  benefitsContainer: {
    marginBottom: 24,
  },
  benefitsTitle: {
    marginBottom: 16,
  },
  benefitCard: {
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
  benefitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitName: {
    fontSize: 16,
  },
  benefitStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
    minWidth: 60,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    gap: 6,
  },
  warningText: {
    color: '#E65100',
    fontSize: 12,
    fontWeight: '500',
  },
  quickActions: {
    marginBottom: 24,
  },
  actionsTitle: {
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    gap: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
