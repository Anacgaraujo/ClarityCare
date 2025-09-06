import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function CoverageScreen() {
  const colorScheme = useColorScheme();
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [coverageResult, setCoverageResult] = useState<any>(null);

  const analyzeCoverage = async () => {
    if (!symptoms.trim()) {
      Alert.alert('Error', 'Please enter symptoms or diagnosis');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis (replace with actual API call)
    setTimeout(() => {
      const mockResult = {
        covered: true,
        cptCode: '72148',
        description: 'MRI lumbar spine without contrast',
        coverage: 'Covered under your BCBS PPO after deductible',
        deductibleStatus: 'You have met 80% of your deductible this year',
        preAuthRequired: true,
        suggestions: [
          'Ask your provider to document "neurological symptoms" for better pre-auth chance',
          'Consider in-network providers to reduce out-of-pocket costs'
        ]
      };
      setCoverageResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Coverage Checker</ThemedText>
        <ThemedText style={styles.subtitle}>
          Enter your symptoms or diagnosis to check coverage
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <ThemedText type="subtitle">What do you need coverage for?</ThemedText>
        <TextInput
          style={[
            styles.textInput,
            { 
              backgroundColor: Colors[colorScheme ?? 'light'].background,
              color: Colors[colorScheme ?? 'light'].text,
              borderColor: Colors[colorScheme ?? 'light'].tabIconDefault
            }
          ]}
          placeholder="e.g., MRI for lower back pain, annual physical, mental health therapy"
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={symptoms}
          onChangeText={setSymptoms}
          multiline
          numberOfLines={3}
        />
        
        <TouchableOpacity
          style={[
            styles.analyzeButton,
            { backgroundColor: Colors[colorScheme ?? 'light'].tint }
          ]}
          onPress={analyzeCoverage}
          disabled={isAnalyzing}
        >
          <IconSymbol 
            name={isAnalyzing ? "hourglass" : "magnifyingglass"} 
            size={20} 
            color="white" 
          />
          <ThemedText style={styles.buttonText}>
            {isAnalyzing ? 'Analyzing...' : 'Check Coverage'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {coverageResult && (
        <ThemedView style={styles.resultContainer}>
          <ThemedView style={styles.resultHeader}>
            <IconSymbol 
              name={coverageResult.covered ? "checkmark.circle.fill" : "xmark.circle.fill"} 
              size={24} 
              color={coverageResult.covered ? "#4CAF50" : "#F44336"} 
            />
            <ThemedText type="subtitle" style={styles.resultTitle}>
              {coverageResult.covered ? 'Covered' : 'Not Covered'}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.resultDetails}>
            <ThemedText style={styles.detailText}>
              <ThemedText type="defaultSemiBold">CPT Code:</ThemedText> {coverageResult.cptCode}
            </ThemedText>
            <ThemedText style={styles.detailText}>
              <ThemedText type="defaultSemiBold">Description:</ThemedText> {coverageResult.description}
            </ThemedText>
            <ThemedText style={styles.detailText}>
              <ThemedText type="defaultSemiBold">Coverage:</ThemedText> {coverageResult.coverage}
            </ThemedText>
            <ThemedText style={styles.detailText}>
              <ThemedText type="defaultSemiBold">Deductible Status:</ThemedText> {coverageResult.deductibleStatus}
            </ThemedText>
            
            {coverageResult.preAuthRequired && (
              <ThemedView style={styles.warningBox}>
                <IconSymbol name="exclamationmark.triangle.fill" size={16} color="#FF9800" />
                <ThemedText style={styles.warningText}>
                  Pre-authorization may be required
                </ThemedText>
              </ThemedView>
            )}

            {coverageResult.suggestions && (
              <ThemedView style={styles.suggestionsContainer}>
                <ThemedText type="defaultSemiBold" style={styles.suggestionsTitle}>
                  AI Suggestions:
                </ThemedText>
                {coverageResult.suggestions.map((suggestion: string, index: number) => (
                  <ThemedView key={index} style={styles.suggestionItem}>
                    <IconSymbol name="lightbulb.fill" size={14} color="#FFC107" />
                    <ThemedText style={styles.suggestionText}>{suggestion}</ThemedText>
                  </ThemedView>
                ))}
              </ThemedView>
            )}
          </ThemedView>
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
  inputContainer: {
    marginBottom: 24,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  resultTitle: {
    fontSize: 18,
  },
  resultDetails: {
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 20,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  warningText: {
    color: '#E65100',
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  suggestionsTitle: {
    marginBottom: 12,
    fontSize: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
  },
});
