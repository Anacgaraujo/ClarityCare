import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();

  const quickActions = [
    {
      title: 'Check Coverage',
      description: 'See if your treatment is covered',
      icon: 'checkmark.shield.fill',
      color: '#4CAF50',
      screen: 'coverage'
    },
    {
      title: 'View Benefits',
      description: 'Track deductible and copays',
      icon: 'chart.bar.fill',
      color: '#2196F3',
      screen: 'benefits'
    },
    {
      title: 'Manage Claims',
      description: 'Review and appeal claims',
      icon: 'doc.text.fill',
      color: '#FF9800',
      screen: 'claims'
    },
    {
      title: 'Find Providers',
      description: 'Locate in-network doctors',
      icon: 'location.fill',
      color: '#9C27B0',
      screen: 'providers'
    }
  ];

  const recentActivity = [
    {
      type: 'claim',
      title: 'MRI Claim Approved',
      description: 'Your MRI claim for $1,200 has been approved',
      time: '2 hours ago',
      status: 'approved'
    },
    {
      type: 'benefit',
      title: 'Deductible Update',
      description: 'You\'ve reached 80% of your annual deductible',
      time: '1 day ago',
      status: 'info'
    },
    {
      type: 'coverage',
      title: 'Coverage Check',
      description: 'Physical therapy is covered under your plan',
      time: '3 days ago',
      status: 'success'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#4CAF50';
      case 'info': return '#2196F3';
      case 'success': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return 'checkmark.circle.fill';
      case 'info': return 'info.circle.fill';
      case 'success': return 'checkmark.circle.fill';
      default: return 'circle.fill';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.welcomeSection}>
          <ThemedText type="title">Welcome to ClarityCare</ThemedText>
          <ThemedText style={styles.subtitle}>
            Your AI-powered health insurance navigator
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.planCard}>
          <ThemedView style={styles.planHeader}>
            <IconSymbol name="creditcard.fill" size={24} color="#2196F3" />
            <ThemedText type="defaultSemiBold" style={styles.planName}>
              Blue Cross Blue Shield PPO
            </ThemedText>
          </ThemedView>
          <ThemedText style={styles.planDetails}>
            Member ID: ABC123456789 • Active
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.quickActionsSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Quick Actions
        </ThemedText>
        
        <ThemedView style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionCard}>
              <ThemedView style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <IconSymbol name={action.icon} size={24} color="white" />
              </ThemedView>
              <ThemedText type="defaultSemiBold" style={styles.actionTitle}>
                {action.title}
              </ThemedText>
              <ThemedText style={styles.actionDescription}>
                {action.description}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.benefitsSummary}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Benefits Summary
        </ThemedText>
        
        <ThemedView style={styles.benefitsGrid}>
          <ThemedView style={styles.benefitItem}>
            <ThemedText style={styles.benefitValue}>$1,600</ThemedText>
            <ThemedText style={styles.benefitLabel}>Deductible Used</ThemedText>
            <ThemedText style={styles.benefitProgress}>80% of $2,000</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.benefitItem}>
            <ThemedText style={styles.benefitValue}>$3,200</ThemedText>
            <ThemedText style={styles.benefitLabel}>Out-of-Pocket</ThemedText>
            <ThemedText style={styles.benefitProgress}>64% of $5,000</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.benefitItem}>
            <ThemedText style={styles.benefitValue}>3</ThemedText>
            <ThemedText style={styles.benefitLabel}>Primary Care</ThemedText>
            <ThemedText style={styles.benefitProgress}>3 of 12 visits</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.recentActivity}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Recent Activity
        </ThemedText>
        
        {recentActivity.map((activity, index) => (
          <ThemedView key={index} style={styles.activityItem}>
            <ThemedView style={styles.activityIcon}>
              <IconSymbol 
                name={getStatusIcon(activity.status)} 
                size={20} 
                color={getStatusColor(activity.status)} 
              />
            </ThemedView>
            
            <ThemedView style={styles.activityContent}>
              <ThemedText type="defaultSemiBold" style={styles.activityTitle}>
                {activity.title}
              </ThemedText>
              <ThemedText style={styles.activityDescription}>
                {activity.description}
              </ThemedText>
              <ThemedText style={styles.activityTime}>
                {activity.time}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.aiAssistant}>
        <ThemedView style={styles.aiHeader}>
          <IconSymbol name="brain.head.profile" size={24} color="#9C27B0" />
          <ThemedText type="defaultSemiBold" style={styles.aiTitle}>
            AI Assistant
          </ThemedText>
        </ThemedView>
        
        <ThemedText style={styles.aiDescription}>
          Ask me anything about your insurance coverage, benefits, or claims. I can help you understand your plan and maximize your benefits.
        </ThemedText>
        
        <TouchableOpacity style={styles.aiButton}>
          <IconSymbol name="message.fill" size={16} color="white" />
          <ThemedText style={styles.aiButtonText}>Start Conversation</ThemedText>
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
  welcomeSection: {
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
    fontSize: 16,
  },
  planCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  planName: {
    fontSize: 16,
  },
  planDetails: {
    fontSize: 14,
    opacity: 0.7,
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 16,
  },
  benefitsSummary: {
    marginBottom: 24,
  },
  benefitsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  benefitItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  benefitLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 4,
  },
  benefitProgress: {
    fontSize: 10,
    opacity: 0.6,
    textAlign: 'center',
  },
  recentActivity: {
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: 'row',
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
  activityIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
    lineHeight: 16,
  },
  activityTime: {
    fontSize: 10,
    opacity: 0.5,
  },
  aiAssistant: {
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  aiTitle: {
    fontSize: 16,
    color: '#7B1FA2',
  },
  aiDescription: {
    fontSize: 14,
    color: '#8E24AA',
    lineHeight: 20,
    marginBottom: 16,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9C27B0',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
  },
  aiButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
