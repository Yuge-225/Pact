import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Field, Heading, Pill, Row, Screen, sharedStyles } from '@/components/ui';
import { useApp } from '@/state/AppProvider';
import { colors } from '@/theme';

export function ConsequenceScreen() {
  const { activeCircle, activePact, data, submitConsequence, voteOnConsequence } = useApp();
  const [note, setNote] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>();

  if (!activePact || !activeCircle) return <Screen><Heading>No consequence assigned</Heading><Button onPress={() => router.back()}>Close</Button></Screen>;
  const submission = activePact.submission;

  async function chooseImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access required', 'Allow photo access to attach image evidence. You can also submit a written note without a photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, quality: 0.8 });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  }

  function submit() {
    if (!note.trim() && !imageUri) {
      Alert.alert('Add evidence', 'Attach a photo or describe how you completed the consequence.');
      return;
    }
    submitConsequence(note, imageUri);
    Alert.alert('Evidence submitted', 'Your Circle can now vote to approve or request a redo.');
  }

  if (submission) {
    const submitter = activeCircle.members.find((member) => member.id === submission.memberId);
    const approvals = submission.votes.filter((vote) => vote.approved).length;
    const rejections = submission.votes.filter((vote) => !vote.approved).length;
    return (
      <Screen>
        <Heading subtitle="Circle members explicitly approve the evidence or request a redo.">Evidence review</Heading>
        <Card accent>
          <Row><Text style={styles.avatar}>{submitter?.avatar ?? '🎭'}</Text><View style={styles.flex}><Text style={sharedStyles.title}>{submitter?.name ?? 'Circle member'}</Text><Pill tone="orange">SUBMITTED</Pill></View></Row>
          {submission.imageUri ? <Image source={{ uri: submission.imageUri }} style={styles.image} alt="Submitted consequence evidence" /> : null}
          <Text style={sharedStyles.body}>{submission.note || 'Photo evidence attached.'}</Text>
        </Card>
        <Card>
          <Text style={sharedStyles.title}>Circle decision</Text>
          <Text style={sharedStyles.muted}>{approvals} approved · {rejections} requested a redo</Text>
          <Button onPress={() => voteOnConsequence(true)}>Approve evidence</Button>
          <Button variant="secondary" onPress={() => voteOnConsequence(false)}>Request a redo</Button>
        </Card>
        <Text style={sharedStyles.muted}>Votes in this device-only build are stored locally. Production voting will require authenticated server records.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Heading subtitle={`Complete “${activePact.consequence}” and share evidence with your Circle.`}>Own the consequence.</Heading>
      <Card>
        {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} alt="Selected consequence evidence" /> : <View style={styles.placeholder}><Text style={styles.placeholderEmoji}>📸</Text><Text style={sharedStyles.muted}>No image selected</Text></View>}
        <Button variant="secondary" onPress={chooseImage}>{imageUri ? 'Choose a different photo' : 'Choose photo evidence'}</Button>
        <Field label="Evidence note" value={note} onChangeText={setNote} placeholder="Describe what you did…" multiline />
        <Button onPress={submit}>Submit evidence</Button>
      </Card>
      {data.demoMode ? <Text style={sharedStyles.muted}>Demo mode lets the current user submit evidence so the complete flow can be tested.</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: { fontSize: 38 },
  flex: { flex: 1, gap: 5 },
  image: { width: '100%', height: 230, borderRadius: 15, backgroundColor: colors.background },
  placeholder: { height: 190, borderRadius: 15, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.border, alignItems: 'center', justifyContent: 'center', gap: 8 },
  placeholderEmoji: { fontSize: 40 },
});
