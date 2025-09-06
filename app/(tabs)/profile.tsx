import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface InsurancePlan {
  id: string;
  name: string;
  type: string;
  memberId: string;
  groupNumber: string;
  isActive: boolean;
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [insurancePlans] = useState<InsurancePlan[]>([
    {
      id: '1',
      name: 'Blue Cross Blue Shield PPO',
      type: 'PPO',
      memberId: 'ABC123456789',
      groupNumber: 'GRP001',
      isActive: true
    }
  ]);

  const [userInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-06-15',
    address: '123 Main St, City, ST 12345'
  });

  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    type: '',
    memberId: '',
    groupNumber: ''
  });

  const handleAddPlan = () => {
    if (!newPlan.name || !newPlan.memberId) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert('Success', 'Insurance plan added successfully!');
    setShowAddPlan(false);
    setNewPlan({ name: '', type: '', memberId: '', groupNumber: '' });
  };

  const handleUploadDocument = () => {
    Alert.alert(
      'Upload Document',
      'Choose document type:',
      [
        { text: 'Insurance Card', onPress: () => {/* Upload logic */} },
        { text: 'Explanation of Benefits', onPress: () => {/* Upload logic */} },
        { text: 'Medical Records', onPress: () => {/* Upload logic */} },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your data will be exported in a HIPAA-compliant format.',
      [
        { text: 'Export as PDF', onPress: () => {/* Export logic */} },
        { text: 'Export as CSV', onPress: () => {/* Export logic */} },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Profile & Settings</ThemedText>
        <ThemedText style={styles.subtitle}>
          Manage your account and insurance information
        </ThemedText>
      </ThemedView>

      {/* User Information */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Personal Information
        </ThemedText>
        
        <ThemedView style={styles.infoCard}>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Name:</ThemedText>
            <ThemedText style={styles.infoValue}>{userInfo.name}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Email:</ThemedText>
            <ThemedText style={styles.infoValue}>{userInfo.email}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Phone:</ThemedText>
            <ThemedText style={styles.infoValue}>{userInfo.phone}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Date of Birth:</ThemedText>
            <ThemedText style={styles.infoValue}>{userInfo.dateOfBirth}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Address:</ThemedText>
            <ThemedText style={styles.infoValue}>{userInfo.address}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Insurance Plans */}
      <ThemedView style={styles.section}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Insurance Plans
          </ThemedText>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddPlan(true)}
          >
            <IconSymbol name="plus" size={16} color="white" />
            <ThemedText style={styles.addButtonText}>Add Plan</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {insurancePlans.map((plan) => (
          <ThemedView key={plan.id} style={styles.planCard}>
            <ThemedView style={styles.planHeader}>
              <ThemedText type="defaultSemiBold" style={styles.planName}>
                {plan.name}
              </ThemedText>
              <ThemedView style={styles.planStatus}>
                <IconSymbol 
                  name={plan.isActive ? "checkmark.circle.fill" : "xmark.circle.fill"} 
                  size={16} 
                  color={plan.isActive ? "#4CAF50" : "#F44336"} 
                />
                <ThemedText style={[
                  styles.statusText, 
                  { color: plan.isActive ? "#4CAF50" : "#F44336" }
                ]}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </ThemedText>
              </ThemedView>
            </ThemedView>
            
            <ThemedView style={styles.planDetails}>
              <ThemedText style={styles.planDetail}>
                <ThemedText style={styles.detailLabel}>Type:</ThemedText> {plan.type}
              </ThemedText>
              <ThemedText style={styles.planDetail}>
                <ThemedText style={styles.detailLabel}>Member ID:</ThemedText> {plan.memberId}
              </ThemedText>
              <ThemedText style={styles.planDetail}>
                <ThemedText style={styles.detailLabel}>Group #:</ThemedText> {plan.groupNumber}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        ))}

        {showAddPlan && (
          <ThemedView style={styles.addPlanForm}>
            <ThemedText type="defaultSemiBold" style={styles.formTitle}>
              Add New Insurance Plan
            </ThemedText>
            
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: Colors[colorScheme ?? 'light'].background,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].tabIconDefault
                }
              ]}
              placeholder="Insurance Company Name"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={newPlan.name}
              onChangeText={(text) => setNewPlan({...newPlan, name: text})}
            />
            
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: Colors[colorScheme ?? 'light'].background,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].tabIconDefault
                }
              ]}
              placeholder="Plan Type (PPO, HMO, etc.)"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={newPlan.type}
              onChangeText={(text) => setNewPlan({...newPlan, type: text})}
            />
            
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: Colors[colorScheme ?? 'light'].background,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].tabIconDefault
                }
              ]}
              placeholder="Member ID"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={newPlan.memberId}
              onChangeText={(text) => setNewPlan({...newPlan, memberId: text})}
            />
            
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: Colors[colorScheme ?? 'light'].background,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].tabIconDefault
                }
              ]}
              placeholder="Group Number (optional)"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={newPlan.groupNumber}
              onChangeText={(text) => setNewPlan({...newPlan, groupNumber: text})}
            />
            
            <ThemedView style={styles.formButtons}>
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleAddPlan}
              >
                <ThemedText style={styles.saveButtonText}>Save Plan</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.cancelFormButton}
                onPress={() => setShowAddPlan(false)}
              >
                <ThemedText style={styles.cancelFormButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Quick Actions
        </ThemedText>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleUploadDocument}>
          <IconSymbol name="camera.fill" size={20} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={styles.actionText}>Upload Documents</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleExportData}>
          <IconSymbol name="square.and.arrow.up.fill" size={20} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={styles.actionText}>Export My Data</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="bell.fill" size={20} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={styles.actionText}>Notification Settings</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="questionmark.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={styles.actionText}>Help & Support</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Privacy & Security */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Privacy & Security
        </ThemedText>
        
        <ThemedView style={styles.privacyCard}>
          <IconSymbol name="shield.fill" size={24} color="#4CAF50" />
          <ThemedView style={styles.privacyText}>
            <ThemedText type="defaultSemiBold" style={styles.privacyTitle}>
              HIPAA Compliant
            </ThemedText>
            <ThemedText style={styles.privacyDescription}>
              Your health information is encrypted and protected according to HIPAA standards.
            </ThemedText>
          </ThemedView>
        </ThemedView>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="lock.fill" size={20} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={styles.actionText}>Change Password</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="eye.slash.fill" size={20} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={styles.actionText}>Privacy Settings</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Danger Zone */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Account Management
        </ThemedText>
        
        <TouchableOpacity 
          style={styles.dangerButton} 
          onPress={handleDeleteAccount}
        >
          <IconSymbol name="trash.fill" size={20} color="#F44336" />
          <ThemedText style={styles.dangerButtonText}>Delete Account</ThemedText>
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
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    opacity: 0.7,
    flex: 1,
  },
  infoValue: {
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  planCard: {
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
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: {
    fontSize: 16,
    flex: 1,
  },
  planStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  planDetails: {
    gap: 4,
  },
  planDetail: {
    fontSize: 14,
  },
  detailLabel: {
    fontWeight: '600',
  },
  addPlanForm: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  formTitle: {
    marginBottom: 16,
  },
  formInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelFormButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelFormButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
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
  privacyCard: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  privacyText: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 4,
  },
  privacyDescription: {
    fontSize: 14,
    color: '#388E3C',
    lineHeight: 20,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F44336',
  },
});
